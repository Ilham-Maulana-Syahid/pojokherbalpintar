"use client";

import Image from "next/image";
import { Heart, Mail, MapPin, Globe, MessageCircle, Play } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-white/40 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent pointer-events-none" />
      <div className="relative pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg glow-green"><Image src="/logo.png" alt="Pojok Herbal Pintar" width={40} height={40} className="w-full h-full object-cover" /></div>
                <div className="leading-tight">
                  <h3 className="text-base font-bold text-text">Pojok Herbal</h3>
                  <p className="text-[10px] text-primary font-semibold tracking-widest uppercase">Pintar</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">Inovasi herbal untuk kemandirian kesehatan masyarakat Indonesia.</p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4 text-sm">Navigasi</h4>
              <ul className="space-y-2.5">
                {[{ href: "/", label: "Beranda" }, { href: "/katalog", label: "Katalog Herbal" }, { href: "/resep", label: "Resep Herbal" }, { href: "/ai", label: "Herbal AI" }, { href: "/tentang", label: "Tentang Kami" }].map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-text-secondary hover:text-primary transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4 text-sm">Tentang Herbal</h4>
              <ul className="space-y-2.5 text-sm text-text-secondary">
                <li>Jamu Tradisional</li><li>Wedang Herbal</li><li>Obat Herbal Terstandar</li><li>Pengobatan Tradisional</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4 text-sm">Kontak</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-text-secondary"><MapPin className="w-4 h-4 text-primary flex-shrink-0" /> Universitas Diponegoro, Semarang</li>
                <li className="flex items-center gap-2 text-sm text-text-secondary"><Mail className="w-4 h-4 text-accent flex-shrink-0" /> pojokherbalpintar@gmail.com</li>
              </ul>
              <div className="flex gap-3 mt-4">
                {[{ icon: MessageCircle, label: "Instagram" }, { icon: Globe, label: "Website" }, { icon: Play, label: "YouTube" }].map((s, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-bg border border-border flex items-center justify-center text-text-secondary hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all" title={s.label}><s.icon className="w-4 h-4" /></a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-text-muted">&copy; 2026 Pojok Herbal Pintar. Tim Universitas Diponegoro.</p>
              <p className="text-xs text-text-muted flex items-center gap-1">Dibuat dengan <Heart className="w-3 h-3 text-rose fill-rose" /> untuk kesehatan masyarakat</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
