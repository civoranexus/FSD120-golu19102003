import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Building, DollarSign, MessageSquare, Shield, Calendar, Bell, Wrench, ChevronRight, Zap, Target, Award, Clock, TrendingUp, CheckCircle, Star, Activity } from 'lucide-react';

const FeaturesPage = () => {
  const allFeatures = [
    {
      featureIcon: Users,
      featureTitle: "Smart Visitor Management",
      featureDescription: "Digital visitor registration with QR codes and real-time tracking for enhanced security",
      featureColor: "#0C4A50",
      featureLink: "/guest-registration",
      category: "Security & Access"
    },
    {
      featureIcon: Building,
      featureTitle: "Automated Maintenance",
      featureDescription: "AI-powered maintenance scheduling and tracking system for efficient operations",
      featureColor: "#22C55E",
      featureLink: "/repair-services",
      category: "Operations"
    },
    {
      featureIcon: DollarSign,
      featureTitle: "Financial Dashboard",
      featureDescription: "Comprehensive billing, payments, and expense management with real-time insights",
      featureColor: "#1B9AAA",
      featureLink: "/accounting",
      category: "Finance"
    },
    {
      featureIcon: MessageSquare,
      featureTitle: "Community Communication",
      featureDescription: "Built-in messaging, announcements, and discussion forums for better engagement",
      featureColor: "#142C52",
      featureLink: "/messaging",
      category: "Communication"
    },
    {
      featureIcon: Shield,
      featureTitle: "Advanced Security Systems",
      featureDescription: "24/7 monitoring with smart access control and surveillance capabilities",
      featureColor: "#02394A",
      featureLink: "/safety",
      category: "Security & Access"
    },
    {
      featureIcon: Calendar,
      featureTitle: "Amenity Booking Platform",
      featureDescription: "Online booking system for community facilities and resource management",
      featureColor: "#4C97A8",
      featureLink: "/facilities",
      category: "Lifestyle"
    },
    {
      featureIcon: Bell,
      featureTitle: "Smart Notifications",
      featureDescription: "Real-time alerts and notifications for important community updates and events",
      featureColor: "#16808D",
      featureLink: "/dashboard",
      category: "Communication"
    },
    {
      featureIcon: Wrench,
      featureTitle: "Service Request Portal",
      featureDescription: "Streamlined service request management with tracking and resolution monitoring",
      featureColor: "#178740",
      featureLink: "/issues",
      category: "Operations"
    }
  ];

  const categories = [...new Set(allFeatures.map(feature => feature.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#16808D] to-[#142C52] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Features</h1>
            <p className="text-xl opacity-90">
              Discover comprehensive tools designed to transform your community management
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{color: '#071426'}}>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allFeatures
                .filter(feature => feature.category === category)
                .map((feature, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="flex justify-center mb-4">
                        <div 
                          className="p-3 rounded-full shadow-sm"
                          style={{ backgroundColor: feature.featureColor }}
                        >
                          <feature.featureIcon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {feature.featureTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {feature.featureDescription}
                      </p>
                      <Link
                        to={feature.featureLink}
                        className="inline-flex items-center text-sm font-medium text-[#1B9AAA] hover:text-[#16808D] transition-colors group-hover:translate-x-1 transform"
                      >
                        <span>Get Started</span>
                        <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    
                    {/* Subtle hover effect overlay */}
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                      style={{ backgroundColor: feature.featureColor }}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#E0F7FA] to-[#D4DBE9] rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4" style={{color: '#071426'}}>
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Transform your community management with Society360 today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#142C52] to-[#16808D] text-white rounded-lg font-semibold hover:from-[#16808D] hover:to-[#142C52] transition-all transform hover:scale-105 shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
            </Link>
            <Link
              to="/demo"
              className="flex items-center justify-center px-8 py-3 bg-white text-[#142C52] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg border border-gray-200"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
