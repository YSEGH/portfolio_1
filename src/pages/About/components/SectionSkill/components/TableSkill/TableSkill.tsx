import React, { useEffect } from "react";
import style from "./style/TableSkill.module.css";
import gsap from "gsap";
import cx from "classnames";
import { ScrollTrigger } from "gsap/all";

type Props = {};

const filters = ["Frontend", "Backend", "CMS"];
const skills = ["HTML", "CSS", "Javascript", "PHP", "Drupal", "React"];

const TableSkill: React.FC = ({}: Props) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section__skill",
        start: "top center",
      },
    });

    return () => {};
  }, []);

  return (
    <div className={style["table__skill"]}>
      <h3>what i do.</h3>
      <div className={style["table__filters"]}>
        {filters.map((filter, i) => (
          <button key={`${filter}-${i}`}>{filter}</button>
        ))}
      </div>
      <div className={style["table__content"]}>
        {skills.map((skill, i) => (
          <div key={`${skill}-${i}`} className={cx("skill", style["skill"])}>
            <h6>{skill}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkill;
