import React from "react";

import classes from "./Button.module.css";

function Button(props) {

  const cssClass = props.danger ? classes.dangerButton : classes.button;

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