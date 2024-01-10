import gsap from "gsap";

export const changeColorMenu = (color: string) => {
  console.log("to black");

  gsap
    .timeline()
    .to([".button__lang__svg path", ".button__contrast__svg path"], {
      fill: color,
      duration: 0.1,
      stagger: 0.05,
    })
    .to(
      ".menu__text_animate_Y__text",
      {
        color: color,
        duration: 0.1,
        stagger: 0.05,
      },
      "<="
    );
};
