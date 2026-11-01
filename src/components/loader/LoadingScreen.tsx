"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CraveLogo from "@/components/brand/CraveLogo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("crave-loader-seen");
    if (seen) {
      setVisible(false);
      return;
    }

    const start = Date.now();
    const duration = 2400;
    const tick = window.setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(tick);
        sessionStorage.setItem("crave-loader-seen", "1");
        window.setTimeout(() => setVisible(false), 280);
      }
    }, 40);

    return () => window.clearInterval(tick);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cd-ink text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,197,24,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(155,28,28,0.35),transparent_40%)]" />

          <div className="relative mb-10 flex items-end gap-8">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <PizzaSVG />
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [5, -5, 5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <BurgerSVG />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <CraveLogo variant="light" size="lg" showTagline />
          </motion.div>

          <div className="relative mt-10 w-56">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cd-yellow via-cd-red-soft to-cd-yellow"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center text-xs tracking-widest text-white/55">
              Preparing your table… {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PizzaSVG() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden>
      <circle cx="44" cy="44" r="36" fill="#F5C518" stroke="#9B1C1C" strokeWidth="4" />
      <circle cx="44" cy="44" r="28" fill="#FFE566" />
      <circle cx="34" cy="38" r="4" fill="#9B1C1C" />
      <circle cx="52" cy="34" r="3.5" fill="#9B1C1C" />
      <circle cx="46" cy="50" r="4.5" fill="#9B1C1C" />
      <circle cx="36" cy="52" r="3" fill="#6F1212" />
    </svg>
  );
}

function BurgerSVG() {
  return (
    <svg width="92" height="84" viewBox="0 0 92 84" fill="none" aria-hidden>
      <path
        d="M12 34 C12 18 28 10 46 10 C64 10 80 18 80 34 Z"
        fill="#E8A317"
        stroke="#9B1C1C"
        strokeWidth="3"
      />
      <rect x="10" y="36" width="72" height="10" rx="4" fill="#9B1C1C" />
      <rect x="12" y="48" width="68" height="8" rx="3" fill="#F5C518" />
      <rect x="10" y="58" width="72" height="12" rx="6" fill="#C47A2C" stroke="#9B1C1C" strokeWidth="2" />
    </svg>
  );
}
