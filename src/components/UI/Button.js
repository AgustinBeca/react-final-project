import React from "react";

import classes from "./Button.module.css";

function Button(props) {

  let cssClass = '';

  if (props.color === "danger") {
    cssClass = classes.dangerButton;
  } else if (props.color === "warning") {
    cssClass = classes.warningButton;
  } else if (props.color === "success") {
    cssClass = classes.successButton;
  } else {
    cssClass = classes.button;
  }

  return (
    <button
      className={cssClass}
      type={props.type || 'button'}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
};

export default Button;