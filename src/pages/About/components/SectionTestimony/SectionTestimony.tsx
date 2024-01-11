import React from "react";
import style from "./style/SectionTestimony.module.css";
import cx from "classnames";
import Testimony from "./components/Testimony/Testimony";
import man from "./assets/man.jpg";

type Props = {};

const testimonies = [
  {
    testimony:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit itaque natus, quibusdam quis.",
    img: man,
    name: "John Doe",
    job: "Lead Tech",
  },
  {
    testimony:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit itaque natus, quibusdam quis.",
    img: man,
    name: "John Doe",
    job: "Lead Tech",
  },
  {
    testimony:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit itaque natus, quibusdam quis.",
    img: man,
    name: "John Doe",
    job: "Lead Tech",
  },
  {
    testimony:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit itaque natus, quibusdam quis.",
    img: man,
    name: "John Doe",
    job: "Lead Tech",
  },
];
const SectionTestimony: React.FC = ({}: Props) => {
  return (
    <section className={cx("section", style["section__testimony"])}>
      <div
        className={cx(
          style["section__testimony__title"],
          "custom__container__x"
        )}
      >
        <h3>They talk about me.</h3>
      </div>
      <div className={style["testimony__container"]}>
        {testimonies.map((testimony) => (
          <Testimony testimony={testimony} />
        ))}
      </div>
    </section>
  );
};

export default SectionTestimony;
