import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  editingTaskId,
  editText,
  setEditText,
  editingNotifyDateTime,
  setEditNotifyDateTime,
  onSave,
  onCancel,
}) => {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          editText={editText}
          setEditText={setEditText}
          editingNotifyDateTime={editingNotifyDateTime}
          setEditNotifyDateTime={setEditNotifyDateTime}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onSave={onSave}
          onCancel={onCancel}
        />
      ))}
    </ul>
  );
};

export default TaskList;
