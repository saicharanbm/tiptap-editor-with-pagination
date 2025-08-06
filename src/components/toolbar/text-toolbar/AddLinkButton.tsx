import { useState } from "react";

import { LinkIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/useEditorStore";

function AddLinkButton() {
  const { editor } = useEditorStore();
  const [link, setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="text-sm h-7 min-w-7 flex items-center justify-center rounded-sm text-[#242424] hover:bg-toggle-active hover:text-toggle-text-active">
          <LinkIcon strokeWidth={2.2} className="size-4 " />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://www.vettam.ai/"
          value={link}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(link)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddLinkButton;
