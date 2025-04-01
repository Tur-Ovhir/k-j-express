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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useFormik } from "formik";
import * as yup from "yup";
import { api } from "@/lib/axios";
import { productType, categoryType } from "@/types/product";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditProductFormValues {
  name: string;
  description: string;
  quantity: number;
  images: string[];
  categoryId: number;
  price: number;
  isDisabled: boolean;
}

export const ProductEditDialog = ({ productId }: { productId: number }) => {
  const [product, setProduct] = useState<productType | null>(null);
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      toast.error("Барааны мэдээлэл авахад алдаа гарлаа");
    }
  };

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
    if (open) {
      getProductById();
      getAllCategories();
    }
  }, [open, productId]);

  const editProductForm = useFormik<EditProductFormValues>({
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
      description: yup.string().required("Тайлбараа оруулна уу!"),
      price: yup
        .number()
        .required("Үнэ оруулна уу")
        .min(0, "Үнэ 0-ээс их байх ёстой"),
      images: yup.array(),
      quantity: yup
        .number()
        .required("Барааны тоо оруулна уу")
        .min(0, "Тоо хэмжээ 0-ээс их байх ёстой"),
      categoryId: yup.number().required("Ангилалаа оруулна уу!"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        await api.put(`/product/${productId}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Барааны мэдээлэл амжилттай шинэчлэгдлээ");
        setOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Бараа шинэчлэхэд алдаа гарлаа");
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (product) {
      editProductForm.setValues({
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images,
        quantity: product.quantity,
        isDisabled: product.isDisabled,
        categoryId: product.categoryId,
      });
    }
  }, [product]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <PencilLine className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Бараа шинчлэх</DialogTitle>
          <DialogDescription>
            Та барааны мэдээлэлийг өөрчлөх боломжтой
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={editProductForm.handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Барааны нэр</Label>
            <Input
              id="name"
              name="name"
              placeholder="Барааны нэр"
              value={editProductForm.values.name}
              onChange={editProductForm.handleChange}
              onBlur={editProductForm.handleBlur}
            />
            {editProductForm.touched.name && editProductForm.errors.name && (
              <p className="text-red-500 text-sm">
                {editProductForm.errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Тайлбар</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Барааны тайлбар"
              value={editProductForm.values.description}
              onChange={editProductForm.handleChange}
              onBlur={editProductForm.handleBlur}
              rows={4}
            />
            {editProductForm.touched.description &&
              editProductForm.errors.description && (
                <p className="text-red-500 text-sm">
                  {editProductForm.errors.description}
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
              value={editProductForm.values.price}
              onChange={editProductForm.handleChange}
              onBlur={editProductForm.handleBlur}
            />
            {editProductForm.touched.price && editProductForm.errors.price && (
              <p className="text-red-500 text-sm">
                {editProductForm.errors.price}
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
              value={editProductForm.values.quantity}
              onChange={editProductForm.handleChange}
              onBlur={editProductForm.handleBlur}
            />
            {editProductForm.touched.quantity &&
              editProductForm.errors.quantity && (
                <p className="text-red-500 text-sm">
                  {editProductForm.errors.quantity}
                </p>
              )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="categoryId">Ангилал</Label>
            <Select
              value={editProductForm.values.categoryId.toString()}
              onValueChange={(value) =>
                editProductForm.setFieldValue("categoryId", parseInt(value))
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
            {editProductForm.touched.categoryId &&
              editProductForm.errors.categoryId && (
                <p className="text-red-500 text-sm">
                  {editProductForm.errors.categoryId}
                </p>
              )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isDisabled"
              checked={editProductForm.values.isDisabled}
              onCheckedChange={(checked) =>
                editProductForm.setFieldValue("isDisabled", checked)
              }
            />
            <Label htmlFor="isDisabled">
              {editProductForm.values.isDisabled ? "Идэвхгүй" : "Идэвхтэй"}
            </Label>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Хадгалж байна..." : "Өөрчлөлтийг хадгалах"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
