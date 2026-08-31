"use client";

import { useEffect } from "react";

/**
 * Ports the mockup's vanilla-JS motion behaviors:
 * - grid-bg parallax on mousemove (skipped for touch / reduced-motion)
 * - plan connector line draw-in via IntersectionObserver
 * - .reveal-on-scroll fade/slide-up via IntersectionObserver
 * Mount once, near the root of the page.
 */
export default function ScrollFx() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;

    let cleanupParallax: (() => void) | undefined;
    if (hasHover && !prefersReduced) {
      const gridBg = document.querySelector<HTMLElement>(".grid-bg");
      if (gridBg) {
        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * -14;
          const y = (e.clientY / window.innerHeight - 0.5) * -14;
          gridBg.style.transform = `translate(${x}px,${y}px)`;
        };
        window.addEventListener("mousemove", onMove);
        cleanupParallax = () => window.removeEventListener("mousemove", onMove);
      }
    }

    const planPath = document.getElementById("planConnectorPath");
    const planSection = planPath?.closest("section") ?? null;
    let planIo: IntersectionObserver | undefined;
    if (planPath && planSection && "IntersectionObserver" in window) {
      planIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (planPath as unknown as SVGPathElement).style.strokeDashoffset = "0";
              planIo?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      planIo.observe(planSection);
    } else if (planPath) {
      (planPath as unknown as SVGPathElement).style.strokeDashoffset = "0";
    }

    function indexWithinParent(el: Element) {
      const siblings = Array.prototype.filter.call(el.parentElement?.children ?? [], (c: Element) =>
        c.classList.contains("reveal")
      );
      return siblings.indexOf(el);
    }

    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    let revealIo: IntersectionObserver | undefined;
    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add("visible"));
    } else if ("IntersectionObserver" in window) {
      revealIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const delay = Math.min(indexWithinParent(el), 5) * 90;
              setTimeout(() => el.classList.add("visible"), delay);
              revealIo?.unobserve(el);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => revealIo?.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("visible"));
    }

    return () => {
      cleanupParallax?.();
      planIo?.disconnect();
      revealIo?.disconnect();
    };
  }, []);

  return null;
}
