import { create } from "zustand";
import { getExistingPageCount } from "@/extensions/paginationPlus";
import type { EditorStore } from "@/types";

export const useEditorStore = create<EditorStore>((set, get) => ({
  editor: null,

  currentPage: 1,
  setCurrentPage: (pageNo) => {
    const editor = get().editor;
    if (!editor) return;
    const pageCount = getExistingPageCount(editor.view);
    if (pageNo < 1 || pageNo > pageCount) return;
    set({ currentPage: pageNo });
  },
  incrementPage: () => {
    const { editor, currentPage } = get();
    if (!editor) return;
    const pageCount = getExistingPageCount(editor.view);
    if (currentPage === pageCount) return;
    set((state) => ({ currentPage: state.currentPage + 1 }));
  },
  decrementPage: () => {
    const { editor, currentPage } = get();
    if (!editor) return;
    if (currentPage === 1) return;
    set((state) => ({ currentPage: state.currentPage - 1 }));
  },
  setEditor: (editor) => set({ editor }),
  margin: { right: 26, left: 26, top: 20, bottom: 20 },
  setMargin: (margin) =>
    set((state) => ({ margin: { ...state.margin, ...margin } })),
  showHeaderAndFooter: true,
  setShowHeaderAndFooter: () =>
    set((state) => ({ showHeaderAndFooter: !state.showHeaderAndFooter })),
  showMargin: true,
  setShowMargin: () => set((state) => ({ showMargin: !state.showMargin })),
  showRulerMarker: true,
  setShowRulerMarker: () =>
    set((state) => ({ showRulerMarker: !state.showRulerMarker })),
}));
