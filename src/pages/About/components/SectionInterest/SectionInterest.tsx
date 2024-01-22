import React, { useEffect, useRef } from "react";
import style from "./style/SectionInterest.module.css";
import cx from "classnames";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import GamePad3D from "./GamePad3D/GamePad3D";

type Props = {};

const SectionInterest: React.FC = ({}: Props) => {
  const medium = useRef(null);
  const big = useRef(null);
  const small = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#section__interest",
          start: "top 25%",
          end: "bottom center",
          scrub: true,
        },
      })
      .to(small.current, {
        opacity: 1,
        y: 0,
      })
      .to(
        big.current,
        {
          opacity: 1,
          y: 0,
        },
        "<="
      )
      .to(
        medium.current,
        {
          opacity: 1,
          y: 50,
        },
        "<="
      );
    return () => {};
  }, []);

  return (
    <section
      id="section__interest"
      className={cx("section", style["section__interest"], "custom__container")}
    >
      <h3>Also interest in.</h3>
      <div className={style["interest__container"]}>
        <div
          ref={medium}
          className={cx(style["interest"], style["interest__medium"])}
        ></div>
        <div
          ref={big}
          className={cx(style["interest"], style["interest__big"])}
        ></div>
        <div
          ref={small}
          className={cx(style["interest"], style["interest__small"])}
        >
          <div className={style.model__wrapper}>
            <GamePad3D />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionInterest;
