import { AskButton } from "@/components/Ask/AskButton";
import { KnowledgeButton } from "@/components/knowledge/KnowledgeButton";

export default function Home() {
  return (
    <div className="h-full">
      <KnowledgeButton />
      <AskButton />
    </div>
  );
}
