"use client";

export const Navbar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-200 to-yellow-400 p-4 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between h-auto md:h-[80px] gap-4">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center md:text-left drof-shadow-md">
          Эрүүл Хүнс,Эрүүл мэнд,Гоо сайхан таны гарт.
        </h1>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center md:text-left drop-shadow-md">
          Korean&Japan Express Mongolia
        </h1>
      </div>
    </div>
  );
};
