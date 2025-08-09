import { useEditorStore } from "@/store/useEditorStore";
import ToolBarButton from "../ToolBarButton";
import { BetweenHorizonalEndIcon } from "lucide-react";

function PageBreak() {
  const editor = useEditorStore((s) => s.editor);
  return (
    <ToolBarButton
      label="Page Break"
      onClick={() => editor?.chain().focus().insertPageBreak().run()}
      icon={BetweenHorizonalEndIcon}
    />
  );
}

export default PageBreak;
