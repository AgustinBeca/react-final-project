import React from "react";
import appfirebase from "../Credenciales";
import { getAuth, signOut } from "firebase/auth";
import ToDo from "./ToDo";
const auth = getAuth(appfirebase)

const Home = ({correoUsuario}) => {
    return(
        <div>
            <ToDo></ToDo>
        </div>
    )
}

export default Home