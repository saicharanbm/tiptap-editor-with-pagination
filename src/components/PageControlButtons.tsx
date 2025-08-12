import { cn } from "@/lib/utils";

function PageControlButton({
  children,
  direction,
}: {
  children: React.ReactElement;
  direction: "right" | "left";
}) {
  return (
    <div
      className={cn(
        "py-1.5 px-3  bg-toggle-active   absolute bottom-6  min-w-20 text-center shadow-md z-50",
        direction === "right" ? "rounded-l-md right-0" : "rounded-r-md left-0"
      )}
    >
      {children}
    </div>
  );
}

export default PageControlButton;
