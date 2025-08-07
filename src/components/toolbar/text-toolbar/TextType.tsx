import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
function TextType() {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false); // local dropdown open state
  const headings: { label: string; value: number; fontSize: string }[] = [
    { label: "P", value: 0, fontSize: "16px" },
    { label: "H1", value: 1, fontSize: "32px" },
    { label: "H2", value: 2, fontSize: "24px" },
    { label: "H3", value: 3, fontSize: "20px" },
    { label: "H4", value: 4, fontSize: "18px" },
    { label: "H5", value: 5, fontSize: "16px" },
    { label: "H6", value: 6, fontSize: "14px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level: level })) {
        return `H${level}`;
      }
    }
    return "P";
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-12 px-2 shrink-0 flex items-center  justify-center rounded-sm cursor-pointer focus:outline-none focus:ring-0 hover:text-toggle-text-active  overflow-hidden ",
            open && "text-toggle-text-active"
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
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
