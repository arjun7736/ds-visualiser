type SidebarItem = {
  label: string;
  active?: boolean;
};

type ConsoleSidebarProps = {
  items: SidebarItem[];
};

function SidebarIcon({ active }: { active?: boolean }) {
  return (
    <span
      className={`h-3.5 w-3.5 rounded-sm ${active ? "bg-[#90a1ff]" : "bg-[#7a84be]/70"}`}
      aria-hidden="true"
    />
  );
}

export function ConsoleSidebar({ items }: ConsoleSidebarProps) {
  return (
    <aside className="sticky top-0 z-10 hidden w-40 shrink-0 border-r border-[#1f2651] bg-[#0a0f35] overflow-y-auto max-h-[calc(100vh-3.25rem)] lg:flex lg:flex-col">
      <div className="px-3.5 pt-3.5">
        <div className="flex items-center gap-2.5 rounded-md bg-[#141b56] px-2.5 py-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#7a88ff] text-[#12194a]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4h8v8H4zM14 12h6v8h-6zM14 4h6v6h-6zM4 14h8v6H4z" fill="currentColor" />
            </svg>
          </span>
          <div>
            <p className="text-[13px] font-semibold text-[#d6ddff]">Library</p>
            <p className="text-[10px] text-[#7983be]">v2.0.4</p>
          </div>
        </div>
      </div>

      <nav className="mt-4 space-y-1.5 px-3">
        {items.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-[13px] ${
              item.active
                ? "bg-[#1a2257] text-[#a3b2ff]"
                : "text-[#8c95c8] hover:bg-[#151b4a] hover:text-[#d2d8ff]"
            }`}
          >
            <SidebarIcon active={item.active} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="px-3.5 pt-4">
        <button
          type="button"
          className="w-full rounded-md border border-[#9aa7ff]/30 bg-[linear-gradient(180deg,#8f9bfd,#7c88f0)] py-2 text-[11px] font-semibold tracking-wide text-[#1b245d]"
        >
          + NEW SIMULATION
        </button>
      </div>

      <div className="mt-auto border-t border-[#1f2651] px-3 py-3 text-[12px] text-[#8f98d3]">
        <a href="#" className="block rounded-md px-2.5 py-1.5 hover:bg-[#151b4a] hover:text-[#d2d8ff]">
          Settings
        </a>
        <a href="#" className="block rounded-md px-2.5 py-1.5 hover:bg-[#151b4a] hover:text-[#d2d8ff]">
          Docs
        </a>
      </div>
    </aside>
  );
}
