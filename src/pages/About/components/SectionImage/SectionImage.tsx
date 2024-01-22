import React from "react";
import style from "./style/SectionImage.module.css";
import cx from "classnames";
type Props = {
  img: string;
  height: number;
};

const SectionImage: React.FC<Props> = ({ img, height }: Props) => {
  return (
    <section className={cx("section", style["section__image"])}>
      <img className={style["parallax__img"]} src={`${img}`} />
    </section>
  );
};

export default SectionImage;
