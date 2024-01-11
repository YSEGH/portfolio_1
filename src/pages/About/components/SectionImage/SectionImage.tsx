import React from "react";
import style from "./style/SectionImage.module.css";
import cx from "classnames";
type Props = {
  img: string;
  height: number;
};

const SectionImage = ({ img, height }: Props) => {
  console.log(img);

  return (
    <section
      className={cx("section", style["section__image"])}
      style={{ height: `${height}vh`, backgroundImage: `url(${img})` }}
    ></section>
  );
};

export default SectionImage;
