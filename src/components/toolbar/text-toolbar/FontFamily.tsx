import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
export default function FontFamily() {
  const { editor } = useEditorStore();
  const [open, setOpen] = useState(false);

  const fonts: { label: string; value: string }[] = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Garamond", value: "Garamond" },
  ];

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
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          {open ? (
            <ChevronUpIcon className="ml-2 size-4 shrink-0" />
          ) : (
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={label}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-toggle-active",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-toggle-active "
            )}
            style={{ fontFamily: value }}
            onClick={() => {
              editor?.chain().focus().setFontFamily(value).run();

              setOpen(false);
            }}
          >
            {value}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
