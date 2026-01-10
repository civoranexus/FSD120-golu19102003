import React, { useState } from 'react';
import { MessageSquare, Bell, Send, Search, Calendar, Users, Megaphone } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span style={{color: '#147783'}}>Communication</span>
          <span style={{color: '#020509'}}> & Announcements</span>
        </h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#178740'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}>
            <Megaphone className="h-4 w-4" />
            <span>New Announcement</span>
          </button>
          <button className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors">
            <MessageSquare className="ml-2 h-5 w-5" />
            New Discussion
          </button>
        </div>
      </div>

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
                    announcement.priority === 'High' ? 'bg-red-100 text-[#EF4444]' :
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
