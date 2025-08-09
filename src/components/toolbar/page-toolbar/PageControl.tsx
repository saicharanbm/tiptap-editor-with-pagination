import DeletePage from "./DeletePage";
import InsertPage from "./InsertPage";
import PageBreak from "./PageBreak";

function PageControl() {
  return (
    <div className="flex gap-1">
      <PageBreak />
      <InsertPage />
      <DeletePage />
    </div>
  );
}

export default PageControl;
