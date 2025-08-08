import { useEditorStore } from "@/store/useEditorStore";
import PageControlButton from "./PageControlButtons";
import { useEffect, useRef, useState } from "react";

function CharacterCount() {
  const editor = useEditorStore((s) => s.editor);
  const [currentCount, setCurrentCount] = useState(
    editor?.storage.characterCount.characters() || "0"
  );
  const currentCountRef = useRef(currentCount);

  useEffect(() => {
    currentCountRef.current = currentCount;
  }, [currentCount]);

  useEffect(() => {
    if (!editor) return;
    const handler = () => {
      const currentCount = editor.storage.characterCount.characters();
      if (currentCount !== currentCountRef.current) {
        setCurrentCount(currentCount);
      }
    };
    editor.on("transaction", handler);
    return () => {
      editor.off("transaction", handler);
    };
  }, [editor]);
  return (
    <PageControlButton direction="left">
      <div className="flex items-center gap-1.5">
        <p className="">{currentCount}</p>
        <p className="text-[#7A797B] text-sm">characters</p>
      </div>
    </PageControlButton>
  );
}

export default CharacterCount;
