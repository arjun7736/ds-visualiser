export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-23 items-center border-b border-[#1a2158] px-6 sm:px-8">
      <div className="flex min-w-63.75 items-center">
        <p className="font-heading text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#dde2ff]">
          Synthetix Console
        </p>
      </div>

      <nav className="hidden items-center gap-14 pl-8 text-[17px] font-semibold tracking-[-0.01em] text-[#8d95cb] lg:flex">
        <a href="#" className="text-[#d6dcff]">
          Algorithms
        </a>
        <a href="#" className="hover:text-[#cfd5ff]">
          Structures
        </a>
        <a href="#" className="hover:text-[#cfd5ff]">
          Practice
        </a>
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden h-10 items-center rounded-xl border border-[#2f377d] bg-[#1a2056] px-4 md:flex">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="mr-2 text-[#6f78bf]"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="m20 20-3.6-3.6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            aria-label="Search algorithms"
            placeholder="Search algorithms..."
            className="w-64 bg-transparent text-[15px] text-[#ced4ff] outline-none placeholder:text-[#7f88c9]"
          />
        </div>
      </div>
    </header>
  );
}
