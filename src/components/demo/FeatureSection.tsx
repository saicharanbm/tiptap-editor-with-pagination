import { DialogDescription, DialogTitle } from "../ui/dialog";

function FeatureSection({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src: string;
}) {
  return (
    <div className="space-y-2 ">
      <DialogTitle className="text-lg font-medium text-gray-800">
        {title}
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-600">
        {description}
      </DialogDescription>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full rounded-lg shadow-md mt-2 border border-gray-100"
      />
    </div>
  );
}

export default FeatureSection;
