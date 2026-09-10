"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Home, BookOpen, MessageCircle, Users, ChefHat } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", short: "Beranda", icon: Home },
  { href: "/katalog", label: "Katalog Herbal", short: "Katalog", icon: BookOpen },
  { href: "/resep", label: "Resep Herbal", short: "Resep", icon: ChefHat },
  { href: "/ai", label: "Herbal AI", short: "Herbal AI", icon: Sparkles },
  { href: "/tentang", label: "Tentang Kami", short: "Tentang", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed bottom-0 top-auto left-0 right-0 z-50 transition-all duration-500 md:top-0 md:bottom-auto ${
        scrolled
          ? "bg-white/75 backdrop-blur-2xl border-b border-border shadow-md shadow-primary/[0.04]"
          : "bg-white/95 backdrop-blur-2xl border-t border-border shadow-md shadow-primary/[0.04] md:bg-transparent md:backdrop-blur-none md:border-t-0 md:border-b-0 md:shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Mobile: bottom dock */}
        <div
          className="flex w-full items-center justify-around gap-0.5 md:hidden"
          style={{
            paddingBottom: "max(env(safe-area-inset-bottom), 6px)",
            paddingTop: 6,
          }}
        >
          {navLinks.map((l) => {
            const I = l.icon;
            const a = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-label={l.label}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium leading-none transition-all ${
                  a
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                <I className="h-5 w-5 shrink-0" />
                <span className="w-full truncate text-center">{l.short}</span>
              </Link>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-10 h-10 rounded-xl overflow-hidden shadow-lg glow-green flex-shrink-0"
            >
              <Image
                src="/logo.png"
                alt="Pojok Herbal Pintar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-base font-bold text-text tracking-tight">
                Pojok Herbal
              </span>
              <span className="text-[10px] text-primary font-semibold tracking-widest uppercase">
                Pintar
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((l) => {
              const I = l.icon;
              const a = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                    a
                      ? "text-primary bg-primary/10"
                      : "text-text-secondary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <I className="w-4 h-4" />
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div>
            <Link
              href="/ai"
              className="btn-glow flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-emerald text-white rounded-xl font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all relative z-10"
            >
              <MessageCircle className="w-4 h-4" />
              Tanya Herbal AI
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
