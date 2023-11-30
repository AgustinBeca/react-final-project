import React from "react";
import appfirebase from "../../Credenciales";
import { getAuth, signOut } from "firebase/auth";

import classes from "./Header.module.css";

import Button from "../UI/Button";

const auth = getAuth(appfirebase);

function Header(props) {
  return (
    <header className={classes.header}>
      <div className={`${classes.column} ${classes.right}`}>
        <h2 className={classes.title}>
          Bienvenido, {props.userMail}{" "}
        </h2>
      </div>
      <div className={classes.column}>
        <Button color={"danger"} onClick={() => signOut(auth)}>
          Salir
        </Button>
      </div>
    </header>
  )
};

export default Header;