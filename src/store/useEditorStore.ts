import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorStore {
  editor: Editor | null;
  pageData: { content: string }[];
  setPageData: (data: { content: string }, index: number) => void;
  addNewPage: (index: number, data?: { content: string }) => void;
  deletePage: (index: number) => void;
  currentPage: number;
  setCurrentPage: (index: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;

  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  pageData: [
    {
      content: `
        <h1>Welcome to Page 1</h1>
        <p>This is the first page of your document. You can edit this content and use the page break feature to move content to the next page.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Try adding a page break to see how content gets transferred to the next page!</p>
      `,
    },
  ],
  setPageData: (data, index) => {
    set((state) => {
      if (index < 0 && index > state.pageData.length) return state;
      const updatedPageData = [...state.pageData];
      if (index === state.pageData.length) updatedPageData.push(data);
      else updatedPageData[index] = data;
      return { pageData: updatedPageData };
    });
  },
  addNewPage: (index, data) => {
    set((state) => {
      const newPageData = data
        ? data
        : {
            content: `
          <h1>Welcome to Page ${index + 1}</h1>
          `,
          };

      const updatedPageData = [...state.pageData];
      updatedPageData.splice(index, 0, newPageData);
      return { pageData: updatedPageData };
    });
  },
  deletePage: (index) => {
    set((state) => {
      if (index < 0 || index >= state.pageData.length) return state;
      const updatedPageData = state.pageData.filter((_, i) => i !== index);
      return { pageData: updatedPageData };
    });
  },
  currentPage: 0,
  setCurrentPage: (index) => {
    set((state) => {
      if (index < 0 || index >= state.pageData.length) return state;
      return { currentPage: index };
    });
  },
  incrementPage: () => {
    set((state) => {
      if (state.currentPage === state.pageData.length - 1) return state;
      return { currentPage: state.currentPage + 1 };
    });
  },
  decrementPage: () => {
    set((state) => {
      if (state.currentPage === 0) return state;
      return { currentPage: state.currentPage - 1 };
    });
  },
  setEditor: (editor) => set({ editor }),
}));
