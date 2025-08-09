import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorStore {
  editor: Editor | null;
  pageData: { content: string }[];
  setPageData: (data: { content: string }, index: number) => void;
  addNewPage: (index: number, data?: { content: string }) => void;
  deletePage: (index: number) => void;
  currentPage: number;
  rearrangePage: (fromIndex: number, toIndex: number) => void;

  setCurrentPage: (index: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;

  setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
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
    const state = get();
    if (index < 0 || index >= state.pageData.length) return;
    //update the current page to avoide trying to access deleted page
    const newPageNo =
      index === state.currentPage &&
      index === state.pageData.length - 1 &&
      index > 0
        ? index - 1
        : index;
    const isOnlyPage = state.pageData.length === 1;
    if (isOnlyPage) {
      set({
        pageData: [{ content: "" }],
        currentPage: 0,
      });
      return;
    }
    const updatedPageData = state.pageData.filter((_, i) => i !== index);
    set({
      pageData: updatedPageData,
      currentPage: newPageNo,
    });
  },
  rearrangePage: (fromIndex: number, toIndex: number) => {
    const state = get();

    // Validate indices
    if (
      fromIndex < 0 ||
      fromIndex >= state.pageData.length ||
      toIndex < 0 ||
      toIndex >= state.pageData.length ||
      fromIndex === toIndex
    ) {
      return;
    }

    // Create a copy of the pageData array
    const newPageData = [...state.pageData];

    // Remove the page from the original position
    const [movedPage] = newPageData.splice(fromIndex, 1);

    // Insert the page at the new position
    newPageData.splice(toIndex, 0, movedPage);

    // Calculate new currentPage index after rearrangement
    let newCurrentPage = state.currentPage;

    if (state.currentPage === fromIndex) {
      // If the current page was moved, update to new position
      newCurrentPage = toIndex;
    } else if (state.currentPage === toIndex) {
      // If current page was displaced by the moved page
      newCurrentPage = fromIndex < toIndex ? toIndex - 1 : toIndex + 1;
    } else if (fromIndex < state.currentPage && toIndex >= state.currentPage) {
      // Page moved from before current to after current
      newCurrentPage = state.currentPage - 1;
    } else if (fromIndex > state.currentPage && toIndex <= state.currentPage) {
      // Page moved from after current to before current
      newCurrentPage = state.currentPage + 1;
    }

    // Ensure newCurrentPage is within bounds
    newCurrentPage = Math.max(
      0,
      Math.min(newCurrentPage, newPageData.length - 1)
    );

    set({
      pageData: newPageData,
      currentPage: newCurrentPage,
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
