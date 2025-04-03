"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cartType } from "@/types/product";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export const Menu = ({
  setCategoryId,
  loading,
}: {
  setCategoryId: (_categoryId: number) => void;
  loading: boolean;
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
        {loading ? (
          <div className="mt-3 md:mt-0 m-auto flex gap-2 flex-wrap whitespace-nowrap w-full md:w-auto justify-start md:justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-10 w-20 md:w-24 rounded-xl bg-gray-200"
              />
            ))}
          </div>
        ) : (
          categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => setCategoryId(category.id)}
              className="border rounded-xl text-sm md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition "
            >
              {category.name}
            </Button>
          ))
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="mt-3 text-center text-lg justify-center items-center font-bold flex flex-col gap-2 bg-gradient-to-r from-yellow-200 to-yellow-400 p-4 shadow-lg rounded-b-2xl bg-opacity-90 backdrop-blur-lg">
          <div className="flex flex-row gap-2">
            <h1>Жимс,Хүнс (Бэлэн12цаг дотор хүргэгдэнэ) </h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1>
              Гоо сайхан,эрүүл мэндийн бүтээгдэхүүн захиалгаар (Агаарын тээврээр
              7-10 хоногт)
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
