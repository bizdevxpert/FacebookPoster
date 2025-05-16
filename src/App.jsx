
import React, { useState } from 'react';
import { FaFacebook, FaPlay, FaPause, FaCog, FaPlus, FaTrash, FaClock } from 'react-icons/fa';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import Header from './components/Header';
import Footer from './components/Footer';
import GroupsTab from './components/GroupsTab';
import ScheduledPostsTab from './components/ScheduledPostsTab';

function App() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      name: 'Auto Post Daily', 
      description: 'Post content to your page every day at 9 AM', 
      status: 'inactive',
      schedule: 'Daily at 9:00 AM',
      type: 'posting'
    },
    { 
      id: 2, 
      name: 'Like Comments', 
      description: 'Automatically like comments on your posts', 
      status: 'active',
      schedule: 'Every 2 hours',
      type: 'engagement'
    },
    { 
      id: 3, 
      name: 'Friend Requests', 
      description: 'Send friend requests to people in target groups', 
      status: 'inactive',
      schedule: 'Weekdays at 5:00 PM',
      type: 'networking'
    },
    { 
      id: 4, 
      name: 'Group Content Posting', 
      description: 'Post content to selected Facebook groups', 
      status: 'inactive',
      schedule: 'Daily at 3:00 PM',
      type: 'group-posting'
    },
    { 
      id: 5, 
      name: 'Auto Join Groups', 
      description: 'Automatically join groups based on keywords', 
      status: 'inactive',
      schedule: 'Every Monday at 10:00 AM',
      type: 'group-joining'
    }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');

  const [groups, setGroups] = useState([
    { 
      id: 1, 
      name: 'Digital Marketing Experts', 
      members: '45,678', 
      joined: true,
      autoPost: true,
      category: 'Marketing'
    },
    { 
      id: 2, 
      name: 'Facebook Ads Strategies', 
      members: '23,456', 
      joined: true,
      autoPost: false,
      category: 'Marketing'
    },
    { 
      id: 3, 
      name: 'Social Media Growth Hacks', 
      members: '78,912', 
      joined: false,
      autoPost: false,
      category: 'Social Media'
    },
    { 
      id: 4, 
      name: 'Content Creators Hub', 
      members: '34,567', 
      joined: false,
      autoPost: false,
      category: 'Content Creation'
    },
    { 
      id: 5, 
      name: 'E-commerce Entrepreneurs', 
      members: '56,789', 
      joined: true,
      autoPost: true,
      category: 'Business'
    }
  ]);

  const [groupSearchResults, setGroupSearchResults] = useState([
    { 
      id: 101, 
      name: 'Facebook Marketing Pro', 
      members: '67,890', 
      joined: false,
      category: 'Marketing'
    },
    { 
      id: 102, 
      name: 'Social Media Influencers', 
      members: '123,456', 
      joined: false,
      category: 'Social Media'
    },
    { 
      id: 103, 
      name: 'Digital Product Sellers', 
      members: '34,567', 
      joined: false,
      category: 'Business'
    }
  ]);

  // Add scheduled posts state
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      content: "Check out our latest product launch! 🚀 #NewProduct #Excited",
      scheduledDate: "2023-08-15",
      scheduledTime: "09:30",
      groups: [1, 5],
      hasImage: true
    },
    {
      id: 2,
      content: "What's your biggest marketing challenge right now? Comment below!",
      scheduledDate: "2023-08-16",
      scheduledTime: "14:00",
      groups: [1, 2],
      hasImage: false
    }
  ]);

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'active' ? 'inactive' : 'active' } 
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      status: 'inactive'
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const toggleGroupJoin = (id) => {
    // Toggle join status in search results
    if (groupSearchResults.some(g => g.id === id)) {
      setGroupSearchResults(groupSearchResults.map(group => 
        group.id === id ? { ...group, joined: !group.joined } : group
      ));
      
      // If joining, add to my groups
      const group = groupSearchResults.find(g => g.id === id);
      if (group && !group.joined) {
        setGroups([...groups, { ...group, joined: true, autoPost: false }]);
      }
    } else {
      // Toggle in my groups
      setGroups(groups.map(group => 
        group.id === id ? { ...group, joined: !group.joined } : group
      ));
    }
  };

  const toggleGroupAutoPost = (id) => {
    setGroups(groups.map(group => 
      group.id === id ? { ...group, autoPost: !group.autoPost } : group
    ));
  };

  const addScheduledPost = (post) => {
    const newPost = {
      id: Date.now(),
      ...post
    };
    setScheduledPosts([...scheduledPosts, newPost]);
  };

  const deleteScheduledPost = (id) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isConnected={isConnected} toggleConnection={toggleConnection} />
      
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex