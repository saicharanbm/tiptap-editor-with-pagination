import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { SketchPicker, type ColorResult } from "react-color";

function TextColor() {
  const editor = useEditorStore((s) => s.editor);
  const [color, setColor] = useState(
    editor?.getAttributes("textStyle").color || "#000000"
  );
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    if (!editor) return;
    const handle = () => {
      const currentColor =
        editor?.getAttributes("textStyle").color || "#000000";
      if (currentColor !== colorRef.current) {
        setColor(currentColor);
      }
    };
    editor.on("transaction", handle);
    return () => {
      editor.off("transaction", handle);
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center focus:outline-none focus:ring-0 rounded-sm hover:bg-toggle-active hover:text-toggle-text-active px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div className="h-1 w-full " style={{ backgroundColor: color }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 z-50">
        <SketchPicker
          color={color}
          onChange={(color: ColorResult) => {
            editor?.chain().focus().setColor(color.hex).run();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextColor;
