import { useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";

function TextSize() {
  const editor = useEditorStore((s) => s.editor);
  const currentFontSize = useRef(
    editor?.getAttributes("textStyle").fontSize || "16px"
  );
  console.log("currentFontSize", currentFontSize.current);

  const [inputValue, setInputValue] = useState<string>(currentFontSize.current);
  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      console.log(editor?.getAttributes("textStyle").fontSize);

      if (
        (editor?.getAttributes("textStyle").fontSize || "16px") !==
        currentFontSize.current
      )
        currentFontSize.current =
          editor?.getAttributes("textStyle").fontSize || "16px";
      setInputValue(currentFontSize.current);
    };

    editor?.on("transaction", handler);

    return () => {
      editor.off("transaction", handler);
    };
  }, [editor]);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();

      setInputValue(`${size}px`);
    } else {
      setInputValue(currentFontSize.current);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleFocus = () => {
    setInputValue(currentFontSize.current.replace("px", ""));
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
        className="h-7 w-7 shrink-0 flex items-center justify-center  rounded-sm hover:bg-toggle-active hover:text-toggle-text-active"
      >
        <MinusIcon className="size-4" strokeWidth={2.5} />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="h-7 w-10 flex items-center justify-center  rounded-sm focus:bg-toggle-active focus:ring-0 focus:outline-none hover:bg-toggle-active text-sm border border-neutral-400"
      />

      <button
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center  rounded-sm hover:bg-toggle-active hover:text-toggle-text-active"
      >
        <PlusIcon className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default TextSize;
