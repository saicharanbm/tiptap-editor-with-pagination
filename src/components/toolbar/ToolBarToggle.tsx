import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction } from "react";
import { type ToolBarToggleLabels } from "@/types";

const toggleList: { label: ToolBarToggleLabels }[] = [
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
  selectedToggle: ToolBarToggleLabels;
  setSelectedToggle: Dispatch<SetStateAction<ToolBarToggleLabels>>;
}) {
  return (
    <div className="w-full ">
      <div className="flex gap-2">
        {toggleList.map(({ label }) => (
          <button
            key={label}
            onClick={() => setSelectedToggle(label)}
            className={cn(
              "px-3 py-2 rounded-t-md text-toggle-text",
              selectedToggle === label &&
                "bg-toggle-active text-toggle-text-active font-medium"
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
