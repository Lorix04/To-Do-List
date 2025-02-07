import React, { useRef, useEffect } from 'react';

const NotificationPopup = ({ task, onClose }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!task.completed && audioRef.current) {
            // Smuta l'audio e riproducilo
            audioRef.current.muted = false;
            audioRef.current.play().catch(error => console.error("Errore audio:", error));
        }

        return () => {
            if (audioRef.current) {
                // Rimetti il mute quando il popup viene chiuso
                audioRef.current.muted = true;
            }
        };
    }, [task.completed]);

    if (task.completed) return null;

    return (
        <div
            className="notification-popup position-fixed top-50 start-50 translate-middle p-4 bg-light border rounded shadow"
            style={{ zIndex: 1050 }}
        >
            <div className="popup-content">
                <h2>Promemoria Task</h2>
                <p><strong>Attività:</strong> {task.text}</p>
                <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                {task.notifyAt && <p><strong>Notifica alle:</strong> {new Date(task.notifyAt).toLocaleString()}</p>}
                <button onClick={onClose} className="btn btn-primary">Chiudi</button>
            </div>
            <audio
                ref={audioRef}
                src={`${process.env.PUBLIC_URL}/sound/notification.mp3`}
                autoPlay
                loop />

        </div>
    );
};

export default NotificationPopup;
