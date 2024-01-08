import React, { useEffect, useRef } from "react";
import style from "./style/SVGMenuBurger.module.css";
import cx from "classnames";
import gsap from "gsap";

type Props = {
  color: string;
  active: boolean;
};

const SVGMenuBurger: React.FC<Props> = ({ color, active }: Props) => {
  const animationOnActive = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (!active && animationOnActive.current) {
      (animationOnActive.current as GSAPTimeline).reverse();
      animationOnActive.current = null;
      return;
    }
    if (active) {
      animationOnActive.current = gsap
        .timeline()
        .fromTo(
          ".path-1",
          { y: 0 },
          {
            y: 10,
            duration: 0.3,
            ease: "back.in(1.7)",
          }
        )
        .fromTo(
          ".path-3",
          { y: 0 },
          {
            y: -10,
            duration: 0.3,
            ease: "back.in(1.7)",
          },
          "<="
        )
        .fromTo(
          ".icon-burger__path",
          { backgroundColor: "#000" },
          { backgroundColor: "#fff" }
        )
        .fromTo(
          ".path-top",
          {
            rotate: 0,
          },
          {
            rotate: 45,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "<+0.8"
        )
        .fromTo(
          ".path-bottom",
          {
            rotate: 0,
          },
          {
            rotate: -45,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "<="
        );
    }
    return () => {};
  }, [active]);

  const onMouseHover = () => {};

  return (
    <div className={style["icon-burger"]} onMouseOver={onMouseHover}>
      <div
        style={{ backgroundColor: color }}
        className={cx(
          style["icon-burger__path"],
          "icon-burger__path",
          "path-1",
          style["path-1"],
          "path-top"
        )}
      ></div>
      <div
        style={{ backgroundColor: color }}
        className={cx(
          style["icon-burger__path"],
          "icon-burger__path",
          "path-2",
          style["path-2"],
          "path-top"
        )}
      ></div>
      <div
        style={{ backgroundColor: color }}
        className={cx(
          style["icon-burger__path"],
          "icon-burger__path",
          "path-3",
          style["path-3"],
          "path-bottom"
        )}
      ></div>
    </div>
  );
};

export default SVGMenuBurger;
