import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef, useEffect } from "react";
import Mountain from "../public/mount.png";
import Background from "../public/background.png";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const backgroundRef = useRef(null);
  const mountainRef = useRef(null);
  const title = useRef(null);

  useEffect(() => {
    const el = backgroundRef.current;
    const el2 = mountainRef.current;
    const el3 = title.current;
    gsap.to(el, {
      scrollTrigger: {
        scrub: 2,
      },
      scale: 1.5,
    });

    gsap.to(el2, {
      scrollTrigger: {
        scrub: 2,
      },
      y: 10,
    });

    gsap.to(el3, {
      scrollTrigger: {
        scrub: 1.5,
      },
      y: 8,
    });
  }, []);
  return (
    <div className="relative w-full h-screen overflow-hidden before:content-none before:absolute before:b-0 before:left-0 before:w-full before:h-[200px] before:z-[1000] before:bg-gradient-to-t before:from-white before:to-transparent">
      <div className="w-full h-[40vh] bottom-0 bg-gradient-to-b from-transparent to-[#202020] z-10 absolute"></div>
      <div className="relative w-full h-screen  b-0 " ref={backgroundRef}>
        <Image
          src={Background}
          layout="fill"
          objectFit="cover"
          className="origin-bottom"
        />
      </div>
      <h1
        className="text-[80px] md:text-[150px] text-white absolute top-[53%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 font-bold"
        ref={title}
      >
        Discover.
      </h1>
      <div
        className="absolute top-0 left-0 w-full h-screen origin-bottom"
        ref={mountainRef}
      >
        <Image
          src={Mountain}
          layout="fill"
          objectFit="cover"
          // className="origin-bottom"
        />
      </div>
    </div>
  );
};

export default Hero;
