import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function LineHeight() {
  const editor = useEditorStore((s) => s.editor);
  const [open, setOpen] = useState(false);
  const getLineHeightType = useCallback((value: string) => {
    switch (value) {
      case "1":
        return "Extra Tight";
      case "1.25":
        return "Tight";
      case "1.5":
        return "Normal";
      case "1.75":
        return "Relaxed";
      case "2":
        return "Loose";
      default:
        return "Normal";
    }
  }, []);
  const [lineHeight, setLineHeight] = useState(
    getLineHeightType(
      editor?.getAttributes("paragraph").lineHeight ||
        editor?.getAttributes("heading").lineHeight
    )
  );
  const lineHeightRef = useRef(lineHeight);

  useEffect(() => {
    lineHeightRef.current = lineHeight;
  }, [lineHeight]);

  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      const currentLineHeight = getLineHeightType(
        editor.getAttributes("paragraph").lineHeight ||
          editor.getAttributes("heading").lineHeight
      );

      if (currentLineHeight !== lineHeightRef.current) {
        setLineHeight(currentLineHeight);
      }
    };

    //  We subscribe to transaction to run this effect on every changes in the editor
    // conditionally update the state to avoid re-render of component on every changes in the editor.
    editor.on("transaction", handler);

    return () => {
      editor.off("transaction", handler);
    };
  }, [editor, getLineHeightType]);

  const alignments = [
    { label: "Extra Tight", value: "1" },
    { label: "Tight", value: "1.25" },
    { label: "Normal", value: "1.5" },
    { label: "Relaxed", value: "1.75" },
    { label: "Loose", value: "2" },
  ];
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          title="Line height"
          className={cn(
            "h-7 w-[120px] px-2 shrink-0 flex items-center  justify-between rounded-sm cursor-pointer focus:outline-none focus:ring-0 hover:text-toggle-text-active  overflow-hidden ",
            open && "text-toggle-text-active"
          )}
        >
          <span className="truncate">{lineHeight}</span>
          {open ? (
            <ChevronUpIcon className="ml-2 size-4 shrink-0" />
          ) : (
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#FCFAFF]">
        {alignments.map(({ label, value }) => (
          <button
            key={label}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-toggle-active",
              (editor?.getAttributes("paragraph").lineHeight === value ||
                editor?.getAttributes("heading").lineHeight === value) &&
                "bg-toggle-active"
            )}
            onClick={() => {
              editor?.chain().focus().setLineHeight(value).run();
            }}
          >
            {value}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LineHeight;
