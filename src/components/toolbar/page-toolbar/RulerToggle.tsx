import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function RulerToggle() {
  const showRulerMarker = useEditorStore((s) => s.showRulerMarker);
  const setShowRulerMarker = useEditorStore((s) => s.setShowRulerMarker);

  return (
    <button
      className={cn(
        "flex gap-1 p-1 items-center rounded-md  hover:bg-toggle-active hover:text-toggle-text-active  cursor-pointer",
        showRulerMarker && " bg-toggle-active text-toggle-text-active"
      )}
      onClick={() => setShowRulerMarker()}
    >
      <span>Ruler Marker</span>
      {showRulerMarker ? (
        <EyeIcon width={15} strokeWidth={2.5} />
      ) : (
        <EyeOffIcon width={15} strokeWidth={2.5} />
      )}
    </button>
  );
}

export default RulerToggle;
