import React, { useState } from "react";
import imagen from "../Imagenes/Lovepik_com-611647791-Mobile phone product login interface.png";
import imagenperfil from "../Imagenes/profile.png";
import appfirebase from "../Credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(appfirebase);

const Login = () => {
    const [registrando, setRegistrando] = useState(false);

    const functAutenticacion = async (e) => {
        
        e.preventDefault();
        const htmlCorreo = e.target.email.value;
        const htmlContraseña = e.target.password.value;

        if (registrando) {
            try {
                const htmlUsuario = e.target.username.value;
                await createUserWithEmailAndPassword(auth, htmlCorreo, htmlContraseña);
                var userUid = auth.currentUser.uid;
                const db = getFirestore(appfirebase);
                console.log(userUid);

                await setDoc(doc(db, "usuarios", userUid), {
                    correo: htmlCorreo,
                    nombre_usuario: htmlUsuario,
                });
                
            } catch (error) {
                console.log(error);
                var errorCode = error.code;
                console.log(`ERROR: ` + errorCode)
                if (errorCode === 'auth/weak-password') return alert("La contraseña debe tener más de 8 caracteres");
                if (errorCode === 'auth/email-already-in-use') return alert("El correo ingresado ya existe");
                if (errorCode === 'auth/invalid-email') return alert("Debes ingresar un correo con dominio");
                else {
                    return alert("No se pudo completar el registro del usuario");
                }
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, htmlCorreo, htmlContraseña);
            } catch (error) {
                alert("El correo o la contraseña son incorrectos");
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img src={imagenperfil} alt="" className="estilo-perfil" />
                            <form onSubmit={functAutenticacion}>
                                <input type="text" placeholder="Ingresar Email" className="cajatexto" id="email" />
                                {registrando && (
                                    <input type="text" placeholder="Ingresar Nombre de Usuario" className="cajatexto" id="username" />
                                )}
                                <input type="password" placeholder="Ingresar Contraseña" className="cajatexto" id="password" />
                                <button className="boton">{registrando ? "Registrate" : "Inicia Sesión"}</button>
                            </form>
                            <h4 className="texto">{registrando ? "Si ya tienes una cuenta": "No tienes cuenta"}{" "}
                                <button className="botoncambio" onClick={() => setRegistrando(!registrando)}>
                                    {registrando ? "Inicia sesión" : "Regístrate"}
                                </button>
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <img src={imagen} alt="" className="tamaño-imagen" />
                </div>
            </div>
        </div>
    );
};

export default Login;
