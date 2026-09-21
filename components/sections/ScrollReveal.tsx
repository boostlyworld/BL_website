"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const COPY =
  "Anyone can post. Building a brand that actually lifts off takes strategy, story, and the patience to do it right.";
const EMPHASIS = "lifts off";

const WORDS = COPY.split(" ");
// Word indices of the emphasized phrase; these settle on gold instead of black.
const emphasisStart = COPY.slice(0, COPY.indexOf(EMPHASIS)).split(" ").length - 1;
const EMPHASIZED = new Set(
  EMPHASIS.split(" ").map((_, offset) => emphasisStart + offset),
);
// How many words are mid-transition at once; higher = softer, wider wave.
const SPREAD = 4;
// Finish the reveal a little before the pinned stretch ends, so it rests fully revealed.
const COMPLETE_AT = 0.85;

/*
 * Each word derives its own color from --p (0–1 scroll progress) and --i (its index):
 *   t    = this word's local progress, 0–1
 *   gold = how far grey has moved toward gold (first half of t)
 *   dark = how far gold has moved toward black (second half of t; 0 for emphasized words)
 */
const wordColor =
  "color-mix(in oklab, var(--color-brand-black) calc(var(--dark) * 100%), color-mix(in oklab, var(--color-brand-gold) calc(var(--gold) * 100%), var(--color-neutral-300)))";

export default function ScrollReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 1;
      const progress = Math.min(Math.max(raw / COMPLETE_AT, 0), 1);
      el.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Our approach"
      data-nav-theme="light"
      className="relative h-[220svh] bg-white"
      style={{ "--p": 0 } as CSSProperties}
    >
      <div className="sticky top-0 flex min-h-svh items-center px-5 pt-16 md:px-[8%] md:pt-20">
        <div className="grid w-full gap-12 md:grid-cols-[22%_1fr] md:gap-16">
          {/* link list placeholder — content coming later */}
          <div className="order-last md:order-first" />

          <p className="max-w-5xl font-body text-3xl leading-[1.3] font-medium tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.25]">
            {WORDS.map((word, i) => {
              const emphasized = EMPHASIZED.has(i);
              return (
                <span
                  key={i}
                  style={
                    {
                      "--t": `clamp(0, (var(--p) * ${WORDS.length + SPREAD} - ${i}) / ${SPREAD}, 1)`,
                      "--gold": "min(var(--t) * 2, 1)",
                      "--dark": emphasized
                        ? "0"
                        : "max(var(--t) * 2 - 1, 0)",
                      color: wordColor,
                    } as CSSProperties
                  }
                >
                  {word}
                  {i < WORDS.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
