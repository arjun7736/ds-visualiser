type TopHeaderProps = {
  activeNav?: "algorithms" | "structures" | "practice";
};

const navItems: Array<{ key: TopHeaderProps["activeNav"]; label: string; href: string }> = [
  { key: "algorithms", label: "Algorithms", href: "/" },
  { key: "structures", label: "Structures", href: "/comparison" },
  { key: "practice", label: "Practice", href: "/comparison" },
];

export function TopHeader({ activeNav = "algorithms" }: TopHeaderProps) {
  return (
    <header className="flex h-13 items-center border-b border-[#1f2651] px-4 lg:px-5">
      <p className="font-heading text-[34px] font-semibold tracking-[-0.03em] text-[#d8deff] sm:text-[16px]">
        Synthetix Console
      </p>

      <nav className="ml-6 hidden items-center gap-8 text-[29px] font-semibold text-[#8a92c8] sm:flex sm:text-[14px]">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`relative pb-1 transition ${
              activeNav === item.key
                ? "text-[#7e8eff] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#7385ff]"
                : "hover:text-[#cfd4ff]"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Theme"
          className="grid h-7 w-7 place-items-center rounded-full text-[#9da6e8] hover:bg-[#151b46]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.5 2a1 1 0 0 0-1 1v1.7a7.3 7.3 0 1 0 7.8 7.8H21a1 1 0 0 0 0-2h-1.7A7.3 7.3 0 0 0 12.5 2Z" />
          </svg>
        </button>
        <div className="h-7 w-7 rounded-full border border-[#48559f] bg-[radial-gradient(circle_at_36%_30%,#ffd8a4_0_34%,#83c7b9_35_63%,#2e5578_64%)]" />
      </div>
    </header>
  );
}
