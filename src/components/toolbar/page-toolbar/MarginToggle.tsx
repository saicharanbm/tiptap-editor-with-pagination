import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function MarginToggle() {
  const showMargin = useEditorStore((s) => s.showMargin);
  const setShowMargin = useEditorStore((s) => s.setShowMargin);

  return (
    <button
      className={cn(
        "flex gap-1 p-1 items-center rounded-md  hover:bg-toggle-active hover:text-toggle-text-active  cursor-pointer",
        showMargin && " bg-toggle-active text-toggle-text-active"
      )}
      onClick={() => setShowMargin()}
    >
      <span>Margin</span>
      {showMargin ? (
        <EyeIcon width={15} strokeWidth={2.5} />
      ) : (
        <EyeOffIcon width={15} strokeWidth={2.5} />
      )}
    </button>
  );
}

export default MarginToggle;
