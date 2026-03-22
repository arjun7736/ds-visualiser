type SidebarProps = {
  items: string[];
};

export function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="hidden w-83 shrink-0 border-r border-[#1a2158] bg-[linear-gradient(180deg,#080d34_0%,#070a2d_100%)] lg:flex lg:flex-col">
      <nav className="mt-10 space-y-2 px-5">
        {items.map((item) => (
          <a
            key={item}
            href="#"
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[30px] font-medium tracking-[-0.03em] sm:text-[16px] ${
              item === "Structures"
                ? "bg-[#1a225a] text-[#8ea1ff]"
                : "text-[#8e97d5] hover:bg-[#141b4d] hover:text-[#cfd6ff]"
            }`}
          >
            <span className="h-5 w-5 rounded-sm bg-[#4f5cb5]/60" />
            {item}
          </a>
        ))}
      </nav>

      <div className="px-6 pt-8">
        <button
          type="button"
          className="w-full rounded-xl border border-[#95a1ff]/35 bg-[linear-gradient(180deg,#8f9bf8,#7f8af1)] py-3 text-[28px] font-semibold tracking-[-0.03em] text-[#1a2158] shadow-[0_10px_26px_rgba(118,129,241,0.35)] sm:text-[16px]"
        >
          + New Simulation
        </button>
      </div>

      <div className="mt-auto space-y-1 border-t border-[#1a2158] p-5 text-[27px] text-[#8f98d6] sm:text-[15px]">
        <a href="#" className="block rounded-lg px-4 py-2 hover:bg-[#151c4f] hover:text-[#d2d9ff]">
          Settings
        </a>
        <a href="#" className="block rounded-lg px-4 py-2 hover:bg-[#151c4f] hover:text-[#d2d9ff]">
          Docs
        </a>
      </div>
    </aside>
  );
}
