import Editor from "./Editor";

function EditorContainer() {
  return (
    <div className="editor-container w-full relative overflow-auto bg-[#F2F2F7] flex-1 ">
      <div className="p-6 pb-14 mx-auto flex flex-col justify-center">
        <Editor />
      </div>
    </div>
  );
}

export default EditorContainer;
