import React, { useContext } from 'react';
import { TaskContext } from '../components/TaskContext';
import { Link } from 'react-router-dom';

const CompletedTasks = () => {
  const { tasks } = useContext(TaskContext);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Attività Completate</h1>
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-link">Torna alla Home</Link>
      </div>
      {completedTasks.length === 0 ? (
        <p className="text-center">Nessuna attività completata.</p>
      ) : (
        <ul className="list-group">
          {completedTasks.map(task => (
            <li key={task.id} className="list-group-item">
              <div>
                <span className="text-decoration-line-through">{task.text}</span>
              </div>
              <div>
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;
