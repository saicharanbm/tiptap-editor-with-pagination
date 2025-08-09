import { FilePlus2Icon } from "lucide-react";
import ToolBarButton from "../ToolBarButton";
import { useEditorStore } from "@/store/useEditorStore";

function InsertPage() {
  const addNewPage = useEditorStore((s) => s.addNewPage);
  const currentPage = useEditorStore((s) => s.currentPage);
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);

  return (
    <ToolBarButton
      label="Insert Page"
      onClick={() => {
        addNewPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
      }}
      icon={FilePlus2Icon}
    />
  );
}

export default InsertPage;
