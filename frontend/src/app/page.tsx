"use client";
import { Navbar, Footer, Menu, ProductCard } from "@/components/main";
import { useEffect, useState } from "react";
import { cartType, productType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Shop } from "@/components/main/Shop";
import { Skeleton } from "@/components/ui/skeleton";
export default function Home() {
  const [products, setProducts] = useState<productType[]>([]);
  const [categoryId, setCategoryId] = useState<number>();
  const [cart, setCart] = useState<cartType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);

      const res = await api.get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Барааны мэдээлэл алдаатай байна.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => p.categoryId === categoryId);

  return (
    <div className="flex flex-col gap-3 p-1">
      <Navbar />
      <Menu setCategoryId={setCategoryId} loading={loading} />
      <div
        style={{ minHeight: "calc(100vh - 112px - 154px)" }}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
      >
        {(categoryId ? filteredProducts : products).map((product, index) => (
          <ProductCard key={index} product={product} setCart={setCart} />
        ))}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full relative flex flex-col items-center bg-gradient-to-r border-2 border-amber-200 p-4 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg"
            >
              <div className="w-full h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full rounded-xl" />
              </div>
              <div className="w-full mt-2 text-center">
                <Skeleton className="h-6 w-3/4 mx-auto" />
              </div>
              <div className="w-full mt-2">
                <Skeleton className="h-5 w-1/2 mx-auto" />
              </div>
            </div>
          ))}
      </div>
      <Footer />
      <Shop cart={cart} setCart={setCart} />
    </div>
  );
}
