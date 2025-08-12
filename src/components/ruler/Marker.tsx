import { FaCaretDown } from "react-icons/fa";
interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

function Marker({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) {
  return (
    <div
      className="absolute -top-7 w-2 h-full cursor-ew-resize z-50 group  -ml-[8px]"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown
        className="absolute  top-0  fill-toggle-text-active "
        size={18}
      />
      <div
        className="absolute  top-4  bg-toggle-text-active"
        style={{
          height: "100vh",
          width: "1px",
          right: "-1px",
          display: isDragging ? "block" : "none",
        }}
      />
    </div>
  );
}

export default Marker;
