import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Users, 
  Shield, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Scale,
  Gavel,
  Ban,
  RefreshCw,
  User,
  CreditCard,
  Building,
  Mail,
  Phone,
  Globe,
  Download
} from 'lucide-react';

const Terms = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState([]);

  const sections = [
    { id: 'overview', name: 'Overview', icon: FileText },
    { id: 'acceptance', name: 'Acceptance', icon: CheckCircle },
    { id: 'responsibilities', name: 'User Responsibilities', icon: Users },
    { id: 'privacy', name: 'Privacy & Data', icon: Shield },
    { id: 'services', name: 'Service Terms', icon: Building },
    { id: 'payments', name: 'Payment Terms', icon: CreditCard },
    { id: 'intellectual', name: 'Intellectual Property', icon: Gavel },
    { id: 'termination', name: 'Termination', icon: Ban },
    { id: 'liability', name: 'Limitation of Liability', icon: AlertTriangle },
    { id: 'contact', name: 'Contact', icon: Mail }
  ];

  const keyTerms = [
    {
      term: 'Service',
      definition: 'The Society360 residential management platform and all related services provided by Civora Nexus Pvt. Ltd.',
      category: 'general'
    },
    {
      term: 'User',
      definition: 'Any individual, resident, or entity who registers for and uses the Society360 platform.',
      category: 'general'
    },
    {
      term: 'Account',
      definition: 'The personalized access credentials created by a User to access the Service.',
      category: 'general'
    },
    {
      term: 'Content',
      definition: 'All text, graphics, images, data, and other materials available on the Service.',
      category: 'general'
    },
    {
      term: 'Subscription',
      definition: 'The paid or free service plan selected by the User for accessing Society360 features.',
      category: 'payment'
    },
    {
      term: 'Personal Data',
      definition: 'Any information relating to an identified or identifiable natural person.',
      category: 'privacy'
    }
  ];

  const userResponsibilities = [
    {
      title: 'Account Security',
      description: 'Maintain the confidentiality of your account credentials and notify us immediately of any unauthorized use.',
      icon: Shield,
      priority: 'high'
    },
    {
      title: 'Accurate Information',
      description: 'Provide accurate, current, and complete information during registration and keep it updated.',
      icon: User,
      priority: 'high'
    },
    {
      title: 'Lawful Use',
      description: 'Use the Service only for lawful purposes and in compliance with all applicable laws and regulations.',
      icon: Gavel,
      priority: 'high'
    },
    {
      title: 'Respect Others',
      description: 'Respect the privacy and rights of other residents and users of the platform.',
      icon: Users,
      priority: 'medium'
    },
    {
      title: 'Report Issues',
      description: 'Report any security vulnerabilities, bugs, or technical issues immediately.',
      icon: AlertTriangle,
      priority: 'medium'
    },
    {
      title: 'Payment Obligations',
      description: 'Pay all subscription fees and charges on time for paid plans.',
      icon: CreditCard,
      priority: 'high'
    }
  ];

  const serviceTerms = [
    {
      title: 'Service Availability',
      content: 'We strive to maintain high availability of Society360 services but cannot guarantee uninterrupted service. Temporary suspensions may occur for maintenance, updates, or technical reasons.',
      icon: Clock
    },
    {
      title: 'Service Modifications',
      content: 'We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, including features, pricing, or terms.',
      icon: RefreshCw
    },
    {
      title: 'Third-Party Services',
      content: 'The Service may integrate with third-party services for payment processing, communication, or other functionalities. These services have their own terms and privacy policies.',
      icon: Globe
    },
    {
      title: 'Service Restrictions',
      content: 'Users may not use the Service for illegal activities, reverse engineering, or creating derivative works without explicit permission.',
      icon: Ban
    }
  ];

  const paymentTerms = [
    {
      title: 'Subscription Plans',
      content: 'We offer various subscription plans including Free, Basic, Premium, and Enterprise tiers with different features and pricing.',
      icon: CreditCard
    },
    {
      title: 'Payment Methods',
      content: 'We accept UPI, Credit/Debit Cards, and Net Banking for subscription payments. All payment processing is secure and encrypted.',
      icon: CreditCard
    },
    {
      title: 'Billing Cycle',
      content: 'Subscriptions are billed weekly, monthly, or yearly based on the selected billing cycle. Payments are due at the beginning of each billing period.',
      icon: Clock
    },
    {
      title: 'Refund Policy',
      content: 'Refunds are processed on a case-by-case basis within 30 days of payment. Please refer to our refund policy for detailed terms.',
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
                <FileText className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Terms of Service Overview</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Society360. These Terms of Service govern your use of our smart residential management platform 
                and services provided by Civora Nexus Pvt. Ltd. By accessing or using Society360, you agree to be bound by these Terms.
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> January 2026 | 
                  <strong>Effective Date:</strong> January 1, 2026
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Key Definitions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyTerms.map((term, index) => (
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Agreement to Terms</h4>
                    <p className="text-gray-600">By accessing and using Society360, you accept and agree to be bound by these terms and conditions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Non-Acceptance</h4>
                    <p className="text-gray-600">If you do not agree to abide by the above, please do not use this service.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Terms Updates</h4>
                    <p className="text-gray-600">We may update these terms from time to time. Continued use of the service constitutes acceptance of any changes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'responsibilities':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">User Responsibilities</h3>
            <div className="space-y-4">
              {userResponsibilities.map((responsibility, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className={`${responsibility.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'} p-2 rounded-full`}>
                      <responsibility.icon className={`h-5 w-5 ${responsibility.priority === 'high' ? 'text-red-600' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{responsibility.title}</h4>
                      <p className="text-gray-600 mt-1">{responsibility.description}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                        responsibility.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {responsibility.priority} priority
                      </span>
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
                    <p className="text-gray-600">Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Usage Consent</h4>
                    <p className="text-gray-600">By using Society360, you consent to the collection and use of information as described in our Privacy Policy.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Data Sharing</h4>
                    <p className="text-gray-600">We do not sell, rent, or lease your personal information to third parties without your consent.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Terms</h3>
            <div className="space-y-4">
              {serviceTerms.map((term, index) => (
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
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h3>
            <div className="space-y-4">
              {paymentTerms.map((term, index) => (
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

      case 'intellectual':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Gavel className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ownership</h4>
                    <p className="text-gray-600">All content, features, and functionality of Society360 are owned by Civora Nexus Pvt. Ltd. and protected by copyright, trademark, and other intellectual property laws.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Ban className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Restrictions</h4>
                    <p className="text-gray-600">You may not copy, modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from the Service.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">User Content</h4>
                    <p className="text-gray-600">You retain ownership of any content you submit to the Service, but grant us a license to use, modify, and distribute such content for the purpose of providing the Service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'termination':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Termination</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Termination Rights</h4>
                    <p className="text-gray-600">We reserve the right to suspend or terminate your access to Society360 at any time, with or without cause.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Termination Notice</h4>
                    <p className="text-gray-600">Termination may occur with or without notice, except where required by law.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">User Termination</h4>
                    <p className="text-gray-600">You may terminate your account at any time by following the account deletion process in your settings.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'liability':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Service As Is</h4>
                    <p className="text-gray-600">Society360 is provided "as is" without warranties of any kind, either express or implied.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Ban className="h-6 w-6 text-orange-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Limitation of Damages</h4>
                    <p className="text-gray-600">We shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the service.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Scale className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Maximum Liability</h4>
                    <p className="text-gray-600">Our total liability for any claims arising from the service shall not exceed the amount paid by you for the service in the preceding 12 months.</p>
                  </div>
                </div>
              </div>
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
                    <p className="text-sm text-gray-600">legal@society360.com</p>
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
                <strong>For legal matters:</strong> Please include "Legal Inquiry" in your email subject for faster response.
              </p>
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
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
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
                  <span>Download PDF</span>
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

export default Terms;
