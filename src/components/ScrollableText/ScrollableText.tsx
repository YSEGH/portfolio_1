import React, { useEffect, useRef } from "react";
import style from "./style/ScrollableText.module.css";
import cx from "classnames";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";

type Props = {
  id: number;
  text: string;
  customContainerClass?: string;
  customTextClass?: string;
  customContainerStyle?: React.CSSProperties;
  customTextStyle?: React.CSSProperties;
  reverse?: boolean;
  position: number;
};

const ScrollableText: React.FC<Props> = ({
  id,
  text,
  customContainerClass = "",
  customContainerStyle,
  customTextClass,
  customTextStyle,
  reverse = false,
  position,
}) => {
  const textRef = useRef(null);

  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    if (containerRef.current && textRef.current) {
      const windowWidth = (
        document.querySelector("#root") as HTMLDivElement
      ).getBoundingClientRect().width;

      let positionX;
      let percent;
      let translateX;
      let scrollGap =
        ((textRef.current as HTMLDivElement).scrollWidth - windowWidth) / 2;

      let windowXCenter = windowWidth / 2;

      if (position < 50) {
        positionX = windowXCenter - windowWidth * (position / 100);
        percent = positionX / windowXCenter;
        translateX = scrollGap * percent;
      } else {
        positionX = windowWidth * (position / 100) - windowXCenter;
        percent = positionX / windowXCenter;
        translateX = -scrollGap * percent;
      }

      gsap.to(textRef.current, {
        x: reverse ? -translateX : translateX,
        duration: 3,
        ease: "power2.out",
      });
    }

    return () => {};
  }, [position]);

  return (
    <div
      ref={containerRef}
      style={{ ...customContainerStyle }}
      className={cx(
        customContainerClass,
        "scrollable_text-container",
        style["scrollable_text-container"],
        {
          [style.reverse]: reverse,
        }
      )}
    >
      <h1
        ref={textRef}
        className={cx(
          customTextClass,
          "scrollable_text-text",
          style["scrollable_text-text"]
        )}
        style={{ ...customTextStyle }}
      >
        <span>{text}</span>
      </h1>
    </div>
  );
};

export default ScrollableText;
