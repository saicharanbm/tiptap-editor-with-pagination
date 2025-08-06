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
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-toggle-active",
        isActive && "bg-toggle-active"
      )}
    >
      <Icon
        className="size-4"
        color={isActive ? "#694c80" : "#242424"}
        strokeWidth={2.5}
      />
    </button>
  );
}

export default ToolBarButton;
