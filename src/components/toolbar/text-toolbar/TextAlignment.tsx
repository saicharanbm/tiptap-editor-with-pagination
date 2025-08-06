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
        isActive: editor?.isActive({ textAlign: "left" }),
        onClick: () => {
          editor?.chain().focus().setTextAlign("left").run();
        },
      },
      {
        label: "Text Align Center",
        value: "center",
        icon: AlignCenterIcon,
        isActive: editor?.isActive({ textAlign: "center" }),
        onClick: () => {
          editor?.chain().focus().setTextAlign("center").run();
        },
      },
      {
        label: "Text Align Right",
        value: "right",
        icon: AlignRightIcon,
        isActive: editor?.isActive({ TextAlign: "right" }),
        onClick: () => {
          editor?.chain().focus().setTextAlign("right").run();
        },
      },
    ],
    [editor]
  );
  return (
    <>
      {alignments.map((items) => (
        <ToolBarButton key={items.label} {...items} />
      ))}
    </>
  );
}

export default TextAlignment;
