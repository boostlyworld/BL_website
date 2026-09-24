"use client";

import type { FormEvent } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Dark-surface overrides for the shadcn fields (their defaults assume a light page).
const FIELD =
  "rounded-lg border-white/20 bg-white/[0.06] px-4 font-body text-base text-white placeholder:text-white/40 focus-visible:border-brand-gold focus-visible:ring-brand-gold/30 md:text-base";

export default function FinalCta() {
  // Placeholder until a submission endpoint exists: native `required`/`type="email"`
  // handle validation, and the values are only logged.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    console.log("Contact form submission", values);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-nav-theme="dark"
      className="bg-brand-black px-5 py-28 text-white md:px-[8%] md:py-40"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <h2
            id="contact-heading"
            className="font-heading text-6xl leading-[0.9] font-extrabold tracking-[-0.04em] text-white sm:text-8xl lg:text-[7rem]"
          >
            Ready to lift off?
          </h2>
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed font-light text-white/75 md:mt-8 md:text-2xl">
            Let&apos;s build something that actually gets noticed.
          </p>
          <Image
            src="/images/balloon.svg"
            alt=""
            width={200}
            height={280}
            className="mt-12 h-auto w-32 sm:w-40 lg:mt-16 lg:w-48"
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2.5">
            <Label htmlFor="contact-name" className="font-body text-white/85">
              Name
            </Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              className={`h-12 ${FIELD}`}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label htmlFor="contact-email" className="font-body text-white/85">
              Email
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`h-12 ${FIELD}`}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label htmlFor="contact-message" className="font-body text-white/85">
              Message
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              placeholder="Tell us about your brand and where you want it to go."
              className={`min-h-40 py-3 ${FIELD}`}
            />
          </div>

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-full bg-brand-gold px-8 font-heading text-base font-bold text-black hover:bg-brand-yellow focus-visible:ring-brand-gold/50 sm:w-fit"
          >
            Send it up
          </Button>
        </form>
      </div>
    </section>
  );
}
