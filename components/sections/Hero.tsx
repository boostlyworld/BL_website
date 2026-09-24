import Image from "next/image";

import heroSunset from "@/public/images/hero_sunset_fliped.jpg";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-nav-theme="dark"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-brand-black"
    >
      <Image
        src={heroSunset}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[68%_center] md:object-center"
      />

      {/* Scrim: light darkening on the text side only; text-shadow does the rest */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-black/45 via-black/20 via-45% to-transparent to-75% md:from-black/35 md:via-black/15 md:to-60%"
      />

      <div className="w-full px-5 pt-14 [text-shadow:0_1px_12px_rgb(0_0_0/0.35)] md:px-[8%] md:pt-16">
        <h1
          id="hero-heading"
          className="font-heading text-7xl leading-[0.9] font-extrabold tracking-[-0.04em] text-white sm:text-8xl lg:text-[10rem]"
        >
          Lift Off.
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-white/90 md:mt-8 md:text-2xl">
          Strategy, content, and creative that lift brands off the ground.
        </p>
        <p className="mt-4 font-body text-lg font-medium text-white underline decoration-2 underline-offset-[6px] md:text-2xl">
          Ready when you are.
        </p>
      </div>
    </section>
  );
}
