"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, MapPin, X } from "lucide-react";

type Province = {
  id: string;
  name: string;
  herb: string;
};

const provinceNames: Record<string, string> = {
  Aceh: "Aceh",
  "Sumatera-Utara": "Sumatera Utara",
  "Sumatera-Barat": "Sumatera Barat",
  Riau: "Riau",
  "Kepulauan-Riau": "Kepulauan Riau",
  Jambi: "Jambi",
  Bengkulu: "Bengkulu",
  "Sumatera-Selatan": "Sumatera Selatan",
  Lampung: "Lampung",
  "Kepulauan-Bangka-Belitung": "Kepulauan Bangka Belitung",
  Banten: "Banten",
  "Jawa-Barat": "Jawa Barat",
  "Jawa-Tengah": "Jawa Tengah",
  "Daerah-Istimewa-Yogyakarta": "Daerah Istimewa Yogyakarta",
  "Jawa-Timur": "Jawa Timur",
  Bali: "Bali",
  "Nusa-Tenggara-Barat": "Nusa Tenggara Barat",
  "Nusa-Tenggara-Timur": "Nusa Tenggara Timur",
  "Kalimantan-Barat": "Kalimantan Barat",
  "Kalimantan-Tengah": "Kalimantan Tengah",
  "Kalimantan-Selatan": "Kalimantan Selatan",
  "Kalimantan-Utara---Kalimantan-Timur":
    "Kalimantan Utara & Kalimantan Timur",
  "Sulawesi-Utara": "Sulawesi Utara",
  Gorontalo: "Gorontalo",
  "Sulawesi-Tengah": "Sulawesi Tengah",
  "Sulawesi-Barat": "Sulawesi Barat",
  "Sulawesi-Selatan": "Sulawesi Selatan",
  "Sulawesi-Tenggara": "Sulawesi Tenggara",
  Maluku: "Maluku",
  "Maluku-Utara": "Maluku Utara",
  "Papua-Barat": "Papua Barat",
  Papua: "Papua",
};

const provinceAliases: Record<string, string> = {
  "Pulau-Bangka": "Kepulauan-Bangka-Belitung",
  "Pulau-Belitung": "Kepulauan-Bangka-Belitung",
  "Pulau-Lombok": "Nusa-Tenggara-Barat",
  "Pu-au-Sumba": "Nusa-Tenggara-Timur",
  "Pulau-Timor": "Nusa-Tenggara-Timur",
  "Pulau-Buru": "Maluku",
  "Pulau-Wetar": "Maluku-Utara",
  "Pulau-Muna": "Sulawesi-Tenggara",
  "Pulau-Buton": "Sulawesi-Tenggara",
  "Pulau-Nias": "Sumatera-Utara",
  "Pulau-Siberut": "Sumatera-Barat",
  "Pulau-Madura": "Jawa-Timur",
};

const herbalByProvince: Record<string, string> = {
  // Dari DATA_POJOK_HERBAL.csv — herbal khas provinsi
  Aceh: "Pinang",
  "Sumatera-Utara": "Andaliman",
  "Sumatera-Barat": "Gambir",
  Riau: "Daun Capo",
  "Kepulauan-Riau": "Daun Sirih",
  Jambi: "Kayu Manis",
  Bengkulu: "Buah Kebiul",
  "Sumatera-Selatan": "Kayu Sepang",
  Lampung: "Meniran",
  "Kepulauan-Bangka-Belitung": "Lada Hitam",
  Banten: "Temu Ireng",
  "Jawa-Barat": "Mengkudu",
  "Jawa-Tengah": "Kunyit",
  "Daerah-Istimewa-Yogyakarta": "Pegagan",
  "Jawa-Timur": "Jeruk Nipis",
  Bali: "Daun Ungu",
  "Nusa-Tenggara-Barat": "Srikaya",
  "Nusa-Tenggara-Timur": "Cendana",
  "Kalimantan-Barat": "Lidah Buaya",
  "Kalimantan-Tengah": "Tabat Barito",
  "Kalimantan-Selatan": "Kasturi",
  "Kalimantan-Utara---Kalimantan-Timur": "Bawang Dayak",
  "Sulawesi-Utara": "Cengkeh",
  Gorontalo: "Bayam Duri",
  "Sulawesi-Tengah": "Kayu Angin",
  "Sulawesi-Barat": "Kayu Jawa",
  "Sulawesi-Selatan": "Pulai",
  "Sulawesi-Tenggara": "Jamu Lansau",
  Maluku: "Pala",
  "Maluku-Utara": "Rorano",
  "Papua-Barat": "Keben",
  Papua: "Mahkota Dewa",
};

