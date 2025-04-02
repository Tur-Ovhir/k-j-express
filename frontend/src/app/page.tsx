"use client";
import { Navbar, Footer, Menu, ProductCard } from "@/components/main";
import { useEffect, useState } from "react";
import { productType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Shop } from "@/components/main/Shop";
export default function Home() {
  const [products, setProducts] = useState<productType[]>([]);
  const [categoryId, setCategoryId] = useState<number>();

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

  const filteredProducts = products.filter((p) => p.categoryId === categoryId);

  return (
    <div className="flex flex-col gap-3 p-1">
      <Navbar />
      <Menu setCategoryId={setCategoryId} />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {(categoryId ? filteredProducts : products).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Footer />
      <Shop />
    </div>
  );
}
