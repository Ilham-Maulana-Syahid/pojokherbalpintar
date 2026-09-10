"use client";

import { motion } from "framer-motion";
import { Leaf, MapPin } from "lucide-react";
import jamuData from "@/data/jamu.json";

type JamuItem = (typeof jamuData)[number];

function DataCard({ jamu }: { jamu: JamuItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="glass-card rounded-2xl p-5"
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="shrink-0 h-12 w-12 rounded-xl flex items-center justify-center text-xl shadow-sm"
          style={{ background: `linear-gradient(135deg, ${jamu.warna_tema}25, ${jamu.warna_tema}60)` }}
        >
          <Leaf className="w-6 h-6 text-white shadow-sm" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-text">{jamu.nama}</h3>
          <p className="text-xs text-text-muted italic">{jamu.nama_latin}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        <div className="flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 bg-emerald/5 border border-emerald/15 rounded-md text-xs text-emerald font-medium">
            {jamu.kategori}
          </span>
          {jamu.provinsi && (
            <span className="px-2.5 py-1 bg-primary/5 border border-primary/15 rounded-md text-xs text-primary font-medium">
              {jamu.provinsi}
            </span>
          )}
        </div>

        <div>
          <span className="text-xs text-text-muted font-medium">Manfaat: </span>
          <span className="text-text">{jamu.manfaat.join(", ")}</span>
        </div>

        <div>
          <span className="text-xs text-text-muted font-medium">Kandungan utama: </span>
          <span className="text-text">{jamu.kandungan[0]}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SebaranHerbal() {
  const activeProvince = jamuData.find((j) => j.tersedia && j.provinsi)?.provinsi;
  return (
    <section className="bg-nature pt-24 md:pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-xs font-medium mb-3 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-warm" /> Sebaran
          </span>
          <h2 className="text-2xl font-bold text-text">Herbal yang Tersebar</h2>
          <p className="text-text-secondary text-sm max-w-lg mx-auto mt-1">
            Data              herbal berikut berasal dari literatur tanaman obat tradisional Indonesia. Setiap provinsi memiliki potensi tumbuhan obat yang unik.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jamuData
            .filter((j) => j.tersedia && j.provinsi)
            .map((jamu) => <DataCard key={jamu.id} jamu={jamu} />)}
        </div>

        {activeProvince && (
          <div className="mt-6 text-center text-sm text-text-muted border-t border-border pt-5">
            Contoh data dari {activeProvince} menunjukkan keanekaragaman tumbuhan obat di Indonesia.
          </div>
        )}
      </div>
    </section>
  );
}
