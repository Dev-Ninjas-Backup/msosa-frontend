import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling via Lenis — landing / public pages only.
 * Do not use on dashboard or consumer shells (breaks nested/modal scroll).
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: window,
      content: document.documentElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;
