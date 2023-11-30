import React from "react";

import classes from "./Button.module.css";

function Button(props) {

  let cssClass = '';

  if (props.color === "danger") {
    cssClass = `${classes.button} ${classes.danger}`;
  } else if (props.color === "warning") {
    cssClass = `${classes.button} ${classes.warning}`;
  } else if (props.color === "success") {
    cssClass = `${classes.button} ${classes.success}`;
  } else if (props.color === "info") {
    cssClass = `${classes.button} ${classes.info}`;
  } else {
    cssClass = `${classes.button} ${classes.primary}`;
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