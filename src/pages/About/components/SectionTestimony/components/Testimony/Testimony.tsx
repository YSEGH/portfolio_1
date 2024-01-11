import React from "react";
import style from "./style/Testimony.module.css";
import cx from "classnames";

interface TestimonyInterface {
  img: string;
  name: string;
  job: string;
  testimony: string;
}
type Props = {
  testimony: TestimonyInterface;
};

const Testimony: React.FC<Props> = ({ testimony }: Props) => {
  return (
    <div className={cx(style["testimony"])}>
      <div className={cx(style["testimony__content"])}>
        <div
          className={cx(
            style["testimony__wrapper"],
            style["testimony__wrapper__front"],
            "custom__container__x"
          )}
        >
          <div className={style["testimony__image"]}>
            <img src={testimony.img} alt="" />
          </div>
          <div className={style["testimony__user"]}>
            <h4 className={style["testimony__name"]}>{testimony.name}</h4>
            <h5 className={style["testimony__job"]}>{testimony.job}</h5>
          </div>
        </div>
        <div
          className={cx(
            style["testimony__wrapper"],
            style["testimony__wrapper__back"],
            "custom__container__x"
          )}
        >
          <h4 className={style["testimony__testimony"]}>
            {testimony.testimony}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
