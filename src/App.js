import { React, useState } from "react";
import appfirebase from "../src/Credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login/Login";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";

const auth = getAuth(appfirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  onAuthStateChanged(auth, (usuariofirebase) => {
    if (usuariofirebase) {
      setUsuario(usuariofirebase);
    } else {
      setUsuario(null);
    }
  });
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={usuario ? <Navigate to="/tareas" /> : <Login />}
        ></Route>
        <Route
          exact
          path="/tareas"
          element={
            usuario ? (
              <Home correoUsuario={usuario.email}></Home>
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
