"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cartType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";
export const Menu = ({
  setCategoryId,
}: {
  setCategoryId: (_categoryId: number) => void;
}) => {
  const [categories, setCategories] = useState<cartType[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Ангилалын мэдээлэл алдаатай байна.");
    }
  };
  return (
    <div className="">
      <div className="mt-3 md:mt-0 m-auto flex gap-2 flex-wrap whitespace-nowrap w-full md:w-auto justify-start md:justify-center">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setCategoryId(category.id)}
            className="border rounded-xl text-sm md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition "
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
