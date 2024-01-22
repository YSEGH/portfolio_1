import React from "react";
import style from "./style/Form.module.css";
import cx from "classnames";

type InputInterface = {
  tag: string;
  type: string;
  name: string;
  placeholder: string;
};

type Props = {};

const inputs = [
  {
    tag: "input",
    type: "text",
    name: "name",
    placeholder: "Nom",
  },
  {
    tag: "input",
    type: "email",
    name: "email",
    placeholder: "Email",
  },
  {
    tag: "input",
    type: "text",
    name: "topic",
    placeholder: "Sujet",
  },
  {
    tag: "textarea",
    type: "text",
    name: "message",
    placeholder: "Message",
  },
];

const Form: React.FC = ({}: Props) => {
  const getFormInput = (inputs: InputInterface[]) => {
    return inputs.map((input: InputInterface, i) => {
      switch (input.tag) {
        case "input":
          return (
            <input
              className={cx("custom__container__x", style["form__input"])}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              key={`${input.type}-${i}`}
            ></input>
          );
        case "textarea":
          return (
            <textarea
              className={cx("custom__container__x", style["form__input"])}
              placeholder={input.placeholder}
              name={input.name}
              rows={1}
              key={`${input.type}-${i}`}
            ></textarea>
          );
        default:
          return (
            <input
              className={cx("custom__container__x", style["form__input"])}
              placeholder={input.placeholder}
              name={input.name}
              type={input.type}
              key={`${input.type}-${i}`}
            ></input>
          );
      }
    });
  };
  return (
    <div id="form__contact" className={style["form__contact"]}>
      {getFormInput(inputs)}
      <button
        type="submit"
        form="form__contact"
        className={cx(
          "custom__container__x",
          style["form__contact__submit_button"]
        )}
      >
        Envoyer
      </button>
    </div>
  );
};

export default Form;
