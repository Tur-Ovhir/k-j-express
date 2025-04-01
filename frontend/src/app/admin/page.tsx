"use client";

import { OrderTable, ProductTable, UserTable } from "@/components/admin";
import { ProductCreateDialog } from "@/components/admin/assets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/utils/authProvider";

export default function AdminPage() {
  const { user, logout } = useAuth();

  if (!user || user.role !== "admin") {
    return null;
  }
  return (
    <div className="p-2 space-y-4">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-medium">Админ панел</h1>
        <Button className="cursor-pointer" onClick={logout}>
          гарах
        </Button>
      </div>
      <Tabs defaultValue="order">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className="cursor-pointer" value="order">
            Захиалгууд
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="product">
            Бараанууд
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="user">
            Хэрэглэгчид
          </TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <OrderTable />
        </TabsContent>
        <TabsContent value="product">
          <ProductCreateDialog />
          <ProductTable />
        </TabsContent>
        <TabsContent value="user">
          <UserTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
