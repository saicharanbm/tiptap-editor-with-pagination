import { useState } from "react";

import ToolBarToggle from "./components/toolbar/ToolBarToggle";
import type { ToolBarToggleLabels } from "./types";
import TextToolBar from "./components/toolbar/TextToolBar";
import PageToolBar from "./components/toolbar/PageToolBar";
import EditorContainer from "./components/editor/EditorContainer";
import TitleContainer from "./components/TitleContainer";
import PagePreview from "./components/preview/PagePreviewContainer";
import CurrentCharacterCount from "./components/CharacterCount";
import PageNumberControles from "./components/PageNumberControles";
import Ruler from "./components/ruler/Ruler";

/// update insertion logic

function App() {
  const [selectedToolBarToggle, setSelectedToolBarToggle] =
    useState<ToolBarToggleLabels>("Text");
  const [title, setTitle] = useState(
    "Olga Tellis v. Bombay Municipal Corporation (1985).docx"
  );

  return (
    <div className="w-full mx-auto max-w-[1444px] h-screen min-h-96 overflow-y-hidden  bg-[#FCFAFF] flex flex-col md:px-6 pt-3">
      <TitleContainer title={title} setTitle={setTitle} />
      <ToolBarToggle
        selectedToggle={selectedToolBarToggle}
        setSelectedToggle={setSelectedToolBarToggle}
      />
      {selectedToolBarToggle === "Text" ? <TextToolBar /> : <PageToolBar />}
      <div className="lg:grid lg:grid-cols-12  ">
        <div className="lg:col-span-9 relative">
          <Ruler />
          <EditorContainer />
          <CurrentCharacterCount />
          <PageNumberControles />
        </div>

        <PagePreview />
      </div>
    </div>
  );
}

export default App;
