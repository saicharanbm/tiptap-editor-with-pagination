import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SketchPicker, type ColorResult } from "react-color";
import { HighlighterIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { useEffect, useRef, useState } from "react";
function TextHighlighter() {
  const editor = useEditorStore((s) => s.editor);
  const [color, setColor] = useState(editor?.getAttributes("highlight").color);
  const colorRef = useRef(color);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    if (!editor) return;
    const handle = () => {
      const currentColor = editor?.getAttributes("highlight").color;
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
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center  rounded-sm focus:outline-none focus:ring-0 hover:bg-toggle-active px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 z-50">
        <SketchPicker
          color={color}
          onChange={(color: ColorResult) => {
            editor?.chain().focus().setHighlight({ color: color.hex }).run();
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextHighlighter;
