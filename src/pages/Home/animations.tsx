import gsap from "gsap";
import { changeColorMenu } from "../../components/Menu/animations";

const timeline: GSAPTimeline = gsap
  .timeline({ paused: true })
  .to(
    ".banner__text_animate_y__text",
    {
      y: 200,
      duration: 0.1,
      stagger: 0.05,
      ease: "power4.in",
    },
    "<="
  )
  .to(".banner__wrapper", {
    "--line-height": 0,
    duration: 0.4,
    ease: "power4.in",
  })
  .call(changeColorMenu, ["#000"]);

export const hideAnimationHome = () => {
  timeline.play();
};

export const showAnimationHome = () => {
  timeline.reverse();
};
