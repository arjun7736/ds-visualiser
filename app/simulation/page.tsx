"use client"

import { useEffect, useMemo, useRef, useState } from "react";

type TreeNodeProps = {
  value: string | number;
  top: string | number;
  left: string | number;
  active?: boolean;
  muted?: boolean;
  label?: string;
};

type DataStructureId =
  | "bst"
  | "tree"
  | "linked-list"
  | "array"
  | "graph"
  | "heap"
  | "stack"
  | "queue"
  | "trie";

type DataStructureOption = {
  id: DataStructureId;
  label: string;
  badge: string;
  inputLabel: string;
  inputMode: "numbers" | "words";
};

const DATA_STRUCTURES: DataStructureOption[] = [
  { id: "bst", label: "BST", badge: "Binary Search Tree", inputLabel: "Node Values", inputMode: "numbers" },
  { id: "tree", label: "Tree", badge: "Binary Tree", inputLabel: "Node Values", inputMode: "numbers" },
  { id: "linked-list", label: "Linked List", badge: "Singly Linked List", inputLabel: "Node Values", inputMode: "numbers" },
  { id: "array", label: "Array", badge: "Indexed Array", inputLabel: "Element Values", inputMode: "numbers" },
  { id: "graph", label: "Graph", badge: "Undirected Graph", inputLabel: "Vertex Values", inputMode: "numbers" },
  { id: "heap", label: "Heap", badge: "Max Heap", inputLabel: "Node Values", inputMode: "numbers" },
  { id: "stack", label: "Stack", badge: "LIFO Stack", inputLabel: "Stack Values", inputMode: "numbers" },
  { id: "queue", label: "Queue", badge: "FIFO Queue", inputLabel: "Queue Values", inputMode: "numbers" },
  { id: "trie", label: "Trie", badge: "Prefix Tree", inputLabel: "Words", inputMode: "words" },
];

const createArray = (size: number = 10) => {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 90) + 10);
  }
  return arr;
};

const createWords = (size: number = 7) => {
  const source = [
    "cat",
    "car",
    "cart",
    "care",
    "dog",
    "dot",
    "dove",
    "code",
    "coder",
    "coding",
    "tree",
    "trie",
    "stack",
    "queue",
    "graph",
    "heap",
    "array",
    "linked",
  ];

  const words: string[] = [];
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  for (let i = 0; i < size; i++) {
    words.push(shuffled[i % shuffled.length]);
  }
  return words;
};

const filterNumberInput = (input: string) =>
  input
    .split(",")
    .map((num) => Number(num.trim()))
    .filter((num) => !Number.isNaN(num) && num >= 0);

const filterWordInput = (input: string) =>
  input
    .split(",")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 0);

const randomInputForStructure = (structure: DataStructureId): string => {
  if (structure === "trie") {
    return createWords().join(", ");
  }

  const count = structure === "graph" ? 7 : structure === "stack" || structure === "queue" ? 8 : 10;
  const base = createArray(count);

  if (structure === "graph") {
    const unique = Array.from(new Set(base));
    return unique.join(", ");
  }

  return base.join(", ");
};

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
    <div className={`${baseClass} ${activeClass}`} style={{ left: typeof left === "number" ? `${left}%` : left, top: typeof top === "number" ? `${top}%` : top }}>
      <span className="absolute inset-0 grid place-items-center text-lg md:text-xl">{value}</span>
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
  value: string | number;
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

type TrieNodeInternal = {
  id: string;
  value: string;
  terminal: boolean;
  children: Map<string, TrieNodeInternal>;
};

const createLogic = (lines: string[], activeIndex: number): AlgStep[] =>
  lines.map((text, idx) => ({
    text,
    status: idx < activeIndex ? "completed" : idx === activeIndex ? "active" : "pending",
  }));

const cloneNodes = (nodes: NodeData[]) => nodes.map((node) => ({ ...node }));
const cloneEdges = (edges: EdgeData[]) => edges.map((edge) => ({ ...edge }));
const cloneLogs = (logs: LogEntry[]) => logs.map((log) => ({ ...log }));
const cloneProperties = (properties: { label: string; value: string }[]) => properties.map((item) => ({ ...item }));

const makeStep = (
  nodes: NodeData[],
  edges: EdgeData[],
  logs: LogEntry[],
  explanation: { title: string; body: React.ReactNode },
  algorithmLogic: AlgStep[],
  properties: { label: string; value: string }[],
): SimulationStep => ({
  nodes: cloneNodes(nodes),
  edges: cloneEdges(edges),
  logs: cloneLogs(logs),
  explanation,
  algorithmLogic: algorithmLogic.map((step) => ({ ...step })),
  properties: cloneProperties(properties),
});

