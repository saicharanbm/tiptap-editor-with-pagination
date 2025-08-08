import Divider from "./Divider";
import AddImageButton from "./text-toolbar/AddImageButton";
import AddLinkButton from "./text-toolbar/AddLinkButton";
import FontFamily from "./text-toolbar/FontFamily";
import TextColor from "./text-toolbar/TextColor";
import TextDecoration from "./text-toolbar/TextDecoration";
import TextHighlighter from "./text-toolbar/TextHighlighter";
import TextType from "./text-toolbar/TextType";
import UndoRedo from "./text-toolbar/UndoRedo";
import TextAlignment from "./text-toolbar/TextAlignment";
import AddListButtons from "./text-toolbar/AddListButtons";
import TextSize from "./text-toolbar/TextSize";
import LineHeight from "./text-toolbar/LineHeight";
import PageBreak from "./text-toolbar/PageBreak";

function TextToolBar() {
  return (
    <div className="w-full flex items-center justify-center  flex-wrap gap-y-2  bg-[#F2EDF7] border-b-2 border-[#f0eaf7] p-1.5">
      <FontFamily />
      <Divider />
      <LineHeight />
      <Divider />
      <TextType />
      <Divider />
      <TextSize />
      <Divider />
      <div className="flex gap-1">
        <TextDecoration />
        <AddLinkButton />
      </div>
      <Divider />
      <TextAlignment />
      <Divider />
      <div className="flex gap-1">
        <TextColor />
        <TextHighlighter />
      </div>
      <Divider />
      <AddListButtons />
      <Divider />

      <UndoRedo />
      <Divider />
      <div className="flex gap-1">
        <AddImageButton />
        <PageBreak />
      </div>
    </div>
  );
}

export default TextToolBar;
