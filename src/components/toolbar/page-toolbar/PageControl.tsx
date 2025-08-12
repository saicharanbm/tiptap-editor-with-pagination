import Divider from "../Divider";
import DeletePage from "./DeletePage";
import InsertPage from "./InsertPage";
import PageBreak from "./PageBreak";

function PageControl() {
  return (
    <div className="flex gap-1">
      <PageBreak />
      <Divider />
      <InsertPage />
      <Divider />
      <DeletePage />
    </div>
  );
}

export default PageControl;
