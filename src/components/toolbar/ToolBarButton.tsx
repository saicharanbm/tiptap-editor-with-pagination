import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ToolBarButtonProps {
  label: string;
  onClick: () => void;
  // isActive?: boolean;
  icon: LucideIcon;
  // isDisabled?: boolean;
}

function ToolBarButton({
  label,
  onClick,
  // isActive = false,
  icon: Icon,
}: // isDisabled = false,
ToolBarButtonProps) {
  // convert isActive and isDisabled and conditionally handle based on lable
  const editor = useEditorStore((s) => s.editor);
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const stateDataRef = useRef({ isActive, isDisabled });

  useEffect(() => {
    stateDataRef.current = { isActive, isDisabled };
  }, [isActive, isDisabled]);
  console.log("label", label);

  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      switch (label) {
        case "Undo":
          if (!editor.can().undo() !== stateDataRef.current.isDisabled)
            setIsDisabled(!editor.can().undo());
          break;
        case "Redo":
          if (!editor.can().redo() !== stateDataRef.current.isDisabled)
            setIsDisabled(!editor.can().redo());
          break;
        case "Bold":
          if (editor.isActive("bold") !== stateDataRef.current.isActive)
            setIsActive(editor.isActive("bold"));
          break;
        case "Italic":
          if (editor.isActive("italic") !== stateDataRef.current.isActive)
            setIsActive(editor.isActive("italic"));
          break;
        case "Underline":
          if (editor.isActive("underline") !== stateDataRef.current.isActive)
            setIsActive(editor.isActive("underline"));
          break;
        case "Strike":
          if (editor.isActive("strike") !== stateDataRef.current.isActive)
            setIsActive(editor.isActive("strike"));
          break;
      }
    };
    editor.on("transaction", handler);
    return () => {
      editor.off("transaction", handler);
    };
  }, [editor, label]);
  return (
    <button
      onClick={onClick}
      title={label}
      disabled={isDisabled}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm text-[#242424]",
        "hover:bg-toggle-active hover:text-toggle-text-active",
        " disabled:text-neutral-400 disabled:cursor-not-allowed",
        isActive && "bg-toggle-active"
      )}
    >
      <Icon
        className={cn(
          "size-4",
          isDisabled ? "text-neutral-400" : "hover:text-[#694c80]",
          isActive && "text-[#694c80]"
        )}
        strokeWidth={2.5}
      />
    </button>
  );
}

export default ToolBarButton;
