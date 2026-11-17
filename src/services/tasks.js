
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase";

// Referencia a la colección de tareas
const tareasRef = collection(db, "tasks");

// CREAR TAREA
export const crearTarea = async (uid, datos) => {
  if (!uid) {
    throw new Error("Usuario no autenticado.");
  }

  if (!datos.title?.trim()) {
    throw new Error("El título es obligatorio.");
  }

  return await addDoc(tareasRef, {
    title: datos.title.trim(),
    description: datos.description?.trim() || "",
    completed: false,
    userId: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

// LISTAR TAREAS EN TIEMPO REAL
export const escucharTareas = (uid, callback, callbackError) => {
  if (!uid) {
    throw new Error("Usuario no autenticado.");
  }

  // Solo consulta tareas del usuario actual
  const consulta = query(
    tareasRef,
    where("userId", "==", uid)
  );

  // Escucha los cambios automáticamente
  return onSnapshot(
    consulta,
    (snapshot) => {
      const tareas = snapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
      }));

      // Ordenar por fecha de creación
      tareas.sort((a, b) => {
        const fechaA = a.createdAt?.toMillis?.() || 0;
        const fechaB = b.createdAt?.toMillis?.() || 0;

        return fechaB - fechaA;
      });

      callback(tareas);
    },
    (error) => {
      console.error("Error al escuchar tareas:", error);

      if (callbackError) {
        callbackError(error);
      }
    }
  );
};

// EDITAR TAREA
export const editarTarea = async (id, datos) => {
  if (!datos.title?.trim()) {
    throw new Error("El título es obligatorio.");
  }

  const tareaRef = doc(db, "tasks", id);

  await updateDoc(tareaRef, {
    title: datos.title.trim(),
    description: datos.description?.trim() || "",
    updatedAt: serverTimestamp()
  });
};

// MARCAR COMO COMPLETADA O PENDIENTE
export const cambiarEstadoTarea = async (id, completada) => {
  const tareaRef = doc(db, "tasks", id);

  await updateDoc(tareaRef, {
    completed: completada,
    updatedAt: serverTimestamp()
  });
};

// ELIMINAR TAREA
export const eliminarTarea = async (id) => {
  const tareaRef = doc(db, "tasks", id);

  await deleteDoc(tareaRef);
};
