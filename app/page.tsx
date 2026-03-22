import { Header } from "./components/dashboard/Header";
import { PageContent } from "./components/dashboard/PageContent";
import { Sidebar } from "./components/dashboard/Sidebar";

export default function Home() {
  const categoryCards = [
    {
      title: "Sorting",
      description:
        "QuickSort, MergeSort, and the fundamental building blocks of ordered data.",
      modules: "12 Modules",
      badge: "EASY",
    },
    {
      title: "Trees",
      description: "AVL Trees, Binary Search Trees, and complex hierarchical traversals.",
      modules: "8 Modules",
      badge: "MEDIUM",
    },
    {
      title: "Graphs",
      description: "BFS, DFS, and pathfinding in massive, interconnected datasets.",
      modules: "16 Modules",
      badge: "HARD",
    },
    {
      title: "Searching",
      description: "Binary search, linear lookup, and efficient indexing strategies.",
      modules: "8 Modules",
      badge: "EASY",
    },
  ] as const;


  const sidebarItems = ["Sorting", "Searching", "Structures"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(900px_700px_at_88%_8%,#44109f_0%,#11164b_38%,#050818_74%)] text-[#e8ebff]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,98,168,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(91,98,168,0.09)_1px,transparent_1px)] bg-size-[30px_30px] opacity-35" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-440 p-1.5 sm:p-2.5">
        <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#2e356f] bg-[#060a27]/95 shadow-[0_28px_80px_rgba(6,8,30,0.7)] backdrop-blur-sm">
          <Header />

          <div className="flex min-h-0 flex-1">
            <Sidebar items={sidebarItems} />
            <PageContent categoryCards={categoryCards}  />
          </div>
        </div>
      </div>
    </div>
  );
}
