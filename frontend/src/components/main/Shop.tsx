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
import { useState } from "react";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
export const Shop = () => {
  const [selectedPayment, setSelectedPayment] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed flex items-center justify-center z-10 bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg rounded-full w-14 h-14 border border-white transition-transform hover:scale-105">
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-400 text-white text-xs flex items-center justify-center shadow-md">
            {ProductCard.length}
          </div>
          <ShoppingBasket size={24} />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-64 max-w-80 p-5 rounded-xl shadow-xl bg-white border border-gray-200">
        <DialogTitle className="text-lg font-bold text-gray-800">
          Захиалга
        </DialogTitle>
        <Select onValueChange={(value) => setSelectedPayment(value)}>
          <SelectTrigger className="mt-3 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500">
            <SelectValue placeholder="Төлбөрийн нөхцөл сонгох" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg rounded-lg border border-gray-200">
            <SelectGroup>
              <SelectItem
                value="qpay"
                className="hover:bg-yellow-100 px-3 py-2 rounded-md cursor-pointer"
              >
                Дансаар
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {selectedPayment === "qpay" && (
          <div className="flex flex-col gap-2">
            <div className="mt-3 text-center text-lg  flex flex-col gap-2 to-yellow-70  px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white  rounded-lg hover:opacity-90 transition-all shadow-md font-bold">
              <h1 className="">Хаан банк:5055686792</h1>
              <h1>Эзэмшигч:Б.Отгонжаргал</h1>
            </div>
            <div className="">
              <h1 className="text-sm font-bold ">
                Уучлаарай та дээрх дансаар төлбөр төлсний дараа захиалах хэсгийг
                дарна уу! Баярлалаа.{" "}
              </h1>
            </div>
            <div className="flex justify-center ">
              <FaRegFaceSmileBeam className="text-yellow-600 w-10 h-10" />
            </div>
          </div>
        )}
        <Button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md">
          Захиалах
        </Button>
      </DialogContent>
    </Dialog>
  );
};
