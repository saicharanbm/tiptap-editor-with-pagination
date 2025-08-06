import { useState } from "react";

import ToolBarToggle from "./components/toolbar/ToolBarToggle";
import type { toolBarToggleLabels } from "./types";
import TextToolBar from "./components/toolbar/TextToolBar";
import PageToolBar from "./components/toolbar/PageToolBar";
import EditorContainer from "./components/editor/EditorContainer";

function App() {
  const [selectedToolBarToggle, setSelectedToolBarToggle] =
    useState<toolBarToggleLabels>("Text");

  return (
    <div className="w-full mx-auto max-w-[1444px] h-screen  bg-white flex flex-col p-2">
      <ToolBarToggle
        selectedToggle={selectedToolBarToggle}
        setSelectedToggle={setSelectedToolBarToggle}
      />
      {selectedToolBarToggle === "Text" ? <TextToolBar /> : <PageToolBar />}
      <EditorContainer />
    </div>
  );
}

export default App;
