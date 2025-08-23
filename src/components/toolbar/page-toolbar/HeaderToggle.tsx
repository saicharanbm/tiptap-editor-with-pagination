import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function HeaderToggle() {
  const showHeaderAndFooter = useEditorStore((s) => s.showHeaderAndFooter);
  const setShowHeaderAndFooter = useEditorStore(
    (s) => s.setShowHeaderAndFooter
  );

  return (
    <button
      className={cn(
        "flex gap-1 p-1 items-center rounded-md  hover:bg-toggle-active hover:text-toggle-text-active  cursor-pointer",
        showHeaderAndFooter && " bg-toggle-active text-toggle-text-active"
      )}
      onClick={() => setShowHeaderAndFooter()}
    >
      <span>Header & Footer</span>
      {showHeaderAndFooter ? (
        <EyeIcon width={15} strokeWidth={2.5} />
      ) : (
        <EyeOffIcon width={15} strokeWidth={2.5} />
      )}
    </button>
  );
}

export default HeaderToggle;
