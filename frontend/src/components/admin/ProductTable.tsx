"use client";

import { productType } from "@/types/product";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { api } from "@/lib/axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProductEditDialog } from "./assets";
import { Skeleton } from "../ui/skeleton";

export const ProductTable = () => {
  const [products, setProducts] = useState<productType[]>([]);
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

  const totalAmount = products.reduce(
    (acc, curr) => acc + (curr.isDisabled ? 0 : curr.price),
    0
  );

  const handleProductDelete = async (productId: number) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Амжилттай устгагдлаа");
      getProducts();
    } catch (error) {
      console.error(error);
      toast.error("Барааны устгах Үед алдаа гарлаа.");
    }
  };

  return (
    <Table className="sm:px-24">
      <TableCaption>Барааны мэдээлэлийн жагсаалт.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Нэр</TableHead>
          <TableHead>Тайлбар</TableHead>
          <TableHead className="text-center">Тоо ширхэг</TableHead>
          <TableHead className="text-center">Ангилал</TableHead>
          <TableHead className="text-center">Үнэ</TableHead>
          <TableHead className="text-center">Засах</TableHead>
          <TableHead className="text-center">Устгах</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell colSpan={6} className="text-center">
                <Skeleton className="h-4 w-32 mx-auto" />
              </TableCell>
              <TableCell className="text-end">
                <Skeleton className="h-4 w-16" />
              </TableCell>
            </TableRow>
          ))}
        {products.map((invoice) => (
          <TableRow
            className={invoice.isDisabled ? "line-through" : ""}
            key={invoice.id}
          >
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell className="max-w-48 truncate">
              {invoice.description}
            </TableCell>
            <TableCell className="text-center">{invoice.quantity}</TableCell>
            <TableCell className="text-center">{invoice.categoryId}</TableCell>
            <TableCell className="text-center">
              {invoice.price.toLocaleString()} ₮
            </TableCell>
            <TableCell className="text-center">
              <div className="w-full flex justify-center">
                <ProductEditDialog productId={invoice.id} />
              </div>
            </TableCell>
            <TableCell className="text-end">
              <div className="w-full flex justify-center">
                <div
                  onClick={() => handleProductDelete(invoice.id)}
                  className="border p-1 w-fit rounded-sm cursor-pointer bg-red-300"
                >
                  <Trash2 className="size-4" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Нийт</TableCell>
          <TableCell className="text-right">
            {totalAmount.toLocaleString()} ₮
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
