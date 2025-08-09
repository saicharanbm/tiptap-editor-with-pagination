import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import type { PreviewOptions } from "@/types";
import { previewOptions } from "@/utils/constants";
import { useState } from "react";

function PagePreviewContainer() {
  const pageData = useEditorStore((s) => s.pageData);
  const [selectedOption, setSelectedOption] =
    useState<PreviewOptions>("thumbnail");
  const handleOptionChange = (option: PreviewOptions) => {
    setSelectedOption(option);
  };
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const currentPage = useEditorStore((s) => s.currentPage);

  return (
    <div className="bg-[#FCFAFF] h-[calc(100vh-189px)] hidden lg:col-span-3 lg:block pl-3 pt-1 ">
      <div className="flex gap-2 p-2">
        {previewOptions.map(({ label, value }) => {
          return (
            <button
              key={value}
              onClick={() => handleOptionChange(value)}
              className={cn(
                "px-2 text-[#7A797B] cursor-pointer hover:text-[#694C80]",
                selectedOption === value && "text-[#694C80]"
              )}
            >
              <span>{label}</span>
              <div
                className={cn(
                  selectedOption === value && "border-b-2 border-[#694C80]"
                )}
              ></div>
            </button>
          );
        })}
      </div>
      <div className="preview-container bg-white p-4 overflow-y-auto h-full border-t-2 border-[#A5A4A7]">
        <div className="flex flex-col gap-4">
          {selectedOption === "thumbnail" &&
            pageData.map((pageHTML, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(index)}
                className={cn(
                  "shadow-md border bg-white w-48 h-62 rounded-md p-1.5 mx-auto overflow-hidden border-[#A5A4A7] select-none",
                  currentPage === index && "border-3 border-blue-400"
                )}
                dangerouslySetInnerHTML={{ __html: pageHTML.content }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PagePreviewContainer;
