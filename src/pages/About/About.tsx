import React from "react";
import style from "./style/About.module.css";
import cx from "classnames";
import TableSkill from "./components/TableSkill/TableSkill";
import SectionImage from "./components/SectionImage/SectionImage";
import LayoutBanner from "./assets/layout_banner.jpg";
import SectionTestimony from "./components/SectionTestimony/SectionTestimony";
type Props = {};

const About: React.FC = ({}: Props) => {
  return (
    <div className="about page">
      <section
        className={cx(
          "section",
          "section__text",
          style["section__text"],
          style["section__text__about"],
          "custom__container"
        )}
      >
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
      </section>
      <section
        className={cx("section", "section__skill", style["skill__container"])}
      >
        <div className={style["skill__container__left"]}></div>
        <div className={style["skill__container__right"]}>
          <TableSkill />
        </div>
      </section>
      <section
        className={cx(
          "section",
          style["section__interest"],
          "custom__container"
        )}
      >
        <h3>Also interest in.</h3>
        <div className={style["interest__container"]}>
          <div
            className={cx(style["interest"], style["interest__medium"])}
          ></div>
          <div className={cx(style["interest"], style["interest__big"])}></div>
          <div
            className={cx(style["interest"], style["interest__small"])}
          ></div>
        </div>
      </section>
      <SectionImage height={90} img={LayoutBanner} />
      <SectionTestimony />
      <section
        className={cx(
          "section",
          "section__text",
          style["section__text"],
          style["section__text__experience"],
          "custom__container"
        )}
      >
        <div className={cx("text__wrapper", style["text__wrapper"])}>
          <h2>Bedroom est auctor.</h2>
          <h4>
            The view has been identified as the one from his bedroom window,
            facing east, a view which Van Gogh painted variations of no fewer
            than twenty-one times, including The Starry Night.
          </h4>
        </div>
      </section>
      <SectionImage height={90} img={LayoutBanner} />
    </div>
  );
};

export default About;
