import React, { useEffect, useRef } from "react";
import style from "./style/Mask.module.css";
import gsap from "gsap";
import MaskHandler from "./src/MaskHandler";
import Menu from "../Menu/Menu";

type Props = {
  children: React.ReactElement;
  maskSize: number;
};

const Mask: React.FC<Props> = ({ children, maskSize }: Props) => {
  const hero = useRef(null);

  useEffect(() => {
    new MaskHandler("#mask", maskSize);
    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(hero.current, {
      "--maskSize": `${maskSize}px`,
      duration: 0.5,
      ease: "back.out(8)",
    });
    return () => {};
  }, []);

  return (
    <div id="mask" className={style.mask} ref={hero}>
      {/*       <Menu color="#000" isMask={true} />
       */}
      <div className={style.mask__wrapper}>{children}</div>
    </div>
  );
};

export default Mask;
