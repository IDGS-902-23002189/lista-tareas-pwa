
import { useState } from "react";

import { registrarUsuario } from "../services/auth";

function Register({ cambiarPantalla }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMensaje("");
    setCargando(true);

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setCargando(false);
      return;
    }

    try {
      await registrarUsuario(correo, password);

      setMensaje("¡Cuenta creada correctamente!");

      // Firebase inicia sesión automáticamente
      // después de registrar al usuario.

    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado.");
      } else if (error.code === "auth/invalid-email") {
        setError("El correo electrónico no es válido.");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil.");
      } else {
        setError("No se pudo crear la cuenta.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>TaskFlow</h1>

        <p className="subtitle">
          Comienza a organizar tu día.
        </p>

        <h2>Crear cuenta</h2>

        <form onSubmit={handleRegister}>

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && (
            <p className="error-message">{error}</p>
          )}

          {mensaje && (
            <p className="success-message">{mensaje}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="btn-primary"
          >
            {cargando ? "Creando cuenta..." : "Crear cuenta"}
          </button>

        </form>

        <p className="auth-footer">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={cambiarPantalla}
            className="link-button"
          >
            Inicia sesión
          </button>
        </p>

      </div>
    </div>
  );
}

export default Register;
