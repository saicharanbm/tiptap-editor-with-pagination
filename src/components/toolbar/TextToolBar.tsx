import Divider from "./Divider";
import UndoRedo from "./text-toolbar/UndoRedo";

function TextToolBar() {
  return (
    <div className="w-full flex items-center min-h-10 bg-[#F2EDF7] border-b-2 border-[#f0eaf7]">
      <UndoRedo />
      <Divider />
    </div>
  );
}

export default TextToolBar;
