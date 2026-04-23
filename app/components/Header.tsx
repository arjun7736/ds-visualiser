import Link from "next/link";

type IconProps = {
  className?: string;
};

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
  return (
    <header className="border-y border-cyan-400/15 bg-[linear-gradient(180deg,#060A18_0%,#050714_100%)] shadow-[inset_0_1px_0_rgba(80,210,255,0.06)]">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 md:grid-cols-[auto_1fr_auto] md:gap-8 md:px-7">
        <h1 className="ds-title text-cyan-400">
          OBSIDIANALGO
        </h1>

        <form
          aria-label="Search algorithms"
          className="col-span-2 md:order-1 md:col-span-1 "
          role="search"
        >
          <label className="sr-only" htmlFor="algorithm-search">
            Search algorithms
          </label>
          <div className="flex h-14 items-center rounded-sm border border-cyan-300/20 bg-[#02040C] px-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition focus-within:border-cyan-300/50 focus-within:shadow-[inset_0_0_0_1px_rgba(94,245,255,0.2)]">
            <SearchIcon className="mr-3 h-7 w-7 text-indigo-200/55" />
            <input
              className="ds-body w-full bg-transparent text-indigo-100/80 placeholder:text-indigo-200/45 focus:outline-none"
              id="algorithm-search"
              name="q"
              placeholder="Search algorithms..."
              type="search"
            />
          </div>
        </form>

        <nav className="flex items-center gap-2 md:order-2">
          <Link
            className="ds-button inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-3 uppercase tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 md:px-4"
            href="/simulation"
          >
            Live Panel
          </Link>
          <Link
            className="ds-button inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-3 uppercase tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 md:px-4"
            href="/sorting"
          >
            Sort Studio
          </Link>
          <Link
            className="ds-button inline-flex h-11 items-center justify-center rounded-md border border-cyan-300/35 bg-cyan-400/10 px-3 uppercase tracking-[0.14em] text-cyan-300 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 md:px-4"
            href="/comparison"
          >
            Compare Lab
          </Link>
        </nav>
      </div>
    </header>
  );
}
