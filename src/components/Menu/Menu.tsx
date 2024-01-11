import React, { useState } from "react";
import style from "./style/Menu.module.css";
import cx from "classnames";
import TextAnimateY from "../TextAnimateY/TextAnimateY";
import {
  hideAnimationHome,
  showAnimationHome,
} from "../../pages/Home/animations";

type Props = {
  color?: string;
};

const menuTextStyle: React.CSSProperties = {
  fontFamily: "Fellows",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  textTransform: "uppercase",
};

const menuItems = ["Home", "About", "Projects", "Contact"];
const currentSpace = "Home";
const Menu: React.FC<Props> = ({ color = "#000" }: Props) => {
  const callbackFunction = (space: string) => {
    /*     hideAnimationHome();
     */
    /*     showAnimationHome();
     */
  };

  return (
    <div id="menu" className={cx(style.menu)}>
      <div className={style["space__wrapper"]}>
        <h2>{currentSpace}</h2>
      </div>
      <div className={style["button__lang__wrapper"]}>
        <button className={style["button__lang"]}>
          <svg
            className={"button__lang__svg"}
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.481534 12V0.363636H7.77699V1.875H2.23722V5.42045H7.39631V6.92614H2.23722V10.4886H7.84517V12H0.481534ZM19.5142 0.363636V12H17.9006L11.9858 3.46591H11.8778V12H10.1222V0.363636H11.7472L17.6676 8.90909H17.7756V0.363636H19.5142Z"
              fill={color}
            />
          </svg>
        </button>
      </div>

      <div className={style["button__contrast__wrapper"]}>
        <button className={style["button__contrast"]}>
          <svg
            className={"button__contrast__svg"}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.67104 8.28569C3.89022 6.5647 6.26002 4.16675 10.0001 4.16675C13.7401 4.16675 16.1099 6.5647 17.3291 8.28569C17.8008 8.95157 18.0367 9.2845 18.0171 9.95327C17.9975 10.622 17.7289 10.9577 17.1916 11.629C15.8103 13.3549 13.2593 15.8334 10.0001 15.8334C6.74089 15.8334 4.18986 13.3549 2.80858 11.629C2.2713 10.9577 2.00266 10.622 1.98306 9.95327C1.96346 9.2845 2.19932 8.95157 2.67104 8.28569ZM10.0001 13.3334C11.841 13.3334 13.3334 11.841 13.3334 10.0001C13.3334 8.15913 11.841 6.66675 10.0001 6.66675C8.15913 6.66675 6.66674 8.15913 6.66674 10.0001C6.66674 11.841 8.15913 13.3334 10.0001 13.3334Z"
              fill={color}
            />
          </svg>
        </button>
      </div>

      <div id="menu-wrapper" className={style["menu_items_wrapper"]}>
        {menuItems.map((item, i) => (
          <div className={style["menu_item_wrapper"]} key={`${i}-${item}`}>
            <TextAnimateY
              text={item}
              height={20}
              customTextStyle={{ color: color, ...menuTextStyle }}
              customTextClass="menu__text_animate_Y__text"
              duration={0.3}
              callback={callbackFunction}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
