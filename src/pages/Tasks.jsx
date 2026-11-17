
import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  alertaError,
  confirmarAccion,
  notificacionExito
} from "../services/alerts";

import {
  crearTarea,
  escucharTareas,
  editarTarea,
  cambiarEstadoTarea,
  eliminarTarea
} from "../services/tasks";

import { cerrarSesion } from "../services/auth";

function Tasks({ usuario }) {
  const [tareas, setTareas] = useState([]);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  // ESCUCHAR TAREAS EN TIEMPO REAL
  useEffect(() => {
    setCargando(true);
    setError("");

    const cancelarEscucha = escucharTareas(
      usuario.uid,
      (datos) => {
        setTareas(datos);
        setCargando(false);
      },
      (error) => {
        console.error("Error al escuchar tareas:", error);
        setError("No se pudieron cargar las tareas.");
        setCargando(false);

        alertaError(
          "Error al cargar tareas",
          "No fue posible obtener tus tareas. Intenta nuevamente."
        );
      }
    );

    // Cancelar la escucha al salir de la pantalla
    return () => cancelarEscucha();

  }, [usuario.uid]);

  // CREAR O EDITAR TAREA
  const guardarTarea = async (datos) => {
    setGuardando(true);

    try {
      if (tareaEditar) {
        await editarTarea(tareaEditar.id, datos);
        setTareaEditar(null);

        notificacionExito("¡Tarea actualizada correctamente!");
      } else {
        await crearTarea(usuario.uid, datos);

        notificacionExito("¡Nueva tarea agregada!");
      }

    } catch (error) {
      console.error("Error al guardar tarea:", error);

      alertaError(
        "No se pudo guardar",
        error.message || "Ocurrió un problema al guardar la tarea."
      );

      throw error;

    } finally {
      setGuardando(false);
    }
  };

  // CAMBIAR ESTADO DE LA TAREA
  const handleCambiarEstado = async (id, completada) => {
    try {
      await cambiarEstadoTarea(id, completada);

      notificacionExito(
        completada
          ? "¡Tarea completada!"
          : "La tarea volvió a estar pendiente."
      );

    } catch (error) {
      console.error("Error al cambiar estado:", error);

      alertaError(
        "Error al actualizar",
        "No se pudo cambiar el estado de la tarea."
      );
    }
  };

  // ELIMINAR TAREA
  const handleEliminar = async (id) => {
    const resultado = await confirmarAccion(
      "¿Eliminar esta tarea?",
      "Esta acción no se puede deshacer."
    );

    if (!resultado.isConfirmed) return;

    try {
      await eliminarTarea(id);

      if (tareaEditar?.id === id) {
        setTareaEditar(null);
      }

      notificacionExito("Tarea eliminada correctamente.");

    } catch (error) {
      console.error("Error al eliminar tarea:", error);

      alertaError(
        "No se pudo eliminar",
        "Ocurrió un problema al eliminar la tarea."
      );
    }
  };

  // CERRAR SESIÓN
  const handleCerrarSesion = async () => {
    const resultado = await confirmarAccion(
      "¿Cerrar sesión?",
      "Tendrás que iniciar sesión nuevamente para acceder a tus tareas."
    );

    if (!resultado.isConfirmed) return;

    try {
      await cerrarSesion();

    } catch (error) {
      console.error("Error al cerrar sesión:", error);

      alertaError(
        "Error al cerrar sesión",
        "No se pudo finalizar tu sesión. Intenta nuevamente."
      );
    }
  };

  // CONTADORES
  const completadas = tareas.filter(
    (tarea) => tarea.completed
  ).length;

  const pendientes = tareas.length - completadas;

  return (
    <main className="tasks-container">

      <header className="tasks-header">

        <div>
          <h1>TaskFlow</h1>
          <p>Organiza tus actividades.</p>
        </div>

        <div className="user-info">
          <span>{usuario.email}</span>

          <button
            type="button"
            className="btn-logout"
            onClick={handleCerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>

      </header>

      <section className="task-summary">

        <div className="summary-card">
          <span>Total de tareas</span>
          <strong>{tareas.length}</strong>
        </div>

        <div className="summary-card">
          <span>Pendientes</span>
          <strong>{pendientes}</strong>
        </div>

        <div className="summary-card">
          <span>Completadas</span>
          <strong>{completadas}</strong>
        </div>

      </section>

      <section className="tasks-content">

        <TaskForm
          guardarTarea={guardarTarea}
          tareaEditar={tareaEditar}
          cancelarEdicion={() => setTareaEditar(null)}
        />

        {guardando && (
          <p className="loading-text">
            Guardando cambios...
          </p>
        )}

        <div className="tasks-section">

          <h2>Mis tareas</h2>

          {error && (
            <p className="error-message">{error}</p>
          )}

          {cargando ? (
            <p>Cargando tareas...</p>
          ) : (
            <TaskList
              tareas={tareas}
              editar={setTareaEditar}
              cambiarEstado={handleCambiarEstado}
              eliminar={handleEliminar}
            />
          )}

        </div>

      </section>

    </main>
  );
}

export default Tasks;
