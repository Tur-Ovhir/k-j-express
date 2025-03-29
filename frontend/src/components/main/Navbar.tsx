"use client";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-200 to-yellow-400 p-4 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between h-auto md:h-[80px] gap-4">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center md:text-left drop-shadow-md">
          Korean&Japan Express Mongolia
        </h1>
        <Button className="border rounded-xl text-sm md:text-base px-4 py-2 bg-white text-yellow-600 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
          Далайн гаралтай
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
