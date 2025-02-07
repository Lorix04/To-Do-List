import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Aggiunge un nuovo task, includendo data e ora di notifica (se impostate)
  const addTask = (text, notifyDateTime) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
      notifyAt: notifyDateTime ? new Date(notifyDateTime) : null,
      notified: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Aggiorna il task: sia il testo che la notifica (se presente)
  const updateTask = (id, newText, newNotifyAt) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newNotifyDate = newNotifyAt ? new Date(newNotifyAt) : null;
        const shouldResetNotified = newNotifyDate && newNotifyDate.getTime() !== new Date(task.notifyAt).getTime();
        
        return {
          ...task,
          text: newText,
          notifyAt: newNotifyDate,
          notified: shouldResetNotified ? false : task.notified,
        };
      }
      return task;
    }));
  };
  

  // Elimina un task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Alterna lo stato completato del task
  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Segna il task come notificato (per evitare notifiche ripetute)
  const markTaskNotified = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, notified: true } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask, toggleTaskComplete, markTaskNotified }}>
      {children}
    </TaskContext.Provider>
  );
};
