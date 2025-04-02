"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { productType } from "@/types/product";
import Image from "next/image";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: productType }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddCart = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.post(
        "/cart",
        { quantity, productId: product.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Сагсанд бараа нэмэгдлээ");
    } catch (error) {
      console.error(error);
      toast.error("Барааны мэдээлэл алдаатай байна.");
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Dialog>
      <DialogTrigger disabled={product.quantity === 0}>
        <div className="w-full relative flex flex-col items-center bg-gradient-to-r border-2  border-amber-200 p-4 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg">
          <div className="w-full h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              className="rounded-xl"
              src={product.images[0]}
              alt={product.name}
              width={200}
              height={200}
            />
          </div>
          <div className="font-bold text-sm sm:text-lg mt-2 text-center">
            {product.name}
          </div>
          <div className="font-bold text-md text-gray-700">
            {product.price.toLocaleString()}₮
          </div>
          {product.quantity === 0 && (
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] bg-opacity-50 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg font-bold">Дууссан</span>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 justify-between">
          <div className="w-full relative bg-cover md:w-1/2 h-[300px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg shadow-md">
            <Image
              className="rounded-xl"
              src={product.images[0]}
              alt={product.name}
              fill
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 gap-3 ml-4 justify-center">
            <h1 className="font-bold text-lg sm:text-2xl text-gray-900">
              {product.name}
            </h1>
            <h2 className="text-lg font-semibold text-gray-700">
              {product.price.toLocaleString()}₮
            </h2>
            <div className="flex items-center space-x-4">
              <Button
                onClick={decreaseQuantity}
                className="text-white bg-amber-500 px-4 py-2 text-lg rounded-lg shadow-md hover:bg-amber-600 transition"
              >
                -
              </Button>
              <span className="text-2xl font-semibold">{quantity}</span>
              <Button
                onClick={increaseQuantity}
                className="text-white bg-amber-500 px-4 py-2 text-lg rounded-lg shadow-md hover:bg-amber-600 transition"
              >
                +
              </Button>
            </div>
            <DialogClose asChild>
              <Button
                onClick={handleAddCart}
                className="w-full sm:w-auto text-white bg-amber-500 px-4 py-2 text-lg rounded-lg shadow-md hover:bg-amber-600 transition"
              >
                Сагслах
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
