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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      toast.error("Ангилал авахад алдаа гарлаа.");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const addProductForm = useFormik<EditProductFormValues>({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      images: [""],
      quantity: 0,
      isDisabled: false,
      categoryId: categories[0]?.id || 0,
    },
    validationSchema: yup.object({
      name: yup.string().required("Нэрээ оруулна уу!"),
      price: yup
        .number()
        .required("Үнэ оруулна уу")
        .min(0, "Үнэ 0-ээс их байх ёстой"),
      images: yup.array(),
      quantity: yup
        .number()
        .required("Барааны тоо оруулна уу")
        .min(1, "Барааны тоо 1-ээс их байх ёстой"),
      categoryId: yup.number().required("Ангилалаа оруулна уу!"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        await api.post("/product", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Бараа амжилттай нэмэгдлээ");
        setOpen(false);
        addProductForm.resetForm();
      } catch (error) {
        console.error(error);
        toast.error("Бараа нэмэхэд алдаа гарлаа");
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Бараа нэмэх</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Бараа нэмэх</DialogTitle>
          <DialogDescription>
            Та шинэ бараа бүртгэх боломжтой.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={addProductForm.handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Барааны нэр</Label>
            <Input
              id="name"
              name="name"
              placeholder="Барааны нэр"
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

          <div className="space-y-1">
            <Label htmlFor="description">Тайлбар</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Барааны тайлбар"
              value={addProductForm.values.description}
              onChange={addProductForm.handleChange}
              onBlur={addProductForm.handleBlur}
              rows={4}
            />
            {addProductForm.touched.description &&
              addProductForm.errors.description && (
                <p className="text-red-500 text-sm">
                  {addProductForm.errors.description}
                </p>
              )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="price">Үнэ</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Барааны Үнэ"
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

          <div className="space-y-1">
            <Label htmlFor="quantity">Тоо хэмжээ</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Тоо хэмжээ"
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

          <div className="space-y-1">
            <Label htmlFor="categoryId">Ангилал</Label>
            <Select
              value={addProductForm.values.categoryId.toString()}
              onValueChange={(value) =>
                addProductForm.setFieldValue("categoryId", parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Ангилал сонгох" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {addProductForm.touched.categoryId &&
              addProductForm.errors.categoryId && (
                <p className="text-red-500 text-sm">
                  {addProductForm.errors.categoryId}
                </p>
              )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
