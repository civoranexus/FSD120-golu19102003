import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  Users, 
  Headphones, 
  Video, 
  MessageCircle, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Globe, 
  Building, 
  Star, 
  TrendingUp, 
  Shield, 
  Zap, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Filter, 
  X,
  ArrowRight,
  ExternalLink,
  Download,
  Upload,
  FileText,
  HelpCircle,
  User,
  Briefcase,
  Settings,
  Smartphone,
  Wifi,
  Car,
  Coffee
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    department: 'general',
    priority: 'normal',
    message: '',
    attachments: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('general');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState('headquarters');
  const fileInputRef = useRef(null);

  // Enhanced form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) newErrors.phone = 'Phone is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submission:', formData);
      setSuccess('Message sent successfully! We will get back to you within 24 hours.');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '',
        company: '',
        subject: '', 
        department: 'general',
        priority: 'normal',
        message: '',
        attachments: []
      });
      setCurrentStep(1);
    } catch (err) {
      console.error('Error sending message:', err);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && validateForm()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  // Live chat functionality
  const sendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages(prev => [
        ...prev,
        { id: Date.now(), text: chatInput, sender: 'user', timestamp: new Date() }
      ]);
      setChatInput('');
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { 
            id: Date.now(), 
            text: 'Thank you for your message! Our support team will respond shortly.', 
            sender: 'bot', 
            timestamp: new Date() 
          }
        ]);
      }, 1000);
    }
  };

  // Departments data
  const departments = [
    { 
      id: 'general', 
      name: 'General Inquiry', 
      icon: MessageCircle, 
      email: 'info@society360.com',
      responseTime: '2-4 hours',
      description: 'For general questions and information'
    },
    { 
      id: 'sales', 
      name: 'Sales & Marketing', 
      icon: TrendingUp, 
      email: 'sales@society360.com',
      responseTime: '1-2 hours',
      description: 'For product demos, pricing, and partnerships'
    },
    { 
      id: 'support', 
      name: 'Technical Support', 
      icon: Headphones, 
      email: 'support@society360.com',
      responseTime: '30 minutes - 2 hours',
      description: 'For technical issues and troubleshooting'
    },
    { 
      id: 'partnerships', 
      name: 'Partnerships', 
      icon: Users, 
      email: 'partnerships@society360.com',
      responseTime: '4-6 hours',
      description: 'For business partnerships and collaborations'
    },
    { 
      id: 'billing', 
      name: 'Billing & Accounts', 
      icon: FileText, 
      email: 'billing@society360.com',
      responseTime: '1-2 hours',
      description: 'For billing inquiries and account management'
    },
    { 
      id: 'security', 
      name: 'Security & Privacy', 
      icon: Shield, 
      email: 'security@society360.com',
      responseTime: '1 hour',
      description: 'For security concerns and privacy issues'
    }
  ];

  // Support metrics
  const supportMetrics = {
    avgResponseTime: '2.5 hours',
    satisfactionRate: '98.5%',
    ticketsResolved: '15,000+',
    activeSupportStaff: 45,
    languagesSupported: 12,
    uptime: '99.97%'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#142C52] to-[#16808D] text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-20 w-auto" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Get in touch with our expert team. We're here to help you transform your community management experience.
            </p>
            
            {/* Quick Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{supportMetrics.avgResponseTime}</div>
                <div className="text-sm opacity-90">Avg Response Time</div>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{supportMetrics.satisfactionRate}</div>
                <div className="text-sm opacity-90">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{supportMetrics.ticketsResolved}</div>
                <div className="text-sm opacity-90">Tickets Resolved</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <div className="text-2xl font-bold">{supportMetrics.activeSupportStaff}</div>
                <div className="text-sm opacity-90">Support Staff</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center px-6 py-3 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-colors">
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Live Chat
            </button>
            <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Phone className="h-5 w-5 mr-2" />
              Schedule Call
            </button>
            <button className="flex items-center px-6 py-3 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#4C97A8] transition-colors">
              <Video className="h-5 w-5 mr-2" />
              Video Meeting
            </button>
            <button className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <MessageSquare className="h-5 w-5 mr-2" />
              WhatsApp Support
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form - Left Column */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">We typically respond within 2-4 hours</span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 1 ? 'bg-[#16808D] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= 1 ? 'text-[#16808D]' : 'text-gray-600'
                  }`}>
                    Contact Info
                  </span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div 
                    className="h-1 bg-[#16808D] transition-all duration-300"
                    style={{ width: currentStep >= 2 ? '100%' : '0%' }}
                  ></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= 2 ? 'bg-[#16808D] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= 2 ? 'text-[#16808D]' : 'text-gray-600'
                  }`}>
                    Message Details
                  </span>
                </div>
              </div>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {success}
                </div>
              )}

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company/Organization
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                          placeholder="Your Society/Company Name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                      >
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                      >
                        <option value="low">Low - General Inquiry</option>
                        <option value="normal">Normal - Standard Response</option>
                        <option value="high">High - Urgent Matter</option>
                        <option value="critical">Critical - Emergency</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center px-6 py-3 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-colors"
                      >
                        Next Step
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="How can we help you?"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Please provide detailed information about your inquiry..."
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.message.length}/500 characters
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                        Previous
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center px-8 py-3 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            {/* Department Contacts */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-[#16808D] to-[#1B9AAA] rounded-xl mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Department Contacts</h3>
                  <p className="text-sm text-gray-600">Choose the right department for faster response</p>
                </div>
              </div>
              <div className="space-y-4">
                {departments.map(dept => (
                  <div 
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`p-5 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-102 ${
                      selectedDepartment === dept.id 
                        ? 'border-[#16808D] bg-gradient-to-r from-[#16808D]/5 to-[#1B9AAA]/5 shadow-lg' 
                        : 'border-gray-200 hover:border-[#1B9AAA] hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${
                          selectedDepartment === dept.id 
                            ? 'bg-[#16808D]' 
                            : 'bg-gray-100'
                        }`}>
                          <dept.icon className={`h-5 w-5 ${
                            selectedDepartment === dept.id ? 'text-white' : 'text-[#16808D]'
                          }`} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-base">{dept.name}</span>
                          <p className="text-xs text-gray-500 mt-1">{dept.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Online</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{dept.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{dept.responseTime}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#1B9AAA] hover:text-[#16808D] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Methods */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Quick Contact</h3>
                  <p className="text-sm text-gray-600">Multiple ways to reach us</p>
                </div>
              </div>
              <div className="space-y-4">
                <a href="tel:+919680211602" className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
                  <div className="p-3 bg-green-600 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">Call Us</p>
                    <p className="text-sm text-gray-600">+91 9680211602</p>
                    <p className="text-xs text-green-600 mt-1">Available 24/7 for emergencies</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </a>

                <a href="mailto:info@society360.com" className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
                  <div className="p-3 bg-blue-600 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">Email Us</p>
                    <p className="text-sm text-gray-600">info@society360.com</p>
                    <p className="text-xs text-blue-600 mt-1">Response within 2-4 hours</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </a>

                <button className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group w-full">
                  <div className="p-3 bg-purple-600 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900 text-lg">WhatsApp</p>
                    <p className="text-sm text-gray-600">+91 9680211602</p>
                    <p className="text-xs text-purple-600 mt-1">Instant messaging support</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group w-full">
                  <div className="p-3 bg-orange-600 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-900 text-lg">Video Call</p>
                    <p className="text-sm text-gray-600">Schedule Meeting</p>
                    <p className="text-xs text-orange-600 mt-1">Screen sharing available</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-r from-[#142C52] via-[#16808D] to-[#1B9AAA] rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Support Hours</h3>
                  <p className="text-sm opacity-90">We're here when you need us</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Monday - Friday</p>
                      <p className="text-sm opacity-90">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full font-medium">Available</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Saturday</p>
                      <p className="text-sm opacity-90">10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-medium">Limited</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                      <AlertCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Sunday</p>
                      <p className="text-sm opacity-90">Emergency Support Only</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs bg-red-400 text-red-900 px-2 py-1 rounded-full font-medium">Emergency</p>
                  </div>
                </div>
              </div>
              
              {/* Emergency Contact */}
              <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-300" />
                  <div>
                    <p className="font-semibold text-red-100">Emergency Support</p>
                    <p className="text-sm text-red-200">For critical issues: +91 9680211602 (24/7)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="bg-gradient-to-r from-[#16808D] to-[#1B9AAA] rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-bold">Response Time Guarantee</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <p className="text-2xl font-bold">2-4h</p>
                  <p className="text-xs opacity-90">General Inquiry</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <p className="text-2xl font-bold">30m</p>
                  <p className="text-xs opacity-90">Critical Issues</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <p className="text-2xl font-bold">98.5%</p>
                  <p className="text-xs opacity-90">Satisfaction Rate</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-xs opacity-90">Emergency Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Contact;
