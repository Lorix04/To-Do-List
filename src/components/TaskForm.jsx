import React from 'react';
import { useState, useRef } from "react";

const TaskForm = ({ newTask, notifyDateTime, setNewTask, setNotifyDateTime, onSubmit, addTask }) => {
  
    const [text, setText] = useState("");
  const audioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    addTask(text);
    setText("");

    // Avvia l'audio in muted
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play().catch(error => console.error("Errore audio:", error));
    }
  };
  
    return (
    <form onSubmit={onSubmit} className="d-flex flex-column mb-3">
      <div className="d-flex mb-2">
        <input 
          type="text"
          className="form-control me-2"
          placeholder="Aggiungi una nuova attività"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onSubmit={handleSubmit} type="submit" className="btn btn-primary">Aggiungi</button>
      </div>
      <div className="d-flex">
        <input 
          type="datetime-local"
          step="1"
          className="form-control me-2"
          placeholder="Data e ora notifica"
          value={notifyDateTime}
          onChange={(e) => setNotifyDateTime(e.target.value)}
        />
        <small className="text-muted align-self-center">Opzionale: Data e ora notifica</small>
      </div>
    </form>
  );
};

export default TaskForm;
