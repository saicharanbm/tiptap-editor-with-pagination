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
        // console.log(editor);
      },
    },
    {
      label: "Redo",
      icon: Redo2Icon,
      onClick: () => {
        editor?.chain().focus().redo().run();
      },
    },
  ];
  // console.log("can redo", editor?.can().redo());
  // console.log("can undo", editor?.can().undo());

  return (
    <div className="flex gap-1">
      {undoRedoButtons.map((data) => (
        <ToolBarButton key={data.label} {...data} />
      ))}
    </div>
  );
}

export default UndoRedo;
