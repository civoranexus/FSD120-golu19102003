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
  AlertCircle,
  Search,
  User,
  HelpCircle,
  FileText,
  Send
} from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'account', name: 'Account Issues', icon: User },
    { id: 'payment', name: 'Payment & Billing', icon: FileText },
    { id: 'technical', name: 'Technical Support', icon: AlertCircle },
    { id: 'general', name: 'General Inquiry', icon: MessageSquare }
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address and follow the instructions sent to your email to reset your password.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How can I update my profile information?',
      answer: 'Navigate to your Dashboard > Profile Settings. You can update your personal information, contact details, and preferences from there.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI (GPay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, Rupay), and Net Banking from all major banks.'
    },
    {
      id: 4,
      category: 'payment',
      question: 'How do I cancel my subscription?',
      answer: 'Go to Dashboard > Subscription > Manage Subscription. Click on "Cancel Subscription" and follow the confirmation process.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'Why is the app not loading properly?',
      answer: 'Try clearing your browser cache, check your internet connection, or try using a different browser. If issues persist, contact our technical support.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'How do I report a bug or issue?',
      answer: 'Use the "Report Issue" feature in the app or email us at support@society360.com with detailed information about the problem.'
    },
    {
      id: 7,
      category: 'general',
      question: 'What are the working hours of support?',
      answer: 'Our support team is available Monday to Saturday, 9:00 AM to 6:00 PM IST. Emergency support is available 24/7.'
    },
    {
      id: 8,
      category: 'general',
      question: 'How do I contact customer support?',
      answer: 'You can reach us via phone at +91 9680211602, email at support@society360.com, or use the live chat feature in the app.'
    }
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageSquare,
      action: 'Start Chat',
      available: '24/7',
      color: 'bg-green-500'
    },
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: Phone,
      action: '+91 9680211602',
      available: '9 AM - 6 PM',
      color: 'bg-blue-500'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed queries via email',
      icon: Mail,
      action: 'support@society360.com',
      available: '24/7',
      color: 'bg-purple-500'
    },
    {
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base',
      icon: HelpCircle,
      action: 'Visit Help Center',
      available: '24/7',
      color: 'bg-orange-500'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support request submitted:', formData);
    alert('Your support request has been submitted. We will get back to you soon!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-[#16808D] hover:text-[#142C52] mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-[#16808D] p-3 rounded-full mr-4">
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
              <p className="text-gray-600">We're here to help you 24/7</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className={`${option.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">Available: {option.available}</p>
                  <p className="text-sm font-medium text-[#16808D]">{option.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#16808D] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                    placeholder="Describe your issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#16808D] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#142C52] transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Average response time: 2-4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">Emergency Support</h3>
              <p className="text-red-700">For urgent issues, call us immediately at +91 9680211602</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
