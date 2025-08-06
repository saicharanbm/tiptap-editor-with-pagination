import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SketchPicker, type ColorResult } from "react-color";
import { HighlighterIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
function TextHighlighter() {
  const { editor } = useEditorStore();
  const color = editor?.getAttributes("highlight").color;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center  rounded-sm focus:outline-none focus:ring-0 hover:bg-toggle-active px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4 shrink-0" color={color} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
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
