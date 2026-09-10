"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Leaf, Sparkles, Heart, ArrowRight, BookOpen,
  MessageCircle, ChevronDown, Shield, Droplets,
  Sun, Zap, MapPin
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import HerbalMap from "./HerbalMap";

const features = [
  { icon: BookOpen, title: "Katalog Herbal Lengkap", desc: "Informasi herbal berdasarkan panduan resmi Kemenkes RI dengan dosis aman.", gradient: "from-[#2d6a4f] to-[#059669]", shadow: "shadow-[#2d6a4f]/20" },
  { icon: MessageCircle, title: "Herbal AI Assistant", desc: "Tanyakan tentang herbal, manfaat, dan cara pengolahannya dengan AI generative.", gradient: "from-[#b7791f] to-[#ea580c]", shadow: "shadow-[#b7791f]/20" },
  { icon: Shield, title: "Resep Herbal Aman", desc: "Resep herbal dengan indikasi medis dan panduan pengolahan yang aman.", gradient: "from-[#4d7c0f] to-[#40916c]", shadow: "shadow-[#4d7c0f]/20" },
  { icon: Heart, title: "Edukasi Gratis", desc: "Pengetahuan herbal untuk kemandirian kesehatan masyarakat Indonesia.", gradient: "from-[#78350f] to-[#ea580c]", shadow: "shadow-[#78350f]/20" },
];

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const y = useTransform(smoothProgress, [0, 1], [0, 300]);
  const opacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.35], [1, 0.92]);
  const bgY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 sm:pb-0 overflow-hidden bg-nature-strong">
        <Link
          href="/"
          className="absolute left-4 top-4 z-20 flex items-center gap-2 md:hidden"
          aria-label="Pojok Herbal Pintar"
        >
          <Image
            src="/logo.png"
            alt="Pojok Herbal Pintar"
            width={42}
            height={42}
            className="h-10 w-10 rounded-xl object-cover shadow-lg glow-green"
            priority
          />
          <span className="text-sm font-bold leading-tight text-text">
            Pojok Herbal
            <span className="block text-[9px] font-semibold uppercase tracking-widest text-primary">
              Pintar
            </span>
          </span>
        </Link>
        {/* Parallax background orbs */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[8%] w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#2d6a4f]/8 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, -50, 40, 0], y: [0, 40, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[25%] right-[5%] w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] bg-[#b7791f]/8 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, 30, -40, 0], y: [0, -30, 50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] left-[30%] w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-[#059669]/6 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[55%] right-[20%] w-[150px] sm:w-[250px] md:w-[350px] h-[150px] sm:h-[250px] md:h-[350px] bg-[#4d7c0f]/5 rounded-full blur-[120px]" />
        </motion.div>

        {/* Floating particles */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 14 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ left: `${5 + Math.random() * 90}%`, width: 4 + Math.random() * 5, height: 4 + Math.random() * 5, background: ["#2d6a4f", "#40916c", "#b7791f", "#059669", "#4d7c0f", "#78350f", "#ea580c"][i % 7] }}
                animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.5, 0.5, 0], scale: [0.5, 1, 1, 0.5] }}
                transition={{ duration: 14 + Math.random() * 8, delay: Math.random() * 12, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>
        )}

        {/* Floating leaves with parallax */}
        {mounted && Array.from({ length: 7 }, (_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute"
            style={{ left: `${8 + i * 14}%`, top: "-5%", color: ["#2d6a4f", "#40916c", "#b7791f", "#059669", "#4d7c0f", "#78350f", "#ea580c"][i] }}
            animate={{ y: ["0vh", "105vh"], rotate: [0, 360], opacity: [0, 0.2, 0.2, 0] }}
            transition={{ duration: 18 + i * 3, delay: i * 4, repeat: Infinity, ease: "linear" }}
          >
            <Leaf style={{ width: 16 + i * 5, height: 16 + i * 5 }} />
          </motion.div>
        ))}

        {/* Hero content with parallax */}
        <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-xl rounded-full border border-white/80 shadow-lg shadow-[#2d6a4f]/5 text-sm font-medium text-[var(--text-secondary)] mb-8">
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}><Sparkles className="w-4 h-4 text-[#2d6a4f]" /></motion.span>
            Inovasi Herbal Berbasis Sains & Kemenkes RI
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] mb-6">
            <span className="text-[var(--text)]">Pojok{" "}</span>
            <span className="gradient-text">Herbal</span>
            <br className="hidden sm:block" />
            <span className="text-[var(--text)]">{" "}Pintar</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Inovasi herbal untuk{" "}
            <span className="font-semibold text-[#2d6a4f]">kemandirian kesehatan masyarakat</span>.{" "}
            Edukasi visual & mini-bar herbal di area tunggu Posyandu dan Puskesmas.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/katalog" className="btn-glow group flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#2d6a4f] to-[#059669] text-white rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-[#2d6a4f]/25 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10">
              <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform" />Jelajahi Herbal<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/ai" className="btn-glow group flex items-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#b7791f] to-[#ea580c] text-white rounded-2xl font-bold text-sm sm:text-base shadow-lg shadow-[#b7791f]/25 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />Tanya Herbal AI
            </Link>
          </motion.div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-10 sm:mt-16 text-[var(--text-muted)]">
            <ChevronDown className="w-6 h-6 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="relative py-16 sm:py-24 bg-nature">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-8 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[var(--border)] text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm"><Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b7791f]" /> Fitur Unggulan</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text)] mb-3 sm:mb-4">Mengapa <span className="gradient-text">Pojok Herbal Pintar?</span></h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto">Platform lengkap untuk edukasi dan pemanfaatan herbal bagi kesehatan masyarakat</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => {
              const I = f.icon;
              return (
                <motion.div key={f.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -8, scale: 1.02 }} className="glass-card rounded-2xl p-4 sm:p-6 text-center group cursor-pointer">
                  <motion.div whileHover={{ rotate: 5, scale: 1.1 }} className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg ${f.shadow} group-hover:shadow-xl transition-shadow`}><I className="w-6 h-6 sm:w-7 sm:h-7 text-white" /></motion.div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text)] mb-2">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ INTERACTIVE MAP ═══════ */}
      <section ref={mapRef} className="relative py-16 sm:py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[var(--border)] text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2d6a4f]" /> Peta Herbal</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text)] mb-3 sm:mb-4">Herbal <span className="gradient-text">Indonesia</span></h2>
            <p className="text-sm sm:text-base max-w-xl mx-auto">Klik marker pada peta untuk melihat tanaman herbal khas dari setiap daerah</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <HerbalMap />
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="relative py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium mb-4 shadow-sm"><Droplets className="w-4 h-4 text-[#2d6a4f]" /> Cara Kerja</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text)] mb-4">Bagaimana <span className="gradient-text">Pojok Herbal Pintar</span> Bekerja?</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Kunjungi Posyandu", desc: "Datang ke Posyandu atau Puskesmas terdekat dan nikmati minuman herbal gratis dari kader kesehatan.", icon: Droplets, color: "from-[#2d6a4f] to-[#059669]" },
              { step: "02", title: "Edukasi Herbal", desc: "Dapatkan edukasi dosis aman, manfaat, dan cara mengolah herbal langsung dari kader yang terlatih.", icon: Sun, color: "from-[#b7791f] to-[#ea580c]" },
              { step: "03", title: "Resep Herbal", desc: "Terima resep herbal lengkap dengan panduan mengolah dan indikasi medis berdasarkan Kemenkes.", icon: BookOpen, color: "from-[#4d7c0f] to-[#40916c]" },
            ].map((item, index) => {
              const I = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                  <div className="glass-card rounded-2xl p-5 sm:p-8 h-full group">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.06 }} viewport={{ once: true }} className="text-5xl sm:text-6xl md:text-7xl font-black text-[var(--text)] mb-3 sm:mb-4">{item.step}</motion.div>
                    <motion.div whileHover={{ rotate: 5 }} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}><I className="w-5 h-5 sm:w-6 sm:h-6 text-white" /></motion.div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-nature-strong opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d6a4f]/5 via-[#b7791f]/3 to-[#059669]/5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="inline-block mb-4 sm:mb-6"><Leaf className="w-10 h-10 sm:w-14 sm:h-14 text-[#2d6a4f]" /></motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text)] mb-4 sm:mb-6">Mulai Jelajahi Dunia Herbal</h2>
            <p className="text-sm sm:text-lg mb-6 sm:mb-10 max-w-2xl mx-auto">Tanyakan apapun tentang herbal kepada AI kami, atau jelajahi katalog herbal untuk menemukan manfaat dari tanaman obat Indonesia.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ai" className="btn-glow group flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#2d6a4f] to-[#059669] text-white rounded-2xl font-bold text-base shadow-lg shadow-[#2d6a4f]/25 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10"><MessageCircle className="w-5 h-5" />Mulai Konsultasi AI<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/katalog" className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/80 backdrop-blur-sm border border-[var(--border)] text-[var(--text)] rounded-2xl font-bold text-base shadow-sm hover:bg-white hover:shadow-md transition-all hover:-translate-y-1"><BookOpen className="w-5 h-5" />Lihat Katalog</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
