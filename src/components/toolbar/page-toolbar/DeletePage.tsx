import { useEditorStore } from "@/store/useEditorStore";
import ToolBarButton from "../ToolBarButton";
import { TrashIcon } from "lucide-react";

function DeletePage() {
  const deletePage = useEditorStore((s) => s.deletePage);
  const currentPage = useEditorStore((s) => s.currentPage);

  return (
    <ToolBarButton
      label="Delete Page"
      onClick={() => deletePage(currentPage)}
      icon={TrashIcon}
    />
  );
}

export default DeletePage;
