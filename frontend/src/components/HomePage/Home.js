import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Target, 
  Award, 
  Building, 
  Shield, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  Activity, 
  DollarSign, 
  MessageSquare, 
  Calendar, 
  Bell, 
  Mail, 
  Phone, 
  Wrench, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Send, 
  Headphones, 
  Video, 
  MessageCircle, 
  Globe, 
  Settings, 
  RefreshCw, 
  CreditCard, 
  Smartphone, 
  XCircle, 
  GraduationCap
} from 'lucide-react';

const Home = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentCommunityIndex, setCurrentCommunityIndex] = useState(0);
  const [isCommunityAutoPlaying, setIsCommunityAutoPlaying] = useState(true);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);
  const [isFAQAutoPlaying, setIsFAQAutoPlaying] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [plansData, setPlansData] = useState([]);

  const allFeatures = [
    {
      featureIcon: Users,
      featureTitle: "Smart Visitor Management",
      featureDescription: "Digital visitor registration with QR codes and real-time tracking for enhanced security",
      featureColor: "#0C4A50",
      featureLink: "/guest-registration"
    },
    {
      featureIcon: Building,
      featureTitle: "Automated Maintenance",
      featureDescription: "AI-powered maintenance scheduling and tracking system for efficient operations",
      featureColor: "#22C55E",
      featureLink: "/repair-services"
    },
    {
      featureIcon: DollarSign,
      featureTitle: "Financial Dashboard",
      featureDescription: "Comprehensive billing, payments, and expense management with real-time insights",
      featureColor: "#1B9AAA",
      featureLink: "/accounting"
    },
    {
      featureIcon: MessageSquare,
      featureTitle: "Community Communication",
      featureDescription: "Built-in messaging, announcements, and discussion forums for better engagement",
      featureColor: "#142C52",
      featureLink: "/messaging"
    },
    {
      featureIcon: Shield,
      featureTitle: "Advanced Security Systems",
      featureDescription: "24/7 monitoring with smart access control and surveillance capabilities",
      featureColor: "#02394A",
      featureLink: "/safety"
    },
    {
      featureIcon: Calendar,
      featureTitle: "Amenity Booking Platform",
      featureDescription: "Online booking system for community facilities and resource management",
      featureColor: "#4C97A8",
      featureLink: "/facilities"
    },
    {
      featureIcon: Bell,
      featureTitle: "Smart Notifications",
      featureDescription: "Real-time alerts and notifications for important community updates and events",
      featureColor: "#16808D",
      featureLink: "/dashboard"
    },
    {
      featureIcon: Wrench,
      featureTitle: "Service Request Portal",
      featureDescription: "Streamlined service request management with tracking and resolution monitoring",
      featureColor: "#178740",
      featureLink: "/issues"
    }
  ];

  const communityPartners = [
    {
      communityName: "Green Valley Estates",
      partnerLogo: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      description: "Premium residential community with modern amenities and sustainable living",
      units: "250+ Units",
      residents: "800+ Residents"
    },
    {
      communityName: "Sunset Apartments Complex",
      partnerLogo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      description: "Luxury apartments with stunning city views and world-class facilities",
      units: "180+ Units", 
      residents: "600+ Residents"
    },
    {
      communityName: "Riverside Community Living",
      partnerLogo: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      description: "Waterfront living with exclusive access to private beaches and marina",
      units: "320+ Units",
      residents: "1,200+ Residents"
    },
    {
      communityName: "Mountain View Residences",
      partnerLogo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      description: "Scenic mountain retreat with luxury villas and premium facilities",
      units: "150+ Units",
      residents: "450+ Residents"
    },
    {
      communityName: "Lakeside Gardens Society",
      partnerLogo: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop",
      description: "Serene lakeside community with beautiful gardens and recreational spaces",
      units: "200+ Units",
      residents: "700+ Residents"
    },
    {
      communityName: "Urban Heights Community",
      partnerLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      description: "Modern urban living with smart home technology and sustainable design",
      units: "400+ Units",
      residents: "1,500+ Residents"
    },
    {
      communityName: "Coastal Living Properties",
      partnerLogo: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop",
      description: "Beachfront properties with exclusive access to pristine beaches and ocean views",
      units: "120+ Units",
      residents: "350+ Residents"
    },
    {
      communityName: "Forest Park Homes Association",
      partnerLogo: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop",
      description: "Eco-friendly community surrounded by lush forests and nature trails",
      units: "280+ Units",
      residents: "900+ Residents"
    }
  ];

  // Auto-play functionality for Features
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => {
        const maxIndex = Math.max(0, allFeatures.length - 3);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, allFeatures.length]);

  // Auto-play functionality for Communities
  useEffect(() => {
    if (!isCommunityAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentCommunityIndex((prevIndex) => {
        return prevIndex >= communityPartners.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isCommunityAutoPlaying, communityPartners.length]);

  // Auto-play functionality for FAQ
  useEffect(() => {
    if (!isFAQAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentFAQIndex((prevIndex) => {
        return prevIndex >= faqData.length - 1 ? 0 : prevIndex + 1;
      });
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [isFAQAutoPlaying]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentFeatureIndex((prevIndex) => {
      const maxIndex = Math.max(0, allFeatures.length - 3);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, allFeatures.length - 3);
    setCurrentFeatureIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentFeatureIndex(index);
  };

  const handlePrevCommunity = () => {
    setIsCommunityAutoPlaying(false);
    setCurrentCommunityIndex((prevIndex) => 
      prevIndex <= 0 ? communityPartners.length - 1 : prevIndex - 1
    );
  };

  const handleNextCommunity = () => {
    setIsCommunityAutoPlaying(false);
    setCurrentCommunityIndex((prevIndex) => 
      prevIndex >= communityPartners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevFAQ = () => {
    setIsFAQAutoPlaying(false);
    setCurrentFAQIndex((prevIndex) => 
      prevIndex <= 0 ? faqData.length - 1 : prevIndex - 1
    );
  };

  const handleNextFAQ = () => {
    setIsFAQAutoPlaying(false);
    setCurrentFAQIndex((prevIndex) => 
      prevIndex >= faqData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFAQDotClick = (index) => {
    setIsFAQAutoPlaying(false);
    setCurrentFAQIndex(index);
  };

  // API Integration Functions for Pricing Plans
  const fetchPricingPlans = async () => {
    setIsLoadingPlans(true);
    try {
      const response = await fetch('/api/pricing/plans');
      const data = await response.json();
      setPlansData(data.plans || []);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
      // Fallback to default plans
      setPlansData(getDefaultPlans());
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const getDefaultPlans = () => {
    return [
      {
        id: 'starter',
        name: "Starter",
        freePrice: 0,
        weeklyPrice: 3,
        monthlyPrice: 9,
        yearlyPrice: 90,
        billingPeriod: "month",
        features: [
          "Up to 50 residential units",
          "Essential visitor management",
          "Basic maintenance tracking",
          "Email support assistance"
        ],
        primaryColor: "#142C52",
        isPopular: false,
        maxUnits: 50,
        supportLevel: "email"
      },
      {
        id: 'professional',
        name: "Professional",
        freePrice: 0,
        weeklyPrice: 8,
        monthlyPrice: 29,
        yearlyPrice: 290,
        billingPeriod: "month",
        features: [
          "Up to 200 residential units",
          "Advanced visitor management system",
          "Complete maintenance workflow",
          "Comprehensive financial dashboard",
          "Priority customer support"
        ],
        primaryColor: "#178740",
        isPopular: true,
        maxUnits: 200,
        supportLevel: "priority"
      },
      {
        id: 'enterprise',
        name: "Enterprise",
        freePrice: 0,
        weeklyPrice: 20,
        monthlyPrice: 79,
        yearlyPrice: 790,
        billingPeriod: "month",
        features: [
          "Unlimited residential units",
          "All premium features included",
          "Custom integration options",
          "Dedicated account manager",
          "24/7 phone support availability"
        ],
        primaryColor: "#1B9AAA",
        isPopular: false,
        maxUnits: -1,
        supportLevel: "24/7"
      }
    ];
  };

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    // Navigate to checkout or registration page
    window.location.href = `/get-started?plan=${plan.id}&billing=${billingCycle}`;
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  // Initialize plans data on component mount
  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const maxIndex = Math.max(0, allFeatures.length - 3);
  const visibleFeatures = allFeatures.slice(currentFeatureIndex, currentFeatureIndex + 3);
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
      up: { icon: TrendingUp, color: "text-[#22C55E]", label: "Growing" },
      stable: { icon: Clock, color: "text-[#16808D]", label: "Stable" },
      safe: { icon: CheckCircle, color: "text-[#1B9AAA]", label: "Secure" },
      excellent: { icon: Star, color: "text-[#178740]", label: "Excellent" },
      properties: { icon: Building, color: "text-[#142C52]", label: "Properties" },
      revenue: { icon: DollarSign, color: "text-[#178740]", label: "Revenue" },
      satisfaction: { icon: Star, color: "text-[#1B9AAA]", label: "Satisfaction" }
    };
    return trendConfig[direction] || trendConfig.stable;
  };

  const faqData = [
    {
      questionText: "How quickly can I set up Society360 for my community?",
      answerText: "Most communities are fully operational within 24-48 hours. Our dedicated onboarding team guides you through every step of the setup process.",
      icon: Clock,
      color: "#16808D"
    },
    {
      questionText: "Can I customize the platform for our specific community needs?",
      answerText: "Absolutely! Society360 is highly customizable with custom modules, integrations, and workflows tailored specifically to your community's unique requirements.",
      icon: Settings,
      color: "#1B9AAA"
    },
    {
      questionText: "What kind of customer support do you provide?",
      answerText: "We offer 24/7 email support for all plans, with phone support available for Professional and Enterprise plans for immediate assistance.",
      icon: Headphones,
      color: "#142C52"
    },
    {
      questionText: "How secure is our community data with Society360?",
      answerText: "Your data security is our top priority. We use bank-level encryption, conduct regular security audits, and comply with all data protection regulations.",
      icon: Shield,
      color: "#178740"
    },
    {
      questionText: "Can we migrate from our current management system?",
      answerText: "Yes, we provide free migration services and comprehensive data import tools to ensure a seamless transition from your existing system.",
      icon: RefreshCw,
      color: "#1B9AAA"
    },
    {
      questionText: "What payment methods do you accept?",
      answerText: "We accept all major credit cards, debit cards, bank transfers, and UPI payments. Annual plans also offer additional payment flexibility.",
      icon: CreditCard,
      color: "#16808D"
    },
    {
      questionText: "Is there a mobile app available?",
      answerText: "Yes! Society360 has native mobile apps for both iOS and Android, allowing you to manage your community on the go.",
      icon: Smartphone,
      color: "#142C52"
    },
    {
      questionText: "Can I integrate Society360 with other tools we use?",
      answerText: "Society360 offers extensive API integrations with popular accounting software, payment gateways, and communication tools.",
      icon: Link,
      color: "#1B9AAA"
    },
    {
      questionText: "What happens if I need to cancel my subscription?",
      answerText: "You can cancel anytime without penalties. We'll export your data and provide assistance with transitioning to another solution if needed.",
      icon: XCircle,
      color: "#178740"
    },
    {
      questionText: "Do you provide training for our staff?",
      answerText: "Yes, we offer comprehensive training programs including video tutorials, documentation, and live training sessions for your team.",
      icon: GraduationCap,
      color: "#16808D"
    }
  ];

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
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gray-50">
                <highlight.highlightIcon className="h-12 w-12" style={{ color: highlight.highlightColor }} />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{highlight.highlightTitle}</h3>
            
            <p className="text-gray-600 mb-4">{highlight.highlightDescription}</p>
            
            <div className="space-y-2">
              {highlight.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-500">
                  <CheckCircle className="h-3 w-3 mr-2" style={{ color: highlight.highlightColor }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Society360 at a Glance Section */}
      <div className="bg-gradient-to-r from-[#E0F7FA] to-[#D4DBE9] rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">
            <span style={{color: '#16808D'}}>Society360</span>{' '}
            <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px'}}>at a glance</span>
          </h2>
          <p className="text-gray-600 text-lg">Real-time insights into your community's performance and engagement</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto">
          {communityOverviewData.map((metric, index) => {
            const trend = getTrendIndicator(metric.trendDirection);
            const TrendIcon = trend.icon;
            
            return (
              <div key={index} className={`bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 flex-1 min-w-[150px] max-w-[200px] ${index >= 3 && index <= 4 ? 'mx-auto' : ''}`}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gray-50">
                    <metric.metricIcon className="h-10 w-10" style={{ color: metric.metricColor }} />
                  </div>
                </div>
                
                <div className="text-3xl font-bold mb-3 text-center" style={{color: metric.metricColor}}>
                  {metric.metricValue}
                </div>
                
                <div className="text-gray-700 font-medium mb-3 text-sm text-center">{metric.metricLabel}</div>
                
                <div className={`flex items-center justify-center ${trend.color} text-center ${index >= 3 && index <= 4 ? 'flex-col' : ''} ${index === 5 ? 'gap-1' : ''}`}>
                  <TrendIcon className={`h-4 w-4 ${index >= 3 && index <= 4 ? 'mr-0 mb-1' : index === 5 ? 'mr-1' : 'mr-1'} ${index === 5 ? 'align-baseline' : ''}`} />
                  <span className="text-xs font-medium">{metric.metricTrend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-[#16808D] to-[#142C52] rounded-lg shadow-lg p-8 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-yellow-300">Ready to Transform</span>{' '}
            <span>Your Community?</span>
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of communities already experiencing the Society360 advantage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#142C52] rounded-lg font-semibold hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#142C52] transition-all transform hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center space-x-8">
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 mr-1 text-yellow-300" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="h-4 w-4 mr-1 text-yellow-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1 text-yellow-300" />
              <span>Setup in minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Features Showcase with Carousel */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span style={{color: '#16808D'}}>Powerful Features</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px'}}>at Your Fingertips</span>
        </h2>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:bg-[#16808D] hover:border-[#16808D] group"
            aria-label="Previous features"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:bg-[#16808D] hover:border-[#16808D] group"
            aria-label="Next features"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
          </button>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-12">
            {visibleFeatures.map((featureDetail, index) => (
              <Link
                key={`${currentFeatureIndex}-${index}`}
                to={featureDetail.featureLink}
                className="group relative bg-gradient-to-br from-gray-50 to-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 block"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center mb-6">
                    <div 
                      className="p-4 rounded-full shadow-sm"
                      style={{ backgroundColor: featureDetail.featureColor }}
                    >
                      <featureDetail.featureIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {featureDetail.featureTitle}
                  </h3>
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {featureDetail.featureDescription}
                  </p>
                  <div className="inline-flex items-center text-base font-medium text-[#1B9AAA] hover:text-[#16808D] transition-colors group-hover:translate-x-1 transform">
                    <span>Learn more</span>
                    <ChevronRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Subtle hover effect overlay */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                  style={{ backgroundColor: featureDetail.featureColor }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentFeatureIndex === index
                  ? 'bg-[#142C52] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Explore All Features Button */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Discover all {allFeatures.length} features designed to transform your community management
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
        <h2 className="text-4xl font-bold text-center mb-8">
          <span style={{color: '#16808D'}}>How Society360</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px'}}>Transforms Communities</span>
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
            <div key={processStep.stepNumber} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-4">
                  <div 
                    className="p-3 rounded-full shadow-sm"
                    style={{ backgroundColor: processStep.stepColor }}
                  >
                    <processStep.stepIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-3" style={{color: processStep.stepColor}}>
                  {processStep.stepNumber}
                </div>
                <h3 className="text-base font-bold mb-3" style={{color: '#071426'}}>
                  {processStep.stepTitle}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{processStep.stepDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Pricing Plans */}
      <div className="bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9] rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          <span style={{color: '#16808D'}}>Choose Your</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px'}}>Perfect Plan</span>
        </h2>
        
        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => handleBillingCycleChange('free')}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'free' 
                  ? 'bg-[#16808D] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Free
            </button>
            <button
              onClick={() => handleBillingCycleChange('weekly')}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'weekly' 
                  ? 'bg-[#16808D] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => handleBillingCycleChange('monthly')}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-[#16808D] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleBillingCycleChange('yearly')}
              className={`px-4 py-2 rounded-md font-semibold transition-all ${
                billingCycle === 'yearly' 
                  ? 'bg-[#16808D] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingPlans ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16808D]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plansData.map((pricingPlan) => (
              <div 
                key={pricingPlan.id}
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
                    {billingCycle === 'free' ? (
                      'FREE'
                    ) : billingCycle === 'weekly' ? (
                      `$${pricingPlan.weeklyPrice}`
                    ) : billingCycle === 'monthly' ? (
                      `$${pricingPlan.monthlyPrice}`
                    ) : (
                      `$${pricingPlan.yearlyPrice}`
                    )}
                  </div>
                  <div className="text-gray-600">
                    {billingCycle === 'free' ? (
                      <span className="text-green-600 font-semibold">Forever free</span>
                    ) : billingCycle === 'weekly' ? (
                      'per week'
                    ) : billingCycle === 'monthly' ? (
                      `per ${pricingPlan.billingPeriod}`
                    ) : (
                      <>
                        per year
                        <div className="text-sm text-green-600 font-semibold">
                          Save ${(pricingPlan.monthlyPrice * 12 - pricingPlan.yearlyPrice)} annually
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {pricingPlan.features.map((featureItem, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" style={{color: pricingPlan.primaryColor}} />
                      <span className="text-gray-700">{featureItem}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePlanSelection(pricingPlan)}
                  className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: pricingPlan.primaryColor,
                    color: 'white'
                  }}
                  disabled={isLoadingPlans}
                >
                  {isLoadingPlans && selectedPlan?.id === pricingPlan.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : billingCycle === 'free' ? (
                    'Start Free Trial'
                  ) : (
                    'Get Started Today'
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            {billingCycle === 'free' ? (
              'Free forever with basic features • No credit card required • Upgrade anytime'
            ) : (
              'All plans include 14-day free trial • No credit card required • Cancel anytime'
            )}
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/contact"
              className="text-[#16808D] hover:text-[#142C52] font-semibold transition-colors"
            >
              Need help choosing? Contact Sales
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/pricing"
              className="text-[#16808D] hover:text-[#142C52] font-semibold transition-colors"
            >
              View detailed comparison
            </Link>
          </div>
        </div>
      </div>

      {/* Trusted Communities Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span style={{color: '#16808D'}}>Trusted by</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px'}}>Leading Communities</span>
        </h2>
        
        {/* Community Carousel */}
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrevCommunity}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 lg:-translate-x-3 z-10 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 hover:bg-[#16808D] hover:border-[#16808D] group"
            aria-label="Previous community"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextCommunity}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 lg:translate-x-3 z-10 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gray-200 hover:bg-[#16808D] hover:border-[#16808D] group"
            aria-label="Next community"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-white transition-colors" />
          </button>

          {/* Community Display */}
          <div className="flex items-center justify-center p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              {/* Image Column */}
              <div className="order-2 lg:order-1">
                <img 
                  src={communityPartners[currentCommunityIndex].partnerLogo} 
                  alt={communityPartners[currentCommunityIndex].communityName}
                  className="w-full h-64 lg:h-80 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 object-cover"
                />
              </div>
              
              {/* Content Column */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {communityPartners[currentCommunityIndex].communityName}
                </h3>
                <p className="text-base lg:text-lg text-gray-600 mb-6 leading-relaxed">
                  {communityPartners[currentCommunityIndex].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                    <Building className="h-5 w-5 mr-2" style={{ color: '#16808D' }} />
                    <span className="font-medium">{communityPartners[currentCommunityIndex].units}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
                    <Users className="h-5 w-5 mr-2" style={{ color: '#1B9AAA' }} />
                    <span className="font-medium">{communityPartners[currentCommunityIndex].residents}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {communityPartners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsCommunityAutoPlaying(false);
                setCurrentCommunityIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentCommunityIndex === index
                  ? 'bg-[#142C52] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to community ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Middle Connecting Element */}
        <div className="flex items-center justify-center my-8">
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-transparent via-[#16808D] to-transparent w-64"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#16808D] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#1B9AAA] rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-[#142C52] rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Join {communityPartners.length}+ communities already experiencing the Society360 advantage
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#142C52] to-[#16808D] text-white rounded-lg font-semibold hover:from-[#16808D] hover:to-[#142C52] transition-all transform hover:scale-105 shadow-lg"
          >
            <Building className="mr-2 h-5 w-5" />
            Become a Partner Community
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Comprehensive FAQ Section */}
      <div className="bg-gradient-to-r from-[#D4DBE9] to-[#E0F7FA] rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span style={{color: '#16808D'}}>Frequently</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px'}}>Asked Questions</span>
        </h2>
        
        {/* FAQ Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={handlePrevFAQ}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:bg-[#16808D] hover:border-[#16808D] group"
            aria-label="Previous FAQ"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextFAQ}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:bg-[#16808D] hover:border-[#16808D] group"
            aria-label="Next FAQ"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors" />
          </button>

          {/* FAQ Display */}
          <div className="px-12">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-102">
              <div className="flex items-start mb-4">
                <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: faqData[currentFAQIndex].color }}>
                  {React.createElement(faqData[currentFAQIndex].icon, { className: "h-6 w-6 text-white" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {faqData[currentFAQIndex].questionText}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {faqData[currentFAQIndex].answerText}
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {faqData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleFAQDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentFAQIndex === index
                  ? 'bg-[#142C52] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to FAQ ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Have more questions? We're here to help!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#142C52] to-[#16808D] text-white rounded-lg font-semibold hover:from-[#16808D] hover:to-[#142C52] transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Contact Support
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      </div>
  );
};

export default Home;
