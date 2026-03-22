type CategoryCard = {
  title: string;
  description: string;
  modules: string;
  badge: "EASY" | "MEDIUM" | "HARD";
};


type PageContentProps = {
  categoryCards: readonly CategoryCard[];
};

export function PageContent({ categoryCards }: PageContentProps) {
  return (
    <main className="min-w-0 flex-1 w-full p-4 sm:p-6">
      <section className="min-w-0 w-full space-y-4">
        <article className="relative overflow-hidden rounded-2xl border border-[#1d2460] bg-[linear-gradient(115deg,#0b1040_0%,#0b1144_50%,#290f66_100%)] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-16 h-60 w-60 rounded-full bg-[#5d25d5]/35 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.03fr_0.97fr]">
            <div>
              <p className="mb-5 inline-flex rounded-full bg-[#5518c6]/55 px-3 py-1 text-[11px] font-bold tracking-[0.11em] text-[#decfff]">
                FEATURED ALGORITHM
              </p>
              <h1 className="font-heading max-w-135 text-[58px] font-semibold leading-[0.96] tracking-[-0.03em] text-[#d3d9ff] sm:text-[76px]">
                Dijkstra&apos;s
                <br />
                Shortest
                <br />
                Path
              </h1>
              <p className="mt-5 max-w-130 text-[17px] leading-8 text-[#919bdb]">
                Master graph traversal and edge relaxation. Explore how routing
                algorithms find the most efficient way across complex networks.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-[linear-gradient(180deg,#96a3ff,#8793fa)] px-7 py-3.5 text-base font-semibold text-[#1a2159] shadow-[0_12px_30px_rgba(123,132,241,0.45)]"
                >
                  Visualize Now   ▶
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-[#303b8d] bg-[#0c1349] px-7 py-3.5 text-base font-medium text-[#dde3ff]"
                >
                  Read Documentation
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl border border-[#232d6f] bg-[#02030b] p-5 shadow-[0_22px_44px_rgba(0,0,0,0.62)]">
              <div className="mb-3 flex items-center justify-between text-[11px] text-[#6671c1]">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#9f3246]" />
                  <span className="h-3 w-3 rounded-full bg-[#8245b7]" />
                  <span className="h-3 w-3 rounded-full bg-[#4a5db3]" />
                </div>
                <span>dijkstra.py</span>
              </div>
              <pre className="overflow-hidden text-[13px] leading-[1.85] text-[#919bcf]">
                <code>{`import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        cur_dist, cur_node = heapq.heappop(pq)
        # Process nodes...
`}</code>
              </pre>
              <div className="absolute bottom-4 right-3 h-40 w-32 rounded-sm bg-linear-to-b from-[#2f3f59]/10 via-[#24384f]/35 to-[#152538]/55" />
            </div>
          </div>
        </article>

        <section className="rounded-2xl border border-[#1a215f] bg-[#070d3a] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold text-[#d4dcff]">
              Algorithm Categories
            </h2>
            <a href="#" className="text-sm text-[#8994db] hover:text-[#d7deff]">
              View All
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryCards.map((card) => (
              <article
                key={card.title}
                className="rounded-xl border border-[#222c74] bg-[linear-gradient(180deg,#11174e_0%,#0d1243_100%)] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="h-8 w-8 rounded-md bg-[#1c266b]" />
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-wide ${
                      card.badge === "HARD"
                        ? "bg-[#5e123a] text-[#ff7ba7]"
                        : card.badge === "MEDIUM"
                          ? "bg-[#264486] text-[#8eb6ff]"
                          : "bg-[#47206f] text-[#e39dff]"
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-[#d8ddff]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#8f9ad9]">{card.description}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-[#7783cc]">
                  <span>{card.modules}</span>
                  <span className="text-lg">-&gt;</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
