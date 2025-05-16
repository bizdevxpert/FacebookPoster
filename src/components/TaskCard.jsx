import React from 'react';
import { FaPlay, FaPause, FaTrash, FaClock, FaEdit } from 'react-icons/fa';

function TaskCard({ task, toggleStatus, deleteTask }) {
  const getStatusColor = () => {
    return task.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = () => {
    switch(task.type) {
      case 'posting':
        return '📝';
      case 'engagement':
        return '👍';
      case 'networking':
        return '👥';
      case 'group-posting':
        return '👨‍👩‍👧‍👦';
      case 'group-joining':
        return '🔍';
      case 'messaging':
        return '💬';
      default:
        return '🤖';
    }
  };

  return (
    <div className="task-card">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getTypeIcon()}</span>
          <h3 className="text-lg font-semibold">{task.name}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {task.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <p className="text-gray-600 mb-3">{task.description}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <FaClock className="mr-1" />
        <span>{task.schedule}</span>
      </div>
      
      <div className="flex justify-between">
        <button 
          className={`btn ${task.status === 'active' ? 'btn-danger' : 'btn-primary'} flex items-center gap-1`}
          onClick={toggleStatus}
        >
          {task.status === 'active' ? (
            <>
              <FaPause size={14} /> Pause
            </>
          ) : (
            <>
              <FaPlay size={14} /> Start
            </>
          )}
        </button>
        
        <div className="flex gap-2">
          <button className="btn btn-secondary flex items-center gap-1">
            <FaEdit size={14} /> Edit
          </button>
          <button 
            className="btn btn-secondary flex items-center gap-1"
            onClick={deleteTask}
          >
            <FaTrash size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
