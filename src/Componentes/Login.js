import React, { useState } from "react";
import imagen from "../Imagenes/Lovepik_com-611647791-Mobile phone product login interface.png";
import imagenperfil from "../Imagenes/profile.png"
import appfirebase from "../Credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appfirebase)
const Login = () => {

        const[registrando, setRegistrando]= useState(false)
        const functAutenticacion = async(e) =>{
            e.preventDefault();
            const correo = e.target.email.value;
            const contraseña = e.target.password.value;

            if (registrando) {
                try {
                    await createUserWithEmailAndPassword(auth, correo, contraseña)
                } catch (error) {
                    alert("Asegurese que la contraseña tenga mas de 8 caracteres")
                } 
            }
            else{
                try {
                    await signInWithEmailAndPassword(auth, correo, contraseña)
                } catch (error) {
                    alert("El correo o la contraseña son incorrectos")
                }
            }
        }
    return(
        <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    <div className="padre">
                        <div className="card card-body shadow-lg">
                            <img src={imagenperfil} alt="" className="estilo-perfil"/>
                            <form onSubmit={functAutenticacion}>
                                <input type="text" placeholder="Ingresar Email" className="cajatexto" id="email"/>
                                <input type="password" placeholder="Ingresar Contraseña" className="cajatexto" id="password"/>
                                <button className="boton">{registrando ? "Registrate" : "Inicia Sesión"}</button>
                            </form>
                            <h4 className="texto">{registrando ? "Si ya tienes una cuenta" : "No tienes cuenta"} <button className="botoncambio" onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia sesión" : "Registrate"}</button></h4>
                        </div>

                    </div> 

                </div>

                <div className="col-md-8">
                    <img src={imagen} alt="" className="tamaño-imagen"/>
                </div>
            </div>

        </div>
    )
}

export default Login