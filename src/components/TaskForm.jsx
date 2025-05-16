import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

function TaskForm({ addTask, cancelForm }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: 'Daily at 9:00 AM',
    type: 'posting'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    addTask(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h3 className="text-xl font-bold mb-4">Create New Automation Task</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Daily Page Post"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            placeholder="What will this automation do?"
            rows="3"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Task Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="posting">Content Posting</option>
              <option value="engagement">Engagement (Likes/Comments)</option>
              <option value="networking">Networking</option>
              <option value="messaging">Messaging</option>
              <option value="group-posting">Group Content Posting</option>
              <option value="group-joining">Auto Join Groups</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="schedule">
              Schedule
            </label>
            <select
              id="schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Daily at 9:00 AM">Daily at 9:00 AM</option>
              <option value="Daily at 3:00 PM">Daily at 3:00 PM</option>
              <option value="Weekdays at 12:00 PM">Weekdays at 12:00 PM</option>
              <option value="Weekends at 6:00 PM">Weekends at 6:00 PM</option>
              <option value="Every Monday at 10:00 AM">Every Monday at 10:00 AM</option>
              <option value="Every 2 hours">Every 2 hours</option>
              <option value="Every 6 hours">Every 6 hours</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
        
        {formData.type === 'group-posting' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Content Settings
            </label>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                This task will post content to all groups marked for auto-posting in your Groups tab.
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useSpintax"
                  className="mr-2"
                />
                <label htmlFor="useSpintax" className="text-sm">
                  Use spintax for content variation
                </label>
              </div>
            </div>
          </div>
        )}
        
        {formData.type === 'group-joining' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Group Joining Settings
            </label>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="mb-3">
                <label className="block text-sm mb-1">Keywords (comma separated)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="marketing, social media, business"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm mb-1">Minimum group size</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="1000"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoApproval"
                  className="mr-2"
                />
                <label htmlFor="autoApproval" className="text-sm">
                  Only join groups with auto-approval
                </label>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-secondary flex items-center gap-2"
            onClick={cancelForm}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <FaSave /> Save Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
