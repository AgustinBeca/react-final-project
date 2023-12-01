import React from "react";

import classes from "./Alert.module.css";

import Card from "./Card";
import Button from "./Button";

function Alert(props) {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onCancel} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          {props.warning ? (
            <>
              <Button color={"danger"} onClick={props.onConfirm}>Okay</Button>
              <Button onClick={props.onCancel}>Cancelar</Button>
            </>
          ) : (
            <Button onClick={props.onCancel}>Okay</Button>
          )
          }
        </footer>
      </Card>
    </div>
  )
};

export default Alert;