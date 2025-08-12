import { useEditorStore } from "@/store/useEditorStore";
import { TrashIcon } from "lucide-react";

function DeletePage() {
  const deletePage = useEditorStore((s) => s.deletePage);
  const currentPage = useEditorStore((s) => s.currentPage);

  return (
    <button
      className="flex gap-1 p-1 items-center rounded-md  hover:bg-toggle-active hover:text-toggle-text-active  cursor-pointer"
      onClick={() => deletePage(currentPage)}
    >
      <span>Delete Page</span>
      <TrashIcon width={15} strokeWidth={2.5} />
    </button>
  );
}

export default DeletePage;
