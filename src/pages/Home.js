import React from "react";
import appfirebase from "../Credenciales";
import { getAuth, signOut } from "firebase/auth";
import ToDo from "./ToDo";

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
