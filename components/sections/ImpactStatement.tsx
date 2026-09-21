"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const WORDS = ["brands.", "businesses.", "people."];
const HOLD_MS = 2200;

export default function ImpactStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  // Only cycle while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % WORDS.length),
      HOLD_MS,
    );
    return () => clearInterval(id);
  }, [inView]);

  const previous = (active - 1 + WORDS.length) % WORDS.length;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="impact-heading"
      data-nav-theme="light"
      className="bg-white px-5 py-28 md:px-[8%] md:py-40"
    >
      <h2
        id="impact-heading"
        className="max-w-6xl font-heading text-5xl leading-[1.02] font-extrabold tracking-[-0.04em] text-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem]"
      >
        <span className="sr-only">
          We make things that lift brands, businesses, and people.
        </span>
        <span aria-hidden="true">
          We make things that lift{" "}
          {/* All words share one grid cell, so the slot is as wide as the longest word */}
          <span className="inline-grid overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            {WORDS.map((word, i) => (
              <span
                key={word}
                className={cn(
                  "col-start-1 row-start-1 text-brand-gold transition-[translate,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:translate-y-0",
                  i === active
                    ? "translate-y-0 opacity-100"
                    : i === previous
                      ? "-translate-y-full opacity-0"
                      : "translate-y-full opacity-0",
                )}
              >
                {word}
              </span>
            ))}
          </span>
        </span>
      </h2>
    </section>
  );
}
