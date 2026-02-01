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
  Coffee,
  Smile,
  Paperclip,
  ThumbsUp
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Left Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                <p className="text-gray-600 mt-2">We typically respond within 2-4 hours</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep >= 1 ? 'bg-[#16808D] text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : '1'}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= 1 ? 'text-[#16808D]' : 'text-gray-600'
                }`}>
                  Contact Information
                </span>
              </div>
              <div className="flex-1 h-2 bg-gray-200 mx-4 rounded-full">
                <div 
                  className="h-2 bg-[#16808D] rounded-full transition-all duration-500"
                  style={{ width: currentStep >= 2 ? '100%' : '0%' }}
                ></div>
              </div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep >= 2 ? 'bg-[#16808D] text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= 2 ? 'text-[#16808D]' : 'text-gray-600'
                }`}>
                  Message Details
                </span>
              </div>
            </div>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center animate-pulse">
                <CheckCircle className="h-5 w-5 mr-3" />
                <span className="font-medium">{success}</span>
              </div>
            )}

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-3" />
                <span className="font-medium">{errors.submit}</span>
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
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all ${
                            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all ${
                            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all ${
                            errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all"
                          placeholder="Your Society/Company Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all appearance-none"
                        >
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level
                      </label>
                      <div className="relative">
                        <Zap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all appearance-none"
                        >
                          <option value="low">Low - General Inquiry</option>
                          <option value="normal">Normal - Standard Response</option>
                          <option value="high">High - Urgent Matter</option>
                          <option value="critical">Critical - Emergency</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center px-6 py-3 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-all transform hover:scale-105 shadow-lg"
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
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all ${
                          errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="How can we help you?"
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16808D] focus:border-transparent transition-all resize-none ${
                          errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Please provide detailed information about your inquiry..."
                      ></textarea>
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">
                        {formData.message.length}/500 characters
                      </p>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Add emoji"
                        >
                          <Smile className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Attach file"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm text-blue-900">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                    multiple
                  />

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <ChevronRight className="h-5 w-5 mr-2 rotate-180" />
                      Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center px-8 py-3 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
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

            {/* Additional Form Features */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* FAQ Section */}
                <div className="bg-gradient-to-r from-[#16808D]/10 to-[#1B9AAA]/10 rounded-xl p-6 border border-[#16808D]/20">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#16808D] rounded-lg mr-3">
                      <HelpCircle className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Quick Help</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium text-gray-700 mb-1">How quickly will you respond?</p>
                      <p className="text-gray-600">We typically respond within 2-4 hours during business hours.</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-700 mb-1">What information should I include?</p>
                      <p className="text-gray-600">Include your society name, current management system, and specific requirements.</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-700 mb-1">Can I schedule a demo?</p>
                      <p className="text-gray-600">Yes! Click the "Schedule Call" button above to book a personalized demo.</p>
                    </div>
                  </div>
                </div>

                {/* Support Metrics */}
                <div className="bg-gradient-to-r from-[#1B9AAA]/10 to-[#16808D]/10 rounded-xl p-6 border border-[#1B9AAA]/20">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-[#1B9AAA] rounded-lg mr-3">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Our Support Excellence</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-semibold text-[#16808D]">2.5 hours avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Satisfaction Rate</span>
                      <span className="text-sm font-semibold text-[#1B9AAA]">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Issues Resolved</span>
                      <span className="text-sm font-semibold text-[#142C52]">15,000+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Support Staff</span>
                      <span className="text-sm font-semibold text-[#16808D]">45 experts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Clients</span>
                      <span className="text-sm font-semibold text-[#1B9AAA]">2,500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg Resolution</span>
                      <span className="text-sm font-semibold text-[#142C52]">4.2 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">First Contact</span>
                      <span className="text-sm font-semibold text-[#16808D]">95% rate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Uptime SLA</span>
                      <span className="text-sm font-semibold text-[#1B9AAA]">99.97%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-[#142C52]/10 to-[#16808D]/10 rounded-xl p-6 border border-[#142C52]/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#142C52] rounded-lg mr-3">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">What Our Clients Say</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#16808D]/10">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"Excellent support team! They helped us migrate smoothly."</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">- Green Valley Estates</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#1B9AAA]/10">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"Best decision we made. Response time is amazing!"</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">- Sunset Apartments</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#142C52]/10">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">"Professional team and great product. Highly recommended!"</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">- Riverside Community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-[#16808D]/10 to-[#1B9AAA]/10 rounded-xl p-6 border border-[#16808D]/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#16808D] rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Additional Resources</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-[#16808D]/10">
                    <Download className="h-4 w-4 text-[#16808D] mr-2 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product Brochure</p>
                      <p className="text-xs text-gray-500">PDF • 2.5 MB</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-[#1B9AAA]/10">
                    <FileText className="h-4 w-4 text-[#1B9AAA] mr-2 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pricing Guide</p>
                      <p className="text-xs text-gray-500">PDF • 1.8 MB</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-[#142C52]/10">
                    <Video className="h-4 w-4 text-[#142C52] mr-2 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Demo Video</p>
                      <p className="text-xs text-gray-500">5 min watch</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all group border border-[#16808D]/10">
                    <HelpCircle className="h-4 w-4 text-[#1B9AAA] mr-2 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Help Center</p>
                      <p className="text-xs text-gray-500">FAQs & Guides</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Integration */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-[#142C52]/10 to-[#16808D]/10 rounded-xl p-6 border border-[#142C52]/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#142C52] rounded-lg mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Connect With Us</h4>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Follow us for updates, tips, and community management insights</p>
                  </div>
                  <div className="flex space-x-3">
                    <a href="#" className="p-2 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <a href="#" className="p-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#16808D] transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <a href="#" className="p-2 bg-[#142C52] text-white rounded-lg hover:bg-[#16808D] transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <a href="#" className="p-2 bg-[#16808D] text-white rounded-lg hover:bg-[#142C52] transition-colors">
                      <Video className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Society360 */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-600 rounded-lg mr-3">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Why Choose Society360?</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg mt-1">
                      <Shield className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">Bank-Level Security</h5>
                      <p className="text-xs text-gray-600 mt-1">256-bit encryption and regular security audits</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg mt-1">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">Lightning Fast</h5>
                      <p className="text-xs text-gray-600 mt-1">99.97% uptime with instant response times</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg mt-1">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">24/7 Support</h5>
                      <p className="text-xs text-gray-600 mt-1">Round-the-clock assistance for all queries</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg mt-1">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">Scalable Solution</h5>
                      <p className="text-xs text-gray-600 mt-1">Grows with your community needs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-emerald-600 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Recent Updates</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New AI-Powered Features Launched</p>
                        <p className="text-xs text-gray-500">Automated maintenance scheduling and predictive analytics</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mobile App Update v2.5</p>
                        <p className="text-xs text-gray-500">Enhanced UI and offline capabilities</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Integration with Payment Gateways</p>
                        <p className="text-xs text-gray-500">Support for 10+ payment methods</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Recognition */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-[#142C52]/10 to-[#16808D]/10 rounded-xl p-6 border border-[#142C52]/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#142C52] rounded-lg mr-3">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Industry Recognition</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="p-3 bg-white rounded-lg mb-2 border border-[#142C52]/10">
                      <Award className="h-8 w-8 mx-auto text-[#142C52]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Best PropTech Solution</p>
                    <p className="text-xs text-gray-500">2024</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-white rounded-lg mb-2 border border-[#16808D]/10">
                      <Shield className="h-8 w-8 mx-auto text-[#16808D]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Security Excellence</p>
                    <p className="text-xs text-gray-500">2024</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-white rounded-lg mb-2 border border-[#1B9AAA]/10">
                      <Users className="h-8 w-8 mx-auto text-[#1B9AAA]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Customer Choice</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-white rounded-lg mb-2 border border-[#142C52]/10">
                      <TrendingUp className="h-8 w-8 mx-auto text-[#142C52]" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">Fastest Growing</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-[#16808D]/10 to-[#1B9AAA]/10 rounded-xl p-6 border border-[#16808D]/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#16808D] rounded-lg mr-3">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Powered by Modern Technology</h4>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    { name: 'React', color: '#16808D' },
                    { name: 'Node.js', color: '#1B9AAA' },
                    { name: 'AWS', color: '#142C52' },
                    { name: 'MongoDB', color: '#16808D' },
                    { name: 'Docker', color: '#1B9AAA' },
                    { name: 'AI/ML', color: '#142C52' }
                  ].map((tech, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-lg hover:shadow-md transition-all border border-[#16808D]/10">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: tech.color + '20' }}>
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: tech.color }}></div>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Partner Network */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-[#1B9AAA]/10 to-[#16808D]/10 rounded-xl p-6 border border-[#1B9AAA]/20">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#1B9AAA] rounded-lg mr-3">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Trusted by Leading Communities</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'Premium Residences',
                    'Garden City Society',
                    'Metropolitan Towers',
                    'Green Valley Homes',
                    'Sunset Apartments',
                    'Riverside Complex',
                    'Urban Oasis',
                    'Elite Communities'
                  ].map((partner, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-lg hover:shadow-md transition-all border border-[#1B9AAA]/10">
                      <Building className="h-6 w-6 mx-auto mb-2 text-[#1B9AAA]" />
                      <p className="text-sm font-medium text-gray-700">{partner}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Emergency Information */}
            <div className="mt-6">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-600 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Emergency Support Information</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">24/7 Emergency Hotline</p>
                        <p className="text-xs text-gray-500">For critical system failures and security issues</p>
                      </div>
                    </div>
                    <a href="tel:+919680211602" className="text-sm font-semibold text-red-600 hover:text-red-700">+91 9680211602</a>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Emergency Email</p>
                        <p className="text-xs text-gray-500">Urgent issues only - response within 30 minutes</p>
                      </div>
                    </div>
                    <a href="mailto:emergency@society360.com" className="text-sm font-semibold text-orange-600 hover:text-orange-700">emergency@society360.com</a>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Emergency Website</p>
                        <p className="text-xs text-gray-500">Access emergency portal and resources</p>
                      </div>
                    </div>
                    <a href="https://www.residentialhub.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-red-600 hover:text-red-700">www.residentialhub.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information Sidebar */}
          <div className="space-y-6">
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
                    <div className="flex items-start justify-between mb-3">
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
                          <span className="font-semibold text-lg">{dept.name}</span>
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
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{dept.responseTime}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#1B9AAA] hover:text-[#16808D] transition-colors" />
                    </div>
                  </div>
                ))}
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
                      <Calendar className="h-4 w-4 text-white" />
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
                      <Calendar className="h-4 w-4 text-white" />
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
                      <AlertCircle className="h-4 w-4 text-red-300" />
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
                  <AlertCircle className="h-4 w-4 mr-2 text-red-300" />
                  <div>
                    <p className="font-semibold text-red-100 text-sm">Emergency Support</p>
                    <p className="text-sm text-red-200">For critical issues: +91 9680211602 (24/7)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="bg-gradient-to-r from-[#16808D] to-[#1B9AAA] rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Response Guarantee</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-white/80" />
                  <p className="text-lg font-bold">2-4h</p>
                  <p className="text-xs opacity-90">General Inquiry</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Zap className="h-5 w-5 mx-auto mb-2 text-white/80" />
                  <p className="text-lg font-bold">30m</p>
                  <p className="text-xs opacity-90">Critical Issues</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <ThumbsUp className="h-5 w-5 mx-auto mb-2 text-white/80" />
                  <p className="text-lg font-bold">98.5%</p>
                  <p className="text-xs opacity-90">Satisfaction Rate</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <Shield className="h-5 w-5 mx-auto mb-2 text-white/80" />
                  <p className="text-lg font-bold">24/7</p>
                  <p className="text-xs opacity-90">Emergency Support</p>
                </div>
              </div>
            </div>

            {/* Extended Response Guarantee */}
            <div className="bg-gradient-to-r from-[#142C52] to-[#16808D] rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl mr-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Premium Service Promise</h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-3 text-green-400" />
                    <div>
                      <p className="font-semibold text-sm">First Response</p>
                      <p className="text-xs opacity-90">Within 30 minutes</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-400">30m</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-3 text-blue-400" />
                    <div>
                      <p className="font-semibold text-sm">Issue Resolution</p>
                      <p className="text-xs opacity-90">Same day service</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-400">24h</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-3 text-purple-400" />
                    <div>
                      <p className="font-semibold text-sm">Complex Problems</p>
                      <p className="text-xs opacity-90">Expert team assigned</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-purple-400">48h</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-3 text-yellow-400" />
                    <div>
                      <p className="font-semibold text-sm">Feature Requests</p>
                      <p className="text-xs opacity-90">Development roadmap</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-yellow-400">2w</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-400 text-sm">100% Satisfaction Guarantee</p>
                    <p className="text-xs opacity-90">If you're not satisfied, we'll make it right</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
