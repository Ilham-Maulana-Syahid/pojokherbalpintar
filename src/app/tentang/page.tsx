"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Heart, Target, BookOpen, Leaf, Sparkles, Award } from "lucide-react";
import Link from "next/link";

/*
  ═══════════════════════════════════════════
  TEMPAT GAMBAR — Ganti path sesuai file kamu
  ═══════════════════════════════════════════

  1. Logo Universitas Diponegoro:
     Letakkan di → public/images/universitas-diponegoro.png

  2. Foto Tim:
     Letakkan di → public/images/team/
     - nadhira.png  (Nadhira Ayu Putri)
     - ilham.png    (Ilham Maulana Syahid)
     - raka.png     (Raka Pratama)

  Format bebas: .png, .png, .webp
  Kalau formatnya beda, ganti extension di bawah ini.
  ═══════════════════════════════════════════
*/

const team = [
  {
    name: "Ayu Sukma Dewi",
    major: "Prodi Farmasi",
    foto: "/images/team/ayu.png",
    gradient: "from-earth to-warm",
  },
  {
    name: "Ilham Maulana Syahid",
    major: "Prodi Informatika",
    foto: "/images/team/ilham.png",
    gradient: "from-primary to-emerald",
  },
  {
    name: "Sigit Tyas Nur Ramadhan",
    major: "Prodi Farmasi",
    foto: "/images/team/sigit.png",
    fallback: "R",
    gradient: "from-accent to-warm",
  },
];

const values = [
  { icon: Heart, title: "Berbasis Sains", desc: "Semua informasi herbal berdasarkan panduan resmi Kemenkes RI dan penelitian ilmiah.", color: "from-earth to-warm" },
  { icon: Users, title: "Untuk Masyarakat", desc: "Didedikasikan untuk masyarakat Indonesia yang belum terakses edukasi kesehatan.", color: "from-primary to-emerald" },
  { icon: Target, title: "Kemandirian Kesehatan", desc: "Mendorong masyarakat mandiri menjaga kesehatan dengan herbal alami.", color: "from-accent to-warm" },
  { icon: Sparkles, title: "Inovasi Digital", desc: "Teknologi AI untuk mempermudah akses informasi herbal bagi semua orang.", color: "from-accent to-warm" },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-nature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm"><Users className="w-4 h-4 text-accent" /> Tentang Kami</span>
          <h1 className="text-3xl md:text-5xl font-black text-text mb-4">Tim <span className="gradient-text">Pojok Herbal Pintar</span></h1>
          <p className="text-text-secondary max-w-2xl mx-auto">Mahasiswa Universitas Diponegoro</p>
        </motion.div>

        {/* ═══════ LOGO UNIVERSITAS ═══════ */}
        {/* 
          Ganti src di bawah jika gambarnya format lain:
          contoh: src="/images/universitas-diponegoro.png" 
        */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          <div className="glass-card rounded-2xl p-6 sm:p-8 text-center max-w-lg mx-auto">
            <div className="mx-auto mb-4 sm:mb-6 rounded-2xl overflow-hidden bg-white shadow-md border border-border flex items-center justify-center p-2 sm:p-3" style={{ width: '140px', height: '140px' }}>
              <Image
                src="/images/universitas-diponegoro.png"
                alt="Logo Universitas Diponegoro"
                width={200}
                height={200}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-text mb-2">Universitas Diponegoro</h2>
            <p className="text-sm text-text-muted">📍 Semarang, Jawa Tengah</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-warm text-white rounded-full text-sm font-medium shadow-lg shadow-accent/20"><Award className="w-4 h-4" /> Tim HerbaTech</div>
          </div>
        </motion.div>

        {/* ═══════ FOTO TIM ═══════ */}
        {/*
          Foto masing-masing anggota:
          - nadhira.png  → /images/team/nadhira.png
          - ilham.png    → /images/team/ilham.png
          - raka.png     → /images/team/raka.png
          Ganti extension (jpg/png/webp) di bawah sesuai file kamu.
        */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">Anggota <span className="text-primary">Tim</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -6 }} className="glass-card h-full rounded-2xl overflow-hidden group">
                {/* Header gradient */}
                <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 relative">
                  {/* Foto profil */}
                  <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2">
                    <div className="aspect-square w-32 sm:w-40 md:w-44 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white group-hover:scale-105 transition-transform">
                      {/* 
                        Ganti .png ke .png/.webp sesuai format file kamu.
                        Kalau file belum ada, huruf fallback (N/I/R) akan tampil.
                      */}
                      <Image
                        src={m.foto}
                        alt={m.name}
                        width={176}
                        height={176}
                        sizes="(max-width: 639px) 128px, (max-width: 767px) 160px, 176px"
                        className="block w-full h-full object-cover object-center"
                        onError={(e) => {
                          // Sembunyikan gambar jika file tidak ada, tampilkan fallback
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {/* Fallback: huruf inisial jika gambar tidak ditemukan */}
                      <div className={`w-full h-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-2xl sm:text-4xl md:text-5xl font-bold text-white absolute inset-0 -z-10`}>
                        {m.fallback}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex min-h-32 flex-col items-center justify-center p-6 pt-20 sm:pt-24 text-center">
                  <h3 className="text-lg font-bold text-text mb-1">{m.name}</h3>
                  <p className="text-xs text-text-muted mb-4">{m.major}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">Nilai <span className="gradient-text-warm">Kami</span></h2>
            <p className="text-text-secondary">Prinsip yang membimbing setiap langkah inovasi kami</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const I = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 text-center">
                  <motion.div whileHover={{ rotate: 5, scale: 1.1 }} className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-lg`}><I className="w-6 h-6 text-white" /></motion.div>
                  <h3 className="text-base font-bold text-text mb-2">{v.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Visi & Misi */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <Leaf className="w-10 h-10 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">Visi & Misi Kami</h2>
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p><span className="font-semibold text-primary">Visi:</span> Menjadi platform edukasi herbal yang menghubungkan pengobatan tradisional Indonesia dengan teknologi modern.</p>
                <p><span className="font-semibold text-primary">Misi:</span> 1) Edukasi herbal melalui Puskesmas dan Posyandu. 2) Teknologi AI untuk akses informasi herbal seluruh masyarakat.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Mandiri dalam Kesehatan, Berdaya dengan Herbal</h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">Gerakan edukasi herbal untuk mewujudkan Indonesia yang lebih sehat.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/katalog" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-emerald text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-xl transition-all"><BookOpen className="w-5 h-5" /> Jelajahi Herbal</Link>
            <Link href="/ai" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-warm text-white rounded-xl font-medium shadow-lg shadow-accent/20 hover:shadow-xl transition-all"><Sparkles className="w-5 h-5" /> Tanya Herbal AI</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
