"use client";
import Image from "next/image";
import { Navbar, Footer, Menu, ProductCard } from "@/components/main";
import { useEffect, useState } from "react";
import { productType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Shop } from "@/components/main/Shop";
export default function Home() {
  const [products, setProducts] = useState<productType[]>([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Барааны мэдээлэл алдаатай байна.");
    }
  };

  return (
    <div className="flex flex-col gap-3 p-1">
      <div>
        <Navbar />
      </div>
      <div>
        <Menu />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {products.map((product, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-full sm:w-[300px] md:w-[350px] flex flex-col items-center bg-gradient-to-r border-2  border-amber-200 p-4 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg">
              <div className="w-full h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
                <Image
                  className="rounded-xl"
                  src={product.images[0]}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </div>
              <div className="font-bold text-lg mt-2 text-center">
                {product.name}
              </div>
              <div className="font-bold text-md text-gray-700">
                {product.price}₮
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
      <div>
        <Shop />
      </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
}
