import { useEditorStore } from "@/store/useEditorStore";
import Editor from "./Editor";

function EditorContainer() {
  const padding = useEditorStore((s) => s.padding);
  const currentPage = useEditorStore((s) => s.currentPage);
  const showHeaderAndFooter = useEditorStore((s) => s.showHeaderAndFooter);

  return (
    <div className="editor-container w-full h-[calc(100vh-245px)]  sm:h-[calc(100vh-215px)]   lg:h-[calc(100vh-177px)] relative  overflow-auto bg-[#F2F2F7] ">
      <div className=" p-6 mx-auto overflow-auto flex  flex-col justify-center ">
        {showHeaderAndFooter && (
          <div
            className=" w-full min-w-[280px] lg:max-w-[900px] h-12 mx-auto bg-white flex items-center justify-center text-lg text-gray-600 border border-[#C7C7C7] border-b-0 select-none"
            style={{
              paddingLeft: `${padding.left}px`,
              paddingRight: `${padding.left}px`,
            }}
          >
            Demo header
          </div>
        )}
        <Editor />
        {showHeaderAndFooter && (
          <div
            className=" w-full min-w-[280px] lg:max-w-[900px] h-12 mx-auto bg-white flex items-center text-lg text-gray-600 border border-[#C7C7C7] border-t-0 select-none"
            style={{
              paddingLeft: `${padding.left}px`,
              paddingRight: `${padding.left}px`,
            }}
          >
            Page no : {currentPage + 1}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorContainer;
