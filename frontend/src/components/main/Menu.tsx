"use client";
import { Button } from "../ui/button";
const Menu = () => {
  return (
    <div className="">
      <div
        className="mt-3 md:mt-0 flex gap-2 flex-wrap whitespace-nowrap  
                    w-full md:w-auto justify-start md:justify-center"
      >
        <Button className="border rounded-xl text-sm md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition">
          Хүнс
        </Button>
        <Button className="border rounded-xl text-sm md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition">
          Эрүүл мэндийн
        </Button>
        <Button className="border rounded-xl text-sm md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition">
          Гоо сайхны
        </Button>

        <Button className="border rounded-xl text-sm md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition">
          Далайн гаралтай
        </Button>
      </div>
    </div>
  );
};
export default Menu;
