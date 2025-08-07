import { useEditorStore } from "@/store/useEditorStore";
import { ListIcon, ListOrderedIcon } from "lucide-react";

import { useMemo } from "react";
import ToolBarButton from "../ToolBarButton";

function AddListButtons() {
  const editor = useEditorStore((s) => s.editor);
  const alignments = useMemo(
    () => [
      {
        label: "Bullet List",

        icon: ListIcon,
        isActive: editor?.isActive("bulletList"),
        onClick: () => {
          editor?.chain().focus().toggleBulletList().run();
        },
      },
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        isActive: editor?.isActive("orderedList"),
        onClick: () => {
          editor?.chain().focus().toggleOrderedList().run();
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

export default AddListButtons;
