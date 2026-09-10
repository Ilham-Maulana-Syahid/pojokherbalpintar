"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChefHat,
  Leaf,
  Printer,
  Search,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  BookOpen,
  X,
} from "lucide-react";
import jamuData from "@/data/jamu.json";
import { useModalBehavior } from "@/hooks/useModalBehavior";
type JamuItem = (typeof jamuData)[number];

function splitRecipeItems(items: string[]) {
  return items.flatMap((item) =>
    item
      .split(/,\s+(?!atau\b)/i)
      .map((part) => part.trim())
      .filter(Boolean),
  );
}

function splitRecipeSteps(text: string) {
  return text
    .split(/,\s+(?!atau\b)/i)
    .map((step) => step.trim())
    .filter(Boolean);
}

export default function ResepPage() {
  const [selectedJamu, setSelectedJamu] = useState<JamuItem | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  useModalBehavior(!!selectedJamu, () => setSelectedJamu(null));

  const filtered = jamuData.filter((j) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      query.length === 0 ||
      j.nama.toLowerCase().includes(query) ||
      j.nama_latin.toLowerCase().includes(query) ||
      j.kandungan.some((item) => item.toLowerCase().includes(query)) ||
      j.cara_pembuatan.toLowerCase().includes(query);

    return matchesSearch && j.tersedia;
  });

  const printRecipe = (jamu: JamuItem) => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<html><head><title>${jamu.nama}</title><style>body{font-family:Arial;max-width:600px;margin:0 auto;padding:20px}h1{color:#0891b2;border-bottom:2px solid #0891b2}h2{color:#7c3aed;margin-top:20px}.tag{background:#f0f4f8;color:#0891b2;padding:2px 8px;border-radius:12px;font-size:12px}.danger{background:#fff1f2;border-left:4px solid #e11d48;padding:10px;margin:10px 0}.warning{background:#fef9ef;border-left:4px solid #ea580c;padding:10px;margin:10px 0}.footer{margin-top:30px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:10px}.steps{padding-left:24px}.steps li{margin-bottom:6px}</style></head><body><h1>🌿 ${jamu.nama}</h1><p><em>${jamu.nama_latin}</em> <span class="tag">${jamu.kategori}</span></p><h2>📋 Bagian Tanaman yang Digunakan</h2><ul>${jamu.komposisi.map((k) => `<li>${k}</li>`).join("")}</ul><h2>🧪 Kandungan</h2><ol class="steps">${splitRecipeItems(jamu.kandungan).map((k) => `<li>${k}</li>`).join("")}</ol><h2>👨‍🍳 Cara Pembuatan</h2><ol class="steps">${splitRecipeSteps(jamu.cara_pembuatan).map((step) => `<li>${step}</li>`).join("")}</ol><h2>💊 Keamanan dan Dosis</h2><p><strong>${jamu.dosis}</strong></p>${jamu.sumber_foto ? `<p class="footer">Sumber foto: ${jamu.sumber_foto}</p>` : ""}<div class="warning"><strong>Disclaimer:</strong> Bukan pengganti konsultasi dokter.</div></body></html>`
    );
    w.document.close();
    w.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-nature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm">
            <ChefHat className="w-4 h-4 text-warm" /> Resep Herbal
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text mb-4">
            Resep <span className="gradient-text-warm">Herbal</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Data herbal lengkap dengan cara pengolahan, keamanan, dan referensi
            yang tercantum pada sumber data.
          </p>              <div className="mt-4 sm:mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-white/50 px-3 py-2.5 sm:px-5 sm:py-4 text-xs leading-relaxed text-text-muted backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-text-muted" />
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-text">
                  Disclaimer medis:
                </span>{" "}
                Seluruh data literatur di bawah merupakan studi ilmiah umum untuk
                tujuan edukasi. Konsumsi herbal sebagai terapi pendamping wajib
                dikonsultasikan terlebih dahulu dengan dokter atau apoteker,
                terutama bagi pasien dengan obat rutin.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 max-w-2xl mx-auto"
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Cari resep herbal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-border rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {      ["Semua"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filter === cat
                    ? "bg-gradient-to-r from-primary to-emerald text-white shadow-lg"
                    : "bg-white/70 border border-border text-text-secondary hover:text-primary hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((jamu, index) => (
            <motion.div
              key={jamu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedJamu(jamu)}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image Header */}
              <div
                className="h-44 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${jamu.warna_tema}25, ${jamu.warna_tema}55)`,
                }}
              >
                <Image
                  src={jamu.gambar}
                  alt={jamu.nama}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                  <h3
                    className="text-xl font-bold text-white"
                    style={{
                      textShadow:
                        "0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {jamu.nama}
                  </h3>
                  <p className="text-xs text-white/80 italic">
                    {jamu.nama_latin}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1 bg-primary/5 px-2.5 py-1 rounded-md border border-primary/15">
                    <Droplets className="w-3.5 h-3.5 text-primary" />{" "}
                    {jamu.komposisi.length} bagian tanaman
                  </span>
                  <span className="flex items-center gap-1 bg-emerald/5 px-2.5 py-1 rounded-md border border-emerald/15">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />{" "}
                    Mudah
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-primary" /> Bagian tanaman yang digunakan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {jamu.komposisi.map((k) => (
                      <span
                        key={k}
                        className="px-2.5 py-1 bg-bg text-xs text-text-secondary border border-border rounded-md"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-accent" /> Kandungan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {splitRecipeItems(jamu.kandungan).map((item, index) => (
                      <span
                        key={`${jamu.id}-kandungan-${index}`}
                        className="px-2.5 py-1 bg-accent/5 text-xs text-text-secondary border border-accent/15 rounded-md"
                      >
                        {index + 1}. {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-warm" /> Cara Membuat
                  </h4>
                  <ol className="space-y-1.5 bg-bg p-3 pl-8 rounded-lg border border-border list-decimal">
                    {splitRecipeSteps(jamu.cara_pembuatan).map((step, index) => (
                      <li key={`${jamu.id}-step-${index}`} className="text-sm text-text-secondary leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/15">
                  <p className="text-xs font-semibold text-primary flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Dosis:{" "}
                    {jamu.dosis}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedJamu(jamu);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-emerald text-white rounded-xl text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                  >
                    <BookOpen className="w-4 h-4" /> Lihat Detail
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      printRecipe(jamu);
                    }}
                    className="flex items-center justify-center px-4 py-2.5 bg-bg text-text-secondary rounded-xl text-sm font-medium hover:text-primary transition-colors border border-border"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-16 h-16 text-text-muted/30 mx-auto mb-4" />
            <p className="text-text-secondary">Tidak ditemukan resep.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedJamu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md"
            onClick={() => setSelectedJamu(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border"
            >
              {/* Modal Header with Image */}
              <div
                className="h-40 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedJamu.warna_tema}35, ${selectedJamu.warna_tema}65)`,
                }}
              >
                <Image
                  src={selectedJamu.gambar}
                  alt={selectedJamu.nama}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-16">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedJamu.nama}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 italic">
                    {selectedJamu.nama_latin}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedJamu(null)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text border border-border shadow-sm z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={() => printRecipe(selectedJamu)}
                  className="absolute top-11 sm:top-4 right-3 sm:right-16 w-8 h-8 sm:w-9 sm:h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text border border-border shadow-sm z-10"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-bg rounded-lg border border-border">
                    <Droplets className="w-5 h-5 text-accent mx-auto mb-1" />
                    <p className="text-xs font-medium text-text">
                      {selectedJamu.komposisi.length} Bagian tanaman
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text flex items-center gap-2 mb-2 sm:mb-3">
                    <Leaf className="w-4 h-4 text-primary" /> Bagian tanaman yang digunakan
                  </h3>
                  <div className="space-y-2">
                    {selectedJamu.komposisi.map((k, i) => (
                      <div
                        key={k}
                        className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-bg rounded-lg border border-border"
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-text">{k}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text flex items-center gap-2 mb-2 sm:mb-3">
                    <Droplets className="w-4 h-4 text-accent" /> Kandungan
                  </h3>
                  <div className="space-y-2">
                    {splitRecipeItems(selectedJamu.kandungan).map((item, i) => (
                      <div
                        key={`${selectedJamu.id}-kandungan-${i}`}
                        className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-accent/5 rounded-lg border border-accent/15"
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary text-white text-xs flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span className="text-xs sm:text-sm text-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text flex items-center gap-2 mb-2 sm:mb-3">
                    <ChefHat className="w-4 h-4 text-warm" /> Cara Pembuatan
                  </h3>
                  <ol className="space-y-2 p-3 sm:p-4 bg-bg rounded-lg border border-border list-decimal pl-8">
                    {splitRecipeSteps(selectedJamu.cara_pembuatan).map((step, index) => (
                      <li key={`${selectedJamu.id}-modal-step-${index}`} className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-text mb-2 sm:mb-3">
                    Keamanan, dosis, dan interaksi
                  </h3>
                  <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/15 mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm font-semibold text-primary">
                      💊 {selectedJamu.dosis}
                    </p>
                  </div>
                </div>

                {selectedJamu.sumber_foto && (
                  <p className="text-xs text-text-muted italic">
                    Sumber foto: {selectedJamu.sumber_foto}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
