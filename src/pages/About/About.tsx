import React from "react";
import style from "./style/About.module.css";
import cx from "classnames";
import layoutBanner from "./assets/layout_banner.jpg";
import SectionTestimony from "./components/SectionTestimony/SectionTestimony";
import SectionInterest from "./components/SectionInterest/SectionInterest";
import SectionSkill from "./components/SectionSkill/SectionSkill";
import ImageParallax from "../../components/ImageParallax/ImageParallax";
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
      <SectionSkill />
      <SectionInterest />
      <ImageParallax
        id="test-3"
        height={700}
        width={window.innerWidth}
        src={layoutBanner}
      />
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
      <ImageParallax
        id="test-4"
        height={700}
        width={window.innerWidth}
        src={layoutBanner}
      />
    </div>
  );
};

export default About;
