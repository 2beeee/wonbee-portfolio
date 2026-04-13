"use client";

import { useEffect } from "react";

export function ScrollAnimateInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Re-observe on route change
  useEffect(() => {
    const mo = new MutationObserver(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      const elements = document.querySelectorAll(
        ".scroll-animate:not(.is-visible), .scroll-animate-left:not(.is-visible), .scroll-animate-right:not(.is-visible)"
      );
      elements.forEach((el) => observer.observe(el));
    });

    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return null;
}
