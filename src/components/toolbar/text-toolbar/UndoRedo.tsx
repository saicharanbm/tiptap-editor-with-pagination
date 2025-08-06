import { useEditorStore } from "@/store/useEditorStore";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import ToolBarButton from "../ToolBarButton";

function UndoRedo() {
  const editor = useEditorStore((s) => s.editor);
  const undoRedoButtons = [
    {
      label: "Undo",
      icon: Undo2Icon,
      onClick: () => {
        editor?.chain().focus().undo().run();
        console.log(editor);
      },
      isActive: false,
    },
    {
      label: "Redo",
      icon: Redo2Icon,
      onClick: () => {
        editor?.chain().focus().redo().run();
      },
      isActive: false,
    },
  ];
  return (
    <>
      {undoRedoButtons.map((data) => (
        <ToolBarButton key={data.label} {...data} />
      ))}
    </>
  );
}

export default UndoRedo;