const provinceIds = new Set([
  ...Object.keys(provinceNames),
  ...Object.keys(provinceAliases),
]);

const regionColor: Record<string, string> = {
  Aceh: "#ef4444",
  "Sumatera-Utara": "#ef4444",
  "Sumatera-Barat": "#ef4444",
  Riau: "#ef4444",
  "Kepulauan-Riau": "#ef4444",
  Jambi: "#ef4444",
  Bengkulu: "#ef4444",
  "Sumatera-Selatan": "#ef4444",
  Lampung: "#ef4444",
  "Pulau-Bangka": "#ef4444",
  "Pulau-Belitung": "#ef4444",
  Banten: "#f59e0b",
  "Jawa-Barat": "#f59e0b",
  "Jawa-Tengah": "#f59e0b",
  "Daerah-Istimewa-Yogyakarta": "#f59e0b",
  "Jawa-Timur": "#f59e0b",
  Bali: "#f59e0b",
  "Nusa-Tenggara-Barat": "#f59e0b",
  "Nusa-Tenggara-Timur": "#f59e0b",
  "Kalimantan-Barat": "#22c55e",
  "Kalimantan-Tengah": "#22c55e",
  "Kalimantan-Selatan": "#22c55e",
  "Kalimantan-Utara---Kalimantan-Timur": "#22c55e",
  "Sulawesi-Utara": "#3b82f6",
  Gorontalo: "#3b82f6",
  "Sulawesi-Tengah": "#3b82f6",
  "Sulawesi-Barat": "#3b82f6",
  "Sulawesi-Selatan": "#3b82f6",
  "Sulawesi-Tenggara": "#3b82f6",
  Maluku: "#a855f7",
  "Maluku-Utara": "#a855f7",
  "Papua-Barat": "#14b8a6",
  Papua: "#14b8a6",
};

/**
 * Compute dot positions in PIXELS.
 *
 * Dots are `position:absolute` children of svgWrapper (offsetParent).
 * Province centers are measured from mapInner (the SVG container),
 * then adjusted by the offset between mapInner and svgWrapper so the
 * final px values land exactly on top of each province.
 */
function computePositionsFromDOM(
  mapInner: HTMLDivElement,
  svgWrapper: HTMLDivElement
): Record<string, { x: number; y: number }> {
  const svgEl = mapInner.querySelector("svg");
  if (!svgEl) return {};

  const positions: Record<string, { x: number; y: number }> = {};

  const mapRect = mapInner.getBoundingClientRect();
  if (mapRect.width === 0 || mapRect.height === 0) return {};

  // svgWrapper is the offsetParent — its top-left is (0,0) for absolute children
  const wrapperRect = svgWrapper.getBoundingClientRect();

  provinceIds.forEach((id) => {
    const el = mapInner.querySelector(`g[id="${id}"]`);
    if (!el) return;

    try {
      const elRect = el.getBoundingClientRect();
      if (elRect.width === 0 && elRect.height === 0) return;

      // Center relative to svgWrapper top-left (the offsetParent origin)
      const x = elRect.left + elRect.width / 2 - wrapperRect.left;
      const y = elRect.top + elRect.height / 2 - wrapperRect.top;

      // Sanity: must land inside the wrapper area (dots are children of svgWrapper)
      if (x < -10 || x > wrapperRect.width + 10) return;
      if (y < -10 || y > wrapperRect.height + 10) return;

      positions[id] = { x, y };
    } catch {
      // ignore
    }
  });

  return positions;
}

// ─── Component ────────────────────────────────────────────────────────

