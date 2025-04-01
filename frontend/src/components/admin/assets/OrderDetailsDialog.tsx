import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productType } from "@/types/product";
import { Expand } from "lucide-react";

export const OrderDetailsDialog = ({
  products,
}: {
  products: productType[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border w-fit rounded-sm p-1 cursor-pointer">
          <Expand className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Бараанууд</DialogTitle>
          <DialogDescription>
            Захиалга дотор байрлах бараанууд
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {products.map((product, index) => {
            return (
              <div key={index}>
                <div className="text-xl font-bold">{product?.name}</div>
                <div>
                  {product.quantity} x {product?.price.toLocaleString()}₮ ={" "}
                  {(
                    product && product.price * product.quantity
                  )?.toLocaleString()}
                  ₮
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
