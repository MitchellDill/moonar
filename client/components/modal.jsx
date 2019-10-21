import React from "react";
import About from "./about.jsx";
import styles from "../style/main.less";

const Modal = props => {
  let classes = styles["modal"];
  props.exitModalAnimating
    ? (classes += ` ${styles["modalExit"]}`)
    : (classes += ` ${styles["modalEntry"]}`);
  return (
    <div className={classes}>
      <About {...props} />
    </div>
  );
};

export default Modal;
