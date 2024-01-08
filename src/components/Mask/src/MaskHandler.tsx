import gsap from "gsap";
import throttle from "lodash.throttle";

type Position = {
  x: number;
  y: number;
};

type Lerping = {
  [key: string]: { current: number; target: number };
};

type CursorPosition = {
  page: { x: number; y: number };
  client: { x: number; y: number };
};

type Button = {
  el: HTMLElement;
  x: { current: number; target: number };
  y: { current: number; target: number };
};

export default class MaskHandler {
  private cursorSize: number;
  private cursorPosition: CursorPosition;
  private cursor: HTMLDivElement | null;
  private focusedButton: Button | null = null;
  private triggerArea: number;
  private targetHolder: Position | any;
  private lerpingData: Lerping;
  private interpolationFactor: number = 0.8;
  private targetClassname: string = ".magnetic-element";

  constructor(cursorId: string, cursorSize: number) {
    this.cursorSize = cursorSize;
    this.cursorPosition = { page: { x: 0, y: 0 }, client: { x: 0, y: 0 } };
    this.cursor = document.querySelector(cursorId);
    this.triggerArea = 150;
    this.targetHolder = { x: 0, y: 0 };
    this.lerpingData = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
    };
    window.addEventListener("mousemove", this.onMouseMoveHandler);
    window.addEventListener("scroll", this.onScrollHandler);
  }

  private onMouseMoveHandler = throttle((e: any) => {
    this.cursorPosition = {
      page: {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY,
      },
      client: {
        x: e.clientX,
        y: e.clientY,
      },
    };
    this.update();
  }, 100);

  private onScrollHandler = throttle(() => {
    this.cursorPosition.page = {
      x: window.scrollX + this.cursorPosition.client.x,
      y: window.scrollY + this.cursorPosition.client.y,
    };
    this.update();
  }, 100);

  public update = () => {
    let focusedButton = this.searchFocusedButton() as Button | null;
    if (focusedButton) {
      if (this.focusedButton?.el.id !== focusedButton.el.id) {
        this.resetButtonPosition();
        this.focusedButton = focusedButton;
        this.updateCursorScale();
      }
      this.updateCursorPositionOnButton();
      this.updateButtonPosition();
      return;
    }
    if (this.focusedButton) {
      this.resetButtonPosition();
      this.resetCursorScale();
    }
    this.focusedButton = null;
    this.updateCursorPosition();
  };

  private updateCursorPosition = () => {
    if (this.cursor) {
      gsap.to(this.cursor, {
        "--x": `${this.cursorPosition.page.x}px`,
        "--y": `${this.cursorPosition.page.y}px`,
        ease: "power1.out",
        duration: 0.8,
      });
    }
  };

  private updateCursorPositionOnButton = () => {
    if (this.cursor && this.focusedButton) {
      gsap.to(this.cursor, {
        "--x": `${this.focusedButton.x.current}px`,
        "--y": `${this.focusedButton.y.current}px`,
        ease: "power1.out",
        duration: 0.4,
      });
    }
  };

  private resetCursorScale = () => {
    if (this.cursor) {
      gsap.to(this.cursor, {
        "--maskSize": `${this.cursorSize}px`,
        duration: 0.6,
        ease: "power4.out",
      });
    }
  };

  private updateCursorScale = () => {
    if (this.focusedButton && this.cursor) {
      const scaleX = this.focusedButton.el.offsetWidth / (this.cursorSize * 2);

      gsap.to(this.cursor, {
        "--maskSize": `${this.cursorSize * scaleX + 10}px`,
        duration: 0.6,
        ease: "power4.out",
      });
    }
  };

  private resetButtonPosition = () => {
    if (this.focusedButton) {
      this.focusedButton.x.current = this.focusedButton.x.target;
      this.focusedButton.y.current = this.focusedButton.y.target;
      this.targetHolder = { x: 0, y: 0 };
      this.lerpingData = {
        x: { current: 0, target: 0 },
        y: { current: 0, target: 0 },
      };
      let dataTarget = (this.focusedButton.el as HTMLElement).dataset.target;
      gsap.to(`[data-target="${dataTarget}"]`, {
        "--x": `${0}`,
        "--y": `${0}`,
        overwrite: true,
        duration: 0.4,
        ease: "sine.out",
      });
    }
  };

  private updateButtonPosition = () => {
    if (this.focusedButton) {
      this.targetHolder.x =
        (this.cursorPosition.page.x - this.focusedButton.x.target) * 0.2;
      this.targetHolder.y =
        (this.cursorPosition.page.y - this.focusedButton.y.target) * 0.2;

      this.lerpingData.x.target = this.targetHolder.x;
      this.lerpingData.y.target = this.targetHolder.y;

      for (const item in this.lerpingData) {
        this.lerpingData[item].current = this.lerp(
          this.lerpingData[item].current,
          this.lerpingData[item].target,
          this.interpolationFactor
        );
      }

      this.focusedButton.x.current =
        this.focusedButton.x.target + this.lerpingData.x.current;

      this.focusedButton.y.current =
        this.focusedButton.y.target + this.lerpingData.y.current;

      let dataTarget = (this.focusedButton.el as HTMLElement).dataset.target;

      gsap.to(`[data-target="${dataTarget}"]`, {
        "--x": `${this.lerpingData.x.current}px`,
        "--y": `${this.lerpingData.y.current}px`,
        duration: 0.8,
        ease: "power1.out",
      });
    }
  };

  public getButtonList = () => {
    return Array.from(document.querySelectorAll(this.targetClassname)).map(
      (button: Element) => {
        const buttonX =
          window.scrollX +
          button.getBoundingClientRect().left +
          button.getBoundingClientRect().width / 2;
        const buttonY =
          window.scrollY +
          button.getBoundingClientRect().top +
          button.getBoundingClientRect().height / 2;

        return {
          el: button,
          x: { target: buttonX, current: buttonX },
          y: { target: buttonY, current: buttonY },
        };
      }
    );
  };

  private searchFocusedButton = () => {
    const buttons = Array.from(this.getButtonList());

    if (buttons.length === 0) {
      return null;
    }

    let closestButton = null;
    let minDistance = this.triggerArea;

    buttons.forEach((button: any) => {
      const distanceFromMouseToCenter = this.calculateDistance(
        this.cursorPosition.page.x,
        this.cursorPosition.page.y,
        button.x.target,
        button.y.target
      );

      if (distanceFromMouseToCenter < this.triggerArea) {
        if (distanceFromMouseToCenter < minDistance) {
          closestButton = button;
          minDistance = distanceFromMouseToCenter;
        }
      }
    });

    return closestButton;
  };

  private lerp = (current: any, target: any, factor: any) =>
    current * (1 - factor) + target * factor;

  private calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    return Math.hypot(x1 - x2, y1 - y2);
  };

  private testPoints = (x: number, y: number, color: string, width: number) => {
    let div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    div.style.width = `${width}px`;
    div.style.height = `${width}px`;
    div.style.backgroundColor = color;
    div.style.zIndex = "100";
    document.querySelector("body")?.appendChild(div);
  };
}
