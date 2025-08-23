import { cn } from "@/lib/utils";
import type { PreviewOptions } from "@/types";
import { previewOptions } from "@/utils/constants";
import { useState } from "react";

function PagePreviewContainer() {
  const [selectedOption, setSelectedOption] =
    useState<PreviewOptions>("thumbnail");
  const handleOptionChange = (option: PreviewOptions) => {
    setSelectedOption(option);
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
    </div>
  );
}

export default PagePreviewContainer;
