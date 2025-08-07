import { useEditorStore } from "@/store/useEditorStore";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

import { useMemo } from "react";
import ToolBarButton from "../ToolBarButton";

function TextAlignment() {
  const { editor } = useEditorStore();
  const alignments = useMemo(
    () => [
      {
        label: "Text Align Left",
        value: "left",
        icon: AlignLeftIcon,
        onClick: () => {
          editor?.chain().focus().setTextAlign("left").run();
        },
      },
      {
        label: "Text Align Center",
        value: "center",
        icon: AlignCenterIcon,
        onClick: () => {
          editor?.chain().focus().setTextAlign("center").run();
        },
      },
      {
        label: "Text Align Right",
        value: "right",
        icon: AlignRightIcon,
        onClick: () => {
          editor?.chain().focus().setTextAlign("right").run();
        },
      },
    ],
    [editor]
  );
  return (
    <div className="flex gap-1">
      {alignments.map((items) => (
        <ToolBarButton key={items.label} {...items} />
      ))}
    </div>
  );
}

export default TextAlignment;
