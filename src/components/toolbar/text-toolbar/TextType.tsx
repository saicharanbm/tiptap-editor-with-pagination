import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { headings } from "@/utils/constants";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
function TextType() {
  const editor = useEditorStore((s) => s.editor);
  const [open, setOpen] = useState(false); // local dropdown open state
  const getCurrentHeading = useCallback(() => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level: level })) {
        return `H${level}`;
      }
    }
    return "P";
  }, [editor]);
  const [currentTextType, setCurrentTextType] = useState(getCurrentHeading());
  // we are using ref to pass the updated value to the handler
  const currentTextTypeRef = useRef(currentTextType);

  useEffect(() => {
    currentTextTypeRef.current = currentTextType;
  }, [currentTextType]);

  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      const currentTextType = getCurrentHeading();
      if (currentTextType !== currentTextTypeRef.current) {
        setCurrentTextType(currentTextType);
      }
    };

    editor.on("transaction", handler);

    return () => {
      editor.off("transaction", handler);
    };
  }, [editor, getCurrentHeading]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-18 px-2 shrink-0 flex items-center  justify-center rounded-sm cursor-pointer focus:outline-none focus:ring-0 hover:text-toggle-text-active  overflow-hidden ",
            open && "text-toggle-text-active"
          )}
        >
          <span className="truncate">{currentTextType}</span>
          {open ? (
            <ChevronUpIcon className="ml-2 size-4 shrink-0" />
          ) : (
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#FCFAFF]">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-toggle-active",
              ((value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: value })) &&
                "bg-toggle-active"
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
                return;
              }
              editor
                ?.chain()
                .focus()
                .toggleHeading({ level: value as Level })
                .run();
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextType;
