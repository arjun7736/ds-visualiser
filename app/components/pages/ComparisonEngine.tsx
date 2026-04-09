const quickBars = [62, 44, 88, 30, 74, 57, 23, 80, 40, 92, 48, 35, 66, 86, 41, 60, 20, 78];
const mergeBars = [38, 60, 22, 74, 45, 55, 87, 65, 30, 78, 44, 71, 58, 32, 94, 36, 52, 70];

function AlgoGraph({ bars, accent }: { bars: number[]; accent: string }) {
  return (
    <div className="rounded-md border border-[#232c62] bg-black p-4">
      <div className="flex h-74 items-end gap-2">
        {bars.map((value, idx) => (
          <span
            key={`${value}-${idx}`}
            className={`w-1.5 rounded-t-sm ${idx % 5 === 1 ? accent : "bg-[#5f6cca]"}`}
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ComparisonEngine() {
  return (
    <section className="flex flex-col bg-[#0c1134] min-h-full">
      <div className="flex items-center justify-between border-b border-[#20295a] px-4 py-3">
        <div>
          <h1 className="text-[15px] font-semibold text-[#dde2ff]">Comparison Engine</h1>
          <p className="text-[11px] text-[#8f98d4]">QuickSort vs. MergeSort (Array size: 128)</p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {[
            { label: "TIME DELTA", value: "+12.4ms" },
            { label: "EFFICIENCY GAP", value: "1.4x" },
            { label: "STATE SYNC", value: "98%" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-md border border-[#2a336f] bg-[#12184c] px-3 py-1.5">
              <p className="text-[9px] font-semibold tracking-wider text-[#8f98d4]">{metric.label}</p>
              <p className="text-[23px] font-semibold leading-none text-[#d8deff] sm:text-[12px]">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 xl:grid-cols-2">
        <article className="rounded-md border border-[#21295a] bg-[#121848] p-3">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <p className="font-semibold text-[#91a1ff]">QuickSort</p>
            <p className="text-[#6975ba]">Comps: 4,812   Swaps: 1,204</p>
          </div>
          <AlgoGraph bars={quickBars} accent="bg-[#e07bff]" />
        </article>

        <article className="rounded-md border border-[#21295a] bg-[#121848] p-3">
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <p className="font-semibold text-[#c77bff]">MergeSort</p>
            <p className="text-[#6975ba]">Comps: 3,950   Copies: 2,410</p>
          </div>
          <AlgoGraph bars={mergeBars} accent="bg-[#b868ff]" />
        </article>
      </div>

      <div className="grid grid-cols-1 gap-2 border-t border-[#20295a] px-3 py-2 md:grid-cols-4">
        <div className="rounded-md border border-[#21295a] bg-[#121848] px-3 py-2">
          <p className="text-[9px] font-semibold tracking-wider text-[#7985cb]">COMPLEXITY</p>
          <p className="text-[11px] text-[#cfd5ff]">Time (Avg)  O(n log n)</p>
          <p className="text-[11px] text-[#cfd5ff]">Space  O(log n)</p>
        </div>
        <div className="rounded-md border border-[#21295a] bg-[#121848] px-3 py-2">
          <p className="text-[9px] font-semibold tracking-wider text-[#7985cb]">ALGORITHM A PHASE</p>
          <p className="mt-1 inline-flex rounded-full bg-[#2e3e7e] px-2 py-0.5 text-[10px] text-[#b7c2ff]">
            Partitioning
          </p>
        </div>
        <div className="rounded-md border border-[#21295a] bg-[#121848] px-3 py-2">
          <p className="text-[9px] font-semibold tracking-wider text-[#7985cb]">ALGORITHM B PHASE</p>
          <p className="mt-1 inline-flex rounded-full bg-[#5a2d90] px-2 py-0.5 text-[10px] text-[#dfb6ff]">
            Merging Subarrays
          </p>
        </div>
        <div className="rounded-md border border-[#21295a] bg-[#121848] px-3 py-2">
          <p className="text-[9px] font-semibold tracking-wider text-[#7985cb]">SYSTEM HEALTH</p>
          <div className="mt-2 flex h-5 items-end gap-1">
            {[8, 12, 14, 9, 16].map((value) => (
              <span key={value} className="w-5 rounded-sm bg-[#7c3b93]" style={{ height: value }} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-[#20295a] bg-[#131942] px-4 py-2.5">
        <div className="flex items-center gap-1 rounded-md bg-[#0d1337] p-1">
          <button type="button" className="grid h-7 w-7 place-items-center text-[#d0d6ff]">⏮</button>
          <button type="button" className="grid h-7 w-7 place-items-center rounded-md bg-[#7484ff] text-[#111946]">▶</button>
          <button type="button" className="grid h-7 w-7 place-items-center text-[#d0d6ff]">⏭</button>
        </div>
        <div className="ml-2 flex items-center gap-2 text-[11px] text-[#8f98d4]">
          <div className="h-1 w-28 rounded-full bg-[#2c376f]">
            <span className="block h-full w-4/6 rounded-full bg-[#ba5fff]" />
          </div>
          1.5x
        </div>
        <div className="ml-auto flex items-center gap-4 text-[11px] text-[#bfc7ff]">
          <label className="inline-flex items-center gap-1.5">
            SYNC MODE
            <span className="h-4 w-8 rounded-full bg-[#7b2ed1] p-0.5">
              <span className="ml-auto block h-3 w-3 rounded-full bg-[#e7d6ff]" />
            </span>
          </label>
          <button type="button" className="rounded-md border border-[#303a7c] px-2.5 py-1.5 text-[#d7ddff]">
            Reset Deck
          </button>
        </div>
      </div>
    </section>
  );
}
