import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface ToolBarButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

function ToolBarButton({
  label,
  onClick,
  isActive = false,
  icon: Icon,
}: ToolBarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

export default ToolBarButton;
