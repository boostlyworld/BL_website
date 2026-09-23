"use client";

import StickyContentWrapper, {
  type StickyContentItem,
} from "@/components/ui/sticky-content-wrapper";

// placeholder images — replace with dedicated approach images per step.
const APPROACH_STEPS: StickyContentItem[] = [
  {
    heading: "Grounded in Research",
    paragraph:
      "Every lift starts with understanding what's holding a brand down — your audience, your competitors, your position in the market.",
    list: ["Brand & market audit", "Competitor analysis", "Audience research"],
    link: { href: "#", text: "Learn more" },
    image: "/images/hero_ground.jpg",
    alt: "Grounded in Research",
  },
  {
    heading: "Built for Lift-Off",
    paragraph:
      "We turn research into a clear strategy — the plan that decides exactly how a brand gets off the ground.",
    list: ["Custom growth strategy", "Channel planning", "Content roadmap"],
    link: { href: "#", text: "Learn more" },
    image: "/images/Ballon_cave.jpg",
    alt: "Built for Lift-Off",
  },
  {
    heading: "Full Ascent",
    paragraph:
      "Strategy becomes action. Campaigns launch, content goes live, and every channel starts pulling in the same direction.",
    list: ["Campaign execution", "Content production", "Cross-channel launch"],
    link: { href: "#", text: "Learn more" },
    image: "/images/Ballon.jpg",
    alt: "Full Ascent",
  },
  {
    heading: "Cruising & Optimizing",
    paragraph:
      "Lift-off is the start, not the finish. We track, report, and refine continuously so growth doesn't stall out.",
    list: ["Performance tracking", "Monthly reporting", "Continuous optimization"],
    link: { href: "#", text: "Learn more" },
    image: "/images/Hero_night.jpg",
    alt: "Cruising & Optimizing",
  },
];

export default function Approach() {
  return (
    <section
      aria-labelledby="approach-heading"
      data-nav-theme="light"
      className="bg-white"
    >
      <div className="px-5 pt-28 md:px-[8%] md:pt-40">
        <h2
          id="approach-heading"
          className="font-heading text-7xl leading-[0.9] font-extrabold tracking-[-0.04em] text-black sm:text-8xl lg:text-[10rem]"
        >
          Our Approach
        </h2>
        <p className="mt-6 font-body text-xl text-neutral-500 md:text-2xl">
          A clear process, from ground to sky.
        </p>
      </div>

      <StickyContentWrapper items={APPROACH_STEPS} bgColor="#fff" />
    </section>
  );
}
