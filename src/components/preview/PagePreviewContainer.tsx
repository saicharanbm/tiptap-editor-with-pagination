import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import type { PreviewOptions } from "@/types";
import { previewOptions } from "@/utils/constants";
import { useState } from "react";

function PagePreviewContainer() {
  const pageData = useEditorStore((s) => s.pageData);
  const padding = useEditorStore((s) => s.padding);
  const showHeaderAndFooter = useEditorStore((s) => s.showHeaderAndFooter);

  const [selectedOption, setSelectedOption] =
    useState<PreviewOptions>("thumbnail");
  const handleOptionChange = (option: PreviewOptions) => {
    setSelectedOption(option);
  };
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const currentPage = useEditorStore((s) => s.currentPage);
  const editor = useEditorStore((s) => s.editor);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const rearrangePage = useEditorStore((s) => s.rearrangePage);
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", ""); // Required for Firefox
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear dragOverIndex if we're leaving the container entirely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      rearrangePage(draggedIndex, dropIndex);

      // Update current page if necessary
      if (currentPage === draggedIndex) {
        setCurrentPage(dropIndex);
      } else if (currentPage === dropIndex) {
        setCurrentPage(draggedIndex);
      } else if (
        (draggedIndex < currentPage && dropIndex >= currentPage) ||
        (draggedIndex > currentPage && dropIndex <= currentPage)
      ) {
        // Adjust current page index based on the move
        const newCurrentPage =
          draggedIndex < currentPage ? currentPage - 1 : currentPage + 1;
        setCurrentPage(newCurrentPage);
      }
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="bg-[#FCFAFF] hidden lg:col-span-3 lg:flex lg:flex-col pl-3 pt-1">
      {/* Header (buttons / options) */}
      <div className="flex gap-2 p-2 shrink-0">
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
              />
            </button>
          );
        })}
      </div>

      <div className="preview-container flex-1 bg-white p-4 overflow-y-auto border-t-2 border-[#A5A4A7]">
        <div className="flex flex-col gap-4">
          {selectedOption === "thumbnail" &&
            pageData.map((pageHTML, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => setCurrentPage(index)}
                className={cn(
                  "shadow-md border bg-white w-46 h-56 rounded-md mx-auto overflow-hidden border-[#A5A4A7] select-none cursor-move transition-all duration-200 relative",
                  currentPage === index && "border-3 border-blue-400",
                  draggedIndex === index && "opacity-50 transform scale-105",
                  dragOverIndex === index &&
                    draggedIndex !== index &&
                    "border-2 border-dashed border-purple-400 transform scale-102"
                )}
              >
                {/* Scaled content container to mimic preview true to editor.*/}
                <div
                  className="absolute inset-0 origin-top-left"
                  style={{
                    width: editor?.view.dom.clientWidth || "900px",
                    height: editor?.view.dom.clientHeight,
                    transform: "scale(0.2)", // 192px / 794px ≈ 0.24
                    transformOrigin: "top left",
                  }}
                >
                  <div
                    className={cn(
                      `tiptap  h-full `,
                      !showHeaderAndFooter
                        ? "pt-[20px] pb-[20px]"
                        : "pt-[0px] pb-[0px]"
                    )}
                    style={{
                      width: `${editor?.view.dom.clientWidth}||800px`,
                      paddingLeft: `${padding.left}px`,
                      paddingRight: `${padding.right}px`,
                    }}
                    dangerouslySetInnerHTML={{ __html: pageHTML.content }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PagePreviewContainer;
