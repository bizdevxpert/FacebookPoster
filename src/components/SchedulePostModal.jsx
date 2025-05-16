import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaImage, FaCheck } from 'react-icons/fa';

function SchedulePostModal({ groups, onClose, onSave, initialData = null, allGroups = [] }) {
  const [postContent, setPostContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [includeImage, setIncludeImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [randomizeTime, setRandomizeTime] = useState(false);
  
  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      setPostContent(initialData.content || '');
      setSelectedDate(initialData.scheduledDate || '');
      setSelectedTime(initialData.scheduledTime || '');
      setSelectedGroups(initialData.groups || []);
      setIncludeImage(initialData.hasImage || false);
      setRandomizeTime(initialData.randomizeTime || false);
    } else {
      // Default to groups passed in props
      setSelectedGroups(groups.map(g => g.id));
    }
  }, [initialData, groups]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIncludeImage(true);
    }
  };
  
  const toggleGroupSelection = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };
  
  const handleSchedulePost = () => {
    // Create post data object
    const postData = {
      content: postContent,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      groups: selectedGroups,
      hasImage: includeImage,
      randomizeTime: randomizeTime,
      // If editing, preserve the original ID
      ...(initialData && { id: initialData.id })
    };
    
    // Pass data to parent component
    onSave(postData);
  };
  
  // Get tomorrow's date in YYYY-MM-DD format for the default date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
  
  // Use the groups passed in or fall back to all available groups
  const availableGroups = allGroups.length > 0 ? allGroups : groups;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              {initialData ? 'Edit Scheduled Post' : 'Schedule New Group Post'}
            </h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              className="input-field"
              rows="4"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What would you like to post to these groups?"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              You can use spintax format like &#123;option one|option two&#125; for content variation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Schedule Date
                </div>
              </label>
              <input
                type="date"
                className="input-field"
                value={selectedDate || tomorrowFormatted}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={tomorrowFormatted}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  Schedule Time
                </div>
              </label>
              <input
                type="time"
                className="input-field"
                value={selectedTime || "09:00"}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <div className="flex items-center">
                <FaImage className="mr-2" />
                Add Image (Optional)
              </div>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
              />
              <label 
                htmlFor="image-upload" 
                className="btn btn-secondary cursor-pointer"
              >
                Select Image
              </label>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="include-image"
                  checked={includeImage}
                  onChange={(e) => setIncludeImage(e.target.checked)}
                  className="mr-2"
                  disabled={!imagePreview}
                />
                <label htmlFor="include-image">
                  Include image with post
                </label>
              </div>
            </div>
            
            {imagePreview && (
              <div className="mt-3 relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-32 object-cover rounded-md border border-gray-200" 
                />
                <button 
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => {
                    setImagePreview(null);
                    setIncludeImage(false);
                  }}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Select Groups ({selectedGroups.length} selected)
            </label>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 max-h-48 overflow-y-auto">
              {availableGroups.length === 0 ? (
                <p className="text-gray-500 text-sm">No groups available for posting</p>
              ) : (
                <div className="space-y-2">
                  {availableGroups.map(group => (
                    <div 
                      key={group.id} 
                      className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                    >
                      <input
                        type="checkbox"
                        id={`group-${group.id}`}
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroupSelection(group.id)}
                        className="mr-3"
                      />
                      <label htmlFor={`group-${group.id}`} className="flex-grow cursor-pointer">
                        <div className="font-medium">{group.name}</div>
                        <div className="text-xs text-gray-500">{group.members} members</div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                id="randomize-schedule"
                className="mr-2"
                checked={randomizeTime}
                onChange={(e) => setRandomizeTime(e.target.checked)}
              />
              <label htmlFor="randomize-schedule">
                Randomize posting times (±15 min)
              </label>
            </div>
            
            <div className="flex gap-3">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={handleSchedulePost}
                disabled={!postContent || !selectedDate || !selectedTime || selectedGroups.length === 0}
              >
                <FaCalendarAlt /> {initialData ? 'Update Post' : 'Schedule Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePostModal;
