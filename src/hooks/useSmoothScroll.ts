import { useEffect } from "react";
import Lenis from "lenis";

export const useSmoothScroll = (targetElement?: HTMLElement | null) => {
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: targetElement || window,
      content: targetElement ? (targetElement.firstElementChild as HTMLElement) || targetElement : document.documentElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [targetElement]);
};

export default useSmoothScroll;
