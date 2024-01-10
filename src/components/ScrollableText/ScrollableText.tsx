import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "./style/ScrollableText.module.css";
import cx from "classnames";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import throttle from "lodash.throttle";

type Props = {
  text: string;
  customContainerClass?: string;
  customTextClass?: string;
  customContainerStyle?: React.CSSProperties;
  customTextStyle?: React.CSSProperties;
  reverse?: boolean;
};

const ScrollableText: React.FC<Props> = ({
  text,
  customContainerClass = "",
  customContainerStyle,
  customTextClass,
  customTextStyle,
  reverse = false,
}) => {
  const rootContainer = useRef<number>(0);
  const [cursorXPosition, setCursorXPosition] = useState(50);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const onMouseMove = useCallback((e: globalThis.MouseEvent) => {
    setCursorXPosition(Math.round((e.clientX / rootContainer.current) * 100));
  }, []);

  /* Update text position */
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

      if (cursorXPosition < 50) {
        positionX = windowXCenter - windowWidth * (cursorXPosition / 100);
        percent = positionX / windowXCenter;
        translateX = scrollGap * percent;
      } else {
        positionX = windowWidth * (cursorXPosition / 100) - windowXCenter;
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
  }, [cursorXPosition]);

  // Add mouseMove listener.
  useEffect(() => {
    if (!rootContainer.current) {
      rootContainer.current = (
        document.querySelector("#root") as HTMLDivElement
      ).getBoundingClientRect().width;
    }
    window.addEventListener("mousemove", throttle(onMouseMove, 100));
    return () => {
      window.removeEventListener("mousemove", throttle(onMouseMove, 100));
    };
  }, []);

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
