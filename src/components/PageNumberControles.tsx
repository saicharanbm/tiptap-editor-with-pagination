import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import PageControlButton from "./PageControlButtons";
import { useEditorStore } from "@/store/useEditorStore";
import { useEffect, useState } from "react";

function PageNumberControles() {
  const currentPage = useEditorStore((s) => s.currentPage);
  const [inputValue, setInputValue] = useState<string>(String(currentPage + 1));
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const pageData = useEditorStore((s) => s.pageData);
  const incrementPage = useEditorStore((s) => s.incrementPage);
  const decrementPage = useEditorStore((s) => s.decrementPage);

  useEffect(() => {
    setInputValue(String(currentPage + 1));
  }, [currentPage]);

  return (
    <PageControlButton direction="right">
      <div className="flex items-center gap-2">
        <span className="text-[#7A797B]">Page</span>
        <button className="flex items-center" onClick={incrementPage}>
          <ChevronUpIcon className="size-4" color="#242424" strokeWidth={1.8} />
        </button>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="w-12 text-center  bg-[#E6E4E9]  rounded-sm border border-[#FCFAFF] shadow-sm focus:outline-none focus:ring-0 no-spinner"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const newPage = parseInt(e.currentTarget.value) - 1;
              if (!isNaN(newPage)) {
                setCurrentPage(newPage);
                e.currentTarget.blur();
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
