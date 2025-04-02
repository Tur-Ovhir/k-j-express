"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { productType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export const ProductCard = () => {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<productType[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Барааны мэдээлэл алдаатай байна.");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 md:px-0">
      <Dialog>
        <DialogTrigger>
          <div className="space-y-3 cursor-pointer max-w-60 text-center">
            <div className="w-full bg-white rounded-2xl relative overflow-hidden">
              <span className="text-gray-500">Зураг</span>
            </div>
            <div>haragdah</div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-full max-w-3xl bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="font-bold text-center text-xl text-gray-800">
              Барааны дэлгэрэнгүй
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 justify-between">
            <div className="w-full md:w-1/2 h-[300px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg shadow-md">
              <span className="text-gray-500">Зураг</span>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 gap-3 ml-4 justify-center">
              <h1 className="font-bold text-2xl text-gray-900">Барааны нэр</h1>
              <h2 className="text-lg font-semibold text-gray-700">
                Барааны үнэ₮
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

              <Button className="w-full sm:w-auto text-white bg-amber-500 px-4 py-2 text-lg rounded-lg shadow-md hover:bg-amber-600 transition">
                Сагслах
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
