import React from 'react';

const TaskItem = ({
  task,
  isEditing,
  editText,
  setEditText,
  editingNotifyDateTime,
  setEditNotifyDateTime,
  onToggle,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}) => {
  return (
    <li className={`list-group-item d-flex flex-column ${task.completed ? 'text-decoration-line-through' : ''}`}>
      <div className="d-flex justify-content-between align-items-center">
        {isEditing ? (
          <div className="w-100">
            <input 
              type="text" 
              className="form-control mb-2"
              value={editText} 
              onChange={(e) => setEditText(e.target.value)} 
              placeholder="Modifica testo attività"
            />
            <input 
              type="datetime-local" 
              step="1"
              className="form-control mb-2"
              value={editingNotifyDateTime}
              onChange={(e) => setEditNotifyDateTime(e.target.value)}
              placeholder="Modifica data e ora notifica"
            />
            <div className="d-flex justify-content-end">
              <button onClick={() => onSave(task.id)} className="btn btn-success me-2">Salva</button>
              <button onClick={onCancel} className="btn btn-secondary">Annulla</button>
            </div>
          </div>
        ) : (
          <>
            <span 
              onClick={() => onToggle(task.id)} 
              style={{ cursor: 'pointer', flexGrow: 1 }}
            >
              {task.text}
            </span>
            <div>
              <button 
                onClick={() => onEdit(task.id, task.text, task.notifyAt)} 
                className="btn btn-warning me-2"
              >
                Modifica
              </button>
              <button onClick={() => onDelete(task.id)} className="btn btn-danger">Elimina</button>
            </div>
          </>
        )}
      </div>
      <div className="mt-2">
        <small className="text-muted">
          Creato il: {new Date(task.createdAt).toLocaleString()}
        </small>
        {task.notifyAt && (
          <small className="text-muted ms-3">
            Notifica: {new Date(task.notifyAt).toLocaleString()}
          </small>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
