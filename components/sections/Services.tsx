"use client";

import CircularSplitRoll, {
  type CircularSplitRollItem,
} from "@/components/ui/circular-split-roll";

const SERVICES: CircularSplitRollItem[] = [
  {
    title: "Web Design & Development",
    image: "/images/services/web-design-development.jpg",
    description:
      "Fast, on-brand websites built to convert visitors into customers.",
  },
  {
    title: "Performance Advertising",
    image: "/images/services/performance-advertising.jpg",
    description:
      "Data-driven campaigns across Meta, TikTok, and Google that scale.",
  },
  {
    title: "Social Media Management",
    image: "/images/services/social-media-management.jpg",
    description:
      "Consistent, on-brand content that builds real audience momentum.",
  },
  {
    title: "Search Engine Optimization",
    image: "/images/services/search-engine-optimization.jpg",
    description: "Technical and content strategy that gets you found on Google.",
  },
  {
    title: "AI Search Optimization",
    image: "/images/services/ai-search-optimization.jpg",
    description:
      "Positioning your brand to show up in AI-powered search results.",
  },
];

export default function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      data-nav-theme="light"
      className="bg-white"
    >
      <div className="px-5 pt-28 md:px-[8%] md:pt-40">
        <h2
          id="services-heading"
          className="font-heading text-7xl leading-[0.9] font-extrabold tracking-[-0.04em] text-black sm:text-8xl lg:text-[10rem]"
        >
          Services
        </h2>
        <p className="mt-6 font-body text-xl text-neutral-500 md:text-2xl">
          Everything your brand needs to grow.
        </p>
      </div>

      <CircularSplitRoll
        items={SERVICES}
        background="#fff"
        titleColor="#000"
        radius={500}
        cardSize={205}
        snap
      />
    </section>
  );
}