const structureLabel = (id: DataStructureId) => DATA_STRUCTURES.find((item) => item.id === id)?.label ?? id.toUpperCase();

const createIdleStep = (id: DataStructureId): SimulationStep => {
  const label = structureLabel(id);
  return {
    nodes: [],
    edges: [],
    logs: [],
    explanation: {
      title: "Ready",
      body: `Enter input and run simulation to visualize ${label}.`,
    },
    algorithmLogic: [],
    properties: [
      { label: "Type", value: label },
      { label: "Nodes", value: "0" },
      { label: "Edges", value: "0" },
      { label: "State", value: "Idle" },
    ],
  };
};

const buildHorizontalNodes = (
  values: Array<number | string>,
  top: number,
  activeIndex: number,
  labels: Record<number, string> = {},
): NodeData[] => {
  const total = values.length;
  return values.map((value, index) => ({
    id: `node-${index}`,
    value,
    top,
    left: total <= 1 ? 50 : 10 + (80 * index) / (total - 1),
    active: activeIndex === index,
    label: labels[index],
  }));
};

const buildVerticalNodes = (
  values: number[],
  activeIndex: number,
  labels: Record<number, string> = {},
): NodeData[] =>
  values.map((value, index) => ({
    id: `node-${index}`,
    value,
    top: 80 - index * 11,
    left: 50,
    active: index === activeIndex,
    label: labels[index],
  }));

const buildChainEdges = (nodes: NodeData[]): EdgeData[] => {
  const edges: EdgeData[] = [];
  for (let i = 1; i < nodes.length; i++) {
    edges.push({
      id: `edge-${i - 1}-${i}`,
      x1: nodes[i - 1].left,
      y1: nodes[i - 1].top,
      x2: nodes[i].left,
      y2: nodes[i].top,
    });
  }
  return edges;
};

const buildCompleteTreeSnapshot = (
  values: Array<number | string>,
  activeIndex: number,
  labels: Record<number, string> = {},
) => {
  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];

  for (let index = 0; index < values.length; index++) {
    const level = Math.floor(Math.log2(index + 1));
    const levelStart = 2 ** level - 1;
    const indexInLevel = index - levelStart;
    const nodesInLevel = 2 ** level;

    const left = ((indexInLevel + 1) / (nodesInLevel + 1)) * 100;
    const top = 13 + level * 16;

    nodes.push({
      id: `node-${index}`,
      value: values[index],
      top,
      left,
      active: index === activeIndex,
      label: labels[index],
    });

    if (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      const parentNode = nodes[parent];
      edges.push({
        id: `edge-${parent}-${index}`,
        x1: parentNode.left,
        y1: parentNode.top,
        x2: left,
        y2: top,
      });
    }
  }

  return { nodes, edges };
};

const buildGraphNodes = (values: number[], activeIndex: number): NodeData[] => {
  const n = values.length;
  if (n === 1) {
    return [{ id: "node-0", value: values[0], top: 50, left: 50, active: activeIndex === 0 }];
  }

  return values.map((value, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / n;
    return {
      id: `node-${index}`,
      value,
      top: 50 + 34 * Math.sin(angle),
      left: 50 + 34 * Math.cos(angle),
      active: index === activeIndex,
      label: index === 0 ? "START" : undefined,
    };
  });
};

const buildGraphEdges = (nodes: NodeData[]): EdgeData[] => {
  const edges: EdgeData[] = [];
  const n = nodes.length;

  for (let i = 1; i < n; i++) {
    edges.push({
      id: `edge-chain-${i - 1}-${i}`,
      x1: nodes[i - 1].left,
      y1: nodes[i - 1].top,
      x2: nodes[i].left,
      y2: nodes[i].top,
    });
  }

  if (n > 2) {
    edges.push({
      id: "edge-cycle",
      x1: nodes[0].left,
      y1: nodes[0].top,
      x2: nodes[n - 1].left,
      y2: nodes[n - 1].top,
    });
  }

  if (n > 4) {
    for (let i = 0; i < n - 2; i += 2) {
      edges.push({
        id: `edge-skip-${i}-${i + 2}`,
        x1: nodes[i].left,
        y1: nodes[i].top,
        x2: nodes[i + 2].left,
        y2: nodes[i + 2].top,
        dashed: true,
      });
    }
  }

  return edges;
};

