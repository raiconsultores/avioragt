'use client';

import { useEffect } from 'react';

let started = false; // guards against React Strict Mode running the effect twice in dev

export default function AvioraClient() {
  useEffect(() => {
    if (started) return;
    started = true;
    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }, { initAviora }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
        import('@/lib/aviora'),
      ]);
      initAviora(gsap, ScrollTrigger, Lenis);
    })();
  }, []);
  return null;
}
