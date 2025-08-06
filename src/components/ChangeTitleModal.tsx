import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function ChangeTitleModal() {
  // import { button } from "@/components/ui/button";

  // import { input } from "@/components/ui/input";
  // import { label } from "@/components/ui/label";
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button>Open Dialog</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Title</DialogTitle>
            <DialogDescription>
              Make changes to your title here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <label htmlFor="name-1">Name</label>
              <input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button>Cancel</button>
            </DialogClose>
            <button type="submit">Save changes</button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default ChangeTitleModal;