const buildTrieSnapshot = (root: TrieNodeInternal, activeId: string | null) => {
  const levels: TrieNodeInternal[][] = [];
  const rawEdges: Array<{ from: string; to: string }> = [];

  const dfs = (node: TrieNodeInternal, depth: number) => {
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push(node);

    const children = Array.from(node.children.values()).sort((a, b) => a.value.localeCompare(b.value));
    for (const child of children) {
      rawEdges.push({ from: node.id, to: child.id });
      dfs(child, depth + 1);
    }
  };

  dfs(root, 0);

  const positions = new Map<string, { left: number; top: number }>();
  levels.forEach((nodesAtLevel, depth) => {
    const count = nodesAtLevel.length;
    nodesAtLevel.forEach((node, index) => {
      positions.set(node.id, {
        left: ((index + 1) / (count + 1)) * 100,
        top: 12 + depth * 15,
      });
    });
  });

  const nodes: NodeData[] = levels.flatMap((levelNodes) =>
    levelNodes.map((node) => {
      const pos = positions.get(node.id);
      const isActive = node.id === activeId;
      const label = isActive ? "CURRENT" : node.id === "trie-root" ? "ROOT" : node.terminal ? "END" : undefined;
      return {
        id: node.id,
        value: node.value,
        top: pos?.top ?? 12,
        left: pos?.left ?? 50,
        active: isActive,
        label,
      };
    }),
  );

  const edges: EdgeData[] = rawEdges.map((edge) => {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    return {
      id: `${edge.from}-${edge.to}`,
      x1: from?.left ?? 50,
      y1: from?.top ?? 50,
      x2: to?.left ?? 50,
      y2: to?.top ?? 50,
    };
  });

  return { nodes, edges, depth: levels.length, nodeCount: nodes.length };
};

function generateBSTSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  let nodes: NodeData[] = [];
  const edges: EdgeData[] = [];
  const logs: LogEntry[] = [];

  const emptyStep = createIdleStep("bst");

  if (values.length === 0) {
    return [emptyStep];
  }

  type BSTNode = {
    value: number;
    leftNode: BSTNode | null;
    rightNode: BSTNode | null;
    x: number;
    y: number;
  };

  let root: BSTNode | null = null;

  const getDepth = (node: BSTNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getDepth(node.leftNode), getDepth(node.rightNode));
  };

  const getLeavesCount = (node: BSTNode | null): number => {
    if (!node) return 0;
    if (!node.leftNode && !node.rightNode) return 1;
    return getLeavesCount(node.leftNode) + getLeavesCount(node.rightNode);
  };

  const pushStep = (
    explanation: { title: string; body: React.ReactNode },
    algorithmLogic: AlgStep[],
  ) => {
    steps.push(
      makeStep(
        nodes,
        edges,
        logs,
        explanation,
        algorithmLogic,
        [
          { label: "Depth", value: root ? String(getDepth(root)) : "0" },
          { label: "Nodes", value: String(nodes.length) },
          { label: "Type", value: "BST" },
          { label: "Leaves", value: String(getLeavesCount(root)) },
        ],
      ),
    );
  };

  steps.push(emptyStep);

  for (let i = 0; i < values.length; i++) {
    const val = values[i];

    if (!root) {
      root = { value: val, leftNode: null, rightNode: null, x: 50, y: 12 };
      nodes.push({ id: `node-${i}`, value: val, top: 12, left: 50, active: true, label: "ROOT" });
      logs.push({ message: `Tree root initialized: ${val}`, type: "success" });

      pushStep(
        { title: "Insertion", body: <span>Inserted root node <span className="text-cyan-300">{val}</span>.</span> },
        createLogic([`Select first value ${val}`, "Create root node", "Mark root as placed"], 1),
      );

      nodes = nodes.map((node) => ({ ...node, active: false, label: undefined }));
      continue;
    }

    let current = root;
    let dx = 20;

    nodes = nodes.map((node) =>
      node.value === current.value
        ? { ...node, active: true, label: "CURRENT" }
        : { ...node, active: false, label: undefined },
    );

    pushStep(
      {
        title: "Traversal",
        body: (
          <span>
            Start at root <span className="text-cyan-300">{current.value}</span> to insert{" "}
            <span className="text-violet-300">{val}</span>.
          </span>
        ),
      },
      createLogic(["Start at root", `Compare with ${current.value}`, "Traverse left/right", "Insert node"], 1),
    );

    while (true) {
      logs.push({ message: `Comparing ${val} with ${current.value}`, type: "comparing" });

      if (val < current.value) {
        if (!current.leftNode) {
          const newX = current.x - dx;
          const newY = current.y + 16;
          current.leftNode = { value: val, leftNode: null, rightNode: null, x: newX, y: newY };

          nodes = nodes.map((node) => ({ ...node, active: false, label: undefined }));
          nodes.push({ id: `node-${i}`, value: val, top: newY, left: newX, active: true, label: "NEW" });
          edges.push({ id: `edge-${i}-L`, x1: current.x, y1: current.y, x2: newX, y2: newY });
          logs.push({ message: `Inserted node: ${val} (Left)`, type: "success" });

          pushStep(
            {
              title: "Insertion",
              body: (
                <span>
                  Inserted <span className="text-cyan-300">{val}</span> as left child of {current.value}.
                </span>
              ),
            },
            createLogic([`Compare ${val} with ${current.value}`, "Go left", "Found empty slot", "Insert node"], 3),
          );

          nodes = nodes.map((node) => ({ ...node, active: false, label: undefined }));
          break;
        }

        current = current.leftNode;
        dx /= 1.5;
        nodes = nodes.map((node) =>
          node.value === current.value
            ? { ...node, active: true, label: "CURRENT" }
            : { ...node, active: false, label: undefined },
        );

        pushStep(
          { title: "Traversal", body: <span>Moving LEFT to node <span className="text-cyan-300">{current.value}</span>.</span> },
          createLogic([`Compare ${val}`, "Move left", "Repeat traversal", "Insert when null"], 1),
        );
      } else {
        if (!current.rightNode) {
          const newX = current.x + dx;
          const newY = current.y + 16;
          current.rightNode = { value: val, leftNode: null, rightNode: null, x: newX, y: newY };

          nodes = nodes.map((node) => ({ ...node, active: false, label: undefined }));
          nodes.push({ id: `node-${i}`, value: val, top: newY, left: newX, active: true, label: "NEW" });
          edges.push({ id: `edge-${i}-R`, x1: current.x, y1: current.y, x2: newX, y2: newY });
          logs.push({ message: `Inserted node: ${val} (Right)`, type: "success" });

          pushStep(
            {
              title: "Insertion",
              body: (
                <span>
                  Inserted <span className="text-cyan-300">{val}</span> as right child of {current.value}.
                </span>
              ),
            },
            createLogic([`Compare ${val} with ${current.value}`, "Go right", "Found empty slot", "Insert node"], 3),
          );

          nodes = nodes.map((node) => ({ ...node, active: false, label: undefined }));
          break;
        }

        current = current.rightNode;
        dx /= 1.5;
        nodes = nodes.map((node) =>
          node.value === current.value
            ? { ...node, active: true, label: "CURRENT" }
            : { ...node, active: false, label: undefined },
        );

        pushStep(
          { title: "Traversal", body: <span>Moving RIGHT to node <span className="text-cyan-300">{current.value}</span>.</span> },
          createLogic([`Compare ${val}`, "Move right", "Repeat traversal", "Insert when null"], 1),
        );
      }
    }
  }

  pushStep(
    { title: "Complete", body: <span>BST construction complete.</span> },
    createLogic(["Insert all values", "Update properties", "Construction complete"], 2),
  );

  return steps;
}

function generateBinaryTreeSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];

  if (values.length === 0) return [createIdleStep("tree")];

  steps.push(createIdleStep("tree"));

  for (let i = 0; i < values.length; i++) {
    const current = values.slice(0, i + 1);
    logs.push({ message: `Placed ${values[i]} at level-order index ${i}`, type: "success" });

    const labels: Record<number, string> = { 0: "ROOT", [i]: i === 0 ? "ROOT" : "NEW" };
    const snapshot = buildCompleteTreeSnapshot(current, i, labels);
    const depth = Math.floor(Math.log2(current.length)) + 1;

    steps.push(
      makeStep(
        snapshot.nodes,
        snapshot.edges,
        logs,
        {
          title: "Level-Order Insert",
          body: (
            <span>
              Inserted <span className="text-cyan-300">{values[i]}</span> at the next available position in the binary tree.
            </span>
          ),
        },
        createLogic(["Read next value", "Find next open slot by level", "Insert node"], 2),
        [
          { label: "Depth", value: String(depth) },
          { label: "Nodes", value: String(current.length) },
          { label: "Type", value: "Tree" },
          { label: "Leaves", value: String(Math.ceil(current.length / 2)) },
        ],
      ),
    );
  }

  return steps;
}

function generateArraySimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];

  if (values.length === 0) return [createIdleStep("array")];

  steps.push(createIdleStep("array"));

  for (let i = 0; i < values.length; i++) {
    const current = values.slice(0, i + 1);
    logs.push({ message: `Inserted ${values[i]} at index ${i}`, type: "success" });

    const nodes = buildHorizontalNodes(current, 50, i, { [i]: `A[${i}]` });

    steps.push(
      makeStep(
        nodes,
        [],
        logs,
        {
          title: "Append Element",
          body: (
            <span>
              Added <span className="text-cyan-300">{values[i]}</span> to array index <span className="text-violet-300">{i}</span>.
            </span>
          ),
        },
        createLogic(["Initialize empty array", "Append next element", "Update length"], 1),
        [
          { label: "Length", value: String(current.length) },
          { label: "First", value: String(current[0]) },
          { label: "Last", value: String(current[current.length - 1]) },
          { label: "Type", value: "Array" },
        ],
      ),
    );
  }

  return steps;
}

function generateLinkedListSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];

  if (values.length === 0) return [createIdleStep("linked-list")];

  steps.push(createIdleStep("linked-list"));

  for (let i = 0; i < values.length; i++) {
    const current = values.slice(0, i + 1);
    const labels: Record<number, string> = {};
    if (current.length > 0) labels[0] = current.length === 1 ? "HEAD/TAIL" : "HEAD";
    if (current.length > 1) labels[current.length - 1] = "TAIL";

    const nodes = buildHorizontalNodes(current, 50, i, labels);
    const edges = buildChainEdges(nodes);

    logs.push({ message: `Appended ${values[i]} to tail`, type: "success" });

    steps.push(
      makeStep(
        nodes,
        edges,
        logs,
        {
          title: "Append Node",
          body: (
            <span>
              Linked new node <span className="text-cyan-300">{values[i]}</span> at the tail of the list.
            </span>
          ),
        },
        createLogic(["Track head pointer", "Traverse to tail", "Append and reconnect"], 2),
        [
          { label: "Length", value: String(current.length) },
          { label: "Head", value: String(current[0]) },
          { label: "Tail", value: String(current[current.length - 1]) },
          { label: "Type", value: "Linked List" },
        ],
      ),
    );
  }

  return steps;
}

function generateStackSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];

  if (values.length === 0) return [createIdleStep("stack")];

  steps.push(createIdleStep("stack"));

  for (let i = 0; i < values.length; i++) {
    const current = values.slice(0, i + 1);
    const labels: Record<number, string> = { 0: "BASE", [current.length - 1]: "TOP" };
    const nodes = buildVerticalNodes(current, i, labels);
    const edges = buildChainEdges(nodes);

    logs.push({ message: `Pushed ${values[i]} on stack`, type: "success" });

    steps.push(
      makeStep(
        nodes,
        edges,
        logs,
        {
          title: "Push Operation",
          body: (
            <span>
              Pushed <span className="text-cyan-300">{values[i]}</span> onto stack top.
            </span>
          ),
        },
        createLogic(["Read next value", "Push onto top", "Update top pointer"], 1),
        [
          { label: "Size", value: String(current.length) },
          { label: "Top", value: String(current[current.length - 1]) },
          { label: "Base", value: String(current[0]) },
          { label: "Type", value: "Stack" },
        ],
      ),
    );
  }

  return steps;
}

function generateQueueSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];

  if (values.length === 0) return [createIdleStep("queue")];

  steps.push(createIdleStep("queue"));

  for (let i = 0; i < values.length; i++) {
    const current = values.slice(0, i + 1);
    const labels: Record<number, string> = { 0: "FRONT", [current.length - 1]: current.length === 1 ? "FRONT/BACK" : "BACK" };
    const nodes = buildHorizontalNodes(current, 50, i, labels);
    const edges = buildChainEdges(nodes);

    logs.push({ message: `Enqueued ${values[i]} at queue back`, type: "success" });

    steps.push(
      makeStep(
        nodes,
        edges,
        logs,
        {
          title: "Enqueue Operation",
          body: (
            <span>
              Enqueued <span className="text-cyan-300">{values[i]}</span>. Front remains at the oldest element.
            </span>
          ),
        },
        createLogic(["Read next value", "Append at queue back", "Update back pointer"], 1),
        [
          { label: "Size", value: String(current.length) },
          { label: "Front", value: String(current[0]) },
          { label: "Back", value: String(current[current.length - 1]) },
          { label: "Type", value: "Queue" },
        ],
      ),
    );
  }

  return steps;
}

function generateGraphSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];
  const currentValues: number[] = [];

  const trimmed = values.slice(0, 8);
  if (trimmed.length === 0) return [createIdleStep("graph")];

  steps.push(createIdleStep("graph"));

  for (let i = 0; i < trimmed.length; i++) {
    currentValues.push(trimmed[i]);
    const nodes = buildGraphNodes(currentValues, i);
    const edges = buildGraphEdges(nodes);

    logs.push({ message: `Added vertex ${trimmed[i]} to graph`, type: "success" });
    if (edges.length > 0) {
      logs.push({ message: `Updated graph edges (total: ${edges.length})`, type: "info" });
    }

    const vertices = nodes.length;
    const density = vertices > 1 ? ((2 * edges.length) / (vertices * (vertices - 1))).toFixed(2) : "0.00";

    steps.push(
      makeStep(
        nodes,
        edges,
        logs,
        {
          title: "Vertex Expansion",
          body: (
            <span>
              Added vertex <span className="text-cyan-300">{trimmed[i]}</span> and recalculated connectivity.
            </span>
          ),
        },
        createLogic(["Insert next vertex", "Connect with graph topology", "Recompute properties"], 1),
        [
          { label: "Vertices", value: String(vertices) },
          { label: "Edges", value: String(edges.length) },
          { label: "Density", value: density },
          { label: "Type", value: "Graph" },
        ],
      ),
    );
  }

  return steps;
}

