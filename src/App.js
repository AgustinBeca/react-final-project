import { useState } from 'react';
import './App.css';
import appfirebase from '../src/Credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Login from '../src/Componentes/Login';
import Home from '../src/Componentes/Home';
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
    <div>
      {usuario ? <Home correoUsuario = {usuario.email}/> : <Login/>}
    </div>
  );
}

export default App;
