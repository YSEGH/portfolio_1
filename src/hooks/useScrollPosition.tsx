import { RefObject, useEffect, useState } from "react";

type ScrollPosition = {
  top: number;
  left: number;
};

const useScrollPosition = (ref: RefObject<HTMLDivElement>): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        setScrollPosition({
          top: window.scrollY - ref.current.offsetTop,
          left: ref.current.scrollLeft,
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref.current]);

  return scrollPosition;
};

export default useScrollPosition;
