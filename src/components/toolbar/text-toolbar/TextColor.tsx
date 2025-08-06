import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SketchPicker, type ColorResult } from "react-color";

function TextColor() {
  const { editor } = useEditorStore();
  const color = editor?.getAttributes("textStyle").color || "#000000";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center focus:outline-none focus:ring-0 rounded-sm hover:bg-toggle-active hover:text-toggle-text-active px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full " style={{ backgroundColor: color }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
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
