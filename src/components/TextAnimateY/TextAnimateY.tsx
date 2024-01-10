import React, { useRef } from "react";
import style from "./style/TextAnimateY.module.css";
import cx from "classnames";

type Props = {
  text: string;
  height: number;
  customContainerStyle?: React.CSSProperties;
  customContainerClass?: string;
  customTextStyle?: React.CSSProperties;
  customTextClass?: string;
  duration?: number;
  callback?: Function;
};

const TextAnimateY = ({
  text,
  height,
  customContainerStyle,
  customContainerClass,
  customTextStyle,
  customTextClass,
  duration = 0.6,
  callback = () => null,
}: Props) => {
  let name = useRef(text);
  const onClickHandler = () => {
    callback(name.current);
  };
  return (
    <div
      className={cx(
        customContainerClass,
        style["text_translation_y-container"]
      )}
      style={{ height: height, ...customContainerStyle }}
      onClick={onClickHandler}
    >
      <div
        style={{ transition: `${duration}s` }}
        className={style["text_translation_y-wrapper"]}
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

export default TextAnimateY;
