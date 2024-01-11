import React from "react";
import style from "./style/TableSkill.module.css";

type Props = {};
const filters = ["Frontend", "Backend", "CMS"];
const skills = ["HTML", "CSS", "Javascript", "PHP", "Drupal", "React"];
const TableSkill: React.FC = ({}: Props) => {
  return (
    <div className={style["table__skill"]}>
      <h3>what i do.</h3>
      <div className={style["table__filters"]}>
        {filters.map((filter) => (
          <button>{filter}</button>
        ))}
      </div>
      <div className={style["table__content"]}>
        {skills.map((skill) => (
          <div className={style["skill"]}>
            <h6>{skill}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkill;
