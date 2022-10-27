// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const Header = () => {
// const [navBar, setNavBar] = useState(false);

//   const showNavBar = () => {
//     if (window.scrollY >= 300) {
//       setNavBar(true);
//     } else {
//       setNavBar(false);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll", showNavBar);
//   }, []);

//   return (
//     <div
//       initial={{ y: "-100vh" }}
//       animate={{ y: "0" }}
//       className={`sticky bg-[#ffffff70] top-0 w-full z-10 transition-all duration-300 ${
//         navBar ? "block" : "hidden"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="h-[67px] flex items-center justify-center">
//           <h1 className="text-center font-black text-3xl text-gray-800">
//             Discover.
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