function generateHeapSimulation(values: number[]): SimulationStep[] {
  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];
  const heap: number[] = [];

  if (values.length === 0) return [createIdleStep("heap")];

  steps.push(createIdleStep("heap"));

  const buildProperties = () => [
    { label: "Height", value: heap.length ? String(Math.floor(Math.log2(heap.length)) + 1) : "0" },
    { label: "Nodes", value: String(heap.length) },
    { label: "Root", value: heap.length ? String(heap[0]) : "-" },
    { label: "Type", value: "Max Heap" },
  ];

  for (const value of values) {
    heap.push(value);
    let child = heap.length - 1;

    logs.push({ message: `Inserted ${value} at heap index ${child}`, type: "success" });

    let snapshot = buildCompleteTreeSnapshot(heap, child, {
      0: "ROOT",
      [child]: child === 0 ? "ROOT" : "NEW",
    });

    steps.push(
      makeStep(
        snapshot.nodes,
        snapshot.edges,
        logs,
        {
          title: "Heap Insert",
          body: (
            <span>
              Inserted <span className="text-cyan-300">{value}</span> at heap tail before heapify-up.
            </span>
          ),
        },
        createLogic(["Insert at last index", "Compare with parent", "Swap upward if larger"], 0),
        buildProperties(),
      ),
    );

    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      logs.push({ message: `Comparing child ${heap[child]} with parent ${heap[parent]}`, type: "comparing" });

      snapshot = buildCompleteTreeSnapshot(heap, child, { [parent]: "PARENT", [child]: "CHILD" });

      steps.push(
        makeStep(
          snapshot.nodes,
          snapshot.edges,
          logs,
          {
            title: "Heapify Up",
            body: (
              <span>
                Compare child <span className="text-cyan-300">{heap[child]}</span> with parent <span className="text-violet-300">{heap[parent]}</span>.
              </span>
            ),
          },
          createLogic(["Insert at last index", "Compare with parent", "Swap upward if larger"], 1),
          buildProperties(),
        ),
      );

      if (heap[parent] >= heap[child]) break;

      const temp = heap[parent];
      heap[parent] = heap[child];
      heap[child] = temp;
      logs.push({ message: `Swapped ${heap[child]} with ${heap[parent]} to restore max-heap`, type: "success" });

      child = parent;
      snapshot = buildCompleteTreeSnapshot(heap, child, { [child]: "NEW ROOT PATH" });

      steps.push(
        makeStep(
          snapshot.nodes,
          snapshot.edges,
          logs,
          {
            title: "Heapify Swap",
            body: "Child was larger, so it moved upward in the heap.",
          },
          createLogic(["Insert at last index", "Compare with parent", "Swap upward if larger"], 2),
          buildProperties(),
        ),
      );
    }
  }

  steps.push(
    makeStep(
      buildCompleteTreeSnapshot(heap, -1, { 0: "ROOT" }).nodes,
      buildCompleteTreeSnapshot(heap, -1, { 0: "ROOT" }).edges,
      logs,
      {
        title: "Complete",
        body: "Max-heap construction complete.",
      },
      createLogic(["Insert all values", "Heapify each insertion", "Heap construction complete"], 2),
      [
        { label: "Height", value: heap.length ? String(Math.floor(Math.log2(heap.length)) + 1) : "0" },
        { label: "Nodes", value: String(heap.length) },
        { label: "Root", value: heap.length ? String(heap[0]) : "-" },
        { label: "Type", value: "Max Heap" },
      ],
    ),
  );

  return steps;
}

