import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  Database, 
  UserCheck, 
  Lock, 
  MessageSquare,
  Download,
  Settings,
  Cookie,
  Smartphone,
  Globe,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone
} from 'lucide-react';

const Support = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Eye },
    { id: 'collection', name: 'Data Collection', icon: Database },
    { id: 'usage', name: 'Data Usage', icon: Settings },
    { id: 'protection', name: 'Data Protection', icon: Lock },
    { id: 'rights', name: 'Your Rights', icon: UserCheck },
    { id: 'cookies', name: 'Cookies', icon: Cookie },
    { id: 'contact', name: 'Contact', icon: MessageSquare }
  ];

  const privacyFeatures = [
    {
      title: 'GDPR Compliant',
      description: 'Fully compliant with data protection regulations',
      icon: Shield,
      status: 'active'
    },
    {
      title: 'SSL Encryption',
      description: '256-bit SSL encryption for all data transfers',
      icon: Lock,
      status: 'active'
    },
    {
      title: 'Data Minimization',
      description: 'We collect only necessary information',
      icon: Database,
      status: 'active'
    },
    {
      title: 'Regular Audits',
      description: 'Quarterly security and privacy audits',
      icon: CheckCircle,
      status: 'active'
    }
  ];

  const dataCategories = [
    {
      category: 'Personal Information',
      items: ['Name and contact details', 'Email address and phone number', 'Residential address', 'Government ID numbers'],
      purpose: 'Account management and communication',
      retention: 'Until account deletion'
    },
    {
      category: 'Residential Data',
      items: ['Unit number and block', 'Parking details', 'Family member information', 'Emergency contacts'],
      purpose: 'Society management and security',
      retention: 'Until residency ends'
    },
    {
      category: 'Usage Data',
      items: ['Login frequency and times', 'Pages visited and features used', 'Device information', 'IP address'],
      purpose: 'Service improvement and security',
      retention: '12 months'
    },
    {
      category: 'Communication Data',
      items: ['Messages and notices', 'Service requests', 'Complaints and feedback', 'Payment information'],
      purpose: 'Service delivery and support',
      retention: '7 years'
    }
  ];

  const userRights = [
    {
      right: 'Access',
      description: 'Request a copy of your personal data',
      action: 'Request Data',
      timeline: '30 days'
    },
    {
      right: 'Correction',
      description: 'Update inaccurate personal information',
      action: 'Update Data',
      timeline: 'Immediate'
    },
    {
      right: 'Deletion',
      description: 'Request deletion of your personal data',
      action: 'Delete Account',
      timeline: '30 days'
    },
    {
      right: 'Portability',
      description: 'Transfer your data to another service',
      action: 'Export Data',
      timeline: '30 days'
    },
    {
      right: 'Objection',
      description: 'Object to processing of your data',
      action: 'Object Processing',
      timeline: '14 days'
    },
    {
      right: 'Restriction',
      description: 'Limit how we use your data',
      action: 'Restrict Usage',
      timeline: '14 days'
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Privacy Policy Overview</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                At Society360, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy outlines how we collect, use, and protect your data when you use our residential management system.
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> January 2026 | 
                  <strong>Effective Date:</strong> January 1, 2026
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Privacy Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {privacyFeatures.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {feature.status}
                      </span>
                      <h5 className="font-semibold text-gray-900">{feature.title}</h5>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'collection':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
            <div className="space-y-4">
              {dataCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Data Items:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Purpose:</p>
                      <p className="text-sm text-gray-600">{category.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Retention:</p>
                      <p className="text-sm text-gray-600">{category.retention}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'usage':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Service Delivery</h4>
                      <p className="text-sm text-gray-600">Provide and maintain residential management services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Request Processing</h4>
                      <p className="text-sm text-gray-600">Process service requests and complaints efficiently</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Communication</h4>
                      <p className="text-sm text-gray-600">Send important notices and updates</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Security</h4>
                      <p className="text-sm text-gray-600">Ensure building security and access control</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Analytics</h4>
                      <p className="text-sm text-gray-600">Analyze usage patterns to improve services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Legal Compliance</h4>
                      <p className="text-sm text-gray-600">Comply with legal and regulatory requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'protection':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Protection Measures</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Encryption</h4>
                      <p className="text-sm text-gray-600">256-bit SSL encryption for all data transmission</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Servers</h4>
                      <p className="text-sm text-gray-600">Enterprise-grade servers with regular security updates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <UserCheck className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Access Controls</h4>
                      <p className="text-sm text-gray-600">Strict authentication and authorization systems</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Regular Audits</h4>
                      <p className="text-sm text-gray-600">Quarterly security and vulnerability assessments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Database className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Backup</h4>
                      <p className="text-sm text-gray-600">Automated daily backups with disaster recovery</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Compliance</h4>
                      <p className="text-sm text-gray-600">GDPR and data protection regulation compliant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rights':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRights.map((right, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{right.right}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{right.timeline}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{right.description}</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    {right.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookie Preferences</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Cookie className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                      <p className="text-sm text-gray-600">Required for basic site functionality</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">Help us improve our services</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
                      <p className="text-sm text-gray-600">Personalized content and ads</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Our Privacy Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-6 w-6 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-sm text-gray-600">privacy@society360.com</p>
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
                <strong>For privacy inquiries:</strong> Please include "Privacy Inquiry" in your email subject for faster response.
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
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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

export default Support;
