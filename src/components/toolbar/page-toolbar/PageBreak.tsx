import { useEditorStore } from "@/store/useEditorStore";
import { BetweenHorizonalEndIcon } from "lucide-react";

function PageBreak() {
  const editor = useEditorStore((s) => s.editor);
  return (
    <button
      className="flex gap-1 p-1 items-center rounded-md  hover:bg-toggle-active hover:text-toggle-text-active  cursor-pointer"
      onClick={() => editor?.chain().focus().insertPageBreak().run()}
    >
      <span>Page Break</span>
      <BetweenHorizonalEndIcon width={15} strokeWidth={2.5} />
    </button>
  );
}

export default PageBreak;
