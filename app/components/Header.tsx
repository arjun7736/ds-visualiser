"use client"

import { useState } from "react";
import Link from "next/link";

type IconProps = {
  className?: string;
};

const NAV_LINKS = [
  { href: "/simulation", label: "Live Panel" },
  { href: "/search", label: "Search Studio" },
  { href: "/sorting", label: "Sort Studio" },
  { href: "/comparison", label: "Compare Lab" },
];

function SearchIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m20 20-4.2-4.2m1.2-5.3a7.1 7.1 0 1 1-14.2 0 7.1 7.1 0 0 1 14.2 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-y border-cyan-400/15 bg-[linear-gradient(180deg,#060A18_0%,#050714_100%)] shadow-[inset_0_1px_0_rgba(80,210,255,0.06)]">
      <div className="mx-auto w-full max-w-[1920px] px-4 py-3 md:px-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
            <h1 className="ds-title text-cyan-400 hover:scale-105 transition-transform">
              <Link href="/">AlgoVision</Link>
            </h1>

            <form
              aria-label="Search algorithms"
              className="w-full min-w-0 md:w-[420px]"
              role="search"
            >
              <label className="sr-only" htmlFor="algorithm-search">
                Search algorithms
              </label>
              <div className="flex h-14 min-w-0 items-center border border-cyan-300/20 bg-[#02040C] px-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition focus-within:border-cyan-300/50 focus-within:shadow-[inset_0_0_0_1px_rgba(94,245,255,0.2)] rounded-xl">
                <SearchIcon className="mr-3 h-7 w-7 text-indigo-200/55" />
                <input
                  className="ds-body min-w-0 w-full bg-transparent text-indigo-100/80 placeholder:text-indigo-200/45 focus:outline-none"
                  id="algorithm-search"
                  name="q"
                  placeholder="Search algorithms..."
                  type="search"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-3 text-cyan-300 transition hover:bg-cyan-300/20 md:hidden"
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Menu
            </button>

            <nav className="hidden flex-wrap items-center gap-2 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  className="ds-button inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-3 uppercase tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 md:px-4"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="mt-3 flex flex-col gap-2 rounded-xl border border-cyan-300/10 bg-[#02050C]/95 p-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                className="ds-button inline-flex h-11 w-full items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-3 uppercase tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-300/20"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
