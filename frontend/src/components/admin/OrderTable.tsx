import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { orderType, userType } from "@/types/product";
import { status } from "../utils/status";
import { Skeleton } from "../ui/skeleton";
import { OrderDetailsDialog } from "./assets";
export const OrderTable = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [users, setUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const res = await api.get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Хэрэглэгчийн мэдээлэл алдаатай байна.");
    } finally {
      setLoading(false);
    }
  };
  const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/auth/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Хэрэглэгчийн мэдээлэл алдаатай байна.");
    }
  };
  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const token = localStorage.getItem("token");
    try {
      await api.put(
        `/order/${orderId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Захиалгын төлөв амжилттай шинэчлэгдлээ.");
    } catch (error) {
      console.error(error);
      toast.error("Төлөв шинэчлэхэд алдаа гарлаа.");
    }
  };
  const totalAmount = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  const getUserName = (userId: number) => {
    const findUser = users.find((user) => user.id === userId);
    return findUser?.name || "********";
  };

  const getStatusStyle = (statusName: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100  border border-yellow-300",
      payed: "bg-blue-100  border border-blue-300",
      delivered: "bg-green-100  border border-green-300",
      cancelled: "bg-red-100 border border-red-300",
    };
    return (
      statusColors[statusName] ||
      "bg-gray-100 text-gray-800 border border-gray-300"
    );
  };
  const getStatusText = (statusname: string) => {
    const findStatus = status.find((s) => s.name === statusname);
    return findStatus ? findStatus.text : "Тодорхойгүй";
  };

  return (
    <Table>
      <TableCaption>Захиалгын мэдээлэлийн жагсаалт.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Захиалгын дугаар</TableHead>
          <TableHead className="text-center">Хэрэглэгчийн нэр</TableHead>
          <TableHead className="text-start">Төлөв</TableHead>
          <TableHead className="text-center">Барааны төрөл</TableHead>
          <TableHead className="text-end">Захиалгын нийт үнэ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell colSpan={3} className="text-center">
                <Skeleton className="h-4 w-32 mx-auto" />
              </TableCell>
              <TableCell className="text-end">
                <Skeleton className="h-4 w-16" />
              </TableCell>
            </TableRow>
          ))}
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell className="text-center">
              {getUserName(order.userId)}
            </TableCell>
            <TableCell className="text-center">
              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order.id, newStatus)
                }
              >
                <SelectTrigger
                  className={`rounded-full w-fit px-2 text-xs ${getStatusStyle(
                    order.status
                  )}`}
                >
                  <SelectValue placeholder={getStatusText(order.status)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Төлөв</SelectLabel>
                    {status.map((status) => (
                      <SelectItem key={status.name} value={status.name}>
                        {status.text}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-center flex items-center gap-2 justify-center  h-full">
              <p className="border px-2 rounded-full bg-gray-300">
                {order.itemCount} төрөл
              </p>
              <OrderDetailsDialog products={order.items} />
            </TableCell>
            <TableCell className="text-end">
              {order.totalAmount.toLocaleString()} ₮
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Нийт</TableCell>
          <TableCell className="text-end">
            {totalAmount.toLocaleString()} ₮
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
