"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Company", href: "#company" },
];

const CTA = { label: "Lift Now", href: "#contact" };

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black group-data-[theme=light]:focus-visible:ring-black group-data-[theme=light]:focus-visible:ring-offset-white";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Match the section currently under the bar: sections declare
  // data-nav-theme="dark" (photo/dark background) or "light" (white/cream).
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  // Off the top the bar is bare; the frosted panel only fades in once scrolled.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const probe = (headerRef.current?.offsetHeight ?? 64) / 2;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          setTheme(section.dataset.navTheme === "light" ? "light" : "dark");
          return;
        }
      }
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
    <header
      ref={headerRef}
      data-theme={theme}
      data-scrolled={scrolled}
      className="group fixed inset-x-0 top-0 z-50 isolate"
    >
      {/* Legibility scrim: fades to nothing well below the nav row, so the bar has no edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-8 -z-10 bg-linear-to-b from-black/35 via-black/15 to-transparent transition-colors duration-300 group-data-[theme=light]:from-white/70 group-data-[theme=light]:via-white/30 md:-bottom-12"
      />
      {/* Frosted panel: revealed by the background once you scroll. It runs past the foot of the
          nav text and the mask fades the blur out over that overhang, never at the text's baseline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-10 -z-10 bg-black/25 opacity-0 backdrop-blur-md transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] group-data-[scrolled=true]:opacity-100 group-data-[theme=light]:bg-white/60 md:-bottom-14"
      />
      <nav
        aria-label="Main"
        className="grid h-14 grid-cols-[1fr_auto] items-center px-4 md:h-16 md:grid-cols-[1fr_auto_1fr] md:px-8"
      >
        <Link
          href="/"
          className={`justify-self-start rounded-sm font-heading text-xl font-normal tracking-tight text-white transition-colors group-data-[theme=light]:text-brand-gold md:text-2xl ${focusRing}`}
        >
          brandslifter
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex lg:gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-sm font-body text-[0.95rem] font-medium text-white/85 transition-colors hover:text-white group-data-[theme=light]:text-black/75 group-data-[theme=light]:hover:text-black ${focusRing}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={CTA.href}
          className={`hidden justify-self-end rounded-full bg-white px-6 py-2.5 font-heading text-sm font-bold text-black transition-colors hover:bg-brand-gold hover:text-white group-data-[theme=light]:bg-black group-data-[theme=light]:text-brand-gold group-data-[theme=light]:hover:bg-brand-gold group-data-[theme=light]:hover:text-black md:inline-flex ${focusRing}`}
        >
          {CTA.label}
        </a>

        {/* Mobile menu */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className={`-mr-2 inline-flex size-10 items-center justify-center justify-self-end rounded-md text-white transition-colors group-data-[theme=light]:text-black md:hidden ${focusRing}`}
          >
            <MenuIcon className="size-6" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-4/5 border-white/10 bg-black px-6 pt-4 pb-8 text-white"
          >
            <div className="flex h-12 items-center justify-between">
              <SheetTitle className="font-heading text-xl font-normal tracking-tight text-white">
                brandslifter
              </SheetTitle>
              <SheetClose
                aria-label="Close menu"
                className={`-mr-2 inline-flex size-10 items-center justify-center rounded-md text-white ${focusRing}`}
              >
                <XIcon className="size-6" aria-hidden="true" />
              </SheetClose>
            </div>

            <ul className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-sm py-3 font-heading text-3xl font-bold text-white ${focusRing}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-8">
                <a
                  href={CTA.href}
                  onClick={closeMenu}
                  className={`inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 font-heading text-base font-bold text-black transition-colors hover:bg-brand-gold hover:text-white ${focusRing}`}
                >
                  {CTA.label}
                </a>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
