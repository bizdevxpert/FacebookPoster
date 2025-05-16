import React, { useState } from 'react';
import { FaSearch, FaRobot, FaCog, FaInfoCircle } from 'react-icons/fa';

function BulkJoinModal({ onClose }) {
  const [keywords, setKeywords] = useState('');
  const [minMembers, setMinMembers] = useState(1000);
  const [maxGroups, setMaxGroups] = useState(10);
  const [autoApprovalOnly, setAutoApprovalOnly] = useState(true);
  const [categories, setCategories] = useState(['Marketing', 'Business']);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [foundGroups, setFoundGroups] = useState(0);
  const [joinedGroups, setJoinedGroups] = useState(0);
  
  const availableCategories = [
    'Marketing', 'Business', 'Entrepreneurship', 'Social Media', 
    'E-commerce', 'Digital Products', 'Networking', 'Freelancing',
    'Startups', 'Technology', 'Finance', 'Real Estate'
  ];
  
  const toggleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };
  
  const handleStartAutomation = () => {
    // Simulate the automation process
    setIsRunning(true);
    setProgress(0);
    setFoundGroups(0);
    setJoinedGroups(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRunning(false);
          }, 1000);
          return 100;
        }
        
        // Simulate finding groups
        if (newProgress % 20 === 0) {
          setFoundGroups(prev => prev + Math.floor(Math.random() * 3) + 1);
        }
        
        // Simulate joining groups
        if (newProgress % 30 === 0) {
          setJoinedGroups(prev => prev + 1);
        }
        
        return newProgress;
      });
    }, 800);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Bulk Join Facebook Groups</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
              disabled={isRunning}
            >
              ✕
            </button>
          </div>
          
          {!isRunning ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="marketing, social media, business"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter keywords related to the groups you want to join
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Minimum Group Size
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={minMembers}
                    onChange={(e) => setMinMembers(parseInt(e.target.value) || 0)}
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Maximum Groups to Join
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={maxGroups}
                    onChange={(e) => setMaxGroups(parseInt(e.target.value) || 1)}
                    min="1"
                    max="50"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm border ${
                        categories.includes(category)
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="auto-approval"
                    checked={autoApprovalOnly}
                    onChange={(e) => setAutoApprovalOnly(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="auto-approval">
                    Only join groups with auto-approval
                  </label>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm text-yellow-800 flex items-start">
                  <FaInfoCircle className="mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    Facebook may limit the number of groups you can join in a short period. 
                    We recommend joining no more than 10-15 groups per day to avoid restrictions.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary flex items-center gap-2"
                  onClick={handleStartAutomation}
                  disabled={!keywords.trim() || categories.length === 0}
                >
                  <FaRobot /> Start Automation
                </button>
              </div>
            </>
          ) : (
            <div className="py-4">
              <div className="mb-6">
                <h4 className="font-medium mb-2">Automation in Progress</h4>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Searching for groups...</span>
                  <span>{progress}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-700">{foundGroups}</div>
                  <div className="text-sm text-blue-600">Groups Found</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-700">{joinedGroups}</div>
                  <div className="text-sm text-green-600">Groups Joined</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Digital Marketing Experts</div>
                    <div className="text-sm text-gray-500">45,678 members</div>
                  </div>
                  <span className="text-green-600 text-sm">Joined</span>
                </div>
              </div>
              
              {joinedGroups > 1 && (
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Social Media Growth Hacks</div>
                      <div className="text-sm text-gray-500">78,912 members</div>
                    </div>
                    <span className="text-green-600 text-sm">Joined</span>
                  </div>
                </div>
              )}
              
              {progress < 100 ? (
                <div className="text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setIsRunning(false);
                      setProgress(0);
                    }}
                  >
                    Stop Automation
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-green-600 font-medium mb-3">
                    Automation completed successfully!
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BulkJoinModal;
