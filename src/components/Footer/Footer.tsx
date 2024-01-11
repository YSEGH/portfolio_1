import React from "react";
import style from "./style/Footer.module.css";
import cx from "classnames";
import sign from "./assets/sign.svg";
import location from "./assets/location.svg";
import arrowUpRight from "./assets/arrow_up_right.svg";
import arrowUp from "./assets/arrow_up.svg";
import download from "./assets/Download.svg";

type Props = {};

const Footer: React.FC = ({}: Props) => {
  return (
    <div className={cx("footer", style["footer"])}>
      <div className={cx("custom__container", style["footer__content"])}>
        <div
          className={cx(
            style["footer__wrapper"],
            style["footer__wrapper__top"]
          )}
        >
          <img src={sign} alt="" />
          <h2 className={style.footer__title}>
            seghrouchni
            <br />
            youssef
          </h2>
        </div>
        <div
          className={cx(
            style["footer__wrapper"],
            style["footer__wrapper__bottom"]
          )}
        >
          <div className={cx(style["footer__email"], style["footer__item"])}>
            <p>ysegh.dev@gmail.com</p>
          </div>
          <div className={cx(style["footer__location"], style["footer__item"])}>
            <p>saint-genis-pouilly, france</p>
            <img src={location} alt="" />
          </div>
          <div
            className={cx(style["footer__curriculum"], style["footer__item"])}
          >
            <p>curriculum vitae</p>
            <img src={download} alt="" />
          </div>
          <div className={cx(style["footer__networks"], style["footer__item"])}>
            <p>Linkedin</p>
            <img src={arrowUpRight} alt="" />
          </div>
          <div
            className={cx(style["footer__back_to_top"], style["footer__item"])}
          >
            <img src={arrowUp} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
