import React from "react";
import About from "./about.jsx";
import styles from "../style/main.less";

const Modal = props => {
  let classes = styles["modal"];
  if (props.exitModalAnimating) {
    classes += ` ${styles["modalExit"]}`;
  } else {
    classes += ` ${styles["modalEntry"]}`;
  }
  return (
    <div className={classes}>
      <About {...props} />
    </div>
  );
};

export default Modal;
