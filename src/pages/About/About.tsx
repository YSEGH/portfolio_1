import React from "react";
import style from "./style/About.module.css";
import cx from "classnames";
import TableSkill from "./components/TableSkill/TableSkill";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="about page">
      <div className="custom__container">
        <div className={cx("text__wrapper", style["text__wrapper"])}>
          <h2>
            YS+M est auctor neque nec urna. Nam pretium turpis et arcu. tibulum
            ante ipsum primis in faucibus orci luctus.
          </h2>
          <h4>
            The view has been identified as the one from his bedroom window,
            facing east, a view which Van Gogh painted variations of no fewer
            than twenty-one times, including The Starry Night.
          </h4>
        </div>
      </div>
      <div className={style["skill__container"]}>
        <div className={style["skill__container__left"]}></div>
        <div className={style["skill__container__right"]}>
          <TableSkill />
        </div>
      </div>
    </div>
  );
};

export default About;
