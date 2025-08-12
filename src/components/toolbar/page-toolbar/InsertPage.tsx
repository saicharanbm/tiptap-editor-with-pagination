import { FilePlus2Icon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";

function InsertPage() {
  const addNewPage = useEditorStore((s) => s.addNewPage);
  const currentPage = useEditorStore((s) => s.currentPage);
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);

  return (
    <button
      className="flex gap-1 p-1 items-center rounded-md  hover:bg-toggle-active hover:text-toggle-text-active  cursor-pointer"
      onClick={() => {
        addNewPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }}
    >
      <span>Insert Page</span>
      <FilePlus2Icon width={15} strokeWidth={2.5} />
    </button>
  );
}

export default InsertPage;
