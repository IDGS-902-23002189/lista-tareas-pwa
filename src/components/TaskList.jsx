
function TaskList({
  tareas,
  editar,
  cambiarEstado,
  eliminar
}) {
  if (tareas.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tienes tareas todavía</h3>
        <p>Agrega tu primera tarea para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="task-list">

      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className={`task-card ${
            tarea.completed ? "completed" : ""
          }`}
        >

          <div className="task-content">

            <div className="task-title">
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={(e) =>
                  cambiarEstado(tarea.id, e.target.checked)
                }
              />

              <h3>{tarea.title}</h3>
            </div>

            {tarea.description && (
              <p>{tarea.description}</p>
            )}

            <span className="task-status">
              {tarea.completed
                ? "Completada"
                : "Pendiente"}
            </span>

          </div>

          <div className="task-actions">

            <button
              type="button"
              className="btn-edit"
              onClick={() => editar(tarea)}
              disabled={tarea.completed}
              title="Editar tarea"
            >
              Editar
            </button>

            <button
              type="button"
              className="btn-delete"
              onClick={() => eliminar(tarea.id)}
              title="Eliminar tarea"
            >
              Eliminar
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default TaskList;
