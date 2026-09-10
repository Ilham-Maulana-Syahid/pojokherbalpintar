"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Leaf, Heart, AlertTriangle, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import jamuData from "@/data/jamu.json";
import { useModalBehavior } from "@/hooks/useModalBehavior";
type JamuItem = (typeof jamuData)[number];
const categories = ["Semua"];

function splitListItems(items: string[]) {
  return items.flatMap((item) =>
    item
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean),
  );
}

function splitBenefitItems(items: string[]) {
  return splitListItems(items).flatMap((item) => {
    if (/meringankan dan mengobati/i.test(item)) {
      return [item];
    }

    return item
      .split(/\s+dan\s+/i)
      .map((part) => part.trim())
      .filter(Boolean);
  });
}

function DetailList({
  items,
  tone,
}: {
  items: string[];
  tone: "benefit" | "indication";
}) {
  const isBenefit = tone === "benefit";
  const separatedItems = isBenefit
    ? splitBenefitItems(items)
    : splitListItems(items);

  return (
    <div className="space-y-2.5">
      {separatedItems.map((item, index) => (
        <div
          key={`${tone}-${item}-${index}`}
          className="flex items-start gap-3 rounded-xl border border-border/80 bg-white/70 p-3 text-sm leading-relaxed text-text-secondary"
        >
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              isBenefit
                ? "bg-warm/10 text-warm"
                : "bg-emerald/10 text-emerald"
            }`}
          >
            {index + 1}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedJamu, setSelectedJamu] = useState<JamuItem | null>(null);

  useModalBehavior(!!selectedJamu, () => setSelectedJamu(null));

  const filteredJamu = useMemo(() => {
    return jamuData.filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.nama_latin.toLowerCase().includes(search.toLowerCase()) || item.manfaat.some((m) => m.toLowerCase().includes(search.toLowerCase())) || item.komposisi.some((k) => k.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = selectedCategory === "Semua" || item.kategori === selectedCategory;
      return matchSearch && matchCategory && item.tersedia;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-nature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm">
            <Leaf className="w-4 h-4 text-primary" /> Katalog Herbal
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text mb-4">Jelajahi <span className="gradient-text">Herbal Indonesia</span></h1>
          <p className="text-text-secondary max-w-xl mx-auto">Informasi lengkap herbal berdasarkan panduan resmi Kemenkes RI.</p>
          <div className="mt-4 sm:mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-white/50 px-3 py-2.5 sm:px-5 sm:py-4 text-xs leading-relaxed text-text-muted backdrop-blur-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-muted" />
              <p className="text-xs sm:text-sm">
                <span className="font-semibold text-text">Disclaimer medis:</span> Seluruh data literatur di bawah merupakan studi ilmiah umum untuk tujuan edukasi. Konsumsi herbal sebagai terapi pendamping wajib dikonsultasikan terlebih dahulu dengan dokter atau apoteker, terutama bagi pasien dengan obat rutin.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <div className="relative max-w-lg mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Cari herbal, manfaat, atau kategori..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-border rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <motion.button key={cat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === cat ? "bg-gradient-to-r from-primary to-emerald text-white shadow-lg shadow-primary/20" : "bg-white/70 border border-border text-text-secondary hover:text-primary hover:border-primary/30"}`}>
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJamu.map((item, index) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6 }} onClick={() => setSelectedJamu(item)} className="glass-card rounded-2xl overflow-hidden cursor-pointer group">
                <div className="h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${item.warna_tema}20, ${item.warna_tema}45)` }}>
                  <Image src={item.gambar} alt={item.nama} fill className="object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3"><h3 className="text-sm sm:text-xl font-bold text-white leading-tight" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.3)" }}>{item.nama}</h3></div>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs text-text-muted italic mb-2 sm:mb-3">{item.nama_latin}</p>
                  <div className="mb-3 sm:mb-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Manfaat utama
                    </p>
                    <div className="space-y-1.5">
                      {splitBenefitItems(item.manfaat)
                        .slice(0, 3)
                        .map((m, benefitIndex) => (
                        <div
                          key={`${item.id}-benefit-${benefitIndex}`}
                          className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-text-secondary"
                        >
                          <Heart className="mt-0.5 h-3 w-3 shrink-0 text-warm sm:h-3.5 sm:w-3.5" />
                          <span>{m}</span>
                        </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-2 sm:pt-3 border-t border-border">
                    <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Detail <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJamu.length === 0 && <div className="text-center py-20"><Search className="w-16 h-16 text-text-muted/30 mx-auto mb-4" /><p className="text-text-secondary">Tidak ditemukan herbal yang sesuai.</p></div>}

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center glass-card rounded-2xl p-8">
          <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text mb-2">Punya Pertanyaan tentang Herbal?</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">Gunakan Herbal AI kami untuk berkonsultasi.</p>
          <Link href="/ai" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-warm text-white rounded-xl font-medium shadow-lg shadow-accent/20 hover:shadow-xl transition-all"><Sparkles className="w-5 h-5" /> Buka Herbal AI</Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedJamu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md" onClick={() => setSelectedJamu(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border">
              <div className="h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${selectedJamu.warna_tema}35, ${selectedJamu.warna_tema}65)` }}>
                <Image src={selectedJamu.gambar} alt={selectedJamu.nama} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 right-3 sm:right-16">
                  <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>{selectedJamu.nama}</h2>
                  <p className="text-xs sm:text-sm text-white/80 italic">{selectedJamu.nama_latin}</p>
                </div>
                <button onClick={() => setSelectedJamu(null)} className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text border border-border shadow-sm z-10"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-text">{selectedJamu.nama}</h2>
                </div>
                <p className="text-sm text-text-muted italic mb-4 sm:mb-6">{selectedJamu.nama_latin}</p>
                <div className="mb-5 rounded-2xl border border-warm/20 bg-warm/[0.04] p-4 sm:mb-6 sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-warm" />
                    <div>
                      <h3 className="font-semibold text-text">Manfaat</h3>
                      <p className="text-xs text-text-muted">Kegunaan umum yang tercatat pada data herbal</p>
                    </div>
                  </div>
                  <DetailList items={selectedJamu.manfaat} tone="benefit" />
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
