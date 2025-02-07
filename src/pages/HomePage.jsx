import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../components/TaskContext';
import { Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import NotificationPopup from '../components/NotificationPopup';

// Funzione helper per formattare una data nel formato accettato da un input datetime-local
const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const pad = (num) => num.toString().padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const HomePage = () => {
  const { tasks, addTask, updateTask, removeTask, toggleTaskComplete, markTaskNotified } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');
  const [notifyDateTime, setNotifyDateTime] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editNotifyDateTime, setEditNotifyDateTime] = useState('');
  const [activeNotificationTask, setActiveNotificationTask] = useState(null);

  // Aggiunge un nuovo task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    addTask(newTask, notifyDateTime);
    setNewTask('');
    setNotifyDateTime('');
  };

  // Prepara la modalità di editing passando testo e notifica
  const handleEditTask = (id, text, notifyAt) => {
    setEditingTaskId(id);
    setEditText(text);
    setEditNotifyDateTime(notifyAt ? formatDateForInput(notifyAt) : '');
  };

  // Salva le modifiche del task (testo e notifica)
  const handleUpdateTask = (id) => {
    updateTask(id, editText, editNotifyDateTime);
    setEditingTaskId(null);
    setEditText('');
    setEditNotifyDateTime('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditText('');
    setEditNotifyDateTime('');
  };

  // Effettua il controllo delle notifiche: ogni secondo controlla se il notifyAt è passato
  useEffect(() => {
    const intervalId = setInterval(() => {
      tasks.forEach(task => {
        if (task.notifyAt && !task.notified) {
          const now = new Date();
          const notifyTime = new Date(task.notifyAt);
          if (now >= notifyTime) {
            setActiveNotificationTask(task);
            markTaskNotified(task.id);
          }
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [tasks, markTaskNotified]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>
      <TaskForm 
        newTask={newTask}
        notifyDateTime={notifyDateTime}
        setNewTask={setNewTask}
        setNotifyDateTime={setNotifyDateTime}
        onSubmit={handleAddTask}
      />
      <div className="text-center mt-4">
        <Link to="/completed" className="btn btn-link">Vedi attività completate</Link>
      </div>
      <TaskList 
        tasks={tasks}
        onToggle={toggleTaskComplete}
        onEdit={handleEditTask}
        onDelete={removeTask}
        editingTaskId={editingTaskId}
        editText={editText}
        setEditText={setEditText}
        editingNotifyDateTime={editNotifyDateTime}
        setEditNotifyDateTime={setEditNotifyDateTime}
        onSave={handleUpdateTask}
        onCancel={handleCancelEdit}
      />
      {activeNotificationTask && (
        <NotificationPopup 
          task={activeNotificationTask}
          onClose={() => setActiveNotificationTask(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
