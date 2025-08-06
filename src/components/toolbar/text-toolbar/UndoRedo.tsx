import { useEditorStore } from "@/store/useEditorStore";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import ToolBarButton from "../ToolBarButton";

function UndoRedo() {
  const { editor } = useEditorStore();
  const undoRedoButtons = [
    {
      label: "Undo",
      icon: Undo2Icon,
      onClick: () => {
        editor?.chain().focus().undo().run();
        console.log(editor);
      },
      isActive: false,
      isDisabled: !editor?.can().undo(),
    },
    {
      label: "Redo",
      icon: Redo2Icon,
      onClick: () => {
        editor?.chain().focus().redo().run();
      },
      isActive: false,
      isDisabled: !editor?.can().redo(),
    },
  ];
  console.log("can redo", editor?.can().redo());
  console.log("can undo", editor?.can().undo());

  return (
    <>
      {undoRedoButtons.map((data) => (
        <ToolBarButton key={data.label} {...data} />
      ))}
    </>
  );
}

export default UndoRedo;
