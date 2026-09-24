import Image, { type StaticImageData } from "next/image";

import heroSunset from "@/public/images/hero_sunset.jpg";
import balloonCave from "@/public/images/Ballon_cave.jpg";
import heroNight from "@/public/images/Hero_night.jpg";

interface CaseStudy {
  client: string;
  outcome: string;
  image: StaticImageData;
  href: string;
}

// Placeholder images, client names and outcome lines: replace with real case study
// imagery and results once they're available.
const CASE_STUDIES: CaseStudy[] = [
  {
    client: "Harbor & Pine",
    outcome: "Grew organic search traffic 3x in six months.",
    image: heroSunset,
    href: "#",
  },
  {
    client: "Kestrel Studio",
    outcome: "Rebuilt a stagnant brand into a recognizable name.",
    image: balloonCave,
    href: "#",
  },
  {
    client: "Maple Street Bakery",
    outcome: "Took a local business from invisible to fully booked.",
    image: heroNight,
    href: "#",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      data-nav-theme="light"
      className="bg-white px-5 pt-28 pb-28 md:px-[8%] md:pt-40 md:pb-40"
    >
      <h2
        id="work-heading"
        className="font-heading text-6xl leading-[0.9] font-extrabold tracking-[-0.04em] text-black sm:text-7xl lg:text-[8.5rem]"
      >
        {/* Non-breaking hyphen keeps "Lift-Offs" on one line when the heading wraps */}
        Recent Lift&#8209;Offs
      </h2>
      <p className="mt-6 font-body text-xl text-neutral-500 md:text-2xl">
        A few brands we&apos;ve helped take off.
      </p>

      <ul className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8">
        {CASE_STUDIES.map((study) => (
          <li key={study.client}>
            <article className="group/card relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-cream shadow-[0_18px_38px_rgba(0,0,0,0.18)] max-md:rounded-[14px]">
                <Image
                  src={study.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-105 motion-reduce:transition-none"
                />
              </div>

              <h3 className="mt-6 font-heading text-2xl leading-tight font-bold tracking-[-0.02em] text-black lg:text-3xl">
                {study.client}
              </h3>
              <p className="mt-2 font-body text-lg leading-relaxed text-neutral-600">
                {study.outcome}
              </p>

              {/* The link's overlay makes the whole card clickable */}
              <a
                href={study.href}
                className="mt-4 inline-flex w-fit items-center gap-2 font-body text-lg font-medium leading-[1.2] text-black no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[18px] focus-visible:after:ring-2 focus-visible:after:ring-black focus-visible:after:ring-offset-4"
              >
                <span className="underline-offset-4 group-hover/card:underline">
                  View case study
                  <span className="sr-only">: {study.client}</span>
                </span>
                <svg
                  className="h-[1em] w-[1em] flex-none transition-transform duration-300 group-hover/card:-rotate-45"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
