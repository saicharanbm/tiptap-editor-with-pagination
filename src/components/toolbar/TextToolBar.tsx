import Divider from "./Divider";
import AddImageButton from "./text-toolbar/AddImageButton";
import AddLinkButton from "./text-toolbar/AddLinkButton";
import FontFamily from "./text-toolbar/FontFamily";
import TextColor from "./text-toolbar/TextColor";
import TextDecoration from "./text-toolbar/TextDecoration";
import TextHighlighter from "./text-toolbar/TextHighlighter";
import TextType from "./text-toolbar/TextType";
import UndoRedo from "./text-toolbar/UndoRedo";

function TextToolBar() {
  return (
    <div className="w-full flex items-center min-h-10 bg-[#F2EDF7] border-b-2 border-[#f0eaf7] p-1.5">
      <FontFamily />
      <Divider />
      <TextType />
      <Divider />
      <TextDecoration />
      <AddLinkButton />
      <Divider />
      <div className="flex gap-1">
        <TextColor />
        <TextHighlighter />
      </div>
      <Divider />

      <UndoRedo />
      <Divider />
      <AddImageButton />
    </div>
  );
}

export default TextToolBar;
