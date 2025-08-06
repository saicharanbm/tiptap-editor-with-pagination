import Divider from "./Divider";
import FontFamily from "./text-toolbar/FontFamily";
import TextDecoration from "./text-toolbar/TextDecoration";
import UndoRedo from "./text-toolbar/UndoRedo";

function TextToolBar() {
  return (
    <div className="w-full flex items-center min-h-10 bg-[#F2EDF7] border-b-2 border-[#f0eaf7] p-1.5">
      <FontFamily />
      <Divider />
      <TextDecoration />
      <Divider />
      <UndoRedo />
    </div>
  );
}

export default TextToolBar;
