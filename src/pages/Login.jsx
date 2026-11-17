
import { useState } from "react";

import {
  iniciarSesion,
  iniciarSesionGoogle
} from "../services/auth";

function Login({ cambiarPantalla }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      await iniciarSesion(correo, password);
    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        setError("Correo o contraseña incorrectos.");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo electrónico no es válido.");
      } else {
        setError("No se pudo iniciar sesión.");
      }
    } finally {
      setCargando(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setCargando(true);

    try {
      await iniciarSesionGoogle();
    } catch (error) {
      console.error(error);
      setError("No se pudo iniciar sesión con Google.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>TaskFlow</h1>
        <p className="subtitle">
          Organiza tus tareas, alcanza tus metas.
        </p>

        <h2>Bienvenido de nuevo</h2>

        <form onSubmit={handleLogin}>

          <label>Correo electrónico</label>

          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="btn-primary"
          >
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>

        </form>

        <div className="separator">O también</div>

        <button
          onClick={handleGoogle}
          disabled={cargando}
          className="btn-google"
        >
          G Continuar con Google
        </button>

        <p className="auth-footer">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={cambiarPantalla}
            className="link-button"
          >
            Regístrate
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;
