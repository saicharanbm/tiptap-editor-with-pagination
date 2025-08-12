import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import FeatureSection from "./FeatureSection";
import { demoFeatures } from "@/utils/constants";

function ProductDemoModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-6 rounded-xl bg-[#FCFAFF] max-h-[calc(100vh-2rem)] overflow-y-auto w-[90vw] max-w-none "
        style={{ width: "90vw", maxWidth: "none" }}
      >
        <DialogHeader className="pb-4 border-b border-gray-200">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Editor Features Guide
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Learn how to use powerful editing tools to customize and organize
            your content effectively.
          </DialogDescription>
        </DialogHeader>

        <div className=" pt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {demoFeatures.map((feature, index) => (
            <FeatureSection key={index} {...feature} />
          ))}
        </div>

        <DialogFooter className="pt-4 border-t border-gray-200">
          <Button
            onClick={() => onOpenChange(false)}
            // className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm"
          >
            Start Editing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDemoModal;
