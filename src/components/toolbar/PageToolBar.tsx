import Divider from "./Divider";
import HeaderToggle from "./page-toolbar/HeaderToggle";
import MarginToggle from "./page-toolbar/MarginToggle";
import PageControl from "./page-toolbar/PageControl";
import RulerToggle from "./page-toolbar/RulerToggle";

function PageToolBar() {
  return (
    <div className="w-full flex items-center justify-center  flex-wrap gap-y-2 gap-x-4  bg-[#F2EDF7] border-b-2 border-[#f0eaf7] p-1.5">
      <HeaderToggle />
      <Divider />
      <MarginToggle />
      <Divider />
      <RulerToggle />
      <Divider />
      <PageControl />
    </div>
  );
}

export default PageToolBar;
