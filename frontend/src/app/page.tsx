
"use client"

import Navbar from "@/components/main/Navbar";
import Login from "./main/Login/page";
import Footer from "@/components/main/Footer";
export default function Home() {
  return (
    <div className="flex flex-col p-1">  
      <div>
        <Navbar/>
      </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">   
    {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="w-full sm:w-[300px] md:w-[350px] h-[200px]  rounded-lg shadow-md flex items-center justify-center bg-yellow-200">
           <span className="text-lg font-semibold">Cart</span>        
        </div>   
    ))}
    </div>
    <div>
    <Login/>
    </div>
      <div>
      <Footer/>
      </div>
    </div>
  );
}
