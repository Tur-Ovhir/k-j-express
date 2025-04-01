import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { userType } from "@/types/product";
import { Skeleton } from "../ui/skeleton";

export const UserTable = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const res = await api.get("/auth/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Хэрэглэгчийн мэдээлэл алдаатай байна.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table>
      <TableCaption>Хэрэглэгчийн мэдээлэлийн жагсаалт.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Бүртгэлийн дугаар</TableHead>
          <TableHead className="text-center">Хэрэглэгчийн нэр</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-32 mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="text-center">{user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Нийт</TableCell>
          <TableCell className="text-center">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
