import React from "react";
import About from "./about.jsx";
import styles from "../style/main.less";

const Modal = props => {
  return (
    <div>
      <About {...props} />
    </div>
  );
};

export default Modal;
