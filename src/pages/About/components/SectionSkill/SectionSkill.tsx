import React from "react";
import cx from "classnames";
import TableSkill from "./components/TableSkill/TableSkill";
import style from "./style/SectionSkill.module.css";
import ImageParallax from "../../../../components/ImageParallax/ImageParallax";
import plants from "./assets/plants.jpg";

type Props = {};

const SectionSkill: React.FC = ({}: Props) => {
  return (
    <section
      id="section__skill"
      className={cx("section", "section__skill", style["skill__container"])}
    >
      <div className={style["skill__container__left"]}>
        <ImageParallax
          id="test-2"
          src={plants}
          height={window.innerHeight}
          width={window.innerWidth / 2}
        />
      </div>
      <div className={style["skill__container__right"]}>
        <TableSkill />
      </div>
    </section>
  );
};

export default SectionSkill;
