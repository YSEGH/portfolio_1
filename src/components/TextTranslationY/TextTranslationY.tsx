import React, { useRef, useEffect } from "react";
import style from "./style/TextTranslationY.module.css";
import cx from "classnames";
import gsap from "gsap";

type Props = {
  text: string;
  height: number;
  customContainerStyle?: React.CSSProperties;
  customContainerClass?: string;
  customTextStyle?: React.CSSProperties;
  customTextClass?: string;
};

const TextTranslationY = ({
  text,
  height,
  customContainerStyle,
  customContainerClass,
  customTextStyle,
  customTextClass,
}: Props) => {
  const textWrapper = useRef<HTMLDivElement | null>(null);
  const animation = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    animation.current = gsap
      .timeline({ paused: true })
      .to(textWrapper.current, {
        y: -height,
        duration: 0.8,
        ease: "back.in(1.7)",
      });

    // Ajoute des gestionnaires d'événements directement dans la timeline
    animation.current.eventCallback("onStart", () =>
      console.log("Animation started")
    );
    animation.current.eventCallback("onComplete", () =>
      console.log("Animation completed")
    );

    // Nettoie la timeline lors du démontage du composant
    return () => {
      if (animation.current) {
        animation.current.kill();
        animation.current = null;
      }
    };
  }, [height]);

  const onMouseOverHandler = () => {
    if (animation.current) {
      animation.current.play();
    }
  };

  const onMouseOutHandler = () => {
    if (animation.current) {
      animation.current.reverse();
    }
  };

  return (
    <div
      className={cx(
        customContainerClass,
        style["text_translation_y-container"]
      )}
      style={{ height: height, ...customContainerStyle }}
    >
      <div
        ref={textWrapper}
        className="text_translation_y-wrapper"
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
      >
        <p
          className={cx(customTextClass, style["text_translation_y-text"])}
          style={customTextStyle}
        >
          {text}
        </p>
        <p
          className={cx(customTextClass, style["text_translation_y-text"])}
          style={customTextStyle}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default TextTranslationY;

/* import React, { useRef } from "react";
import style from "./style/TextTranslationY.module.css";
import cx from "classnames";
import gsap from "gsap";

type Props = {
  text: string;
  height: number;
  customContainerStyle?: React.CSSProperties;
  customContainerClass?: string;
  customTextStyle?: React.CSSProperties;
  customTextClass?: string;
};

const TextTranslationY = ({
  text,
  height,
  customContainerStyle,
  customContainerClass,
  customTextStyle,
  customTextClass,
}: Props) => {
  const textWrapper = useRef<HTMLDivElement | null>(null);
  const animation = useRef<GSAPTimeline>(
    gsap.timeline({}).to(textWrapper.current, { y: -height, duration: 0.8 })
  );
  const onMouseOverHandler = () => {
    console.log("play");

    animation.current.play();
  };
  const onMouseOutHandler = () => {
    animation.current.reverse();
  };
  return (
    <div
      className={cx(
        customContainerClass,
        style["text_translation_y-container"]
      )}
      style={customContainerStyle}
    >
      <div
        ref={textWrapper}
        className="text_translation_y-wrapper"
        onMouseOver={onMouseOverHandler}
        onMouseOut={onMouseOutHandler}
      >
        <p className={customTextClass} style={customTextStyle}>
          {text}
        </p>
        <p className={customTextClass} style={customTextStyle}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default TextTranslationY;
 */
