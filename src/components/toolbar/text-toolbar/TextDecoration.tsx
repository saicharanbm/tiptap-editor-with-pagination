import { useEditorStore } from "@/store/useEditorStore";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import ToolBarButton from "../ToolBarButton";

function TextDecoration() {
  // useEditorStore((s) => s.editor) does not work in this case becouse the domponent does not re-render on every minute
  //changes in the editor, which is require in this case to track isActive.
  const editor = useEditorStore((s) => s.editor);
  const decorationList = [
    {
      label: "Bold",
      icon: BoldIcon,
      onClick: () => {
        editor?.chain().focus().toggleBold().run();
      },
    },
    {
      label: "Italic",
      icon: ItalicIcon,
      onClick: () => {
        editor?.chain().focus().toggleItalic().run();
      },
    },
    {
      label: "Underline",
      icon: UnderlineIcon,
      onClick: () => {
        editor?.chain().focus().toggleUnderline().run();
      },
    },
    {
      label: "Strike",
      icon: StrikethroughIcon,
      onClick: () => {
        editor?.chain().focus().toggleStrike().run();
      },
    },
  ];
  return (
    <div className="flex gap-1">
      {decorationList.map((data) => (
        <ToolBarButton key={data.label} {...data} />
      ))}
    </div>
  );
}

export default TextDecoration;
