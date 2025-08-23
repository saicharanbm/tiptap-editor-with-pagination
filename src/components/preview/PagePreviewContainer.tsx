import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import type { PreviewOptions } from "@/types";
import { defaultEditorConfig, previewOptions } from "@/utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { getExistingPageCount } from "@/extensions/paginationPlus";
import { scrollToPage } from "@/utils/helper";

const { pageHeight, pageGap } = defaultEditorConfig;

const THUMB_WIDTH = 192; // CSS width of each thumbnail

function PagePreviewContainer() {
  const [selectedOption, setSelectedOption] =
    useState<PreviewOptions>("thumbnail");

  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const currentPage = useEditorStore((s) => s.currentPage); // 1-based in your app
  const editor = useEditorStore((s) => s.editor);
  const showHeaderAndFooter = useEditorStore((s) => s.showHeaderAndFooter);

  // The actual ProseMirror content element - with proper null checking
  const editorEl = editor?.view?.dom as HTMLElement | undefined;

  const pageCount = useRef(editor ? getExistingPageCount(editor.view) : 1);

  const [thumbs, setThumbs] = useState<string[]>([]);
  const debounceId = useRef<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const makeThumbnails = useCallback(async () => {
    // Early return if editor or DOM not ready
    if (!editor?.view?.dom || !editorEl || pageCount.current === 0) {
      setThumbs([]);
      return;
    }

    // Check if element has valid dimensions
    const rect = editorEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn(
        "Editor element has zero dimensions, skipping thumbnail generation"
      );
      return;
    }

    setIsGenerating(true);

    try {
      // Use a consistent DPR for better quality
      const DPR = Math.min(window.devicePixelRatio || 1, 2);

      // Ensure element is visible and has content
      const computedStyle = window.getComputedStyle(editorEl);
      if (
        computedStyle.display === "none" ||
        computedStyle.visibility === "hidden"
      ) {
        console.warn(
          "Editor element is not visible, skipping thumbnail generation"
        );
        setIsGenerating(false);
        return;
      }

      // Get dimensions with fallbacks
      const elementWidth =
        editorEl.scrollWidth || editorEl.clientWidth || rect.width;
      const elementHeight =
        editorEl.scrollHeight || editorEl.clientHeight || rect.height;

      if (elementWidth === 0 || elementHeight === 0) {
        console.warn("Editor element dimensions are zero:", {
          elementWidth,
          elementHeight,
        });
        setIsGenerating(false);
        return;
      }

      // Render entire editor at DPR with better quality settings
      const fullCanvas = await htmlToImage.toCanvas(editorEl, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: DPR,
        quality: 1.0,
        width: elementWidth,
        height: elementHeight,
      });

      // Validate canvas dimensions
      if (fullCanvas.width === 0 || fullCanvas.height === 0) {
        console.error("Generated canvas has zero dimensions:", {
          width: fullCanvas.width,
          height: fullCanvas.height,
        });
        setIsGenerating(false);
        return;
      }

      const W = fullCanvas.width;
      const H = fullCanvas.height;

      // Map CSS dimensions to canvas pixels
      const cssTotalH = elementHeight;
      const cssTotalW = elementWidth;
      const pxPerCssY = H / cssTotalH;
      const pageH_css = pageHeight;
      const pageGap_css = showHeaderAndFooter ? pageGap : pageGap + 5;
      const pageH_px = Math.max(1, Math.round(pageH_css * pxPerCssY));

      const result: string[] = [];

      for (let i = 0; i < pageCount.current; i++) {
        const pageStartY_css = i * (pageH_css + pageGap_css);
        const cropY = Math.round(pageStartY_css * pxPerCssY);
        const cropH = Math.min(pageH_px, Math.max(0, H - cropY));

        // If canvas doesn't reach this far, create a blank placeholder
        if (cropH <= 0 || cropY >= H) {
          const aspectRatio = pageH_css / cssTotalW;
          const outW = Math.max(1, Math.round(THUMB_WIDTH * DPR));
          const outH = Math.max(1, Math.round(outW * aspectRatio));
          const blank = document.createElement("canvas");
          blank.width = outW;
          blank.height = outH;
          const ctx = blank.getContext("2d")!;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outW, outH);
          result.push(blank.toDataURL("image/png"));
          continue;
        }

        // Calculate output dimensions maintaining aspect ratio
        const aspectRatio = cropH / W;

        // Validate aspect ratio
        if (!isFinite(aspectRatio) || aspectRatio <= 0) {
          console.warn("Invalid aspect ratio:", { aspectRatio, cropH, W });
          continue;
        }

        const outW = Math.max(1, Math.round(182 * DPR));
        const outH = Math.max(1, Math.round(outW * aspectRatio));

        const c = document.createElement("canvas");
        c.width = outW;
        c.height = outH;

        const ctx = c.getContext("2d")!;
        if (!ctx) {
          console.error("Failed to get 2D context");
          continue;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        try {
          // Crop the page from full canvas, ensuring we center the content
          // Validate all parameters before drawing
          const sourceX = Math.max(0, Math.min(25, W));
          const sourceY = Math.max(0, Math.min(cropY, H));
          const sourceWidth = Math.max(1, Math.min(W - sourceX, W));
          const sourceHeight = Math.max(1, Math.min(cropH, H - sourceY));

          ctx.drawImage(
            fullCanvas,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            outW,
            outH
          );

          result.push(c.toDataURL("image/png", 0.95));
        } catch (drawError) {
          console.error("Error drawing image for page", i + 1, drawError);
          // Create a fallback blank thumbnail
          ctx.fillStyle = "#f5f5f5";
          ctx.fillRect(0, 0, outW, outH);
          ctx.fillStyle = "#999";
          ctx.font = "16px Arial";
          ctx.textAlign = "center";
          ctx.fillText(`Page ${i + 1}`, outW / 2, outH / 2);
          result.push(c.toDataURL("image/png"));
        }
      }

      setThumbs(result);
    } catch (error) {
      console.error("Failed to generate thumbnails:", error);
      setThumbs([]);
    } finally {
      setIsGenerating(false);
    }
  }, [editor, editorEl, showHeaderAndFooter]);

  // Regenerate on content changes (debounced)
  useEffect(() => {
    if (!editor?.view?.dom) return;

    const trigger = () => {
      if (!editor?.view) return;

      const newPageCount = getExistingPageCount(editor.view);
      if (pageCount.current !== newPageCount) {
        pageCount.current = newPageCount;
      }

      if (debounceId.current !== null) window.clearTimeout(debounceId.current);
      debounceId.current = window.setTimeout(() => {
        makeThumbnails().catch((error) => {
          console.error("Thumbnail generation failed:", error);
        });
      }, 500); // Increased debounce time to reduce excessive calls
    };

    editor.on("transaction", trigger);

    // Initial generation with a small delay to ensure editor is fully mounted
    const initialTimeout = setTimeout(() => {
      makeThumbnails().catch((error) => {
        console.error("Initial thumbnail generation failed:", error);
      });
    }, 100);

    return () => {
      editor.off("transaction", trigger);
      if (debounceId.current !== null) window.clearTimeout(debounceId.current);
      clearTimeout(initialTimeout);
    };
  }, [editor, makeThumbnails]);

  return (
    <div className="bg-[#FCFAFF] hidden lg:col-span-3 lg:flex lg:flex-col pl-3 pt-1 min-h-0">
      <div className="flex gap-2 p-2 shrink-0">
        {previewOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setSelectedOption(value)}
            className={cn(
              "px-2 text-[#7A797B] cursor-pointer hover:text-[#694C80]",
              selectedOption === value && "text-[#694C80]"
            )}
          >
            <span>{label}</span>
            <div
              className={cn(
                selectedOption === value && "border-b-2 border-[#694C80]"
              )}
            />
          </button>
        ))}
      </div>

      <div className="preview-container flex-1 bg-white p-4 overflow-y-auto border-t-2 border-[#A5A4A7] min-h-0">
        {selectedOption === "thumbnail" && (
          <div className="flex flex-col gap-4">
            {isGenerating && thumbs.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Generating thumbnails...
              </div>
            )}

            {thumbs.map((src, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (currentPage !== idx + 1 && editor?.view) {
                    setCurrentPage(idx + 1);
                    scrollToPage(idx + 1, editor, pageHeight, pageGap);
                  }
                }}
                className={cn(
                  "relative mx-auto rounded pr-2 overflow-hidden bg-white shadow-md transition-all duration-200 border",
                  currentPage === idx + 1
                    ? "border-toggle-text-active/65 border-2 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                )}
                style={{ width: THUMB_WIDTH }}
                title={`Page ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-auto block"
                  draggable={false}
                  onError={() => {
                    console.error("Failed to load thumbnail for page", idx + 1);
                    // Could set a fallback image here
                  }}
                />
                <div
                  className={cn(
                    "absolute top-2 right-2  text-white text-xs px-2 py-1 rounded",
                    currentPage === idx + 1
                      ? "font-semibold bg-toggle-text-active"
                      : "font-normal bg-black/50"
                  )}
                >
                  {idx + 1}
                </div>
              </button>
            ))}

            {thumbs.length === 0 && !isGenerating && (
              <div className="text-center text-gray-500 py-8">
                No pages to preview
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PagePreviewContainer;
