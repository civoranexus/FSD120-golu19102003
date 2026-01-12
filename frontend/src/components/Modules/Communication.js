import React, { useState, useEffect } from 'react';
import { MessageSquare, Bell, Send, Search, Calendar, Users, Megaphone, X, Plus } from 'lucide-react';

const Communication = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Water Supply Maintenance', type: 'Notice', date: 'Jan 7, 2024', priority: 'High' },
    { id: 2, title: 'Society Meeting Schedule', type: 'Meeting', date: 'Jan 6, 2024', priority: 'Medium' },
    { id: 3, title: 'Festival Celebration', type: 'Event', date: 'Jan 5, 2024', priority: 'Low' },
  ]);

  const [discussions, setDiscussions] = useState([
    { id: 1, title: 'Parking Issues in Block A', author: 'John Doe', replies: 12, lastActivity: '2 hours ago' },
    { id: 2, title: 'Suggestion for Garden Improvement', author: 'Jane Smith', replies: 8, lastActivity: '5 hours ago' },
    { id: 3, title: 'Security Camera Installation', author: 'Mike Wilson', replies: 15, lastActivity: '1 day ago' },
  ]);

  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState('all');
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);
  const [showNewAnnouncementForm, setShowNewAnnouncementForm] = useState(false);
  
  // Form states
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: 'General'
  });
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'Notice',
    priority: 'Medium'
  });

  // Handle hash fragments for direct navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#new-discussion') {
      setShowNewDiscussionForm(true);
      setShowNewAnnouncementForm(false);
    } else if (hash === '#new-announcement') {
      setShowNewAnnouncementForm(true);
      setShowNewDiscussionForm(false);
    }
  }, []);

  const handleSendNotification = async () => {
    if (!notificationMessage.trim()) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sending notification:', { message: notificationMessage, recipients: selectedRecipients });
      setNotificationMessage('');
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    }
  };

  const handleCreateDiscussion = async () => {
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const discussion = {
        id: discussions.length + 1,
        title: newDiscussion.title,
        author: 'Current User', // This would come from auth context
        replies: 0,
        lastActivity: 'Just now'
      };
      
      setDiscussions([discussion, ...discussions]);
      setNewDiscussion({ title: '', content: '', category: 'General' });
      setShowNewDiscussionForm(false);
      alert('Discussion created successfully!');
    } catch (error) {
      console.error('Error creating discussion:', error);
      alert('Failed to create discussion. Please try again.');
    }
  };

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const announcement = {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        type: newAnnouncement.type,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        priority: newAnnouncement.priority
      };
      
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: '', content: '', type: 'Notice', priority: 'Medium' });
      setShowNewAnnouncementForm(false);
      alert('Announcement created successfully!');
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold">
            <span style={{color: '#147783'}}>Communication</span>
            <span style={{color: '#020509'}}> & Announcements</span>
          </h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowNewAnnouncementForm(true)}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg border-2 transition-colors" 
            style={{backgroundColor: '#178740', borderColor: '#1B9AAA'}}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}
          >
            <Megaphone className="h-4 w-4" />
            <span>New Announcement</span>
          </button>
          <button 
            onClick={() => setShowNewDiscussionForm(true)}
            className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors border-2"
            style={{borderColor: '#1B9AAA'}}
          >
            <MessageSquare className="ml-2 h-5 w-5" />
            New Discussion
          </button>
        </div>
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-8 w-auto mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Create New Discussion</h2>
              </div>
              <button 
                onClick={() => setShowNewDiscussionForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discussion Title <span className="text-[#EB1414]">*</span>
                </label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                  style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                  placeholder="Enter discussion title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newDiscussion.category}
                  onChange={(e) => setNewDiscussion({...newDiscussion, category: e.target.value})}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                  style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                >
                  <option value="General">General</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Security">Security</option>
                  <option value="Events">Events</option>
                  <option value="Parking">Parking</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discussion Content <span className="text-[#EB1414]">*</span>
                </label>
                <textarea
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                  style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                  placeholder="Enter discussion content..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowNewDiscussionForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDiscussion}
                className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#16808D] transition-colors"
              >
                Create Discussion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Announcement Modal */}
      {showNewAnnouncementForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-8 w-auto mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Create New Announcement</h2>
              </div>
              <button 
                onClick={() => setShowNewAnnouncementForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcement Title <span className="text-[#EB1414]">*</span>
                </label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                  style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                  placeholder="Enter announcement title..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                    style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                  >
                    <option value="Notice">Notice</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Event">Event</option>
                    <option value="Alert">Alert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, priority: e.target.value})}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                    style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Announcement Content <span className="text-[#EB1414]">*</span>
                </label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                  style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                  placeholder="Enter announcement content..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowNewAnnouncementForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAnnouncement}
                className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#16808D] transition-colors"
              >
                Create Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
          </div>
          <div className="p-6 space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-l-4 pl-4" style={{borderColor: '#1B9AAA'}}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{announcement.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{announcement.type}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    announcement.priority === 'High' ? 'bg-red-100 text-[#EB1414]' :
                    announcement.priority === 'Medium' ? 'bg-[#E0F7FA] text-[#142C52]' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discussions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Community Discussions</h2>
          </div>
          <div className="p-6 space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="border-l-4 pl-4" style={{borderColor: '#178740'}}>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{discussion.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">by {discussion.author}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{discussion.replies} replies</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{discussion.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Send Notification */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Notification</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
            <select
              value={selectedRecipients}
              onChange={(e) => setSelectedRecipients(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            >
              <option value="all">All Residents</option>
              <option value="block-a">Block A</option>
              <option value="block-b">Block B</option>
              <option value="block-c">Block C</option>
              <option value="block-d">Block D</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows="4"
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            ></textarea>
          </div>
          
          <button
            onClick={handleSendNotification}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#1B9AAA] focus:outline-none focus:ring-2 focus:ring-offset-2" style={{backgroundColor: '#1B9AAA'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#147783'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1B9AAA'}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communication;
