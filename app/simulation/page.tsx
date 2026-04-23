type TreeNodeProps = {
  value: string;
  top: string;
  left: string;
  active?: boolean;
  muted?: boolean;
  label?: string;
};

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path
        d="M12 11.2v5.1m0-9.3h.01"
        stroke="#02111B"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path
        d="m8 12 2.5 2.5L16 9"
        stroke="#02111B"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h13m-4-4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function TreeNode({ value, top, left, active, muted, label }: TreeNodeProps) {
  const baseClass =
    "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border text-center font-semibold transition";
  const activeClass = active
    ? "h-18 w-18 border-cyan-300/80 bg-cyan-400 text-[#063C46] shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_0_26px_rgba(34,211,238,0.65)]"
    : muted
      ? "h-16 w-16 border-slate-500/25 bg-slate-900/45 text-slate-500"
      : "h-16 w-16 border-slate-300/20 bg-slate-900/55 text-slate-200";

  return (
    <div className={`${baseClass} ${activeClass}`} style={{ left, top }}>
      <span className="absolute inset-0 grid place-items-center text-xl">{value}</span>
      {label ? (
        <span className="ds-label absolute -bottom-7 left-1/2 -translate-x-1/2 text-cyan-300">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export default function SimulationPage() {
  return (
    <main className="min-h-screen border-x border-cyan-300/20 bg-[#020612] text-slate-100">
      <div className="mx-auto grid w-full max-w-[1900px] xl:grid-cols-[300px_1fr_340px]">
        <aside className="border-b border-cyan-100/10 bg-[#030916] p-4 xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between">
            <h1 className="ds-title text-slate-100">
              Input Panel
            </h1>
            <button
              className="rounded-md p-2 text-cyan-300 transition hover:bg-cyan-400/10"
              type="button"
            >
              <span className="sr-only">Options</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h9m-9 6h12M4 18h6m6-12 4 4-4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-cyan-100/10 bg-slate-900/40 p-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                className="ds-button rounded bg-cyan-400 px-3 py-2 tracking-[0.16em] text-[#073B45]"
                type="button"
              >
                Standard
              </button>
              <button
                className="ds-button rounded px-3 py-2 tracking-[0.14em] text-slate-500"
                type="button"
              >
                JSON Toggle
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="ds-label text-slate-400">
              Node Values
            </p>
            <div className="ds-body mt-2 rounded-lg border border-cyan-100/12 bg-[#0A111F] px-4 py-3 text-slate-200">
              45, 23, 67, 12, 34, 56, 89
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              className="ds-button rounded border border-cyan-300/40 bg-cyan-400 px-3 py-2.5 tracking-[0.2em] text-[#073B45]"
              type="button"
            >
              BUILD TREE
            </button>
            <button
              className="ds-button rounded border border-violet-400/60 bg-violet-400/5 px-3 py-2.5 tracking-[0.2em] text-violet-200"
              type="button"
            >
              RANDOMIZE
            </button>
          </div>

          <div className="mt-6 border-t border-cyan-100/10 pt-5">
            <p className="ds-label text-slate-400">
              Operations Log
            </p>
            <ul className="ds-small mt-4 space-y-3">
              <li className="flex items-start gap-2 text-cyan-300">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                Tree root initialized: 45
              </li>
              <li className="flex items-start gap-2 text-cyan-300">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                Inserted node: 23 (Left)
              </li>
              <li className="flex items-start gap-2 text-cyan-300">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                Inserted node: 67 (Right)
              </li>
              <li className="text-slate-500 italic">Waiting for operation...</li>
            </ul>
          </div>
        </aside>

        <section className="flex min-h-[760px] flex-col border-b border-cyan-100/10 bg-[#0A101D] xl:border-b-0 xl:border-r">
          <div className="flex flex-wrap items-center gap-2 border-b border-cyan-100/10 p-4">
            <span className="ds-label inline-flex items-center rounded border border-cyan-300/25 bg-cyan-300/8 px-3 py-1 text-cyan-300">
              Live Simulation
            </span>
            <span className="ds-label inline-flex rounded border border-slate-500/35 bg-slate-500/8 px-3 py-1 text-slate-300">
              BST: Balanced
            </span>
          </div>

          <div className="relative flex-1 overflow-hidden bg-[linear-gradient(rgba(71,102,145,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(71,102,145,0.1)_1px,transparent_1px)] bg-[size:38px_38px]">
            <div className="absolute inset-0">
              <svg
                aria-hidden="true"
                className="h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <line
                  stroke="#22D3EE"
                  strokeOpacity="0.9"
                  strokeWidth="0.45"
                  x1="50"
                  x2="35"
                  y1="12"
                  y2="28"
                />
                <line
                  stroke="#22D3EE"
                  strokeOpacity="0.9"
                  strokeWidth="0.45"
                  x1="35"
                  x2="45"
                  y1="28"
                  y2="44"
                />

                <line
                  stroke="#5C6B8A"
                  strokeDasharray="1.3 1.3"
                  strokeOpacity="0.55"
                  strokeWidth="0.4"
                  x1="50"
                  x2="65"
                  y1="12"
                  y2="28"
                />
                <line
                  stroke="#5C6B8A"
                  strokeDasharray="1.3 1.3"
                  strokeOpacity="0.55"
                  strokeWidth="0.4"
                  x1="35"
                  x2="25"
                  y1="28"
                  y2="44"
                />
                <line
                  stroke="#5C6B8A"
                  strokeDasharray="1.3 1.3"
                  strokeOpacity="0.55"
                  strokeWidth="0.4"
                  x1="65"
                  x2="55"
                  y1="28"
                  y2="44"
                />
                <line
                  stroke="#5C6B8A"
                  strokeDasharray="1.3 1.3"
                  strokeOpacity="0.55"
                  strokeWidth="0.4"
                  x1="65"
                  x2="75"
                  y1="28"
                  y2="44"
                />
              </svg>
            </div>

            <TreeNode left="50%" top="12%" value="45" />
            <TreeNode left="35%" top="28%" value="23" />
            <TreeNode left="65%" top="28%" value="67" />
            <TreeNode left="25%" muted top="44%" value="12" />
            <TreeNode active label="ACTIVE" left="45%" top="44%" value="34" />
            <TreeNode muted left="55%" top="44%" value="56" />
            <TreeNode muted left="75%" top="44%" value="89" />
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-cyan-100/10 bg-[#0A111F] p-4">
            <button
              className="rounded-md border border-slate-400/35 px-3 py-2 text-slate-300 transition hover:bg-slate-700/20"
              type="button"
            >
              <span aria-hidden="true">|◀</span>
              <span className="sr-only">Rewind</span>
            </button>
            <button
              className="ds-button rounded-xl bg-cyan-400 px-4 py-2 font-bold text-[#083C45] transition hover:bg-cyan-300"
              type="button"
            >
              <span aria-hidden="true">▶</span>
              <span className="sr-only">Play</span>
            </button>
            <button
              className="rounded-md border border-slate-400/35 px-3 py-2 text-slate-300 transition hover:bg-slate-700/20"
              type="button"
            >
              <span aria-hidden="true">▶|</span>
              <span className="sr-only">Forward</span>
            </button>

            <div className="ml-auto flex min-w-[180px] items-center gap-3">
              <span className="ds-label text-slate-500">
                Speed
              </span>
              <div className="h-1.5 flex-1 rounded-full bg-slate-700">
                <div className="h-full w-1/2 rounded-full bg-cyan-400" />
              </div>
            </div>

            <div className="ml-auto text-right">
              <p className="ds-label text-slate-500">Step</p>
              <p className="ds-metric text-cyan-300">04/12</p>
            </div>
          </div>
        </section>

        <aside className="bg-[#030916] p-4 xl:p-5">
          <div className="flex items-center gap-3">
            <InfoIcon className="h-6 w-6 text-cyan-300" />
            <h2 className="ds-title text-slate-100">
              Explanation
            </h2>
          </div>

          <section className="mt-5 rounded-lg border border-cyan-100/10 bg-[#0B1221] p-4">
            <p className="ds-label text-cyan-300">
              Current Step: Traversal
            </p>
            <p className="ds-body mt-2 text-slate-200">
              Comparing target value <span className="text-cyan-300">34</span>{" "}
              with node 23.
            </p>
          </section>

          <section className="mt-5">
            <h3 className="ds-label text-slate-400">
              Algorithm Logic
            </h3>
            <ol className="ds-body mt-3 space-y-2 rounded-lg border border-cyan-100/10 bg-[#111725] p-4 text-slate-300">
              <li>1. Start at root (45)</li>
              <li className="text-slate-400">2. 34 &lt; 45, move LEFT</li>
              <li className="font-semibold text-cyan-300">3. 34 &gt; 23, move RIGHT</li>
              <li className="text-slate-500">4. Found node 34</li>
            </ol>
          </section>

          <section className="mt-6">
            <h3 className="ds-label text-slate-400">
              Properties
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: "Depth", value: "3" },
                { label: "Nodes", value: "7" },
                { label: "Type", value: "BST" },
                { label: "Leaves", value: "4" },
              ].map((item) => (
                <div
                  className="rounded border border-cyan-100/10 bg-[#111725] px-3 py-2.5"
                  key={item.label}
                >
                  <p className="ds-label text-slate-500">
                    {item.label}
                  </p>
                  <p className="ds-metric mt-1 text-slate-200">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <button
            className="mt-8 flex w-full items-center justify-between rounded-lg border border-cyan-300/35 bg-cyan-400/6 px-4 py-4 text-left transition hover:bg-cyan-300/10"
            type="button"
          >
            <span>
              <span className="ds-label block text-slate-500">
                Learn More
              </span>
              <span className="ds-title mt-1 block text-slate-100">
                AVL Rotations
              </span>
            </span>
            <ArrowRightIcon className="h-6 w-6 text-cyan-300" />
          </button>
        </aside>
      </div>
    </main>
  );
}
