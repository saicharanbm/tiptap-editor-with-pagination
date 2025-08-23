import { type Editor } from "@tiptap/react";

export const scrollToPage = (
  pageNo: number,
  editor: Editor | null,
  pageHeight: number,
  pageGap: number
) => {
  if (!editor) return;
  const editorElement = editor.view.dom as HTMLDivElement;
  const { width, height } = editorElement.getBoundingClientRect();

  console.log("Editor width:", width);
  console.log("Editor height:", height);

  //scrool  to the current page
  const container = document.querySelector(".editor-container") as HTMLElement;
  if (!container) return;
  const offset = (pageNo - 1) * (pageHeight + pageGap);
  console.log("Scrolling to offset:", offset);
  container.scrollTo({
    top: offset,
    behavior: "smooth",
  });
};
