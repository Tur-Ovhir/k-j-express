"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/utils/authProvider";

export default function AdminPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return null;
  }
  return (
    <Tabs defaultValue="order" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3 focus:bg-green-100">
        <TabsTrigger value="order">Захиалгууд</TabsTrigger>
        <TabsTrigger value="product">Бараанууд</TabsTrigger>
        <TabsTrigger value="user">Хэрэглэгчид</TabsTrigger>
      </TabsList>
      <TabsContent value="order">
        <div>Захиалгууд</div>
      </TabsContent>
      <TabsContent value="product">
        <div>Бараанууд</div>
      </TabsContent>
      <TabsContent value="user">
        <div>Хэрэглэгчид</div>
      </TabsContent>
    </Tabs>
  );
}
