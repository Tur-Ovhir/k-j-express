"use client"
import Link from "next/link";
import { Button } from "../ui/button"
import { FaFacebook } from "react-icons/fa";

const Footer = ()=> {
    return(
        <div className="w-full bg-yellow-600 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row  justify-between h-auto md:h-[80px]">
                <h1 className="font-bold text-lg md:text-xl lg:text-2xl   md:text-left">
                    Korean&Japan Express Mongolia
                </h1> 
               <div className="font-bold">
                <h1 className="">Холбоо барих:88393935</h1>
                <h1>Нүүр</h1>
                <h1>Барааны цэс</h1>
                <h1></h1>
               </div>              
                 <Link href="https://www.facebook.com/profile.php?id=100086976272987">
                <Button className="bg-gray-400 hover:bg-amber-300 h-[30px] flex flex-row gap-1 rounded-xl" >
               <FaFacebook className="w-7 h-7 text-blue-700"/>
               <h1 className=" font-bold">Korean&Japan Express Mongolia</h1>
               </Button>
               </Link>
            </div>
        </div>
    )
}
export default Footer