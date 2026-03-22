const bars = [
  14, 40, 77, 33, 56, 21, 88, 48, 11, 71, 31, 94, 17, 59, 42,
];

export function SimulationWorkspace() {
  return (
    <section className="flex h-full min-h-0 flex-col bg-[#0c1134]">
      <div className="flex items-center gap-3 border-b border-[#20295a] px-4 py-2.5">
        <div className="flex items-center gap-1.5 rounded-md bg-[#151b4d] p-1">
          <button type="button" className="grid h-7 w-7 place-items-center rounded-md text-[#c8ceff]">
            ↶
          </button>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-full bg-[#7887ff] text-[#141b4d]"
          >
            ▶
          </button>
          <button type="button" className="grid h-7 w-7 place-items-center rounded-md text-[#c8ceff]">
            ↧
          </button>
        </div>

        <div className="hidden items-center gap-2 text-[10px] tracking-wider text-[#8f99d5] md:flex">
          SPEED
          <div className="h-1 w-26 rounded-full bg-[#242f63]">
            <span className="block h-full w-2/5 rounded-full bg-[#b569ff]" />
          </div>
          <span>2.5x</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden h-8 w-48 items-center rounded-md bg-[#171d4f] px-3 text-[12px] text-[#6f79bd] lg:flex">
            Custom: 45, 12, 8...
          </div>
          <button
            type="button"
            className="rounded-md border border-[#7a2cc4] bg-[#4f1384] px-3 py-1.5 text-[11px] font-semibold text-[#dfbbff]"
          >
            Generate Random
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 xl:grid-cols-[1.65fr_1fr]">
        <article className="relative flex min-h-0 flex-col rounded-md border border-[#21295a] bg-[#0f143d]">
          <div className="flex items-start justify-between px-3 pt-3 text-[10px] text-[#9ba3dc]">
            <div className="flex gap-5">
              <div>
                <p className="uppercase tracking-wider text-[#7480c1]">Operations</p>
                <p className="text-[30px] font-semibold leading-none text-[#bfc9ff] sm:text-[14px]">124</p>
              </div>
              <div>
                <p className="uppercase tracking-wider text-[#7480c1]">Time Elapsed</p>
                <p className="text-[30px] font-semibold leading-none text-[#f0a1ff] sm:text-[14px]">0.8s</p>
              </div>
              <div>
                <p className="uppercase tracking-wider text-[#7480c1]">Status</p>
                <p className="text-[22px] font-semibold text-[#d48bff] sm:text-[12px]">• Partitioning...</p>
              </div>
            </div>
          </div>

          <div className="mt-1 flex min-h-0 flex-1 items-end justify-center bg-black px-7 pb-8 pt-2">
            <div className="flex h-full w-full max-w-140 items-end justify-center gap-2">
              {bars.map((value, idx) => (
                <span
                  key={`${value}-${idx}`}
                  className={`w-3 rounded-t-sm ${
                    idx === 2 || idx === 6
                      ? "bg-[#ce69ff] shadow-[0_0_10px_#be57ff]"
                      : idx === 4
                        ? "bg-[#ff86f0] shadow-[0_0_10px_#ff7ded]"
                        : "bg-[#4a538f]"
                  }`}
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>
        </article>

        <aside className="flex min-h-0 flex-col gap-3">
          <section className="flex min-h-0 flex-1 flex-col rounded-md border border-[#21295a] bg-[#121848]">
            <div className="border-b border-[#252e64] px-3 py-2 text-[11px] font-semibold tracking-wider text-[#95a1e5]">
              CODE
            </div>
            <div className="min-h-0 flex-1 px-3 py-2">
              <div className="h-full rounded-md border border-[#252e64] bg-black p-3">
                <p className="mb-2 text-[11px] text-[#7480c1]">quicksort.js</p>
                <pre className="max-h-full overflow-auto text-[12px] leading-6 text-[#93a0ea]">
                  <code>{`function quickSort(arr, left, right) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
}

function partition(arr, left, right) {
  let pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-[#21295a] bg-[#161d52] p-3 text-[12px] leading-5 text-[#9ca7e3]">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#ba8dff]">
              Current Operation
            </p>
            Comparing arr[i] (value 55) with pivot (value 78). Since 55 &lt; 78,
            incrementing i and swapping elements.
          </section>
        </aside>
      </div>
    </section>
  );
}