function generateTrieSimulation(wordsInput: string[]): SimulationStep[] {
  const words = wordsInput.map((word) => word.trim().toLowerCase()).filter(Boolean).slice(0, 8);
  if (words.length === 0) return [createIdleStep("trie")];

  const steps: SimulationStep[] = [];
  const logs: LogEntry[] = [];

  const root: TrieNodeInternal = {
    id: "trie-root",
    value: "∅",
    terminal: false,
    children: new Map(),
  };

  let idCounter = 0;
  let wordsInserted = 0;

  const pushTrieStep = (
    explanation: { title: string; body: React.ReactNode },
    activeNodeId: string | null,
    algorithmLogic: AlgStep[],
  ) => {
    const snapshot = buildTrieSnapshot(root, activeNodeId);
    steps.push(
      makeStep(
        snapshot.nodes,
        snapshot.edges,
        logs,
        explanation,
        algorithmLogic,
        [
          { label: "Depth", value: String(snapshot.depth) },
          { label: "Nodes", value: String(snapshot.nodeCount) },
          { label: "Words", value: String(wordsInserted) },
          { label: "Type", value: "Trie" },
        ],
      ),
    );
  };

  steps.push(createIdleStep("trie"));

  for (const word of words) {
    logs.push({ message: `Inserting word "${word}"`, type: "info" });

    let current = root;
    pushTrieStep(
      {
        title: "Word Start",
        body: (
          <span>
            Starting insertion for word <span className="text-cyan-300">{word}</span>.
          </span>
        ),
      },
      current.id,
      createLogic(["Start from root", "Traverse/create character nodes", "Mark terminal node"], 0),
    );

    for (const char of word) {
      let child = current.children.get(char);
      const wasCreated = !child;

      if (!child) {
        child = {
          id: `trie-${idCounter++}`,
          value: char,
          terminal: false,
          children: new Map(),
        };
        current.children.set(char, child);
        logs.push({ message: `Created node "${char}"`, type: "success" });
      } else {
        logs.push({ message: `Traversed existing node "${char}"`, type: "comparing" });
      }

      current = child;
      pushTrieStep(
        {
          title: wasCreated ? "Character Create" : "Character Traverse",
          body: (
            <span>
              {wasCreated ? "Created" : "Visited"} character node <span className="text-cyan-300">{char}</span>.
            </span>
          ),
        },
        current.id,
        createLogic(["Start from root", "Traverse/create character nodes", "Mark terminal node"], 1),
      );
    }

    current.terminal = true;
    wordsInserted += 1;
    logs.push({ message: `Marked end of word "${word}"`, type: "success" });

    pushTrieStep(
      {
        title: "Word Complete",
        body: (
          <span>
            Marked terminal node for <span className="text-cyan-300">{word}</span>.
          </span>
        ),
      },
      current.id,
      createLogic(["Start from root", "Traverse/create character nodes", "Mark terminal node"], 2),
    );
  }

  return steps;
}

const generateSimulationSteps = (
  structure: DataStructureId,
  input: number[] | string[],
): SimulationStep[] => {
  switch (structure) {
    case "bst":
      return generateBSTSimulation(input as number[]);
    case "tree":
      return generateBinaryTreeSimulation(input as number[]);
    case "linked-list":
      return generateLinkedListSimulation(input as number[]);
    case "array":
      return generateArraySimulation(input as number[]);
    case "graph":
      return generateGraphSimulation(input as number[]);
    case "heap":
      return generateHeapSimulation(input as number[]);
    case "stack":
      return generateStackSimulation(input as number[]);
    case "queue":
      return generateQueueSimulation(input as number[]);
    case "trie":
      return generateTrieSimulation(input as string[]);
    default:
      return [createIdleStep("bst")];
  }
};

