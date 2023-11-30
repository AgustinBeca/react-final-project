import React, { useState } from "react";
import imagen from "../../images/Lovepik_com-611647791-Mobile phone product login interface.png";
import imagenperfil from "../../images/profile.png";
import appfirebase from "../../Credenciales";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDatabase } from "../../Contexts/DbContext";

import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./Login.module.css";

const auth = getAuth(appfirebase);

const Login = () => {
    const db = useDatabase();
    const [registrando, setRegistrando] = useState(false);

    const functAutenticacion = async (e) => {
        e.preventDefault();
        const htmlCorreo = e.target.email.value;
        const htmlContraseña = e.target.password.value;

        if (registrando) {
            try {
                const htmlUsuario = e.target.username.value;
                await createUserWithEmailAndPassword(
                    auth,
                    htmlCorreo,
                    htmlContraseña
                );
                var userUid = auth.currentUser.uid;

                await setDoc(doc(db, "usuarios", userUid), {
                    correo: htmlCorreo,
                    nombre_usuario: htmlUsuario,
                });
            } catch (error) {
                var errorCode = error.code;
                console.log(`ERROR: ` + errorCode);
                if (errorCode === "auth/weak-password")
                    return alert(
                        "La contraseña debe tener más de 8 caracteres"
                    );
                if (errorCode === "auth/email-already-in-use")
                    return alert("El correo ingresado ya existe");
                if (errorCode === "auth/invalid-email")
                    return alert("Debes ingresar un correo con dominio");
                else {
                    return alert(
                        "No se pudo completar el registro del usuario"
                    );
                }
            }
        } else {
            try {
                await signInWithEmailAndPassword(
                    auth,
                    htmlCorreo,
                    htmlContraseña
                );
            } catch (error) {
                alert("El correo o la contraseña son incorrectos");
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className={classes.parent}>
                        <Card className={classes.login}>
                            <img
                                src={imagenperfil}
                                alt=""
                                className={classes.profile}
                            />
                            <form onSubmit={functAutenticacion}>
                                <input
                                    type="text"
                                    placeholder="Ingresar Email"
                                    className={classes.input}
                                    id="email"
                                />
                                {registrando && (
                                    <input
                                        type="text"
                                        placeholder="Ingresar Nombre de Usuario"
                                        className={classes.input}
                                        id="username"
                                    />
                                )}
                                <input
                                    type="password"
                                    placeholder="Ingresar Contraseña"
                                    className={classes.input}
                                    id="password"
                                />
                                <Button type="submit">
                                    {registrando
                                        ? "Registrate"
                                        : "Inicia Sesión"}
                                </Button>
                            </form>
                            <footer className={classes.alternative}>
                                <h4 className={classes.message}>
                                    {registrando
                                        ? "Si ya tienes una cuenta"
                                        : "No tienes cuenta"}{" "}
                                </h4>
                                <Button
                                    color={"info"}
                                    onClick={() => setRegistrando(!registrando)}
                                >
                                    {registrando
                                        ? "Inicia sesión"
                                        : "Regístrate"}
                                </Button>
                            </footer>
                        </Card>
                    </div>
                </div>

                <div className="col-md-8">
                    <img src={imagen} alt="" className={classes.image} />
                </div>
            </div>
        </div>
    );
};

export default Login;
