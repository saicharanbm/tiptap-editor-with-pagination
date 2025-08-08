import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import PageControlButton from "./PageControlButtons";
import { useEditorStore } from "@/store/useEditorStore";

function PageNumberControles() {
  const currentPage = useEditorStore((s) => s.currentPage);
  const pageData = useEditorStore((s) => s.pageData);
  const incrementPage = useEditorStore((s) => s.incrementPage);
  const decrementPage = useEditorStore((s) => s.decrementPage);

  return (
    <PageControlButton direction="right">
      <div className="flex items-center gap-2">
        <span className="text-[#7A797B]">Page</span>
        <button className="flex items-center" onClick={incrementPage}>
          <ChevronUpIcon className="size-4" color="#242424" strokeWidth={1.8} />
        </button>
        <input
          value={currentPage + 1}
          className="w-12 text-center  bg-[#E6E4E9]  rounded-sm border border-[#FCFAFF] shadow-sm focus:outline-none focus:ring-0"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const newPage = parseInt(e.currentTarget.value) - 1;
              if (!isNaN(newPage)) {
                //   useEditorStore.getState().setCurrentPage(newPage);
              }
            }
          }}
        />

        <button className="flex items-center" onClick={decrementPage}>
          <ChevronDownIcon
            className="size-4"
            color="#242424"
            strokeWidth={1.8}
          />
        </button>

        <span className="text-[#7A797B]">of {pageData.length}</span>
      </div>
    </PageControlButton>
  );
}

export default PageNumberControles;
