import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface ToolBarButtonProps {
  label: string;
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  isDisabled?: boolean;
}

function ToolBarButton({
  label,
  onClick,
  isActive = false,
  icon: Icon,
  isDisabled = false,
}: ToolBarButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      disabled={isDisabled}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm text-[#242424]",
        "hover:bg-toggle-active hover:text-toggle-text-active",
        " disabled:text-neutral-400 disabled:cursor-not-allowed",
        isActive && "bg-toggle-active"
      )}
    >
      <Icon
        className={cn(
          "size-4",
          isDisabled ? "text-neutral-400" : "hover:text-[#694c80]",
          isActive && "text-[#694c80]"
        )}
        strokeWidth={2.5}
      />
    </button>
  );
}

export default ToolBarButton;
