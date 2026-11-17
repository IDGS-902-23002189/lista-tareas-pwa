
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { auth } from "./firebase";

// Registrar usuario con correo y contraseña
export const registrarUsuario = async (correo, password) => {
  return await createUserWithEmailAndPassword(
    auth,
    correo,
    password
  );
};

// Iniciar sesión con correo y contraseña
export const iniciarSesion = async (correo, password) => {
  return await signInWithEmailAndPassword(
    auth,
    correo,
    password
  );
};

// Iniciar sesión con Google
const proveedorGoogle = new GoogleAuthProvider();

export const iniciarSesionGoogle = async () => {
  return await signInWithPopup(auth, proveedorGoogle);
};

// Cerrar sesión
export const cerrarSesion = async () => {
  return await signOut(auth);
};

// Detectar cambios en la sesión
export const detectarSesion = (callback) => {
  return onAuthStateChanged(auth, callback);
};
