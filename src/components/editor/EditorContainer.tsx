import Editor from "./Editor";

function EditorContainer() {
  return (
    <div className="editor-container w-full h-[calc(100vh-245px)]  sm:h-[calc(100vh-215px)]   lg:h-[calc(100vh-177px)] relative  overflow-auto bg-[#F2F2F7] ">
      <div className=" p-6 mx-auto overflow-auto flex justify-center ">
        {/* <div className="w-[1080px] h-[1990px] bg-white mx-auto">Hello</div> */}
        <Editor />
      </div>
    </div>
  );
}

export default EditorContainer;
