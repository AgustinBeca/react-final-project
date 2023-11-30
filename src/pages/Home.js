import React from "react";

import Header from "../components/Header/Header";
import ToDo from "./ToDo";

const Home = (props) => {
  return (
    <>
      <Header userMail={props.correoUsuario} />
      <ToDo />
    </>
  );
};
export default Home;