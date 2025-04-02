"use client";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="w-full bg-gradient-to-r from-yellow-200 to-yellow-400 p-4 shadow-lg rounded-b-2xl bg-opacity-90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between h-auto md:h-[80px] gap-4 px-4">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full bg-yellow-500 border-2 border-yellow-600 shadow-md"
            src="https://res.cloudinary.com/dykm0aphm/image/upload/v1743518658/ChatGPT_Image_Apr_1_2025_10_42_22_PM_d3vsus.png"
            alt="logo"
            width={80}
            height={80}
          />
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center md:text-left drop-shadow-md">
            Korean & Japan Express Mongolia
          </h1>
        </div>
      </div>
    </header>
  );
};
