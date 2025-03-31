"use client";
import Image from "next/image";
import { Navbar, Footer, Menu, ProductCard } from "@/components/main";
import { useEffect, useState } from "react";
import { productType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 ">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full sm:w-[300px] md:w-[350px] h-[200px] flex items-center justify-center bg-gradient-to-r from-yellow-200 to-yellow-400 p-4 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg"
          >
            <div className="flex flex-col gap-1">
              <Image
                className="p-3"
                src="https://res.cloudinary.com/dykm0aphm/image/upload/v1742961244/484095109_627177016858169_3975179124310115058_n_jx37mk.jpg"
                alt="image"
                fill
              />

              <span className="text-lg font-semibold">{product.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
      <div>
        <ProductCard />
      </div>
    </div>
  );
}
