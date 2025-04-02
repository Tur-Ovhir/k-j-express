"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ShoppingBasket } from "lucide-react";
import { ProductCard } from "./ProductCard";
export const Shop = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed flex items-center justify-center z-10 bottom-4 right-4 sm:bottom-8 sm:right-8 bg-yellow-500 text-white rounded-full w-12 h-12 border">
          <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-black text-center">
            {ProductCard.length}
          </div>
          <ShoppingBasket />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-32 max-w-72 rounded-xl">
        <DialogTitle>Захиалга</DialogTitle>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Төлбөрийн нөхцөл сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="qpay">Дансаар</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>Захиалах</Button>
      </DialogContent>
    </Dialog>
  );
};
