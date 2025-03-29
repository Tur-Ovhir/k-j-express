// "use client";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { FaFacebook } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <div className="w-full  bg-gradient-to-r from-yellow-200 to-yellow-400 p-3 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row  justify-between h-auto md:h-[80px]">
//         <h1 className="font-bold text-lg md:text-xl lg:text-2xl   md:text-left">
//           Korean&Japan Express Mongolia
//         </h1>
//         <div className="font-bold">
//           <h1 className="">Холбоо барих:88393935</h1>
//           <h1>Нүүр</h1>
//           <h1>Барааны цэс</h1>
//           <h1></h1>
//         </div>
//         <Link href="https://www.facebook.com/profile.php?id=100086976272987">
//           <Button className="bg-yellow-600 hover:bg-yellow-500  h-[30px] flex flex-row gap-1 rounded-xl">
//             <FaFacebook className="w-7 h-7 text-blue-700" />
//             <h1 className=" font-bold">Korean&Japan Express Mongolia</h1>
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default Footer;
"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-200 to-yellow-400 p-3 shadow-xl rounded-lg bg-opacity-90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between h-auto md:h-[80px]">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl md:text-left">
          Korean&Japan Express Mongolia
        </h1>
        <div className="font-bold">
          <h1 className="">Холбоо барих:88393935</h1>
          <h1>Нүүр</h1>
          <h1>Барааны цэс</h1>
        </div>
        <Link href="https://www.facebook.com/profile.php?id=100086976272987">
          <Button className="md:text-base px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold hover:opacity-80 transition h-[30px] flex flex-row gap-1 rounded-xl">
            <FaFacebook className="w-7 h-7 text-blue-700" />
            <h1 className="font-bold">Korean&Japan Express Mongolia</h1>
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Footer;
