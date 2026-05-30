"use client"

import { useState, useEffect, useRef } from "react";

type TreeNodeProps = {
  value: string | number;
  top: string | number;
  left: string | number;
  active?: boolean;
  muted?: boolean;
  label?: string;
};

const createArray = (size: number = 10) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

const filterInput = (input: string) => {
  const arr = input.split(",").map((num: string) => Number(num.trim())).filter((num: number) => !isNaN(num) && num >= 0);
  return arr;
}

function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path d="M12 11.2v5.1m0-9.3h.01" stroke="#02111B" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" fill="currentColor" r="10" />
      <path d="m8 12 2.5 2.5L16 9" stroke="#02111B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}


function PauseIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function TreeNode({ value, top, left, active, muted, label }: TreeNodeProps) {
  const baseClass =
    "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border text-center font-semibold transition-all duration-300";
  const activeClass = active
    ? "h-18 w-18 border-cyan-300/80 bg-cyan-400 text-[#063C46] shadow-[0_0_0_1px_rgba(34,211,238,0.5),0_0_26px_rgba(34,211,238,0.65)] z-10"
    : muted
      ? "h-16 w-16 border-slate-500/25 bg-slate-900/45 text-slate-500 z-0"
      : "h-16 w-16 border-slate-300/20 bg-slate-900/55 text-slate-200 z-0";

  return (
    <div className={`${baseClass} ${activeClass}`} style={{ left: typeof left === 'number' ? `${left}%` : left, top: typeof top === 'number' ? `${top}%` : top }}>
      <span className="absolute inset-0 grid place-items-center text-xl">{value}</span>
      {label ? (
        <span className="ds-label absolute -bottom-7 left-1/2 -translate-x-1/2 text-cyan-300 whitespace-nowrap">
          {label}
        </span>
      ) : null}
    </div>
  );
}

type LogEntry = {
  message: string;
  type: "success" | "info" | "comparing";
};

type EdgeData = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
};

type NodeData = {
  id: string;
  value: number;
  top: number;
  left: number;
  active?: boolean;
  muted?: boolean;
  label?: string;
};

type AlgStep = {
  text: string;
  status: "active" | "completed" | "pending";
};

type SimulationStep = {
  nodes: NodeData[];
  edges: EdgeData[];
  logs: LogEntry[];
  explanation: { title: string; body: React.ReactNode };
  algorithmLogic: AlgStep[];
  properties: { label: string; value: string }[];
};

function generateBSTSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let nodes: NodeData[] = [];
  let edges: EdgeData[] = [];
  let logs: LogEntry[] = [];

  const emptyStep: SimulationStep = {
    nodes: [], edges: [], logs: [],
    explanation: { title: "Initialization", body: "Waiting to build tree..." },
    algorithmLogic: [],
    properties: [
      { label: "Depth", value: "0" },
      { label: "Nodes", value: "0" },
      { label: "Type", value: "BST" },
      { label: "Leaves", value: "0" },
    ]
  };

  if (values.length === 0) {
    return [emptyStep];
  }

  type BSTNode = {
    value: number;
    leftNode: BSTNode | null;
    rightNode: BSTNode | null;
    x: number;
    y: number;
    depth: number;
  };

  let root: BSTNode | null = null;

  const pushStep = (
    currentNodes: NodeData[],
    currentEdges: EdgeData[],
    explanation: { title: string; body: React.ReactNode },
    algLogic: AlgStep[]
  ) => {
    steps.push({
      nodes: [...currentNodes.map(n => ({...n}))],
      edges: [...currentEdges.map(e => ({...e}))],
      logs: [...logs],
      explanation,
      algorithmLogic: [...algLogic],
      properties: [
        { label: "Depth", value: root ? getDepth(root).toString() : "0" },
        { label: "Nodes", value: nodes.length.toString() },
        { label: "Type", value: "BST" },
        { label: "Leaves", value: getLeavesCount(root).toString() },
      ],
    });
  };

  function getDepth(node: BSTNode | null): number {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.leftNode), getDepth(node.rightNode));
  }

  function getLeavesCount(node: BSTNode | null): number {
    if (!node) return 0;
    if (!node.leftNode && !node.rightNode) return 1;
    return getLeavesCount(node.leftNode) + getLeavesCount(node.rightNode);
  }

  steps.push(emptyStep);

  for (let i = 0; i < values.length; i++) {
    const val = values[i];

    if (!root) {
      root = { value: val, leftNode: null, rightNode: null, x: 50, y: 12, depth: 1 };
      nodes.push({ id: `node-${i}`, value: val, top: 12, left: 50, active: true, label: "NEW" });
      logs.push({ message: `Tree root initialized: ${val}`, type: "success" });
      pushStep(
        nodes, edges,
        { title: "Insertion", body: <span>Inserted root node <span className="text-cyan-300">{val}</span>.</span> },
        [{ text: `1. Insert root (${val})`, status: "completed" }]
      );
      nodes[0].active = false;
      nodes[0].label = undefined;
    } else {
      let curr = root;
      let depth = 1;
      let dx = 20;

      let algSteps: AlgStep[] = [
        { text: `1. Start at root (${curr.value})`, status: "active" },
        { text: `2. Compare ${val} with current node`, status: "pending" }
      ];

      nodes = nodes.map(n => n.value === curr.value ? { ...n, active: true, label: "CURRENT" } : { ...n, active: false, label: undefined });
      
      pushStep(nodes, edges, { title: "Traversal", body: <span>Starting traversal from root <span className="text-cyan-300">{curr.value}</span> to insert <span className="text-violet-300">{val}</span>.</span> }, algSteps);

      while (true) {
        algSteps = algSteps.map(s => ({ ...s, status: s.status === "active" ? "completed" : s.status }));
        algSteps.push({ text: `Compare ${val} with ${curr.value}`, status: "active" });

        logs.push({ message: `Comparing ${val} with ${curr.value}`, type: "comparing" });
        pushStep(nodes, edges, { title: "Comparison", body: <span>Comparing target value <span className="text-cyan-300">{val}</span> with node {curr.value}.</span> }, algSteps);

        if (val < curr.value) {
          algSteps = algSteps.map(s => ({ ...s, status: s.status === "active" ? "completed" : s.status }));
          algSteps.push({ text: `${val} < ${curr.value}, move LEFT`, status: "active" });

          if (!curr.leftNode) {
            const newX = curr.x - dx;
            const newY = curr.y + 16;
            curr.leftNode = { value: val, leftNode: null, rightNode: null, x: newX, y: newY, depth: depth + 1 };

            nodes = nodes.map(n => ({ ...n, active: false, label: undefined }));
            nodes.push({ id: `node-${i}`, value: val, top: newY, left: newX, active: true, label: "NEW" });
            edges.push({ id: `edge-${i}-L`, x1: curr.x, y1: curr.y, x2: newX, y2: newY });

            logs.push({ message: `Inserted node: ${val} (Left)`, type: "success" });

            algSteps = algSteps.map(s => ({ ...s, status: "completed" }));
            algSteps.push({ text: `Inserted ${val} as left child`, status: "active" });

            pushStep(nodes, edges, { title: "Insertion", body: <span>Inserted <span className="text-cyan-300">{val}</span> as left child of {curr.value}.</span> }, algSteps);
            nodes = nodes.map(n => ({ ...n, active: false, label: undefined }));
            break;
          } else {
            const nextNode = curr.leftNode;
            nodes = nodes.map(n => {
              if (n.value === nextNode.value) return { ...n, active: true, label: "CURRENT" };
              if (n.value === curr.value) return { ...n, active: false, label: undefined };
              return n;
            });
            curr = nextNode;
            depth++;
            dx = dx / 1.5;
            pushStep(nodes, edges, { title: "Traversal", body: <span>Moving LEFT to node <span className="text-cyan-300">{curr.value}</span>.</span> }, algSteps);
          }
        } else {
          algSteps = algSteps.map(s => ({ ...s, status: s.status === "active" ? "completed" : s.status }));
          algSteps.push({ text: `${val} >= ${curr.value}, move RIGHT`, status: "active" });

          if (!curr.rightNode) {
            const newX = curr.x + dx;
            const newY = curr.y + 16;
            curr.rightNode = { value: val, leftNode: null, rightNode: null, x: newX, y: newY, depth: depth + 1 };

            nodes = nodes.map(n => ({ ...n, active: false, label: undefined }));
            nodes.push({ id: `node-${i}`, value: val, top: newY, left: newX, active: true, label: "NEW" });
            edges.push({ id: `edge-${i}-R`, x1: curr.x, y1: curr.y, x2: newX, y2: newY });

            logs.push({ message: `Inserted node: ${val} (Right)`, type: "success" });

            algSteps = algSteps.map(s => ({ ...s, status: "completed" }));
            algSteps.push({ text: `Inserted ${val} as right child`, status: "active" });

            pushStep(nodes, edges, { title: "Insertion", body: <span>Inserted <span className="text-cyan-300">{val}</span> as right child of {curr.value}.</span> }, algSteps);
            nodes = nodes.map(n => ({ ...n, active: false, label: undefined }));
            break;
          } else {
            const nextNode = curr.rightNode;
            nodes = nodes.map(n => {
              if (n.value === nextNode.value) return { ...n, active: true, label: "CURRENT" };
              if (n.value === curr.value) return { ...n, active: false, label: undefined };
              return n;
            });
            curr = nextNode;
            depth++;
            dx = dx / 1.5;
            pushStep(nodes, edges, { title: "Traversal", body: <span>Moving RIGHT to node <span className="text-cyan-300">{curr.value}</span>.</span> }, algSteps);
          }
        }
      }
    }
  }

  pushStep(nodes, edges, { title: "Complete", body: <span>Tree building complete.</span> }, [{ text: "Finished", status: "completed" }]);

  return steps;
}

