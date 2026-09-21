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

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
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
      className="group fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md transition-colors duration-300 supports-[backdrop-filter]:bg-black/15 data-[theme=light]:border-black/5 data-[theme=light]:bg-white/75 data-[theme=light]:supports-[backdrop-filter]:bg-white/65"
    >
      <nav
        aria-label="Main"
        className="grid h-16 grid-cols-[1fr_auto] items-center px-5 md:h-20 md:grid-cols-[1fr_auto_1fr] md:px-[8%]"
      >
        <Link
          href="/"
          className={`justify-self-start rounded-sm font-heading text-xl font-normal tracking-tight text-white transition-colors group-data-[theme=light]:text-black md:text-2xl ${focusRing}`}
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
          className={`hidden justify-self-end rounded-full bg-white px-6 py-2.5 font-heading text-sm font-bold text-black transition-colors hover:bg-white/85 group-data-[theme=light]:bg-black group-data-[theme=light]:text-white group-data-[theme=light]:hover:bg-black/80 md:inline-flex ${focusRing}`}
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
                  className={`inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 font-heading text-base font-bold text-black ${focusRing}`}
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
