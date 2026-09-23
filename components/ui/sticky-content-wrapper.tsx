"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "/images/Ballon.jpg",
  "/images/Ballon_cave.jpg",
  "/images/hero_ground.jpg",
  "/images/Hero_night.jpg",
];

const defaultItems: StickyContentItem[] = [
  { heading: "Designed for the everyday", paragraph: "Spaces where architecture, comfort and light work together, so the design supports how you actually live.", list: ["Open layouts with natural light", "Premium materials and finishes", "Considered, low-maintenance detailing"], link: { href: "#", text: "Explore" }, image: IMAGES[0] },
  { heading: "Placed where it counts", paragraph: "Connected to the routes and neighbourhoods that matter, close to work, transport and everyday amenities.", list: ["Near key urban corridors", "Strong transport links", "Surrounded by lifestyle hubs"], link: { href: "#", text: "See locations" }, image: IMAGES[1] },
  { heading: "Built to hold value", paragraph: "Engineered for durability and future-readiness, so the space keeps pace with a changing city.", list: ["High construction standards", "Future-ready infrastructure", "Long-term appreciation potential"], link: { href: "#", text: "Investment" }, image: IMAGES[2] },
  { heading: "Finished with care", paragraph: "From the amenities to the interiors, every layer is tuned for a calm, elevated day-to-day experience.", list: ["Considered lifestyle amenities", "Well-resolved interiors", "Community-minded shared spaces"], link: { href: "#", text: "Amenities" }, image: IMAGES[3] },
];

// True when the user has asked the OS to minimise animation. Safe to call
// during render - returns false on the server.
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

interface StickyContentLink {
  href?: string;
  text?: string;
  label?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export interface StickyContentItem {
  heading?: string;
  paragraphs?: string[];
  paragraph?: string | string[];
  list?: string[];
  listItems?: string[];
  link?: StickyContentLink;
  href?: string;
  linkText?: string;
  cta?: string;
  image?: string;
  alt?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
}

const getParagraphs = (item: StickyContentItem) => {
  if (Array.isArray(item.paragraphs)) return item.paragraphs;
  if (Array.isArray(item.paragraph)) return item.paragraph;
  return item.paragraph ? [item.paragraph] : [];
};

const getListItems = (item: StickyContentItem) => {
  if (Array.isArray(item.list)) return item.list;
  if (Array.isArray(item.listItems)) return item.listItems;
  return [];
};

const getLink = (item: StickyContentItem): StickyContentLink | null => {
  if (item.link) return item.link;
  if (item.href) {
    return {
      href: item.href,
      text: item.linkText || item.cta || "Learn more",
    };
  }
  return null;
};

const renderStickyContent = (item: StickyContentItem) => {
  const paragraphs = getParagraphs(item);
  const listItems = getListItems(item);
  const link = getLink(item);

  return (
    <div className="flex h-full w-full flex-col justify-center text-foreground">
      {item.heading && (
        <h3 className="font-heading text-3xl leading-[1.05] font-bold tracking-[-0.02em] text-black md:text-5xl">
          {item.heading}
        </h3>
      )}

      {paragraphs.map((paragraph, paragraphIndex) => (
        <p
          key={`paragraph-${paragraphIndex}`}
          className="mt-6 max-w-[34rem] font-body text-lg leading-relaxed text-neutral-600 md:text-xl"
        >
          {paragraph}
        </p>
      ))}

      {listItems.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2 font-body text-base text-black md:text-lg">
          {listItems.map((listItem, listIndex) => (
            <li key={`list-${listIndex}`} className="flex items-center gap-3">
              <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-black" />
              {listItem}
            </li>
          ))}
        </ul>
      )}

      {link?.href && (
        <a
          href={link.href}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
          }}
          className={`group mt-8 inline-flex w-fit items-center gap-2 font-body text-lg font-medium leading-[1.2] text-black no-underline ${link.className || ""}`}
          target={link.target}
          rel={link.rel || (link.target === "_blank" ? "noreferrer" : undefined)}
        >
          <span className="underline-offset-4 group-hover:underline">
            {link.text || link.label || "Learn more"}
          </span>
          <svg
            className="h-[1em] w-[1em] flex-none transition-transform duration-300 group-hover:-rotate-45 group-focus-visible:-rotate-45"
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
      )}
    </div>
  );
};

