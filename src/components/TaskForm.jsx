
import { useEffect, useState } from "react";
import { alertaError, alertaInfo } from "../services/alerts";

function TaskForm({ guardarTarea, tareaEditar, cancelarEdicion }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cargando, setCargando] = useState(false);

  // Cargar los datos cuando se selecciona una tarea para editar
  useEffect(() => {
    if (tareaEditar) {
      setTitulo(tareaEditar.title || "");
      setDescripcion(tareaEditar.description || "");
    } else {
      setTitulo("");
      setDescripcion("");
    }
  }, [tareaEditar]);

  // Guardar o actualizar tarea
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar título
    if (!titulo.trim()) {
      alertaInfo(
        "Título obligatorio",
        "Escribe un título para tu tarea antes de continuar."
      );
      return;
    }

    setCargando(true);

    try {
      await guardarTarea({
        title: titulo.trim(),
        description: descripcion.trim()
      });

      setTitulo("");
      setDescripcion("");

    } catch (error) {
      console.error("Error en el formulario:", error);

      // El error también es controlado por Tasks.jsx.
      // No mostramos otra alerta para evitar duplicados.

    } finally {
      setCargando(false);
    }
  };

  // Cancelar edición
  const handleCancelar = async () => {
    const resultado = await alertaInfo(
      "Edición cancelada",
      "Puedes volver a seleccionar la tarea cuando quieras."
    );

    cancelarEdicion();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <h2>
        {tareaEditar ? "Editar tarea" : "Nueva tarea"}
      </h2>

      <label htmlFor="titulo">Título</label>

      <input
        id="titulo"
        type="text"
        placeholder="Ej. Estudiar Firebase"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        maxLength={100}
        required
        disabled={cargando}
      />

      <label htmlFor="descripcion">Descripción</label>

      <textarea
        id="descripcion"
        placeholder="Describe tu tarea..."
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        maxLength={500}
        rows={3}
        disabled={cargando}
      />

      <div className="form-buttons">

        <button
          type="submit"
          className="btn-primary"
          disabled={cargando}
        >
          {cargando
            ? "Guardando..."
            : tareaEditar
              ? "Actualizar tarea"
              : "Agregar tarea"}
        </button>

        {tareaEditar && (
          <button
            type="button"
            className="btn-cancel"
            onClick={cancelarEdicion}
            disabled={cargando}
          >
            Cancelar
          </button>
        )}

      </div>

    </form>
  );
}

export default TaskForm;
