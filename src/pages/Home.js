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
const auth = getAuth(appfirebase);

const Home = ({ correoUsuario }) => {
    return (
        <div>
            <h2 className="text-center">
                Bienvenido Usuario {correoUsuario}{" "}
                <button className="botonsalir" onClick={() => signOut(auth)}>
                    LogOut
                </button>
            </h2>
            <ToDo></ToDo>
        </div>
    );
};
export default Home;