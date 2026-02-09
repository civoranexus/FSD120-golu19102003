import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Headphones, 
  Users, 
  Shield, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  MessageCircle,
  HelpCircle,
  Phone,
  Mail,
  Download,
  Globe,
  RefreshCw,
  Ban,
  User,
  CreditCard,
  Building,
  FileText
} from 'lucide-react';

const Support = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState([]);

  const sections = [
    { id: 'overview', name: 'Overview', icon: Headphones },
    { id: 'acceptance', name: 'Acceptance', icon: CheckCircle },
    { id: 'responsibilities', name: 'User Responsibilities', icon: Users },
    { id: 'services', name: 'Support Services', icon: Building },
    { id: 'payments', name: 'Support Plans', icon: CreditCard },
    { id: 'privacy', name: 'Privacy Support', icon: Shield },
    { id: 'contact', name: 'Contact', icon: Mail }
  ];

  const supportKeyTerms = [
    {
      term: 'Live Chat',
      definition: 'Real-time messaging platform for instant support from our team during business hours.',
      category: 'communication'
    },
    {
      term: 'Support Ticket',
      definition: 'Formal request submitted through our system for tracking and resolution of issues.',
      category: 'tracking'
    },
    {
      term: 'Knowledge Base',
      definition: 'Comprehensive library of articles, guides, and tutorials for self-service support.',
      category: 'resources'
    },
    {
      term: 'Response Time',
      definition: 'Expected duration for our team to respond to your support request.',
      category: 'service'
    },
    {
      term: 'Priority Level',
      definition: 'Classification system that determines the urgency and handling order of support requests.',
      category: 'classification'
    },
    {
      term: 'Escalation',
      definition: 'Process of transferring complex issues to senior support specialists.',
      category: 'process'
    }
  ];

  const userResponsibilities = [
    {
      title: 'Secure Your Credentials',
      description: 'Protect your login information and immediately report any suspicious account activity to our security team.',
      icon: Shield,
      priority: 'high'
    },
    {
      title: 'Provide Accurate Details',
      description: 'Share precise and current information when seeking assistance to help us resolve your issues faster.',
      icon: User,
      priority: 'high'
    },
    {
      title: 'Document Issues Thoroughly',
      description: 'Take screenshots and record error messages to help our support team understand and reproduce your problems.',
      icon: FileText,
      priority: 'high'
    },
    {
      title: 'Respect Support Team',
      description: 'Maintain professional and courteous communication with our support representatives at all times.',
      icon: Users,
      priority: 'high'
    },
    {
      title: 'Communicate Clearly',
      description: 'Describe your concerns with specific details and context to enable our team to provide targeted solutions.',
      icon: MessageCircle,
      priority: 'medium'
    },
    {
      title: 'Follow Support Protocols',
      description: 'Adhere to established support procedures and guidelines for efficient issue resolution.',
      icon: Shield,
      priority: 'medium'
    },
    {
      title: 'Test Before Contacting',
      description: 'Try basic troubleshooting steps before reaching out to support to save time for both parties.',
      icon: RefreshCw,
      priority: 'medium'
    },
    {
      title: 'Regular Data Backups',
      description: 'Consistently backup important information to safeguard against potential data loss during troubleshooting.',
      icon: RefreshCw,
      priority: 'medium'
    },
    {
      title: 'Maintain Browser Security',
      description: 'Keep your browser updated with security patches and avoid suspicious downloads that may compromise your account.',
      icon: Shield,
      priority: 'medium'
    },
    {
      title: 'Track Support Requests',
      description: 'Monitor your support tickets and respond promptly to follow-up questions from our team.',
      icon: Clock,
      priority: 'low'
    },
    {
      title: 'Keep Systems Updated',
      description: 'Ensure your applications and browsers remain current for optimal compatibility with platform features.',
      icon: Clock,
      priority: 'low'
    },
    {
      title: 'Provide Feedback',
      description: 'Share your experience and suggestions to help us improve our support services and platform features.',
      icon: MessageCircle,
      priority: 'low'
    }
  ];

  const supportServiceTerms = [
    {
      title: 'Service Availability',
      content: 'We maintain high availability of support services but cannot guarantee uninterrupted access. Temporary suspensions may occur for system maintenance, updates, or technical issues.',
      icon: Clock
    },
    {
      title: 'Service Modifications',
      content: 'We reserve the right to modify, suspend, or discontinue any aspect of support services at any time, including features, response times, or channels.',
      icon: RefreshCw
    },
    {
      title: 'Third-Party Integration',
      content: 'Support services may integrate with third-party tools for ticket management, communication, or analytics. These services have their own terms and privacy policies.',
      icon: Globe
    },
    {
      title: 'Support Restrictions',
      content: 'Users may not use support services for illegal activities, harassment, or requests outside the scope of Society360 platform support.',
      icon: Ban
    }
  ];

  const supportPaymentTerms = [
    {
      title: 'Support Plans',
      content: 'We offer various support plans including Free, Basic, Premium, and Enterprise tiers with different response times and features.',
      icon: CreditCard
    },
    {
      title: 'Support Methods',
      content: 'We provide multiple support channels including live chat, email, phone, and knowledge base access. All support interactions are secure and confidential.',
      icon: MessageCircle
    },
    {
      title: 'Support Hours',
      content: 'Support is available based on your subscription plan. Premium users receive 24/7 support while standard users get business hour support.',
      icon: Clock
    },
    {
      title: 'Premium Support',
      content: 'Premium support includes faster response times, dedicated support agents, and priority issue resolution. Additional fees may apply for premium services.',
      icon: RefreshCw
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <Headphones className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Welcome to Society360 Assistance Hub</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                At Society360, we understand that managing residential communities comes with unique challenges. 
                Our dedicated support team is committed to ensuring you have smooth, uninterrupted access to all platform features. 
                Whether you're a society manager, resident, or administrator, we're here to help you make the most of our comprehensive management solution.
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">
                  <strong>Recently Updated:</strong> January 2026 | 
                  <strong>Premium Access:</strong> Round-the-clock assistance available
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Key Support Definitions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportKeyTerms.map((term, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {term.category}
                      </span>
                      <h5 className="font-semibold text-gray-900">{term.term}</h5>
                    </div>
                    <p className="text-sm text-gray-600">{term.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'acceptance':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Support Terms</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Agreement to Terms</h4>
                    <p className="text-gray-600">By accessing and using Society360 support services, you accept and agree to be bound by these support terms and conditions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Non-Acceptance</h4>
                    <p className="text-gray-600">If you do not agree to abide by above, please do not use our support services.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Terms Updates</h4>
                    <p className="text-gray-600">We may update these support terms from time to time. Continued use of support services constitutes acceptance of any changes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Questions & Answers</h3>
            <div className="space-y-4">
              {[
                {
                  question: "How can I reset my account password?",
                  answer: "Navigate to the login screen and select 'Forgot Password'. Follow the instructions sent to your registered email address to create a new password."
                },
                {
                  question: "What's the process for upgrading my subscription?",
                  answer: "Access your account settings, select 'Subscription Management', then choose 'Upgrade Plan' to review and select your preferred membership tier."
                },
                {
                  question: "How secure is my personal information on Society360?",
                  answer: "We implement enterprise-grade encryption and follow strict security protocols to safeguard your data. Detailed security information is available in our Privacy Policy."
                },
                {
                  question: "How do I reach emergency support outside business hours?",
                  answer: "For critical situations, call our emergency hotline at +91 9680211602 or email emergency@society360.com for immediate assistance."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                      <p className="text-gray-600 mt-1">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-6 w-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-sm text-gray-600">support@society360.com</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Response time: 24-48 hours</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="h-6 w-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-sm text-gray-600">+91 9680211602</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Available: 9 AM - 6 PM IST</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>For support matters:</strong> Please include "Support Request" in your email subject for faster response.
              </p>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Service Terms</h3>
            <div className="space-y-4">
              {supportServiceTerms.map((term, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <term.icon className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{term.title}</h4>
                      <p className="text-gray-600 mt-1">{term.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Plan Terms</h3>
            <div className="space-y-4">
              {supportPaymentTerms.map((term, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <term.icon className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{term.title}</h4>
                      <p className="text-gray-600 mt-1">{term.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Privacy Protection</h4>
                    <p className="text-gray-600">Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your support information.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Usage Consent</h4>
                    <p className="text-gray-600">By using Society360 support services, you consent to collection and use of information as described in our Privacy Policy.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Sharing</h4>
                    <p className="text-gray-600">We do not sell, rent, or lease your personal support information to third parties without your consent.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              <p className="text-gray-600">Last updated: January 2026</p>
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
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
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

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Society360. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
