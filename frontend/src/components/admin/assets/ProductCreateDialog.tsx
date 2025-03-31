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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { categoryType } from "@/types/product";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

interface EditProductFormValues {
  name: string;
  description: string;
  quantity: number;
  images: string[];
  categoryId: number;
  price: number;
  isDisabled: boolean;
}

export const ProductCreateDialog = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);

  const getAllCategories = async () => {
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
      toast.error("Барааны нэмхэд алдаа гарлаа.");
    }
  };
  console.log(categories);
  useEffect(() => {
    getAllCategories();
  }, []);

  const addProductForm = useFormik<EditProductFormValues>({
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
      images: yup.array().min(1, "Зураг оруулна уу!"),
      quantity: yup
        .number()
        .required("Барааны тоо оруулна уу")
        .min(1, "Барааны тоо 1-ээс их байх ёстой"),
      categoryId: yup.number().required("Ангилалаа оруулна уу!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Бараа нэмэх</DialogTitle>
          <DialogDescription>
            Та шинэ бараа бүртгэх боломжтой.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addProductForm.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Барааны нэр</Label>
            <Input
              id="name"
              name="name"
              value={addProductForm.values.name}
              onChange={addProductForm.handleChange}
              onBlur={addProductForm.handleBlur}
            />
            {addProductForm.touched.name && addProductForm.errors.name && (
              <p className="text-red-500 text-sm">
                {addProductForm.errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Үнэ</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={addProductForm.values.price}
              onChange={addProductForm.handleChange}
              onBlur={addProductForm.handleBlur}
            />
            {addProductForm.touched.price && addProductForm.errors.price && (
              <p className="text-red-500 text-sm">
                {addProductForm.errors.price}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="quantity">Тоо хэмжээ</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={addProductForm.values.quantity}
              onChange={addProductForm.handleChange}
              onBlur={addProductForm.handleBlur}
            />
            {addProductForm.touched.quantity &&
              addProductForm.errors.quantity && (
                <p className="text-red-500 text-sm">
                  {addProductForm.errors.quantity}
                </p>
              )}
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
