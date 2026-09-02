"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { TopBarTicker } from "./TopBarTicker";
import { Button } from "@/components/ui/Button";
import { PhoneCta, WhatsappCta } from "@/components/cta/PhoneWhatsappCta";
import { mainNav, ctaLabels } from "@/config/navigation";
import { trackEvent } from "@/lib/analytics";
import { useScrolled } from "@/hooks/useScrolled";
import { setLiquidOrigin } from "@/lib/liquidFill";
import { cn } from "@/lib/utils";

export function Header() {
  const isScrolled = useScrolled(8);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu when the route changes. Adjusted during render
  // (rather than in an effect) per React's guidance for resetting state in
  // response to a prop change — see https://react.dev/learn/you-might-not-need-an-effect
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (isMenuOpen) setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-white transition-shadow duration-200",
        isScrolled ? "border-charcoal/10 shadow-sm" : "border-transparent",
      )}
    >
      {/*
        <header> carries a plain, opaque `bg-white` so the bar reads as
        solid edge-to-edge (otherwise the strip beyond the inner bar's
        content stayed transparent while scrolling, showing whatever
        section — e.g. the red hero — sat behind it). The inner bar
        itself is intentionally full-bleed (no max-w-7xl, unlike
        Container/page sections below it) so the logo/nav/CTAs actually
        fill the header bar edge-to-edge on wide screens instead of
        sitting in a narrow centered column with large empty margins on
        either side — a deliberately wider "chrome" than the content
        column, same as most site headers. It keeps its own
        bg-white/95 + backdrop-blur rather than moving those to
        <header>, because `backdrop-filter` establishes a CSS containing
        block for `position: fixed` descendants — putting it on
        <header> made the fixed mobile-nav panel below size itself
        against the header's own 64px box (height: 0) instead of the
        viewport. Plain `background-color` doesn't have that effect, so
        it's safe on <header>.
      */}
      <div className="flex h-16 items-center justify-between bg-white/95 px-4 backdrop-blur sm:h-20 sm:px-6 lg:px-8 2xl:px-16">
        <Logo variant="mark" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "nav-pop block rounded-full px-3 py-2 text-sm font-medium text-charcoal/80 transition-colors hover:text-brand-red",
                    pathname === item.href && "text-brand-red",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <PhoneCta liquid />
          <WhatsappCta liquid />
          <Button
            href="/contact/"
            size="sm"
            liquid
            onClick={() => trackEvent("cta_click", { location: "header" })}
          >
            {ctaLabels.primary}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <PhoneCta liquid className="size-10" />
          <WhatsappCta liquid className="size-10" />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            onPointerEnter={setLiquidOrigin}
            className="liquid-fill inline-flex size-10 items-center justify-center rounded-full text-charcoal"
          >
            <span aria-hidden="true" className="liquid-fill__layer bg-brand-gold-light/70" />
            <span className="liquid-fill__content">
              {isMenuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            </span>
          </button>
        </div>
      </div>

      <TopBarTicker />

      {isMenuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white sm:top-20 lg:hidden"
        >
          <nav aria-label="Mobile primary" className="px-4 py-6">
            <ul className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-cream",
                      pathname === item.href && "text-brand-red",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/contact/" liquid className="mt-6 w-full">
              {ctaLabels.primary}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
