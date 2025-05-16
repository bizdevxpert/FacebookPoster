import React from 'react';
import { FaUsers, FaPlus, FaMinus, FaCheck } from 'react-icons/fa';

function GroupCard({ group, toggleJoin, toggleAutoPost, showAutoPost = false }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{group.name}</h4>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {group.category}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
          <FaUsers className="mr-1" />
          <span>{group.members} members</span>
        </div>
        
        <div className="flex justify-between items-center">
          <button 
            className={`btn ${group.joined ? 'btn-danger' : 'btn-primary'} flex items-center gap-1 text-sm`}
            onClick={toggleJoin}
          >
            {group.joined ? (
              <>
                <FaMinus size={12} /> Leave Group
              </>
            ) : (
              <>
                <FaPlus size={12} /> Join Group
              </>
            )}
          </button>
          
          {showAutoPost && group.joined && (
            <button 
              className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md ${group.autoPost ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              onClick={toggleAutoPost}
            >
              {group.autoPost ? (
                <>
                  <FaCheck size={12} /> Auto-Post On
                </>
              ) : (
                'Auto-Post Off'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
