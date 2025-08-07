import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { fonts } from "@/utils/constants";
export default function FontFamily() {
  const editor = useEditorStore((s) => s.editor);
  const [open, setOpen] = useState(false);
  const [currentFont, setCurrentFont] = useState(
    editor?.getAttributes("textStyle").fontFamily || "Arial"
  );
  const currentFontRef = useRef(currentFont);

  useEffect(() => {
    currentFontRef.current = currentFont;
  }, [currentFont]);

  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      const currentFont =
        editor?.getAttributes("textStyle").fontFamily || "Arial";
      if (currentFont !== currentFontRef.current) {
        setCurrentFont(currentFont);
      }
    };
    editor.on("transaction", handler);

    return () => {
      editor.off("transaction", handler);
    };
  }, [editor]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          style={{
            fontFamily:
              editor?.getAttributes("textStyle").fontFamily || "Arial",
          }}
          className={cn(
            "h-7 w-[120px] px-2 shrink-0 flex items-center  justify-between rounded-sm cursor-pointer focus:outline-none focus:ring-0 hover:text-toggle-text-active  overflow-hidden ",
            open && "text-toggle-text-active"
          )}
        >
          <span className="truncate">{currentFont}</span>
          {open ? (
            <ChevronUpIcon className="ml-2 size-4 shrink-0" />
          ) : (
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#FCFAFF]">
        {fonts.map(({ label, value }) => (
          <button
            key={label}
            title="Font Family"
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-toggle-active",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-toggle-active "
            )}
            style={{ fontFamily: value }}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();
            }}
          >
            {value}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
