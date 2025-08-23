import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import PageControlButton from "./PageControlButtons";
import { useEditorStore } from "@/store/useEditorStore";
import { useEffect, useState } from "react";

import { getExistingPageCount } from "@/extensions/paginationPlus";
import { defaultEditorConfig } from "@/utils/constants";
import { scrollToPage } from "@/utils/helper";

const { pageGap, pageHeight } = defaultEditorConfig;
function PageNumberControles() {
  const currentPage = useEditorStore((s) => s.currentPage);
  const editor = useEditorStore((s) => s.editor);
  const [totalPages, setTotalPages] = useState(
    editor?.view ? getExistingPageCount(editor.view) : 1
  );
  const [inputValue, setInputValue] = useState<string>(String(currentPage));
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const incrementPage = useEditorStore((s) => s.incrementPage);
  const decrementPage = useEditorStore((s) => s.decrementPage);

  console.log("rendering page controls");
  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (!editor) return;
    const updatePageCount = () => {
      const pageCount = getExistingPageCount(editor.view);
      console.log(pageCount);
      setTotalPages(pageCount);
      if (currentPage > pageCount) {
        setCurrentPage(pageCount);
      }
    };
    updatePageCount();
    editor.on("transaction", updatePageCount);

    return () => {
      editor.off("transaction", updatePageCount);
    };
  }, [editor, currentPage, setCurrentPage]);

  return (
    <PageControlButton direction="right">
      <div className="flex items-center gap-2">
        <span className="text-[#7A797B]">Page</span>
        <button
          className="flex items-center disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            incrementPage();
            scrollToPage(currentPage + 1, editor, pageHeight, pageGap);
          }}
          disabled={currentPage === totalPages}
        >
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
              const newPage = parseInt(e.currentTarget.value);
              if (!isNaN(newPage)) {
                if (newPage > 0 && newPage <= totalPages) {
                  setCurrentPage(newPage);
                  setInputValue(String(newPage));
                  scrollToPage(newPage, editor, pageHeight, pageGap);
                } else {
                  setInputValue(String(currentPage));
                }
                e.currentTarget.blur();
              }
            }
          }}
        />

        <button
          className="flex items-center disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => {
            decrementPage();
            scrollToPage(currentPage - 1, editor, pageHeight, pageGap);
          }}
        >
          <ChevronDownIcon
            className="size-4"
            color="#242424"
            strokeWidth={1.8}
          />
        </button>

        <span className="text-[#7A797B]">of {totalPages}</span>
      </div>
    </PageControlButton>
  );
}

export default PageNumberControles;
