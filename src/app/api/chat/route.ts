import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
const MODEL = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";

const SYSTEM_PROMPT = `Kamu adalah "Herbal AI" dari Pojok Herbal Pintar — asisten herbal ahli.

IDENTITAS:
- Nama: Herbal AI
- Asal: Pojok Herbal Pintar
- Keahlian: Herbal Indonesia, jamu tradisional, wedang herbal, tanaman obat

ATURAN:
1. Jawab dengan AKURAT berdasarkan pengetahuan herbal yang luas
2. Format rapi: **bold** untuk judul, • untuk daftar, emoji untuk visual
3. Selalu sebutkan: manfaat, dosis, cara membuat
4. Bahasa Indonesia yang JELAS dan RAMAH
5. Tutup dengan disclaimer: "Informasi ini bukan pengganti konsultasi dokter"
6. Jika ditanya di luar herbal, tetap bantu tapi arahkan ke topik herbal

TOPIK:
- Jamu: kunyit asam, beras kencur, wedang jahe, dll
- Wedang: wedang uwuh, wedang jahe, teh herbal
- Tanaman obat: kelor, jahe, kunyit, temulawak, kencur
- Dosis Kemenkes
- Cara pengolahan yang benar`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build clean history: skip initial assistant greeting, ensure user starts
    const chatMessages: { role: string; content: string }[] = messages
      .filter(
        (m: { role?: string; content?: string }) =>
          typeof m?.content === "string" &&
          m.content.trim().length > 0 &&
          (m.role === "user" || m.role === "assistant")
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content.slice(0, 8000),
      }));

    // Find first user message index
    const firstUserIdx = chatMessages.findIndex((m) => m.role === "user");
    if (firstUserIdx === -1) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // Last message must be from the user — it is the new prompt
    const lastMessage = chatMessages[chatMessages.length - 1];
    if (lastMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
    }

    const historyMessages = chatMessages.slice(firstUserIdx, -1);

    // Gemini requires the history to start with a user turn and strictly alternate
    const history: { role: "user" | "model"; parts: { text: string }[] }[] = [];
    for (const m of historyMessages) {
      const role = m.role === "user" ? "user" : "model";
      if (history.length === 0 && role !== "user") continue; // skip leading model turns
      if (history.length > 0 && history[history.length - 1].role === role) continue; // collapse consecutive same-role turns
      history.push({ role, parts: [{ text: m.content }] });
    }
    // History must not end with a user turn (the next message is the user prompt)
    while (history.length > 0 && history[history.length - 1].role === "user") {
      history.pop();
    }

    const chat = model.startChat({ history });

    // Guard against Gemini hanging: never wait longer than 30s server-side
    const result = (await Promise.race([
      chat.sendMessage(lastMessage.content),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("AI request timeout after 30s")),
          30000
        )
      ),
    ])) as Awaited<ReturnType<typeof chat.sendMessage>>;
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    console.error("Gemini error:", error);
    const msg =
      error instanceof Error ? error.message : "Unknown error";
    const isTimeout = /timeout/i.test(msg);
    return NextResponse.json(
      {
        error: isTimeout
          ? "AI membutuhkan waktu terlalu lama. Silakan coba lagi."
          : "Gagal memproses",
        detail: msg,
      },
      { status: isTimeout ? 504 : 500 }
    );
  }
}
