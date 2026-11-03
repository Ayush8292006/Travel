"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ViewCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const isFinePointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const isViewTarget = Boolean(target?.closest('[data-cursor="view"]'));
      setActive(isViewTarget);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [reducedMotion]);

  if (!enabled || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-opacity duration-200"
      style={{ opacity: active ? 1 : 0 }}
    >
      <div className="w-20 h-20 rounded-full bg-black text-beige border border-beige/30 flex items-center justify-center shadow-lg">
        <span className="label-caps text-[10px] tracking-[0.22em]">View</span>
      </div>
    </div>
  );
}

