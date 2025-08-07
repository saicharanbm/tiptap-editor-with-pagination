import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";

function TextSize() {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize || "16px";

  const [inputValue, setInputValue] = useState<string>(currentFontSize);
  useEffect(() => {
    setInputValue(currentFontSize);
  }, [currentFontSize]);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      //   setFontSize(size);
      setInputValue(`${size}px`);
    } else {
      setInputValue(currentFontSize);
    }
    // setIsEditing(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleFocus = () => {
    // setIsEditing(true);
    setInputValue(currentFontSize.replace("px", ""));
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(inputValue) + 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };
  const decrement = () => {
    const newSize = parseInt(inputValue) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center  rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="h-7 w-10 flex items-center justify-center  rounded-sm hover:bg-neutral-200/80 text-sm border border-neutral-400"
      />

      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center  rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}

export default TextSize;