interface StickyContentCompProps {
  items?: StickyContentItem[];
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  containerHeight?: string;
  bgColor?: string;
  contentEnterYPercent?: number;
  contentExitYPercent?: number;
  contentTransitionDuration?: number;
  contentDelay?: number;
  stepGap?: number;
  enableImageScaleFlow?: boolean;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
}

function StickyContentComp({
  items = [],
  className = "",
  leftClassName = "",
  rightClassName = "",
  contentClassName = "",
  imageClassName = "",
  containerHeight,
  bgColor,
  contentEnterYPercent = 12,
  contentExitYPercent = -12,
  contentTransitionDuration = 0.8,
  contentDelay = 0.28,
  stepGap = 2,
  enableImageScaleFlow = true,
  initialImageScale = 1.5,
  activeImageScale = 1.2,
  exitImageScale = 1,
}: StickyContentCompProps) {
  // State & refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const contentRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Effects
  useLayoutEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !items.length) {
      return;
    }

    const reducedMotion = prefersReducedMotion();

    const context = gsap.context(() => {
      // Initial element state
      const contents = contentRefsRef.current;
      const images = imageRefsRef.current;

      contents.forEach((content, index) => {
        gsap.set(content, {
          autoAlpha: index === 0 ? 1 : 0,
          yPercent: index === 0 ? 0 : contentEnterYPercent,
          zIndex: items.length - index,
        });
      });

      // Reduced motion: images crossfade in place - no clip-path wipe or
      // scale, so only the active image is visible at a time via autoAlpha.
      images.forEach((image, index) => {
        gsap.set(image, {
          autoAlpha: reducedMotion ? (index === 0 ? 1 : 0) : 1,
          zIndex: items.length - index,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: reducedMotion
            ? 1
            : enableImageScaleFlow
              ? index === 0
                ? activeImageScale
                : initialImageScale
              : 1,
          transformOrigin: "center center",
        });
      });

      // Scroll timeline
      const totalTimelineDuration = Math.max(1, (items.length - 1) * stepGap);
      const snapValues =
        items.length > 1
          ? Array.from({ length: items.length }, (_, index) => index / (items.length - 1))
          : [0];
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          // Pinned sections above (e.g. Services) create their triggers later in
          // useEffect; measure after them so start/end include their pin spacing.
          refreshPriority: -1,
          snap:
            items.length > 1
              ? {
                  snapTo: snapValues,
                  duration: { min: 0.2, max: 0.5 },
                  ease: "power2.inOut",
                  delay: 0,
                  inertia: false,
                }
              : undefined,
        },
      });

      items.forEach((_, index) => {
        if (index === items.length - 1) {
          return;
        }

        const currentContent = contents[index];
        const nextContent = contents[index + 1];
        const currentImage = images[index];
        const nextImage = images[index + 1];
        const stepStart = index * stepGap;
        const nextContentStart =
          stepStart + contentTransitionDuration + contentDelay;

        timeline
          .to(
            currentContent,
            {
              autoAlpha: 0,
              yPercent: contentExitYPercent,
              duration: contentTransitionDuration,
              ease: "power2.inOut",
            },
            stepStart,
          )
          .fromTo(
            nextContent,
            {
              autoAlpha: 0,
              yPercent: contentEnterYPercent,
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: contentTransitionDuration,
              ease: "power2.inOut",
            },
            nextContentStart,
          )
          .to(
            currentImage,
            reducedMotion
              ? { autoAlpha: 0, duration: stepGap, ease: "none" }
              : {
                  clipPath: "inset(0% 0% 100% 0%)",
                  scale: enableImageScaleFlow ? exitImageScale : 1,
                  duration: stepGap,
                  ease: "none",
                },
            stepStart,
          );

        if (reducedMotion) {
          timeline.to(
            nextImage,
            { autoAlpha: 1, duration: stepGap, ease: "none" },
            stepStart,
          );
        } else if (enableImageScaleFlow) {
          timeline.to(
            nextImage,
            {
              scale: activeImageScale,
              duration: stepGap,
              ease: "none",
            },
            stepStart,
          );
        }
      });

      timeline.duration(totalTimelineDuration);
      ScrollTrigger.refresh();
    }, sectionRef);

    // Cleanup
    return () => context.revert();
  }, [
    items,

    contentEnterYPercent,
    contentExitYPercent,
    contentTransitionDuration,
    contentDelay,
    stepGap,
    enableImageScaleFlow,
    initialImageScale,
    activeImageScale,
    exitImageScale,
  ]);

  if (!items.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={`relative flex w-full justify-between ${className}`}
      style={{
        height: containerHeight || `${items.length * 100}vh`,
        ...(bgColor ? { backgroundColor: bgColor } : null),
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-screen w-full justify-between max-[1025px]:h-screen max-[1025px]:flex-col-reverse max-[1025px]:justify-start max-[1025px]:px-[5vw] max-md:px-[6vw]"
      >
        <div className="absolute bottom-10 left-[20%] z-30 flex -translate-x-1/2 flex-col items-center justify-center gap-[0.5vw] text-foreground max-[1025px]:hidden">
          <p className="text-lg text-foreground">scroll</p>

          <svg
            width="20"
            height="28"
            className="size-[1.5vw]"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              .chev1 { animation: fadeDown 1.4s ease-in-out infinite; }
              .chev2 { animation: fadeDown 1.4s ease-in-out 0.22s infinite; }
              .chev3 { animation: fadeDown 1.4s ease-in-out 0.44s infinite; }
              @keyframes fadeDown {
                0%   { opacity: 0.08; transform: translateY(-3px); }
                50%  { opacity: 0.55; transform: translateY(2px); }
                100% { opacity: 0.08; transform: translateY(-3px); }
              }
            `}</style>
            <polyline
              className="chev1 stroke-current"
              points="2,2 10,9 18,2"
              stroke="black"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              className="chev2 stroke-current"
              points="2,10 10,17 18,10"
              stroke="black"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              className="chev3 stroke-current"
              points="2,18 10,25 18,18"
              stroke="black"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          className={`relative h-full w-[42%] max-[1025px]:h-[55%] max-[1025px]:w-full ${bgColor ? "" : "bg-background"} ${leftClassName}`}
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          {items.map((item, index) => (
            <div
              key={`content-${index}`}
              ref={(element) => {
                contentRefsRef.current[index] = element;
              }}
              className={`absolute inset-0 ${contentClassName}`}
            >
              {renderStickyContent(item)}
            </div>
          ))}
        </div>

        <div
          className={`relative h-full w-1/2 overflow-hidden max-[1025px]:mt-[7vh] max-[1025px]:h-[37%] max-[1025px]:w-full max-[1025px]:rounded-[3.5vw] ${rightClassName}`}
        >
          {items.map((item, index) => (
            <div
              key={`image-${index}`}
              ref={(element) => {
                imageRefsRef.current[index] = element;
              }}
              className={`absolute inset-0 h-full w-full opacity-0 ${imageClassName}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- GSAP animates the wrapper; plain img keeps the reference markup */}
              <img
                src={item.image}
                alt={item.alt || item.imageAlt || `sticky-image-${index + 1}`}
                className="h-full w-full object-cover"
                width={item.width || 1080}
                height={item.height || 1080}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface StickyContentWrapperProps {
  items?: StickyContentItem[];
  bgColor?: string;
  contentEnterYPercent?: number;
  contentTransitionDuration?: number;
  initialImageScale?: number;
  activeImageScale?: number;
  exitImageScale?: number;
}

export default function StickyContentWrapper({
  items = defaultItems,
  bgColor,
  contentEnterYPercent = 2,
  contentTransitionDuration = 0.9,
  initialImageScale = 1.5,
  activeImageScale = 1.2,
  exitImageScale = 1,
}: StickyContentWrapperProps) {
  return (
    <StickyContentComp
      items={items}
      bgColor={bgColor}
      contentClassName="pl-5 pr-8 md:pl-[8vw] max-[1025px]:pl-0 max-[1025px]:pr-0 max-[1025px]:pt-8"
      contentEnterYPercent={contentEnterYPercent}
      contentExitYPercent={-2}
      contentTransitionDuration={contentTransitionDuration}
      contentDelay={0.35}
      initialImageScale={initialImageScale}
      activeImageScale={activeImageScale}
      exitImageScale={exitImageScale}
    />
  );
}
