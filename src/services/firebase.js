
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de nuestro proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxc4jDRnXjSjlWCIBN1SH6ZbIZavdc6T0",
  authDomain: "lista-tareas-pwa.firebaseapp.com",
  projectId: "lista-tareas-pwa",
  storageBucket: "lista-tareas-pwa.firebasestorage.app",
  messagingSenderId: "901434807156",
  appId: "1:901434807156:web:47e3d7214248c17bf49221",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Authentication
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore(app);
