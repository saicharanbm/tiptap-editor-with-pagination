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
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm text-[#242424] hover:bg-toggle-active hover:text-toggle-text-active",
        isActive && "bg-toggle-active"
      )}
    >
      <Icon
        className={cn(
          "size-4  hover:text-[#694c80]",
          isActive && "text-[#694c80]"
        )}
        strokeWidth={2.5}
      />
    </button>
  );
}

export default ToolBarButton;
