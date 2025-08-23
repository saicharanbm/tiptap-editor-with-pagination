import { type Editor } from "@tiptap/react";
import { type LucideIcon } from "lucide-react";

export type ToolBarToggleLabels = "Text" | "Page";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface ToolBarButtonProps {
  label: string;
  onClick: () => void;

  icon: LucideIcon;
  isDisabled?: boolean;
}

export interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

export type PreviewOptions = "thumbnail" | "index" | "search";
export interface EditorStore {
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
