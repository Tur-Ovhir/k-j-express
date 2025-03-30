"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ProductCard = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="">
          <div className="space-y-3 cursor-pointer max-w-60">
            <div className="w-full bg-white rounded-2xl relative overflow-hidden">
              <div className="text-white">image</div>
            </div>
            <div>
              <h3>name</h3>
              <span className="text-brand font-semibold text-lg">hah</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold">baraanii ner</DialogTitle>
            <DialogDescription className="w-full h-50 border bg-black">
              <div className="w-[100px] h-[100px] border border-white"></div>
              <div className="w-[100px] h-[100px] border border-white"></div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
