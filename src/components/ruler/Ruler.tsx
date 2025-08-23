import { markers } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import Marker from "./Marker";
import { useEditorStore } from "@/store/useEditorStore";

function Ruler() {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const leftMargin = useEditorStore((s) => s.margin.left);
  const rightMargin = useEditorStore((s) => s.margin.right);
  const setMargin = useEditorStore((s) => s.setMargin);
  const [isDraggingLeft, setISDraggingLeft] = useState(false);
  const [isDraggingRight, setisDraggingRight] = useState(false);
  const showRulerMarker = useEditorStore((s) => s.showRulerMarker);
  const showMargin = useEditorStore((s) => s.showMargin);

  const handleLeftMouseDown = () => {
    if (showMargin) setISDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    if (showMargin) setisDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const minContentWidth = 280;
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      const rect = rulerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const currentPosition = Math.max(0, Math.min(relativeX, width));
      if (isDraggingLeft) {
        const maxLeftPosition = width - rightMargin - minContentWidth;
        setMargin({ left: Math.min(maxLeftPosition, currentPosition) });
      } else {
        const maxRightPosition = width - leftMargin - minContentWidth;
        const newRightPosition = Math.max(width - currentPosition, 0);
        setMargin({ right: Math.min(maxRightPosition, newRightPosition) });
      }
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (rulerRef.current) {
        setWidth(rulerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMouseExit = () => {
    setISDraggingLeft(false);
    setisDraggingRight(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseExit}
      onMouseLeave={handleMouseExit}
      className="h-6.5 border-b px-6 border-gray-300 flex items-end relative select-none bg-[#F2F2F7]"
    >
      <div
        id="ruler-container"
        className="mx-auto w-full min-w-[280px] lg:max-w-[900px]   relative"
        ref={rulerRef}
      >
        {showRulerMarker && (
          <>
            <Marker
              position={leftMargin}
              isLeft={true}
              isDragging={isDraggingLeft}
              onMouseDown={handleLeftMouseDown}
              onDoubleClick={() => {
                setMargin({ left: 26 });
              }}
            />
            <Marker
              position={rightMargin}
              isLeft={false}
              isDragging={isDraggingRight}
              onMouseDown={handleRightMouseDown}
              onDoubleClick={() => {
                setMargin({ right: 26 });
              }}
            />
          </>
        )}

        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full" style={{ width: `${width}px` }}>
            {markers.map((marker) => {
              const position = (marker * width) / 90;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0 "
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute -top-6.5 -left-1 text-[12px] font-light ">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-400" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ruler;
