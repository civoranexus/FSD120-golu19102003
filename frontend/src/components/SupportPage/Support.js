import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Headphones, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  Send,
  Users,
  Shield,
  Settings,
  HelpCircle,
  FileText,
  AlertTriangle,
  Download,
  Video,
  Book
} from 'lucide-react';

const Support = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const sections = [
    { id: 'overview', name: 'Overview', icon: HelpCircle },
    { id: 'contact', name: 'Contact Support', icon: MessageSquare },
    { id: 'faqs', name: 'FAQs', icon: Users },
    { id: 'guides', name: 'User Guides', icon: Book },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle },
    { id: 'resources', name: 'Resources', icon: FileText }
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageSquare,
      action: 'Start Chat',
      status: 'available'
    },
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: Phone,
      action: '+91 9680211602',
      status: 'available'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed queries via email',
      icon: Mail,
      action: 'support@society360.com',
      status: 'available'
    }
  ];

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and follow the email instructions sent to your registered email address.',
      category: 'account',
      helpful: 45
    },
    {
      question: 'How can I update my profile information?',
      answer: 'Navigate to Dashboard > Profile Settings. You can update your personal information, contact details, and preferences from there.',
      category: 'account',
      helpful: 38
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, Rupay), and Net Banking from all major banks.',
      category: 'payment',
      helpful: 52
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach us through live chat, phone support, or email. Our support team is available 24/7 to assist you.',
      category: 'support',
      helpful: 41
    }
  ];

  const userGuides = [
    {
      title: 'Getting Started Guide',
      description: 'Complete guide for new users',
      icon: Book,
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1234
    },
    {
      title: 'Visitor Management Tutorial',
      description: 'Step-by-step visitor registration',
      icon: Video,
      type: 'Video',
      duration: '5:30',
      views: 856
    }
  ];

  const emergencyContacts = [
    {
      title: 'Emergency Services',
      number: '112',
      description: 'Police, Fire, Ambulance',
      icon: AlertTriangle,
      priority: 'critical'
    },
    {
      title: 'Security Office',
      number: '+91 9680211603',
      description: '24/7 Security Desk',
      icon: Shield,
      priority: 'high'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Center Overview</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Channels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportOptions.map((option, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <option.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{option.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                          {option.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                    <p className="text-sm font-medium text-blue-600">{option.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Response Time</h4>
                </div>
                <p className="text-blue-700">Average: 2-4 hours</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-green-900">Satisfaction Rate</h4>
                </div>
                <p className="text-green-700">98% Positive</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-purple-900">Active Support</h4>
                </div>
                <p className="text-purple-700">24/7 Available</p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your issue in detail..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        );

      case 'faqs':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {faq.helpful}% helpful
                        </span>
                      </div>
                      <p className="text-gray-600">{faq.answer}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-xs text-gray-500">Category: {faq.category}</span>
                        <button className="text-xs text-blue-600 hover:text-blue-700">Was this helpful?</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );

      case 'guides':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Guides & Resources</h2>
            
            <div className="space-y-4">
              {userGuides.map((guide, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <guide.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                        <p className="text-sm text-gray-600">{guide.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">
                        {guide.type === 'PDF' ? `${guide.size} • ${guide.downloads} downloads` : `${guide.duration} • ${guide.views} views`}
                      </span>
                      <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                        <Download className="h-4 w-4 mr-1" />
                        {guide.type === 'PDF' ? 'Download' : 'Watch'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
            
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  contact.priority === 'critical' ? 'border-red-200 bg-red-50' :
                  contact.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                  'border-yellow-200 bg-yellow-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        contact.priority === 'critical' ? 'bg-red-100' :
                        contact.priority === 'high' ? 'bg-orange-100' :
                        'bg-yellow-100'
                      }`}>
                        <contact.icon className={`h-5 w-5 ${
                          contact.priority === 'critical' ? 'text-red-600' :
                          contact.priority === 'high' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.title}</h3>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{contact.number}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        contact.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        contact.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {contact.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'resources':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Video Tutorials</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <Video className="h-4 w-4 mr-2 text-blue-600" />
                    Getting Started with Society360
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Video className="h-4 w-4 mr-2 text-blue-600" />
                    Visitor Management System
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Documentation</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2 text-green-600" />
                    API Documentation
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2 text-green-600" />
                    Integration Guide
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Your support request has been submitted. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
              <p className="text-gray-600">We're here to help you 24/7</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#16808D] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <button className="flex items-center space-x-2 text-[#16808D] hover:text-[#142C52] text-sm font-medium">
                  <Download className="h-4 w-4" />
                  <span>Download Guide</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col">
              {renderContent()}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Society360. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
