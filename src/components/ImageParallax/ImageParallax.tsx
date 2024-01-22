import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import style from "./style/ImageParallax.module.css";

type Props = {
  id?: string;
  height: number;
  width: number;
  src: string;
  containerStyle?: React.CSSProperties;
};

const ImageParallax: React.FC<Props> = ({
  id,
  src,
  height,
  width,
  containerStyle,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const setParallax = () => {
      if (containerRef.current && imageRef.current) {
        const scrollGap =
          imageRef.current.getBoundingClientRect().height -
          containerRef.current.getBoundingClientRect().height;

        gsap.fromTo(
          imageRef.current,
          { y: -scrollGap },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
            y: scrollGap,
          }
        );
      }
    };
    const handleImageLoad = () => {
      setParallax();
    };

    if (imageRef.current) {
      imageRef.current.addEventListener("load", handleImageLoad);
    }
    window.addEventListener("resize", setParallax);
    return () => {
      window.removeEventListener("resize", setParallax);
    };
  }, []);

  return (
    <div
      id={id}
      ref={containerRef}
      className={style["parallax_img__container"]}
      style={{ ...containerStyle, height: height, width: width }}
    >
      <img className={style["parallax_img"]} ref={imageRef} src={src} />
    </div>
  );
};

export default ImageParallax;
