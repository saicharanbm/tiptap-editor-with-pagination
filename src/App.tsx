import { useState } from "react";

import ToolBarToggle from "./components/toolbar/ToolBarToggle";
import type { toolBarToggleLabels } from "./types";
import TextToolBar from "./components/toolbar/TextToolBar";
import PageToolBar from "./components/toolbar/PageToolBar";
import EditorContainer from "./components/editor/EditorContainer";
import TitleContainer from "./components/TitleContainer";

function App() {
  const [selectedToolBarToggle, setSelectedToolBarToggle] =
    useState<toolBarToggleLabels>("Text");
  const [title, setTitle] = useState(
    "Olga Tellis v. Bombay Municipal Corporation (1985).docx"
  );

  return (
    <div className="w-full mx-auto max-w-[1444px] h-screen  bg-[#FCFAFF] flex flex-col px-6 pt-3">
      <TitleContainer title={title} setTitle={setTitle} />
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
