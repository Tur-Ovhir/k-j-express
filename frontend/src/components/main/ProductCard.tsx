"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
    <div className="flex justify-center items-center  px-4 md:px-0">
      <Dialog>
        <DialogTrigger>
          <div className="space-y-3 cursor-pointer max-w-60 text-center">
            <div className="w-full bg-white rounded-2xl relative overflow-hidden"></div>
            <div>haragdah</div>
          </div>
        </DialogTrigger>
        <DialogContent className="flex justify-center items-center w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-center">
              <div className="w-full flex flex-col items-center bg-gradient-to-r border-2 border-amber-200 p-6 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg text-center">
                <div className="w-full flex flex-col items-center space-y-4">
                  <div className="w-full max-w-[250px] h-[200px] flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                    image
                  </div>
                  <h1 className="font-bold text-xl">Барааны нэр</h1>
                  <h1 className="font-bold text-lg text-gray-700">
                    baraanii une₮
                  </h1>
                  <div className="flex flex-row items-center gap-6">
                    <Button
                      onClick={decreaseQuantity}
                      className="border text-white bg-amber-400 text-2xl"
                    >
                      -
                    </Button>
                    <h1 className="text-2xl">{quantity}</h1>
                    <Button
                      onClick={increaseQuantity}
                      className="border text-white bg-amber-400 text-xl"
                    >
                      +
                    </Button>
                  </div>
                  <Button className="mt-4 w-full sm:w-auto">Сагслах</Button>
                </div>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
