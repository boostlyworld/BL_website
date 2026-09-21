import Image from "next/image";

import heroSunset from "@/public/images/hero_sunset.jpg";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-brand-black"
    >
      <Image
        src={heroSunset}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[30%_center] md:object-center"
      />

      {/* Scrim: darkens only the text side, fading out well before the sun */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-black/60 via-black/30 via-45% to-transparent to-75% md:from-black/55 md:via-black/20 md:to-65%"
      />

      <div className="mx-auto w-full max-w-7xl px-5 pt-16 md:px-10 md:pt-20">
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
