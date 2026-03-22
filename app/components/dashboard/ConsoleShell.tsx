import { ConsoleSidebar } from "./ConsoleSidebar";
import { TopHeader } from "./TopHeader";

type ConsoleShellProps = {
  activeNav?: "algorithms" | "structures" | "practice";
  sidebarItems: Array<{ label: string; active?: boolean }>;
  children: React.ReactNode;
};

export function ConsoleShell({ activeNav, sidebarItems, children }: ConsoleShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111522] text-[#e7ebff]">
      <div className="absolute inset-0 bg-[radial-gradient(#313957_0.6px,transparent_0.6px)] bg-size-[12px_12px] opacity-40" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-490 p-1.5">
        <div className="flex w-full flex-col overflow-hidden rounded-xl border border-[#2a335f] bg-[#070b2a] shadow-[0_20px_80px_rgba(4,6,20,0.8)]">
          <TopHeader activeNav={activeNav} />
          <div className="flex min-h-0 flex-1">
            <ConsoleSidebar items={sidebarItems} />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
