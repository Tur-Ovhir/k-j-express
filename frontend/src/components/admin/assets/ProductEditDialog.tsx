import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as yup from "yup";
import { api } from "@/lib/axios";
import { productType } from "@/types/product";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";

interface editProductFormValues {
  name: string;
  description: string;
  quantity: number;
  images: string[];
  categoryId: number;
  price: number;
  isDisabled: boolean;
}
export const ProductEditDialog = ({ productId }: { productId: number }) => {
  const [product, setProduct] = useState<productType>();

  const getProductById = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.get(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getProductById();
  }, [productId]);

  const editProductForm = useFormik<editProductFormValues>({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      images: [],
      quantity: 0,
      isDisabled: false,
      categoryId: 1,
    },
    validationSchema: yup.object({
      name: yup.string().required("Нэрээ оруулна уу!"),
      price: yup
        .number()
        .required("Үнэ оруулна уу")
        .min(0, "Үнэ 0-ээс их байх ёстой"),
      images: yup.array().required("Зураг оруулна уу!"),
      quantity: yup.number().required("Барааны тоо оруулна уу"),
      categoryId: yup.number().required("Ангилалаа оруулна уу!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border p-1 w-fit rounded-sm cursor-pointer bg-yellow-300">
          <PencilLine className="size-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product?.name}</DialogTitle>
          <DialogDescription>
            Та барааны мэдээлэлийг өөрчлөх боломжтой
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={editProductForm.handleSubmit}
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label> */}
            {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="username" className="text-right">
              Username
            </Label> */}
            {/* <Input id="username" value="@peduarte" className="col-span-3" /> */}
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
