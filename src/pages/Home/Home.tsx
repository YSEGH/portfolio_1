import React, { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import "./style/Home.css";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import ScrollableText from "../../components/ScrollableText/ScrollableText";
import Mask from "../../components/Mask/Mask";
import TextTranslationY from "../../components/TextTranslationY/TextTranslationY";

type Props = {};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "Fellows",
  fontSize: "60px",
  lineHeight: "55px",
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#fff",
};
const Home: React.FC<Props> = () => {
  const container = useRef<number>(0);
  const [cursorXPosition, setCursorXPosition] = useState(50);

  const onMouseMove = (e: globalThis.MouseEvent) => {
    setCursorXPosition(Math.round((e.clientX / container.current) * 100));
  };

  useEffect(() => {
    if (!container.current) {
      container.current = (
        document.querySelector("#root") as HTMLDivElement
      ).getBoundingClientRect().width;
    }
    window.addEventListener("mousemove", throttle(onMouseMove, 100));
    return () => {
      window.removeEventListener("mousemove", throttle(onMouseMove, 100));
    };
  }, []);

  return (
    <div className="banner page">
      <div className="banner__wrapper page__wrapper">
        <div className="banner__header">
          <ScrollableText
            id={1}
            text="seghrouchni youssef"
            customTextClass="banner__text banner__text-name"
            position={cursorXPosition}
            customTextStyle={{
              fontFamily: "Fellows",
              fontWeight: 700,
              fontSize: "400px",
              lineHeight: "275px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          />
        </div>
        <div className="banner__body">
          <div className="banner__body-text_wrapper">
            <TextTranslationY
              text="Full"
              height={55}
              customTextStyle={textStyle}
            />
            <TextTranslationY
              text="Stack"
              height={55}
              customTextStyle={textStyle}
            />
            <TextTranslationY
              text="Web"
              height={55}
              customTextStyle={textStyle}
            />
            <TextTranslationY
              text="Developer"
              height={55}
              customTextStyle={textStyle}
            />
          </div>
        </div>
      </div>
      <Mask children={<></>} maskSize={16} />
    </div>
  );
};

export default Home;
