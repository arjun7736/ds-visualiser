import { ConsoleShell } from "../components/dashboard/ConsoleShell";
import { SimulationWorkspace } from "../components/pages/SimulationWorkspace";

export default function SimulationPage() {
  const sidebarItems = [
    { label: "Sorting", active: true },
    { label: "Searching" },
    { label: "Structures" },
  ];

  return (
    <ConsoleShell activeNav="algorithms" sidebarItems={sidebarItems}>
      <SimulationWorkspace />
    </ConsoleShell>
  );
}
