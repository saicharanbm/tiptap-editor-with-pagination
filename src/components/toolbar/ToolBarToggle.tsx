import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction } from "react";
import { type toolBarToggleLabels } from "@/types";

const toggleList: { label: toolBarToggleLabels }[] = [
  {
    label: "Text",
  },
  {
    label: "Page",
  },
];
function ToolBarToggle({
  selectedToggle,
  setSelectedToggle,
}: {
  selectedToggle: toolBarToggleLabels;
  setSelectedToggle: Dispatch<SetStateAction<toolBarToggleLabels>>;
}) {
  return (
    <div className="w-full bg-white">
      <div className="flex gap-2">
        {toggleList.map(({ label }) => (
          <button
            key={label}
            onClick={() => setSelectedToggle(label)}
            className={cn(
              "px-3 py-2 rounded-t-md ",
              selectedToggle === label &&
                "bg-[#e6dcef] text-[#694c80] font-medium"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ToolBarToggle;
