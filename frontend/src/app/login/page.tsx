"use client";

import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { useState } from "react";
import { useAuth } from "@/components/utils/authProvider";
export default function LoginPage() {
  const [name, setName] = useState("");

  const { login, loading } = useAuth();

  const handleSubmit = () => {
    login(name);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-2">
      <div className="bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full sm:w-96 border border-gray-700">
        <div className="flex flex-row gap-1">
          <h2 className="font-semibold text-gold-400 text-center mb-6">
            Дугаараа оруулна уу!
          </h2>
          <FaRegFaceSmileBeam className="text-yellow-600 w-6 h-6" />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg focus:outline-none focus:border-gold-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Дугаараа оруулна уу"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black py-2 rounded-lg font-semibold hover:opacity-80 transition cursor-pointer"
        >
          {loading ? "loading..." : "Нэвтрэх"}
        </button>
      </div>
    </div>
  );
}
