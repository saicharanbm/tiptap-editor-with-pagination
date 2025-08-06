import Divider from "./Divider";
import TextDecoration from "./text-toolbar/TextDecoration";
import UndoRedo from "./text-toolbar/UndoRedo";

function TextToolBar() {
  return (
    <div className="w-full flex items-center min-h-10 bg-[#F2EDF7] border-b-2 border-[#f0eaf7]">
      <Divider />
      <TextDecoration />
      <Divider />
      <UndoRedo />
    </div>
  );
}

export default TextToolBar;
