"use client"
import { Button } from "@/components/ui/button"

const Navbar = () => {
    return (
        <div className="w-full bg-yellow-600 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-auto md:h-[80px]">
                <h1 className="font-bold text-lg md:text-xl lg:text-2xl  text-center md:text-left">
                    Korean&Japan Express Mongolia
                </h1> 
               
               <div className="mt-3 md:mt-0 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide 
                    w-full md:w-auto justify-start md:justify-center lg:justify-end">
                    <Button className="border rounded-xl text-sm md:text-base px-3 py-2">Далайн гаралтай бүтээгдэхүүн</Button>
                    <Button className="border rounded-xl text-sm md:text-base px-3 py-2">Гоо сайхны бүтээгдэхүүн</Button>
                    <Button className="border rounded-xl text-sm md:text-base px-3 py-2">Эрүүл мэндийн гаралтай бүтээгдэхүүн</Button>
                    <Button className="border rounded-xl text-sm md:text-base px-3 py-2">Хүнсний бүтээгдэхүүн</Button>
                </div>         
            </div>
        </div>
    )
}
export default Navbar;
