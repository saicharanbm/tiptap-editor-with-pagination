import PageControl from "./page-toolbar/PageControl";

function PageToolBar() {
  return (
    <div className="w-full flex items-center justify-center  flex-wrap gap-y-2  bg-[#F2EDF7] border-b-2 border-[#f0eaf7] p-1.5">
      <PageControl />
    </div>
  );
}

export default PageToolBar;
