import React, { useEffect, useRef, useState } from "react";
import SVGMenuBurger from "../../pages/Home/components/SVGMenuBurger/SVGMenuBurger";
import style from "./style/Menu.module.css";
import cx from "classnames";
import gsap from "gsap";
import menuBG from "./assets/menu_bg.svg";

type Props = {
  color?: string;
  isMask?: boolean;
};

const Menu: React.FC<Props> = ({ color = "#000", isMask = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const tween = useRef<GSAPTimeline | null>(null);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen && tween.current) {
      (tween.current as GSAPTimeline).reverse();
      tween.current = null;
      return;
    }
    if (isOpen) {
      tween.current = gsap
        .timeline()
        .fromTo(
          "#menu-wrapper",
          { scale: 0 },
          {
            scale: 1,
            duration: 0.8,
            ease: "power4.in",
          }
        )
        .fromTo(
          ".item-char",
          { y: 200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power4.out",
          },
          "<+.8"
        );
    }

    return () => {};
  }, [isOpen]);

  return (
    <div
      id="menu"
      className={cx(style.menu, { [style["menu--is-mask"]]: isMask })}
    >
      <div
        id="menu-wrapper"
        className={style["menu__wrapper"]}
        /*         style={{ backgroundImage: `url(${menuBG})` }}
         */
      >
        <ul className={style["menu__wrapper-items"]}>
          <li>
            <a className="item" href="">
              <span className={cx(style["item-char"], "item-char")}>Home</span>
            </a>
          </li>
          <li>
            <a className="item" href="">
              <span className={cx(style["item-char"], "item-char")}>About</span>
            </a>
          </li>
          <li>
            <a className="item" href="">
              <span className={cx(style["item-char"], "item-char")}>
                Projects
              </span>
            </a>
          </li>
          <li>
            <a className="item" href="">
              <span className={cx(style["item-char"], "item-char")}>
                Contact
              </span>
            </a>
          </li>
        </ul>
      </div>
      <button
        id="button__menu-burger"
        data-target="menu-burger"
        className={cx(style["button__menu-burger"], "magnetic-element")}
        onClick={onClickHandler}
      >
        <SVGMenuBurger color={color} active={isOpen} />
      </button>
    </div>
  );
};

export default Menu;
