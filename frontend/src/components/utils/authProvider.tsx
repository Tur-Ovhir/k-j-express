"use client";

import { api } from "@/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface UserType {
  id: number;
  role: string;
  name: string;
}

interface AuthContextType {
  user: UserType | null;
  login: (name: string) => void;
  logout: () => void;
  loading: boolean;
  isReady: boolean;
}
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const login = async (name: string) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", { name, password: name });
      localStorage.setItem("token", res.data.token);

      setLoading(false);
      setUser(res.data.user);
      if (res.data.user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
      setIsReady(true);
      toast.success("Амжилттай нэвтэрлээ");
    } catch (error) {
      console.error(error);
      toast.error("Нэвтрэх үед алдаа гарлаа");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
    toast.warning("Амжилттай гарлаа");
  };

  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      setIsReady(false);

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsReady(true);
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      router.replace("/login");
      toast.error("Хэрэглэгчийн мэдээлэл буруу!");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (pathname !== "/login") {
      if (token) {
        getMe();
      } else {
        setIsReady(false);
        localStorage.removeItem("token");
        router.replace("/login");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
