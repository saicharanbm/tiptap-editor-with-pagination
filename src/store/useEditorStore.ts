import { create } from "zustand";
import { type Editor } from "@tiptap/react";

interface EditorStore {
  editor: Editor | null;

  setEditor: (editor: Editor | null) => void;
  currentPage: number;
  setCurrentPage: (index: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
  margin: { right: number; left: number; top: number; bottom: number };
  setMargin: (
    margin: Partial<{
      right: number;
      left: number;
      top: number;
      bottom: number;
    }>
  ) => void;
  showHeaderAndFooter: boolean;
  setShowHeaderAndFooter: () => void;
  showMargin: boolean;
  setShowMargin: () => void;
  showRulerMarker: boolean;
  setShowRulerMarker: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  editor: null,

  currentPage: 0,
  setCurrentPage: (pageNo) => {
    const editor = get().editor;
    if (!editor) return;
    const pageCount = 1; //getExistingPageCount(editor.view);
    if (pageNo < 1 || pageNo > pageCount) return;
    set({ currentPage: pageNo });
  },
  incrementPage: () => {
    const { editor, currentPage } = get();
    if (!editor) return;
    const pageCount = 1; //getExistingPageCount(editor.view);
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
