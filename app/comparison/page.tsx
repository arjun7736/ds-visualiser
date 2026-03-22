import { ConsoleShell } from "../components/dashboard/ConsoleShell";
import { ComparisonEngine } from "../components/pages/ComparisonEngine";

export default function ComparisonPage() {
  const sidebarItems = [
    { label: "Sorting", active: true },
    { label: "Searching" },
    { label: "Structures" },
  ];

  return (
    <ConsoleShell activeNav="algorithms" sidebarItems={sidebarItems}>
      <ComparisonEngine />
    </ConsoleShell>
  );
}
