import {
  CloudCheckIcon,
  EllipsisVerticalIcon,
  InfoIcon,
  MessageSquareTextIcon,
  SquarePenIcon,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function TitleContainer({
  title,
  setTitle,
}: {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("name") as HTMLInputElement;

    if (input && input.value.trim()) {
      setTitle(input.value.trim());
    }
  };
  return (
    <div className=" w-full p-2 flex justify-between items-center flex-wrap">
      <div className="flex items-center gap-4 ">
        <p
          className="text-primary text-md tracking-wide truncate max-w-24 md:max-w-96"
          title={title}
        >
          {title}
        </p>
        <InfoIcon color="#242424" className="size-5" />
        <div className="flex items-center gap-2 text-[#908F91] ">
          <CloudCheckIcon strokeWidth={1.7} className="size-6" />
          <p>Saved</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <MessageSquareTextIcon
          className="size-5 cursor-pointer"
          color="#242424"
        />
        <div className="p-2 rounded-full bg-[#E6DCEF] hover:bg-[#e3d2f1] cursor-pointer">
          <Dialog>
            <DialogTrigger asChild>
              <SquarePenIcon className="size-5 " color="#694C80 " />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Edit Title</DialogTitle>
                  <DialogDescription>
                    Make changes to your title here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="pt-2 pb-4">
                  <Input id="name" name="name" defaultValue={title} />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <EllipsisVerticalIcon className="size-5 " color="#694C80 " />
      </div>
    </div>
  );
}

export default TitleContainer;