export default function SimulationPage() {
  const [treeValues, setTreeValues] = useState<number[]>([]);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per step

  const handleBuildTree = () => {
    const generatedSteps = generateBSTSimulation(treeValues);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length, speed]);

  const currentStep = steps[currentStepIndex] || {
    nodes: [], edges: [], logs: [],
    explanation: { title: "Ready", body: "Enter values and build tree to begin." },
    algorithmLogic: [],
    properties: [
      { label: "Depth", value: "0" },
      { label: "Nodes", value: "0" },
      { label: "Type", value: "BST" },
      { label: "Leaves", value: "0" },
    ]
  };

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep.logs]);

  return (
    <main className="border-x border-cyan-300/20 bg-[#020612] text-slate-100 md:h-[calc(100dvh-5.5rem)] md:overflow-hidden flex flex-col">
      <div className="mx-auto grid w-full max-w-[1900px] flex-1 md:h-full md:min-h-0 md:grid-cols-[200px_1fr_240px] lg:grid-cols-[250px_1fr_300px] xl:grid-cols-[300px_1fr_340px]">
        <aside className="border-b border-cyan-100/10 bg-[#030916] p-3 md:h-full md:min-h-0 flex flex-col md:border-b-0 md:border-r md:p-4">
          <div className="flex items-center justify-between shrink-0">
            <h1 className="ds-title text-slate-100">
              Input Panel
            </h1>
            <button
              className="rounded-md p-2 text-cyan-300 transition hover:bg-cyan-400/10"
              type="button"
            >
              <span className="sr-only">Options</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h9m-9 6h12M4 18h6m6-12 4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="mt-6 shrink-0">
            <p className="ds-label text-slate-400">
              Node Values
            </p>
            <input type="text" value={treeValues.join(", ")} onChange={(e) => { setTreeValues(filterInput(e.target.value)) }} className="ds-body mt-2 rounded-lg border border-cyan-100/12 bg-[#0A111F] px-4 py-3 text-slate-200 w-full" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 shrink-0">
            <button
              className="ds-button rounded border border-cyan-300/40 bg-cyan-400 px-3 py-2.5 tracking-[0.2em] text-[#073B45] hover:bg-cyan-300 transition-colors"
              type="button"
              onClick={handleBuildTree}
            >
              BUILD TREE
            </button>
            <button
              className="ds-button rounded border border-violet-400/60 bg-violet-400/5 px-3 py-2.5 tracking-[0.2em] text-violet-200 hover:bg-violet-400/20 transition-colors"
              onClick={() => {
                setTreeValues(createArray())
              }}
            >
              RANDOMIZE
            </button>
          </div>

          <div className="mt-6 border-t border-cyan-100/10 pt-5 flex-1 flex flex-col min-h-0">
            <p className="ds-label text-slate-400 shrink-0">
              Operations Log
            </p>
            <div className="flex-1 overflow-y-auto mt-4 pr-2 custom-scrollbar">
              <ul className="ds-small space-y-3">
                {currentStep.logs.map((log, index) => (
                  <li key={index} className={`flex items-start gap-2 ${log.type === 'success' ? 'text-cyan-300' : log.type === 'comparing' ? 'text-violet-300' : 'text-slate-400'}`}>
                    {log.type === 'success' && <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />}
                    {log.type === 'comparing' && <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />}
                    {log.message}
                  </li>
                ))}
                {currentStep.logs.length === 0 && (
                  <li className="text-slate-500 italic">Waiting for operation...</li>
                )}
                <div ref={logsEndRef} />
              </ul>
            </div>
          </div>
        </aside>

        <section className="flex min-h-[420px] flex-col border-b border-cyan-100/10 bg-[#0A101D] md:h-full md:min-h-0 md:border-b-0 md:border-r">
          <div className="flex flex-wrap items-center gap-2 border-b border-cyan-100/10 p-3 md:p-4 shrink-0">
            <span className="ds-label inline-flex items-center rounded border border-cyan-300/25 bg-cyan-300/8 px-3 py-1 text-cyan-300">
              Live Simulation
            </span>
            <span className="ds-label inline-flex rounded border border-slate-500/35 bg-slate-500/8 px-3 py-1 text-slate-300">
              BST: Balanced
            </span>
          </div>

          <div className="relative min-h-[300px] flex-1 overflow-hidden bg-[linear-gradient(rgba(71,102,145,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(71,102,145,0.1)_1px,transparent_1px)] bg-[size:38px_38px] md:min-h-0">
            <div className="absolute inset-0">
              <svg aria-hidden="true" className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {currentStep.edges.map((edge) => (
                  <line
                    key={edge.id}
                    stroke="#22D3EE"
                    strokeOpacity={edge.dashed ? "0.55" : "0.9"}
                    strokeWidth="0.45"
                    strokeDasharray={edge.dashed ? "1.3 1.3" : "none"}
                    x1={edge.x1}
                    x2={edge.x2}
                    y1={edge.y1}
                    y2={edge.y2}
                    className="transition-all duration-300"
                  />
                ))}
              </svg>
            </div>

            {currentStep.nodes.map(node => (
              <TreeNode key={node.id} left={node.left} top={node.top} value={node.value} active={node.active} muted={node.muted} label={node.label} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 border-t border-cyan-100/10 bg-[#0A111F] px-3 py-2.5 md:flex-nowrap md:gap-3 md:px-4 md:py-3 shrink-0">
            <button
              className="rounded-md border border-slate-400/35 px-3 py-2 text-slate-300 transition hover:bg-slate-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0 || steps.length === 0}
            >
              <span aria-hidden="true">|◀</span>
              <span className="sr-only">Rewind</span>
            </button>
            <button
              className="ds-button rounded-xl bg-cyan-400 px-4 py-2 font-bold text-[#083C45] transition hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed w-[70px] flex justify-center"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={steps.length === 0 || currentStepIndex === steps.length - 1}
            >
              {isPlaying ? <PauseIcon className="h-5 w-5" /> : <span aria-hidden="true">▶</span>}
              <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              className="rounded-md border border-slate-400/35 px-3 py-2 text-slate-300 transition hover:bg-slate-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              onClick={() => setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === steps.length - 1 || steps.length === 0}
            >
              <span aria-hidden="true">▶|</span>
              <span className="sr-only">Forward</span>
            </button>

            <div className="ml-auto flex min-w-[140px] items-center gap-3 md:min-w-[180px]">
              <span className="ds-label text-slate-500">
                Speed
              </span>
              <div className="flex items-center gap-2 flex-1">
                 <input 
                   type="range" 
                   min="200" 
                   max="2000" 
                   step="100"
                   value={2200 - speed} 
                   onChange={(e) => setSpeed(2200 - parseInt(e.target.value))} 
                   className="w-full accent-cyan-400"
                 />
              </div>
            </div>

            <div className="text-right">
              <p className="ds-label text-slate-500">Step</p>
              <p className="ds-metric text-cyan-300">{steps.length > 0 ? currentStepIndex + 1 : 0}/{steps.length > 0 ? steps.length : 0}</p>
            </div>
          </div>
        </section>

        <aside className="bg-[#030916] p-3 md:h-full md:min-h-0 md:overflow-y-auto md:p-4 xl:p-5 flex flex-col">
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <InfoIcon className="h-5 w-5 md:h-6 md:w-6 text-cyan-300" />
            <h2 className="ds-title text-slate-100">
              Explanation
            </h2>
          </div>

          <section className="mt-5 rounded-lg border border-cyan-100/10 bg-[#0B1221] p-4 shrink-0 transition-all">
            <p className="ds-label text-cyan-300">
              Current Step: {currentStep.explanation.title}
            </p>
            <p className="ds-body mt-2 text-slate-200">
              {currentStep.explanation.body}
            </p>
          </section>

          <section className="mt-5 shrink-0">
            <h3 className="ds-label text-slate-400">
              Algorithm Logic
            </h3>
            <ol className="ds-body mt-3 space-y-2 rounded-lg border border-cyan-100/10 bg-[#111725] p-4 text-slate-300">
              {currentStep.algorithmLogic.map((step, idx) => (
                <li key={idx} className={
                  step.status === 'active' ? "font-semibold text-cyan-300" :
                  step.status === 'completed' ? "text-slate-400" :
                  "text-slate-600"
                }>
                  {step.text}
                </li>
              ))}
              {currentStep.algorithmLogic.length === 0 && (
                <li className="text-slate-500 italic">No logic currently active.</li>
              )}
            </ol>
          </section>

          <section className="mt-6 shrink-0">
            <h3 className="ds-label text-slate-400">
              Properties
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {currentStep.properties.map((item) => (
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
        </aside>
      </div>
    </main>
  );
}
