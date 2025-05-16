import React, { useState } from 'react';
import { FaSearch, FaUsers, FaPlus, FaMinus, FaCog, FaCheck, FaCalendarAlt, FaFilter, FaRobot } from 'react-icons/fa';
import GroupCard from './GroupCard';
import SchedulePostModal from './SchedulePostModal';

function GroupsTab({ groups, searchResults, toggleJoin, toggleAutoPost, addScheduledPost }) {
  const [activeSection, setActiveSection] = useState('myGroups');
  const [searchQuery, setSearchQuery] = useState('');
  const [contentTemplate, setContentTemplate] = useState('');
  const [showContentModal, setShowContentModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger an API call to search for groups
    console.log('Searching for:', searchQuery);
  };

  const handleSchedulePost = () => {
    // Get all groups with autoPost enabled
    const autoPostGroups = groups.filter(g => g.joined && g.autoPost);
    setSelectedGroups(autoPostGroups);
    setShowScheduleModal(true);
  };

  const handleSaveScheduledPost = (postData) => {
    addScheduledPost(postData);
    setShowScheduleModal(false);
  };

  // Get unique categories from groups
  const categories = [...new Set([
    ...groups.map(g => g.category),
    ...searchResults.map(g => g.category)
  ])];

  // Filter groups by category if a filter is selected
  const filteredGroups = filterCategory 
    ? groups.filter(g => g.joined && g.category === filterCategory)
    : groups.filter(g => g.joined);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Facebook Groups</h2>
        <div className="flex gap-2">
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={handleSchedulePost}
          >
            <FaCalendarAlt /> Schedule Post
          </button>
          <button 
            className="btn btn-secondary flex items-center gap-2"
            onClick={() => setShowContentModal(true)}
          >
            <FaCog /> Post Settings
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button 
            className={`px-4 py-3 font-medium flex-1 ${activeSection === 'myGroups' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveSection('myGroups')}
          >
            My Groups ({groups.filter(g => g.joined).length})
          </button>
          <button 
            className={`px-4 py-3 font-medium flex-1 ${activeSection === 'findGroups' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveSection('findGroups')}
          >
            Find New Groups
          </button>
        </div>

        {activeSection === 'myGroups' ? (
          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">My Facebook Groups</h3>
                
                <div className="flex items-center gap-2">
                  <select 
                    className="text-sm border border-gray-300 rounded-md px-2 py-1"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <button 
                    className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    onClick={() => setFilterCategory('')}
                  >
                    <FaFilter size={12} /> Clear
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Manage which groups you want to automate. Toggle auto-posting to include groups in your posting schedule.
              </p>
              
              {filteredGroups.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-3">
                    {filterCategory 
                      ? `No groups found in the "${filterCategory}" category` 
                      : "You haven't joined any groups yet"}
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveSection('findGroups')}
                  >
                    Find Groups to Join
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGroups.map(group => (
                    <GroupCard 
                      key={group.id}
                      group={group}
                      toggleJoin={() => toggleJoin(group.id)}
                      toggleAutoPost={() => toggleAutoPost(group.id)}
                      showAutoPost={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Find Facebook Groups</h3>
              <p className="text-sm text-gray-600 mb-4">
                Search for groups to join and automate. You can search by keywords, interests, or specific group names.
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <form onSubmit={handleSearch} className="flex gap-2 flex-grow mr-2">
                  <input
                    type="text"
                    className="input-field flex-grow"
                    placeholder="Search for groups by name, keyword, or interest"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <FaSearch /> Search
                  </button>
                </form>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Suggested Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {['Marketing', 'Business', 'Entrepreneurship', 'Social Media', 'E-commerce', 'Digital Products'].map(category => (
                    <button 
                      key={category}
                      className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm border border-blue-200 hover:bg-blue-100"
                      onClick={() => setSearchQuery(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Search Results</h4>
                {searchResults.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No groups found. Try different keywords.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map(group => (
                      <GroupCard 
                        key={group.id}
                        group={group}
                        toggleJoin={() => toggleJoin(group.id)}
                        showAutoPost={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Group Post Settings</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowContentModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Content Template
                </label>
                <textarea
                  className="input-field"
                  rows="6"
                  value={contentTemplate}
                  onChange={(e) => setContentTemplate(e.target.value)}
                  placeholder="Enter your post content here. You can use spintax like {this|that} for content variation."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Use spintax format like &#123;option one|option two|option three&#125; to create variations of your content.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Post Settings</h4>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="includeImage"
                      className="mr-2"
                    />
                    <label htmlFor="includeImage">
                      Include image with posts
                    </label>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="randomizeTime"
                      className="mr-2"
                    />
                    <label htmlFor="randomizeTime">
                      Randomize posting time (±30 minutes)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="limitPerDay"
                      className="mr-2"
                    />
                    <label htmlFor="limitPerDay">
                      Limit to 5 groups per day
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Content Library</h4>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-2">
                  <p className="text-sm">Template 1: Product Promotion</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-2">
                  <p className="text-sm">Template 2: Question Post</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <p className="text-sm">Template 3: Value Post</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowContentModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowContentModal(false)}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <SchedulePostModal 
          groups={selectedGroups}
          onClose={() => setShowScheduleModal(false)}
          onSave={handleSaveScheduledPost}
          allGroups={groups.filter(g => g.joined)}
        />
      )}
    </div>
  );
}

export default GroupsTab;
