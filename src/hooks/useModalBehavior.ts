"use client";

import { useEffect } from "react";

/**
 * Modal behavior:
 * - Close on Escape key
 * - Lock body scroll while open (adds .no-scroll to <body>)
 */
export function useModalBehavior(
  open: boolean,
  onClose: () => void,
  deps: unknown[] = []
) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ...deps]);
}
