"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, Leaf, Loader2, Trash2, Copy, Check, AlertCircle, RotateCcw } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; timestamp: Date; }

const initialTimestamp = new Date(0);

const quickQuestions = [
  "Apa manfaat teh daun kelor?",
  "Bagaimana cara membuat wedang jahe?",
  "Herbal apa untuk masuk angin?",
  "Jelaskan jamu kunyit asam",
  "Dosis aman beras kencur?",
  "Wedang uwuh manfaatnya?",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: `Halo! 👋 Selamat datang di **Pojok Herbal Pintar**.\n\nSaya adalah **Herbal AI** — asisten herbal ahli didukung oleh Gemini LLM. Saya memiliki pengetahuan luas tentang herbal Indonesia, jamu tradisional, wedang herbal, dan tanaman obat.\n\nSilakan tanyakan apa saja:\n• Manfaat dan khasiat herbal\n• Cara membuat dan mengolah herbal\n• Dosis yang aman\n• Herbal untuk kondisi kesehatan\n\nContoh: *"Apa manfaat teh daun kelor?"*\n\nApa yang ingin Anda ketahui? 🌿`,
    timestamp: initialTimestamp,
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingRetryRef = useRef<(() => void) | null>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMessage: Message = { role: "user", content: text.trim(), timestamp: new Date() };
    pendingRetryRef.current = () => sendMessage(text);
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Client-side timeout: dev-server cold start or slow AI never blocks the UI forever
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);
        const isTimeout = response.status === 504 || /timeout/i.test(String(data.detail || ""));
        const friendly = isTimeout
          ? "AI membutuhkan waktu terlalu lama (server sedang sibuk atau cold start). Coba kirim ulang pesan Anda."
          : data.detail || data.error || "Gagal menghubungi AI";
        setError(friendly);
        setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ ${friendly}`, timestamp: new Date() }]);
        return;
      }

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply, timestamp: new Date() }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Tidak ada respons dari AI. Silakan coba lagi.", timestamp: new Date() }]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      const errMsg = isAbort
        ? "Waktu tunggu habis (45 detik). Server mungkin sedang cold start — coba kirim ulang."
        : err instanceof Error
          ? err.message
          : "Network error";
      setError(errMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠️ Gagal terhubung: ${errMsg}`, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      pendingRetryRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 128) + "px";
  };

  const copyMessage = (content: string, index: number) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(content).catch(() => {});
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    setError(null);
    setMessages([{ role: "assistant", content: "Chat direset. Ada yang bisa saya bantu tentang herbal? 🌿", timestamp: new Date() }]);
  };

  // Escape HTML entities first so AI output can never inject markup (XSS-safe),
  // then turn the escaped text into a tiny whitelist of safe tags.
  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const renderMarkdown = (raw: string) => {
    return raw.split("\n").map((line, i) => {
      let processed = escapeHtml(line);
      processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
      processed = processed.replace(/\*(?!\s)([^*\n]+?)\*/g, '<em>$1</em>');
      const isListItem = /^[•\-\u2713\u2714\u274C\u26A0\uFE0F?\uD83D\uDC8A\uD83C\uDF3F\uD83C\uDF75\uD83D\uDCCB]/.test(processed.trim());
      if (isListItem) return <div key={i} className="ml-2 my-0.5" dangerouslySetInnerHTML={{ __html: processed }} />;
      if (processed.trim() === "") return <br key={i} />;
      return <div key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  return (
    <div className="min-h-[100dvh] pt-20 pb-0 flex flex-col bg-nature">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 min-h-0">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/70 backdrop-blur-xl rounded-2xl border border-border shadow-lg shadow-primary/5">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="w-10 h-10 bg-gradient-to-br from-primary to-emerald rounded-xl flex items-center justify-center shadow-lg glow-green">
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-text">Herbal AI</h1>
              <p className="text-xs text-primary font-medium">Generative AI · Gemini LLM</p>
            </div>
            <button onClick={clearChat} className="ml-4 p-2 text-text-muted hover:text-rose hover:bg-rose/10 rounded-xl transition-colors" title="Reset"><Trash2 className="w-4 h-4" /></button>
          </div>
        </motion.div>

        {/* Error banner */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 px-4 py-3 bg-warm/10 border border-warm/20 rounded-xl flex items-center gap-2 text-sm text-warm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto text-warm/60 hover:text-warm">✕</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-4 py-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <motion.div whileHover={{ scale: 1.1 }} className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === "user" ? "bg-gradient-to-br from-accent to-warm" : "bg-gradient-to-br from-primary to-emerald"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </motion.div>
                  <div className={`relative px-4 py-3 ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}`}>
                    <div className="text-sm leading-relaxed space-y-1">{renderMarkdown(msg.content)}</div>
                    {msg.role === "assistant" && (
                      <button onClick={() => copyMessage(msg.content, index)} className="absolute -bottom-8 right-0 p-1 text-text-muted hover:text-primary transition-colors">
                        {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald text-white flex items-center justify-center shadow-md"><Bot className="w-4 h-4" /></div>
              <div className="chat-bubble-ai px-4 py-3"><div className="flex items-center gap-2"><Loader2 className="w-4 h-4 text-primary animate-spin" /><span className="text-sm text-text-secondary">Herbal AI sedang berpikir...</span></div></div>
            </motion.div>
          )}

          {/* Retry button when last message is an error */}
          {!isLoading && messages.length > 1 && /⚠️/.test(messages[messages.length - 1].content) && (
            <div className="flex justify-center">
              <button onClick={() => pendingRetryRef.current?.()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                <RotateCcw className="w-4 h-4" /> Coba Lagi
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-4">
            <p className="text-xs text-text-muted text-center mb-3 font-medium">💡 Coba tanyakan:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickQuestions.map((q) => (
                <motion.button key={q} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => sendMessage(q)} className="px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-border rounded-xl text-xs text-text-secondary hover:text-primary hover:border-primary/30 transition-all shadow-sm">{q}</motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input */}
        <div
          className="sticky bottom-0 bg-bg/80 backdrop-blur-2xl pt-4 border-t border-border md:pb-[calc(1rem+env(safe-area-inset-bottom))]"
          style={{ paddingBottom: "max(calc(84px + env(safe-area-inset-bottom)), 1rem)" }}
        >
          <div className="flex items-end gap-3 bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center flex-shrink-0 shadow-md"><Leaf className="w-4 h-4" /></div>
            <textarea ref={textareaRef} value={input} onChange={(e) => { setInput(e.target.value); autoResize(); }} onKeyDown={handleKeyDown} placeholder="Tanyakan tentang herbal, jamu, atau wedang..." rows={1} className="flex-1 resize-none bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none max-h-32 py-2" style={{ minHeight: "36px" }} />
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading} className={`p-3 rounded-xl transition-all ${input.trim() && !isLoading ? "bg-gradient-to-r from-primary to-emerald text-white shadow-lg shadow-primary/20" : "bg-bg border border-border text-text-muted"}`}>
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-[10px] text-text-muted text-center mt-2">Herbal AI menggunakan Gemini LLM. Informasi berdasarkan panduan Kemenkes RI.</p>
        </div>
      </div>
    </div>
  );
}
