import { useState } from "react";

import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AddImageButton() {
  const editor = useEditorStore((s) => s.editor);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    editor?.getAttributes("link").href || ""
  );

  const onChange = (url: string) => {
    editor?.chain().focus().setImage({ src: url }).run();
    setImageUrl("");
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const image = URL.createObjectURL(file);
        onChange(image);
      }
    };
    input.click();
  };

  const handleImageUrlSubmition = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-sm h-7 min-w-7 flex items-center justify-center rounded-sm text-[#242424] hover:bg-toggle-active hover:text-toggle-text-active">
            <ImageIcon className="size-4" strokeWidth={2.2} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 bg-[#FCFAFF] rounded-sm shadow-sm top-2 ">
          <DropdownMenuItem
            onClick={onUpload}
            className="focus:bg-toggle-active focus:text-toggle-text-active"
          >
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-toggle-active focus:text-toggle-text-active"
            onClick={() => setIsDialogOpen(true)}
          >
            <SearchIcon className="size-4 mr-2" />
            Paste Image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image url</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmition();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmition}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddImageButton;
