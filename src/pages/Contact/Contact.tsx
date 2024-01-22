import React from "react";
import cx from "classnames";
import style from "./style/Contact.module.css";
import Form from "./components/Form/Form";

type Props = {};

const Contact: React.FC = ({}: Props) => {
  return (
    <div className={cx("page", "page__contact")}>
      <div className={cx("custom__container", "contact__header")}>
        <p className={style["contact__header__title"]}>
          Pellentesque ut neque. Class aptent taciti sociosqu ad litora.
        </p>
      </div>
      <Form />
    </div>
  );
};

export default Contact;
