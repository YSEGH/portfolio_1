import React from "react";
import "./style/Home.css";
import ScrollableText from "../../components/ScrollableText/ScrollableText";
import TextAnimateY from "../../components/TextAnimateY/TextAnimateY";
import ImageParallax from "../../components/ImageParallax/ImageParallax";
import layoutBanner from "./assets/layout_banner.jpg";

type Props = {};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "Fellows",
  fontSize: "48px",
  lineHeight: "50px",
  fontWeight: 500,
  textTransform: "uppercase",
  color: "#fff",
};

const textJob = ["Full", "Stack", "Web", "Developer"];
const Home: React.FC<Props> = () => {
  return (
    <div className="banner page">
      <ImageParallax
        id="test-1"
        containerStyle={{ position: "absolute", top: 0 }}
        height={window.innerHeight}
        width={window.innerWidth}
        src={layoutBanner}
      />
      <div className="banner__wrapper page__wrapper">
        <div className="banner__header">
          <ScrollableText
            text="seghrouchni youssef"
            customTextClass="banner__text banner__text__name"
            customTextStyle={{
              fontFamily: "Fellows",
              fontWeight: 700,
              fontSize: "400px",
              lineHeight: "275px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
            }}
          />
        </div>
        <div className="banner__body">
          <div className="banner__body-text_wrapper">
            {textJob.map((text, i) => (
              <TextAnimateY
                key={`${i}-${text}`}
                text={text}
                height={50}
                customTextStyle={textStyle}
                customTextClass="banner__text_animate_y__text"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