export default function HerbalMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null); // outer: position:relative, parent of dots
  const mapInnerRef = useRef<HTMLDivElement>(null);   // inner: receives innerHTML SVG injection
  const [selected, setSelected] = useState<Province | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dotPositions, setDotPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const cleanupMapRef = useRef<(() => void) | null>(null);
  // Epoch token: only the latest mounted effect may inject the SVG / bind events.
  // Prevents double-injection when the effect re-runs (StrictMode, HMR, route remount).
  const epochRef = useRef(0);

  const normalizeProvinceId = useCallback((provinceId: string) => {
    const directMatch = provinceNames[provinceId] ? provinceId : null;
    const aliasMatch = provinceAliases[provinceId]
      ? provinceAliases[provinceId]
      : null;

    return directMatch ?? aliasMatch ?? provinceId;
  }, []);

  const handleProvinceClick = useCallback((provinceId: string) => {
    const normalizedId = normalizeProvinceId(provinceId);
    if (!provinceIds.has(provinceId) && !provinceIds.has(normalizedId)) return;

    const canonicalId = provinceNames[normalizedId]
      ? normalizedId
      : provinceAliases[provinceId] ?? normalizedId;
    const name = provinceNames[canonicalId] ?? provinceNames[provinceId] ?? canonicalId;
    const herb = herbalByProvince[canonicalId] ?? herbalByProvince[provinceId] ?? "";

    setSelected((current) => {
      if (current?.id === canonicalId || current?.id === provinceId) return null;
      return { id: canonicalId, name, herb: herb || "Belum ada data herbal" };
    });
  }, [normalizeProvinceId]);

  const closeInfo = useCallback(() => setSelected(null), []);

  useEffect(() => {
    let cancelled = false;
    const epoch = ++epochRef.current;
    const isStale = () => cancelled || epoch !== epochRef.current;

    fetch("/maps/indonesia.svg")
      .then((r) => {
        if (!r.ok) throw new Error(`Gagal memuat peta (${r.status})`);
        return r.text();
      })
      .then((svgText) => {
        if (isStale() || !mapInnerRef.current || !svgWrapperRef.current) return;

        // 1. Inject SVG into the inner div — React never touches this DOM node
        mapInnerRef.current.innerHTML = svgText;

        // 2. Add hover CSS
        const svgEl = mapInnerRef.current.querySelector("svg");
        if (svgEl) {
          const style = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "style"
          );
          style.textContent = `
            #Indonesia-Map > g[id] {
              cursor: pointer;
              transition: filter 180ms ease;
            }
            #Indonesia-Map > g[id]:hover {
              filter: brightness(1.15) saturate(1.3);
            }
          `;
          svgEl.insertBefore(style, svgEl.firstChild);
        }

        // 3. Wait for browser to fully render the SVG, then compute positions.
        const computePositions = () => {
          if (isStale() || !mapInnerRef.current || !svgWrapperRef.current) return;
          const positions = computePositionsFromDOM(mapInnerRef.current, svgWrapperRef.current);
          if (Object.keys(positions).length > 0) {
            if (!isStale()) setDotPositions(positions);
          }
        };
        // Double rAF + setTimeout fallback for robustness
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            computePositions();
            // Fallback: recompute after 300ms in case SVG fonts/resources delayed layout
            setTimeout(computePositions, 300);
          });
        });

        // Also recompute after full page load (fonts, images, etc.)
        const onWindowLoad = () => computePositions();
        window.addEventListener("load", onWindowLoad);

        // 3b. Recompute positions whenever the map is resized
        const resizeObserver = new ResizeObserver(() => {
          if (isStale() || !mapInnerRef.current || !svgWrapperRef.current) return;
          const updated = computePositionsFromDOM(mapInnerRef.current, svgWrapperRef.current);
          if (Object.keys(updated).length > 0 && !isStale()) {
            setDotPositions(updated);
          }
        });
        resizeObserver.observe(svgWrapperRef.current);

        // 4. Event delegation on the container
        const container = containerRef.current;
        if (container) {
          const onClick = (e: MouseEvent) => {
            let t = e.target as HTMLElement | null;
            while (t && t !== container) {
              if (t.id && provinceIds.has(t.id)) {
                handleProvinceClick(t.id);
                return;
              }
              t = t.parentElement;
            }
          };
          const onOver = (e: MouseEvent) => {
            let t = e.target as HTMLElement | null;
            while (t && t !== container) {
              if (t.id && provinceIds.has(t.id)) {
                setHoveredId(t.id);
                return;
              }
              t = t.parentElement;
            }
          };
          const onOut = (e: MouseEvent) => {
            let t = e.relatedTarget as HTMLElement | null;
            let inside = false;
            while (t && t !== container) {
              if (t.id && provinceIds.has(t.id)) {
                inside = true;
                break;
              }
              t = t.parentElement;
            }
            if (!inside) setHoveredId(null);
          };

          container.addEventListener("click", onClick);
          container.addEventListener("mouseover", onOver);
          container.addEventListener("mouseout", onOut);

          // Single cleanup that handles everything — resizeObserver + event listeners + window load
          cleanupMapRef.current = () => {
            resizeObserver.disconnect();
            window.removeEventListener("load", onWindowLoad);
            container.removeEventListener("click", onClick);
            container.removeEventListener("mouseover", onOver);
            container.removeEventListener("mouseout", onOut);
          };
          // If a newer effect already took over, tear this one down immediately
          if (epoch !== epochRef.current) {
            cleanupMapRef.current();
          }
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(
            err instanceof Error ? err.message : "Gagal memuat peta"
          );
        }
      });

    return () => {
      cancelled = true;
      cleanupMapRef.current?.();
      cleanupMapRef.current = null;
    };
  }, [handleProvinceClick]);

  return (
    <div className="relative" ref={containerRef}>
      <div
        ref={svgWrapperRef}
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-[#e0f2fe]/70 p-2 shadow-xl shadow-primary/10"
      >
        <div
          ref={mapInnerRef}
          className="[&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
        />

        {Object.entries(dotPositions).map(([id, pos]) => {
          const canonicalId = normalizeProvinceId(id);
          const color =
            regionColor[canonicalId] ?? regionColor[id] ?? "#22c55e";
          const isActive =
            selected?.id === canonicalId ||
            selected?.id === id ||
            hoveredId === canonicalId ||
            hoveredId === id;

          return (
            <button
              key={id}
              type="button"
              aria-label={`Lihat herbal ${provinceNames[canonicalId] ?? id}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: pos.x,
                top: pos.y,
                zIndex: isActive ? 20 : 10,
              }}
              onClick={() => handleProvinceClick(id)}
              onMouseEnter={() => setHoveredId(canonicalId)}
              onMouseLeave={() =>
                setHoveredId((previous) =>
                  previous === canonicalId ? null : previous
                )
              }
            >
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping"
                style={{
                  backgroundColor: color,
                  opacity: 0.3,
                  width: isActive ? 28 : 20,
                  height: isActive ? 28 : 20,
                }}
              />
              <span
                className="relative block rounded-full border-2 border-white shadow-md transition-all duration-150"
                style={{
                  backgroundColor: color,
                  width: selected?.id === canonicalId ? 16 : isActive ? 14 : 10,
                  height: selected?.id === canonicalId ? 16 : isActive ? 14 : 10,
                  boxShadow: `0 0 ${
                    selected?.id === canonicalId ? "8px" : "4px"
                  } ${color}60`,
                }}
              />
            </button>
          );
        })}

        {!Object.keys(dotPositions).length && !loadError && (
          <div className="absolute inset-0 flex min-h-64 items-center justify-center text-sm text-text-secondary">
            Memuat peta Indonesia...
          </div>
        )}
      </div>

      {loadError && (
        <div className="mt-3 rounded-2xl border border-warm/20 bg-warm/10 p-5 text-center text-sm text-warm">
          {loadError}
        </div>
      )}

      <AnimatePresence>
        {hoveredId && !selected && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-xl border border-border bg-white/95 px-4 py-2 text-sm font-medium text-text shadow-lg backdrop-blur-sm"
          >
            {provinceNames[normalizeProvinceId(hoveredId)] ?? hoveredId} —
            Klik untuk lihat herbal
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="pointer-events-none fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-40 mx-auto w-[calc(100%-2rem)] max-w-md md:bottom-4"
          >
            <div className="glass-card pointer-events-auto relative rounded-2xl border border-primary/20 bg-white/95 p-4 sm:p-5 shadow-xl">
              <button
                type="button"
                onClick={closeInfo}
                className="absolute right-3 top-3 rounded-lg p-1.5 text-text-muted transition-colors hover:bg-bg hover:text-text"
                aria-label="Tutup informasi provinsi"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3 pr-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text">{selected.name}</h3>
                  <p className="text-xs text-text-muted">Herbal khas</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/5 p-3 text-sm text-text-secondary">
                <Leaf className="h-4 w-4 shrink-0 text-primary" />
                {selected.herb}
              </div>
              <p className="mt-3 text-center text-xs text-text-muted">
                Klik provinsi lain untuk melihat herbal lainnya
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
