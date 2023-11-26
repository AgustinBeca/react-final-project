import { useState } from 'react';
import './App.css';
import appfirebase from '../src/Credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Login from '../src/Componentes/Login';
import Home from '../src/Componentes/Home';
import React from "react";
import ToDo from "./pages/ToDo";

const auth = getAuth(appfirebase)

function App() {
  const [usuario, setUsuario]=useState(null)
  onAuthStateChanged(auth, (usuariofirebase) => {
    if (usuariofirebase){
      setUsuario(usuariofirebase)
    }
    else
    {
      setUsuario(null)
    }
  })
  return (
    <>
      {usuario ? <Home correoUsuario = {usuario.email}/> : <Login/>}
      <ToDo />
    </>
  );
}

export default App;
