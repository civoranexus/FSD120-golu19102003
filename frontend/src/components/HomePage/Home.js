import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award, Building, Shield, Clock, TrendingUp, CheckCircle, Star, Activity, DollarSign, MessageSquare, Calendar, Bell, Mail, Phone, Wrench, Zap, ChevronRight } from 'lucide-react';

const Home = () => {
  const communityOverviewData = [
    {
      metricLabel: "Happy Residents",
      metricValue: "156",
      metricIcon: Users,
      metricColor: "#0C4A50",
      metricTrend: "+12% this month",
      trendDirection: "up"
    },
    {
      metricLabel: "Active Service Requests", 
      metricValue: "8",
      metricIcon: Clock,
      metricColor: "#22C55E",
      metricTrend: "Avg 2.5h response",
      trendDirection: "stable"
    },
    {
      metricLabel: "Current Visitors Today",
      metricValue: "23", 
      metricIcon: Shield,
      metricColor: "#1B9AAA",
      metricTrend: "All verified",
      trendDirection: "safe"
    },
    {
      metricLabel: "System Performance",
      metricValue: "99.9%",
      metricIcon: Activity,
      metricColor: "#EF4444", 
      metricTrend: "Excellent uptime",
      trendDirection: "excellent"
    },
    {
      metricLabel: "Total Units",
      metricValue: "192",
      metricIcon: Building,
      metricColor: "#142C52",
      metricTrend: "Residential Properties",
      trendDirection: "properties"
    },
    {
      metricLabel: "Monthly Revenue",
      metricValue: "₹28.4L",
      metricIcon: DollarSign,
      metricColor: "#178740",
      metricTrend: "Collection Rate: 98%",
      trendDirection: "revenue"
    },
    {
      metricLabel: "Satisfaction",
      metricValue: "94%",
      metricIcon: Star,
      metricColor: "#1B9AAA",
      metricTrend: "Community Happiness Index",
      trendDirection: "satisfaction"
    }
  ];

  const platformHighlights = [
    {
      highlightTitle: "Intelligent Management",
      highlightDescription: "Advanced residential society management powered by cutting-edge technology solutions",
      highlightIcon: Target,
      highlightColor: "#0C4A50",
      features: ["Smart Automation", "Real-time Analytics", "Mobile Access"]
    },
    {
      highlightTitle: "Community-Focused Design", 
      highlightDescription: "Thoughtfully crafted for residents, management teams, and support staff with role-based permissions",
      highlightIcon: Users,
      highlightColor: "#178740",
      features: ["Role-based Access", "User-friendly Interface", "Multi-device Support"]
    },
    {
      highlightTitle: "Professional Excellence",
      highlightDescription: "Industry-leading practices backed by Civora Nexus quality assurance and reliability standards",
      highlightIcon: Award,
      highlightColor: "#1B9AAA", 
      features: ["Quality Assured", "24/7 Support", "Regular Updates"]
    }
  ];

  const getTrendIndicator = (direction) => {
    const trendConfig = {
      up: { icon: TrendingUp, color: "text-green-600", label: "Growing" },
      stable: { icon: Clock, color: "text-orange-600", label: "Stable" },
      safe: { icon: CheckCircle, color: "text-blue-600", label: "Secure" },
      excellent: { icon: Star, color: "text-green-600", label: "Excellent" }
    };
    return trendConfig[direction] || trendConfig.stable;
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Enhanced Design */}
      <div 
        className="text-white relative overflow-hidden"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          top: '-64px'
        }}
      >
        <div className="max-w-4xl mx-auto text-center p-12" style={{ paddingTop: '120px' }}>
          <div className="flex justify-center mb-6">
            <img src="/short_logo.png" alt="Society360 Logo" className="h-24 w-12" />
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{color: '#071426'}}>Welcome to Society360</h1>
          <p className="text-xl mb-8" style={{color: '#D4DBE9'}}>Building future-ready communities with intelligent management solutions</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="flex items-center justify-center px-8 py-3 bg-white text-[#1B9AAA] rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors"
            >
              Explore Society 360
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors">
              Submit Session Attendance
              <Users className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Platform Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platformHighlights.map((highlight, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <highlight.highlightIcon className="h-12 w-12" style={{ color: highlight.highlightColor }} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{highlight.highlightTitle}</h3>
            <p className="text-gray-600 mb-4">{highlight.highlightDescription}</p>
            <div className="space-y-2">
              {highlight.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-500">
                  <CheckCircle className="h-3 w-3 mr-2" style={{ color: highlight.highlightColor }} />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Society360 at a Glance Section */}
      <div className="bg-gradient-to-r from-[#E0F7FA] to-[#D4DBE9] rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{color: '#071426'}}>
            Society360 at a glance
          </h2>
          <p className="text-gray-600">Real-time insights into your community's performance and engagement</p>
        </div>
        
        <div className="grid grid-cols-7 gap-2 max-w-9xl mx-auto">
          {communityOverviewData.map((metric, index) => {
            const trend = getTrendIndicator(metric.trendDirection);
            const TrendIcon = trend.icon;
            
            return (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center mb-3">
                    <metric.metricIcon className="h-8 w-8" style={{ color: metric.metricColor }} />
                  </div>
                  <div className="text-2xl font-bold mb-2" style={{color: metric.metricColor}}>
                    {metric.metricValue}
                  </div>
                  <div className="text-gray-700 font-medium mb-2 text-xs">{metric.metricLabel}</div>
                  <div className={`flex items-center ${trend.color}`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    <span className="text-xs">{metric.metricTrend}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Call-to-Action Section */}
      <div className="bg-gradient-to-r from-[#16808D] to-[#142C52] rounded-lg shadow-lg p-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Community?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of communities already experiencing the Society360 advantage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="flex items-center justify-center px-8 py-3 bg-white text-[#142C52] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started Now
            </Link>
            <Link
              to="/demo"
              className="flex items-center justify-center px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#142C52] transition-all"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Features Showcase */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#071426'}}>
          Powerful Features at Your Fingertips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              featureIcon: Users,
              featureTitle: "Smart Visitor Management",
              featureDescription: "Digital visitor registration with QR codes and real-time tracking for enhanced security",
              featureColor: "#0C4A50",
              featureLink: "/features/visitor-management"
            },
            {
              featureIcon: Building,
              featureTitle: "Automated Maintenance",
              featureDescription: "AI-powered maintenance scheduling and tracking system for efficient operations",
              featureColor: "#22C55E",
              featureLink: "/features/maintenance"
            },
            {
              featureIcon: DollarSign,
              featureTitle: "Financial Dashboard",
              featureDescription: "Comprehensive billing, payments, and expense management with real-time insights",
              featureColor: "#1B9AAA",
              featureLink: "/features/financial"
            },
            {
              featureIcon: MessageSquare,
              featureTitle: "Community Communication",
              featureDescription: "Built-in messaging, announcements, and discussion forums for better engagement",
              featureColor: "#142C52",
              featureLink: "/features/communication"
            },
            {
              featureIcon: Shield,
              featureTitle: "Advanced Security Systems",
              featureDescription: "24/7 monitoring with smart access control and surveillance capabilities",
              featureColor: "#02394A",
              featureLink: "/features/security"
            },
            {
              featureIcon: Calendar,
              featureTitle: "Amenity Booking Platform",
              featureDescription: "Online booking system for community facilities and resource management",
              featureColor: "#4C97A8",
              featureLink: "/features/amenities"
            },
            {
              featureIcon: Bell,
              featureTitle: "Smart Notifications",
              featureDescription: "Real-time alerts and notifications for important community updates and events",
              featureColor: "#16808D",
              featureLink: "/features/notifications"
            },
            {
              featureIcon: Wrench,
              featureTitle: "Service Request Portal",
              featureDescription: "Streamlined service request management with tracking and resolution monitoring",
              featureColor: "#178740",
              featureLink: "/features/service-requests"
            }
          ].map((featureDetail, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-4">
                  <div 
                    className="p-3 rounded-full shadow-sm"
                    style={{ backgroundColor: featureDetail.featureColor }}
                  >
                    <featureDetail.featureIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {featureDetail.featureTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {featureDetail.featureDescription}
                </p>
                <Link
                  to={featureDetail.featureLink}
                  className="inline-flex items-center text-sm font-medium text-[#1B9AAA] hover:text-[#16808D] transition-colors group-hover:translate-x-1 transform"
                >
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Subtle hover effect overlay */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                style={{ backgroundColor: featureDetail.featureColor }}
              />
            </div>
          ))}
        </div>
        
        {/* Additional Features CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Discover all 20+ features designed to transform your community management
          </p>
          <Link
            to="/features"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#142C52] to-[#16808D] text-white rounded-lg font-semibold hover:from-[#16808D] hover:to-[#142C52] transition-all transform hover:scale-105 shadow-lg"
          >
            <Zap className="mr-2 h-5 w-5" />
            Explore All Features
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* How Society360 Works Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#071426'}}>
          How Society360 Transforms Communities
        </h2>
        <div className="grid grid-cols-4 gap-2 max-w-9xl mx-auto">
          {[
            {
              stepNumber: 1,
              stepTitle: "Create Your Account",
              stepDescription: "Sign up and join your community in minutes",
              stepIcon: Users,
              stepColor: "#142C52"
            },
            {
              stepNumber: 2,
              stepTitle: "Complete Verification",
              stepDescription: "Secure verification and profile setup process",
              stepIcon: Shield,
              stepColor: "#178740"
            },
            {
              stepNumber: 3,
              stepTitle: "Access All Features",
              stepDescription: "Unlock comprehensive community management tools",
              stepIcon: Zap,
              stepColor: "#1B9AAA"
            },
            {
              stepNumber: 4,
              stepTitle: "Manage Efficiently",
              stepDescription: "Streamline your residential community operations",
              stepIcon: Building,
              stepColor: "#142C52"
            }
          ].map((processStep) => (
            <div key={processStep.stepNumber} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-3">
                  <div 
                    className="p-2 rounded-full shadow-sm"
                    style={{ backgroundColor: processStep.stepColor }}
                  >
                    <processStep.stepIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-xl font-bold mb-2" style={{color: processStep.stepColor}}>
                  {processStep.stepNumber}
                </div>
                <h3 className="text-sm font-semibold mb-2" style={{color: '#071426'}}>
                  {processStep.stepTitle}
                </h3>
                <p className="text-xs text-gray-600">{processStep.stepDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Pricing Plans */}
      <div className="bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#071426'}}>
          Choose Your Perfect Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              planName: "Starter",
              monthlyPrice: "$9",
              billingPeriod: "month",
              planFeatures: [
                "Up to 50 residential units",
                "Essential visitor management",
                "Basic maintenance tracking",
                "Email support assistance"
              ],
              primaryColor: "#142C52",
              isPopular: false
            },
            {
              planName: "Professional",
              monthlyPrice: "$29",
              billingPeriod: "month",
              planFeatures: [
                "Up to 200 residential units",
                "Advanced visitor management system",
                "Complete maintenance workflow",
                "Comprehensive financial dashboard",
                "Priority customer support"
              ],
              primaryColor: "#178740",
              isPopular: true
            },
            {
              planName: "Enterprise",
              monthlyPrice: "$79",
              billingPeriod: "month",
              planFeatures: [
                "Unlimited residential units",
                "All premium features included",
                "Custom integration options",
                "Dedicated account manager",
                "24/7 phone support availability"
              ],
              primaryColor: "#1B9AAA",
              isPopular: false
            }
          ].map((pricingPlan) => (
            <div 
              key={pricingPlan.planName}
              className={`bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                pricingPlan.isPopular ? 'ring-2' : ''
              }`}
              style={{ 
                borderColor: pricingPlan.isPopular ? pricingPlan.primaryColor : 'transparent',
                borderWidth: pricingPlan.isPopular ? '2px' : '0px'
              }}
            >
              {pricingPlan.isPopular && (
                <div 
                  className="text-center text-sm font-semibold mb-2 px-3 py-1 rounded-full"
                  style={{ backgroundColor: pricingPlan.primaryColor, color: 'white' }}
                >
                  MOST POPULAR CHOICE
                </div>
              )}
              <div className="text-center mb-4">
                <div className="text-4xl font-bold" style={{color: pricingPlan.primaryColor}}>
                  {pricingPlan.monthlyPrice}
                </div>
                <div className="text-gray-600">per {pricingPlan.billingPeriod}</div>
              </div>
              <ul className="space-y-3 mb-6">
                {pricingPlan.planFeatures.map((featureItem, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" style={{color: pricingPlan.primaryColor}} />
                    <span className="text-gray-700">{featureItem}</span>
                  </li>
                ))}
              </ul>
              <button 
                className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{ 
                  backgroundColor: pricingPlan.primaryColor,
                  color: 'white'
                }}
              >
                Get Started Today
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted Communities Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#071426'}}>
          Trusted by Leading Communities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {[
            { communityName: "Green Valley Estates", partnerLogo: "/partner1.png" },
            { communityName: "Sunset Apartments Complex", partnerLogo: "/partner2.png" },
            { communityName: "Riverside Community Living", partnerLogo: "/partner3.png" },
            { communityName: "Mountain View Residences", partnerLogo: "/partner4.png" },
            { communityName: "Lakeside Gardens Society", partnerLogo: "/partner5.png" },
            { communityName: "Urban Heights Community", partnerLogo: "/partner6.png" },
            { communityName: "Coastal Living Properties", partnerLogo: "/partner7.png" },
            { communityName: "Forest Park Homes Association", partnerLogo: "/partner8.png" }
          ].map((communityPartner, index) => (
            <div key={index} className="text-center">
              <img 
                src={communityPartner.partnerLogo} 
                alt={communityPartner.communityName}
                className="h-16 w-auto mx-auto mb-2 grayscale hover:grayscale-0 transition-all"
              />
              <p className="text-sm text-gray-600">{communityPartner.communityName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive FAQ Section */}
      <div className="bg-gradient-to-r from-[#D4DBE9] to-[#E0F7FA] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#071426'}}>
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              questionText: "How quickly can I set up Society360 for my community?",
              answerText: "Most communities are fully operational within 24-48 hours. Our dedicated onboarding team guides you through every step of the setup process."
            },
            {
              questionText: "Can I customize the platform for our specific community needs?",
              answerText: "Absolutely! Society360 is highly customizable with custom modules, integrations, and workflows tailored specifically to your community's unique requirements."
            },
            {
              questionText: "What kind of customer support do you provide?",
              answerText: "We offer 24/7 email support for all plans, with phone support available for Professional and Enterprise plans for immediate assistance."
            },
            {
              questionText: "How secure is our community data with Society360?",
              answerText: "Your data security is our top priority. We use bank-level encryption, conduct regular security audits, and comply with all data protection regulations."
            },
            {
              questionText: "Can we migrate from our current management system?",
              answerText: "Yes, we provide free migration services and comprehensive data import tools to ensure a seamless transition from your existing system."
            }
          ].map((faqItem, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-3 flex items-center" style={{color: '#071426'}}>
                <MessageSquare className="h-5 w-5 mr-2" style={{color: '#142C52'}} />
                {faqItem.questionText}
              </h3>
              <p className="text-gray-700 leading-relaxed">{faqItem.answerText}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8" style={{color: '#071426'}}>
          Get in Touch With Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{color: '#142C52'}}>
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" style={{color: '#142C52'}} />
                <span className="text-gray-700">support@society360.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3" style={{color: '#142C52'}} />
                <span className="text-gray-700">1-800-SOCIETY</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3" style={{color: '#142C52'}} />
                <span className="text-gray-700">24/7 Support Available</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{color: '#142C52'}}>
              Quick Access Links
            </h3>
            <div className="space-y-3">
              <Link to="/demo" className="block text-blue-600 hover:text-blue-800 transition-colors">
                Request a Live Demo →
              </Link>
              <Link to="/pricing" className="block text-blue-600 hover:text-blue-800 transition-colors">
                View Detailed Pricing Plans →
              </Link>
              <Link to="/documentation" className="block text-blue-600 hover:text-blue-800 transition-colors">
                Read Complete Documentation →
              </Link>
              <Link to="/support" className="block text-blue-600 hover:text-blue-800 transition-colors">
                Visit Support Center →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