export default function SimulationPage() {
  const [dataStructure, setDataStructure] = useState<DataStructureId>("bst");
  const [inputValue, setInputValue] = useState<string>(() => randomInputForStructure("bst"));
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const selectedStructure = useMemo(
    () => DATA_STRUCTURES.find((item) => item.id === dataStructure) ?? DATA_STRUCTURES[0],
    [dataStructure],
  );

  const handleBuildSimulation = () => {
    const parsed =
      selectedStructure.inputMode === "numbers"
        ? filterNumberInput(inputValue).slice(0, 16)
        : filterWordInput(inputValue).slice(0, 10);

    if (parsed.length === 0) {
      setSteps([createIdleStep(dataStructure)]);
      setCurrentStepIndex(0);
      setIsPlaying(false);
      return;
    }

    const generatedSteps = generateSimulationSteps(dataStructure, parsed);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleStructureChange = (nextStructure: DataStructureId) => {
    setDataStructure(nextStructure);
    setInputValue(randomInputForStructure(nextStructure));
    setSteps([]);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed, steps.length]);

  const currentStep = steps[currentStepIndex] || createIdleStep(dataStructure);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep.logs]);

  return (
    <main className="border-x border-cyan-300/20 bg-[#020612] text-slate-100 md:h-[calc(100dvh-5.5rem)] md:overflow-hidden flex flex-col">
      <div className="mx-auto grid w-full max-w-[1900px] flex-1 md:h-full md:min-h-0 md:grid-cols-[200px_1fr_240px] lg:grid-cols-[250px_1fr_300px] xl:grid-cols-[300px_1fr_340px]">
        <aside className="border-b border-cyan-100/10 bg-[#030916] p-3 md:h-full md:min-h-0 flex flex-col md:border-b-0 md:border-r md:p-4">
          <div className="flex items-center justify-between shrink-0">
            <h1 className="ds-title text-slate-100">Input Panel</h1>
            <button className="rounded-md p-2 text-cyan-300 transition hover:bg-cyan-400/10" type="button">
              <span className="sr-only">Options</span>
              <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h9m-9 6h12M4 18h6m6-12 4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="mt-5 shrink-0">
            <p className="ds-label text-slate-400">Data Structure</p>
            <select
              className="ds-body mt-2 rounded-lg border border-cyan-100/12 bg-[#0A111F] px-4 py-3 text-slate-200 w-full focus:outline-none focus:border-cyan-300"
              onChange={(event) => handleStructureChange(event.target.value as DataStructureId)}
              value={dataStructure}
            >
              {DATA_STRUCTURES.map((structure) => (
                <option key={structure.id} value={structure.id}>
                  {structure.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 shrink-0">
            <p className="ds-label text-slate-400">{selectedStructure.inputLabel} (CSV)</p>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="ds-body mt-2 rounded-lg border border-cyan-100/12 bg-[#0A111F] px-4 py-3 text-slate-200 w-full"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 shrink-0">
            <button
              className="ds-button rounded border border-cyan-300/40 bg-cyan-400 px-3 py-2.5 tracking-[0.2em] text-[#073B45] hover:bg-cyan-300 transition-colors"
              type="button"
              onClick={handleBuildSimulation}
            >
              RUN
            </button>
            <button
              className="ds-button rounded border border-violet-400/60 bg-violet-400/5 px-3 py-2.5 tracking-[0.2em] text-violet-200 hover:bg-violet-400/20 transition-colors"
              onClick={() => setInputValue(randomInputForStructure(dataStructure))}
              type="button"
            >
              RANDOMIZE
            </button>
          </div>

          <div className="mt-6 border-t border-cyan-100/10 pt-5 flex-1 flex flex-col min-h-0">
            <p className="ds-label text-slate-400 shrink-0">Operations Log</p>
            <div className="flex-1 overflow-y-auto mt-4 pr-2 custom-scrollbar">
              <ul className="ds-small space-y-3">
                {currentStep.logs.map((log, index) => (
                  <li key={`${log.message}-${index}`} className={`flex items-start gap-2 ${log.type === "success" ? "text-cyan-300" : log.type === "comparing" ? "text-violet-300" : "text-slate-400"}`}>
                    {log.type === "success" && <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />}
                    {log.type === "comparing" && <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />}
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
              {selectedStructure.badge}
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

            {currentStep.nodes.map((node) => (
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
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
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
              <span className="ds-label text-slate-500">Speed</span>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={2200 - speed}
                  onChange={(event) => setSpeed(2200 - Number.parseInt(event.target.value, 10))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            <div className="text-right">
              <p className="ds-label text-slate-500">Step</p>
              <p className="ds-metric text-cyan-300">
                {steps.length > 0 ? currentStepIndex + 1 : 0}/{steps.length > 0 ? steps.length : 0}
              </p>
            </div>
          </div>
        </section>

        <aside className="bg-[#030916] p-3 md:h-full md:min-h-0 md:overflow-y-auto md:p-4 xl:p-5 flex flex-col">
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <InfoIcon className="h-5 w-5 md:h-6 md:w-6 text-cyan-300" />
            <h2 className="ds-title text-slate-100">Explanation</h2>
          </div>

          <section className="mt-5 rounded-lg border border-cyan-100/10 bg-[#0B1221] p-4 shrink-0 transition-all">
            <p className="ds-label text-cyan-300">Current Step: {currentStep.explanation.title}</p>
            <p className="ds-body mt-2 text-slate-200">{currentStep.explanation.body}</p>
          </section>

          <section className="mt-5 shrink-0">
            <h3 className="ds-label text-slate-400">Algorithm Logic</h3>
            <ol className="ds-body mt-3 space-y-2 rounded-lg border border-cyan-100/10 bg-[#111725] p-4 text-slate-300">
              {currentStep.algorithmLogic.map((step, idx) => (
                <li
                  key={`${step.text}-${idx}`}
                  className={
                    step.status === "active"
                      ? "font-semibold text-cyan-300"
                      : step.status === "completed"
                        ? "text-slate-400"
                        : "text-slate-600"
                  }
                >
                  {step.text}
                </li>
              ))}
              {currentStep.algorithmLogic.length === 0 && (
                <li className="text-slate-500 italic">No logic currently active.</li>
              )}
            </ol>
          </section>

          <section className="mt-6 shrink-0">
            <h3 className="ds-label text-slate-400">Properties</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {currentStep.properties.map((item) => (
                <div className="rounded border border-cyan-100/10 bg-[#111725] px-3 py-2.5" key={item.label}>
                  <p className="ds-label text-slate-500">{item.label}</p>
                  <p className="ds-metric mt-1 text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
