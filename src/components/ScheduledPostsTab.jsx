import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaTrash, FaEdit, FaPlus, FaUsers, FaImage } from 'react-icons/fa';
import SchedulePostModal from './SchedulePostModal';

function ScheduledPostsTab({ scheduledPosts, groups, deleteScheduledPost, addScheduledPost }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleAddPost = () => {
    // Get all groups with autoPost enabled by default
    const autoPostGroups = groups.filter(g => g.joined && g.autoPost);
    setSelectedGroups(autoPostGroups);
    setEditingPost(null);
    setShowScheduleModal(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setSelectedGroups(groups.filter(g => post.groups.includes(g.id)));
    setShowScheduleModal(true);
  };

  const handleSaveScheduledPost = (postData) => {
    if (editingPost) {
      // Update existing post
      const updatedPosts = scheduledPosts.map(post => 
        post.id === editingPost.id ? { ...post, ...postData } : post
      );
      // This would typically update the state in the parent component
      console.log('Updated posts:', updatedPosts);
    } else {
      // Add new post
      addScheduledPost(postData);
    }
    setShowScheduleModal(false);
    setEditingPost(null);
  };

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get group names for a post
  const getGroupNames = (groupIds) => {
    const postGroups = groups.filter(g => groupIds.includes(g.id));
    if (postGroups.length <= 2) {
      return postGroups.map(g => g.name).join(', ');
    } else {
      return `${postGroups[0].name}, ${postGroups[1].name} and ${postGroups.length - 2} more`;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Scheduled Posts</h2>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={handleAddPost}
        >
          <FaPlus /> Schedule New Post
        </button>
      </div>

      {scheduledPosts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No posts scheduled yet</p>
          <button 
            className="btn btn-primary flex items-center gap-2 mx-auto"
            onClick={handleAddPost}
          >
            <FaPlus /> Schedule Your First Post
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Groups
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scheduledPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-normal">
                      <div className="flex items-start">
                        {post.hasImage && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3 bg-gray-200 rounded flex items-center justify-center">
                            <FaImage className="text-gray-500" />
                          </div>
                        )}
                        <div className="max-w-md">
                          <p className="text-sm text-gray-900 line-clamp-2">{post.content}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{formatDate(post.scheduledDate)}</span>
                        <span className="text-sm text-gray-500">
                          <FaClock className="inline mr-1" size={12} />
                          {post.scheduledTime}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-gray-500" />
                        <span className="text-sm text-gray-900">{getGroupNames(post.groups)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Scheduled
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => handleEditPost(post)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteScheduledPost(post.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <SchedulePostModal 
          groups={selectedGroups}
          onClose={() => setShowScheduleModal(false)}
          onSave={handleSaveScheduledPost}
          initialData={editingPost}
          allGroups={groups.filter(g => g.joined)}
        />
      )}
    </div>
  );
}

export default ScheduledPostsTab;
