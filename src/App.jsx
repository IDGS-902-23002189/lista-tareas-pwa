
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

import { detectarSesion } from "./services/auth";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [pantalla, setPantalla] = useState("login");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarSuscripcion = detectarSesion(
      (usuarioActual) => {
        setUsuario(usuarioActual);
        setCargando(false);
      }
    );

    return () => cancelarSuscripcion();
  }, []);

  if (cargando) {
    return (
      <div className="loading-container">
        <h2>TaskFlow</h2>
        <p>Comprobando sesión...</p>
      </div>
    );
  }

  // Solo usuarios autenticados pueden ver Tasks
  if (usuario) {
    return <Tasks usuario={usuario} />;
  }

  // Usuarios sin sesión solo ven Login o Register
  if (pantalla === "register") {
    return (
      <Register
        cambiarPantalla={() => setPantalla("login")}
      />
    );
  }

  return (
    <Login
      cambiarPantalla={() => setPantalla("register")}
    />
  );
}

export default App;
