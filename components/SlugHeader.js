import { useEffect, useState } from "react";
import Link from "next/link";

export const SlugHeader = ({ post }) => {
  const [navBar, setNavBar] = useState(false);

  const showNavBar = () => {
    if (window.scrollY >= 100) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", showNavBar);
  }, []);

  return (
    <div
      className={`sticky bg-[#fff] shadow-md top-0 w-full z-[10] transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="h-[67px] flex items-center justify-between p-2 md:p-6">
          <Link href="/" className="cursor-pointer">
            <h1 className="text-center font-black text-xl md:text-3xl text-gray-800 cursor-pointer">
              Discover.
            </h1>
          </Link>
          <h1
            className={`text-xl md:text-3xl font-black text-black ${
              navBar ? "block" : "hidden"
            }`}
          >
            <span className="text-red-400">Explore</span> {post.title}
          </h1>
        </div>
      </div>
    </div>
  );
};
