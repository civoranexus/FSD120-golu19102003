import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Clock, Map, Phone, Calendar, FileText, AlertCircle, CheckCircle, Search, Filter, Download, Upload, Camera, Mic, Settings, HelpCircle, Star, TrendingUp, Users, DollarSign, Shield, Zap, Home, Car, Package, MessageSquare, Activity, BarChart3, PieChart, FileCheck, CreditCard, Wrench, Hammer, PaintBucket, Wifi, Battery, Droplets, Thermometer, Wind, Sun, Cloud, Umbrella, Heart, Brain, Cpu, Database, Globe, Lock, Key, Eye, Bell, Volume2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, Minus, RefreshCw, Copy, Share2, Bookmark, Archive, Trash2, Edit3, MoreHorizontal, Grid, List, Filter as FilterIcon, Moon, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  const [chatExpanded, setChatExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 Welcome to **Society360**! I'm your advanced AI assistant. I can help with maintenance, visitor management, billing, amenities, security, and much more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      category: "greeting"
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([
    "🔧 Maintenance issue",
    "👥 Add visitor",
    "💳 Pay maintenance",
    "🏊 Book amenities",
    "🔐 Security help",
    "📊 View dashboard",
    "📋 Track complaint",
    "🆘 Emergency"
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [chatHistory, setChatHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [userPreferences, setUserPreferences] = useState({
    quickReplies: true,
    soundEnabled: true,
    autoScroll: true,
    compactMode: false
  });
  
  // Chatbot window size controls
  const [chatbotWidth, setChatbotWidth] = useState(400);
  const [chatbotHeight, setChatbotHeight] = useState(500);
  
  // Service menu state
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Navigation function
  const navigateToService = (serviceName, route) => {
    addMessage(`Navigating to ${serviceName}...`, "user");
    setShowServiceMenu(false);
    setTimeout(() => {
      navigate(route);
      setChatExpanded(false); // Auto-close chatbot
    }, 1000);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatbotElement = document.getElementById('chatbot-container');
      const externalMenuElement = document.getElementById('external-service-menu');
      const threeDotButton = event.target.closest('.fixed.top-\\[78\\%\\].right-6');
      
      // Close service menu if clicking outside and not on 3-dot button
      if (externalMenuElement && !externalMenuElement.contains(event.target) && !threeDotButton) {
        setShowServiceMenu(false);
      }
      
      // Close chatbot if clicking outside when chat is open
      if (chatExpanded && chatbotElement && !chatbotElement.contains(event.target) && !threeDotButton) {
        setChatExpanded(false);
        setShowServiceMenu(false);
      }
    };

    if (chatExpanded || showServiceMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [chatExpanded, showServiceMenu]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
      // Scroll to show both user message and bot response completely
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight - 150;
      }, 100);
    }
  }, [messages]);

  // 🔹 ALL RESPONSES
  const responses = {
    // 👋 Greetings & Salutations
    hi: "Hello 👋 Welcome to **Society360**! How can I assist you today?",
    hello: "Hello! 😊 I'm your **Society360 Assistant**. How may I help you?",
    hey: "Hey there! 👋 How can Society360 help you today?",
    morning: "Good Morning ☀️ Hope you're having a great day! How can I help?",
    evening: "Good Evening 🌆 How may I assist you with society services?",
    afternoon: "Good Afternoon 🙂 How can I help you today?",
    night: "Good Evening 🌙 How can Society360 assist you?",
    welcome: "Welcome to Society360! 🏘️ Your complete society management solution is here!",
    greetings: "Greetings! 👋 Society360 at your service. What can I do for you today?",

    thanks: "You're most welcome! 😊 If you need anything else, feel free to ask.",
    thank: "Happy to help! 🙌 Let me know if you need further assistance.",
    bye: "Goodbye 👋 Have a great day! Society360 is always here to help.",
    exit: "Thank you for using **Society360**. Stay safe and have a great day!",
    goodbye: "Farewell! 🌟 Remember, Society360 is just a click away whenever you need us!",
    see: "See you soon! 👋 Society360 wishes you a wonderful day ahead!",
    later: "Talk to you later! 😊 Society360 is always available for your society needs.",

    // 🏘️ About Society360 - Detailed Information
    what: "**Society360** is a comprehensive society management platform designed to streamline all aspects of residential community living. From maintenance requests to visitor management, we digitize and simplify your society operations.",
    about: "**About Society360** 🏘️\n\nWe are a cutting-edge society management solution that brings together:\n- Digital maintenance tracking\n- Smart visitor management\n- Automated billing systems\n- Real-time communication\n- Amenities booking\n- Security monitoring\n\nOur mission is to make society living seamless, transparent, and efficient for everyone.",
    features: "**Society360 Features** ✨\n\n🔧 **Maintenance Management**: Track, assign, and monitor all maintenance requests\n👥 **Visitor Management**: Digital entry passes and approval system\n💳 **Billing & Payments**: Automated maintenance bills and online payments\n🏊 **Amenities Booking**: Book gym, pool, clubhouse online\n🔐 **Security Integration**: 24/7 security monitoring and alerts\n📱 **Mobile App**: Access everything on your smartphone\n📊 **Analytics Dashboard**: Comprehensive society insights and reports",
    platform: "**Society360 Platform** 🌐\n\nOur platform integrates:\n- Web Dashboard for management committee\n- Mobile App for residents\n- Admin portal for society staff\n- API integrations for third-party services\n\nAll working together seamlessly to provide a complete society management ecosystem.",
    benefits: "**Benefits of Society360** 🎯\n\n✅ **For Residents**:\n- Easy maintenance requests\n- Quick visitor approvals\n- Online bill payments\n- Instant notifications\n\n✅ **For Management**:\n- Reduced paperwork\n- Better tracking\n- Improved efficiency\n- Data-driven decisions\n\n✅ **For Society**:\n- Enhanced security\n- Cost savings\n- Better resident satisfaction\n- Modern digital experience",

    // 🛠️ Maintenance - Enhanced
    maintenance: 
      "**Issue Type:** Maintenance Request\n**Status:** Registered\n\nThank you for informing us. Our maintenance team will inspect the issue within **24 hours**.\n\n**Reference ID:** SOCIETY-MNT-" + 
      Math.floor(10000 + Math.random() * 90000) + 
      "\n\n**Next Steps:**\n• You'll receive SMS updates on progress\n• Team will contact you before visiting\n• You can track status in your dashboard",
      
    repair: 
      "Sure! Please describe the repair issue (electrical, plumbing, lift, etc.) so I can assist you better. You can also upload photos through the Society360 app for faster resolution.",
      
    plumber: "**Plumbing Services** 🔧\n\nOur plumbing team handles:\n- Pipe leaks and repairs\n- Drain blockages\n- Fixture installations\n- Water pressure issues\n\nEmergency plumbing available 24/7 for major issues!",
    
    electrician: "**Electrical Services** ⚡\n\nOur electrical team covers:\n- Power outages\n- Wiring issues\n- Switch/fixture repairs\n- Circuit breaker problems\n\n⚠️ For electrical emergencies, contact security immediately!",
    
    lift: "**Lift/Elevator Services** 🛗\n\nLift maintenance includes:\n- Regular inspections\n- Emergency repairs\n- Annual safety certifications\n- 24/7 breakdown support\n\nReport lift issues immediately for safety!",
    
    carpenter: "**Carpentry Services** 🪑\n\nOur carpentry team provides:\n- Door and window repairs\n- Furniture fixes\n- Custom woodwork\n- Cabinet installations",

    // 🧹 Housekeeping - Enhanced
    garbage: 
      "**Issue Type:** Housekeeping\n**Status:** Assigned\n\nYour garbage collection complaint has been forwarded to the housekeeping team.\n\n**Reference ID:** SOCIETY-GAR-" + 
      Math.floor(10000 + Math.random() * 90000) + 
      "\n\n**Collection Schedule:**\n• Daily: 6:00 AM - 8:00 AM\n• Evening: 6:00 PM - 7:00 PM\n• Segregated waste collection available",
      
    cleaning: 
      "Housekeeping services are scheduled daily. If cleaning was missed, I can register a complaint for you. Our team covers common areas, corridors, and facility maintenance.",
      
    pest: "**Pest Control Services** 🐛\n\nRegular pest control schedule:\n- Monthly: General pest control\n- Quarterly: Termite treatment\n- On-demand: Specific pest issues\n\nAll treatments use eco-friendly, resident-safe products.",
      
    sanitation: "**Sanitation Services** 🧹\n\nOur sanitation team ensures:\n- Daily floor cleaning\n- Regular disinfection\n- Waste management\n- Hygiene monitoring\n\nSpecial COVID-19 protocols still in place for high-touch areas.",

    // 🔐 Security - Enhanced
    security: 
      "**Issue Type:** Security Concern\n**Status:** Alerted\n\nSecurity personnel have been notified immediately.\n\n**Reference ID:** SOCIETY-SEC-" + 
      Math.floor(10000 + Math.random() * 90000) + 
      "\n\n**Security Features:**\n• 24/7 CCTV monitoring\n• Trained security personnel\n• Emergency response team\n• Digital access control",
      
    guard: 
      "For security-related concerns, guards are available **24/7** at the society gate. Our security team includes:\n- Gate security\n- Patrol guards\n- Emergency response team\n- CCTV monitoring staff",
      
    cctv: "**CCTV Surveillance** 📹\n\nOur security system includes:\n- 200+ cameras covering all common areas\n- 24/7 recording and monitoring\n- 30-day footage retention\n- Mobile app access for authorized residents",
      
    emergency: "**Emergency Response** 🚨\n\nEmergency contacts:\n• Security Desk: Ext. 100\n• Society Manager: Ext. 101\n• Hospital: +91-98765-43210\n• Fire Department: 101\n• Police: 100\n\nAll emergency calls are prioritized and logged.",
      
    fire: "**Fire Safety** 🔥\n\nFire safety measures:\n- Fire extinguishers on every floor\n- Smoke detectors in all common areas\n- Regular fire drills\n- 24/7 fire monitoring system\n- Emergency evacuation plans",

    // 🚰 Utilities - Enhanced
    water: 
      "**Issue Type:** Water Supply\n**Status:** Under Review\n\nOur facility team is checking the issue. Updates will be shared soon.\n\n**Reference ID:** SOCIETY-WAT-" + 
      Math.floor(10000 + Math.random() * 90000) + 
      "\n\n**Water Supply Schedule:**\n• Morning: 6:00 AM - 9:00 AM\n• Evening: 5:00 PM - 8:00 PM\n• Backup water available for 48 hours",
      
    electricity: 
      "If there is a power issue in your block, the maintenance team has been notified. Please avoid using lifts until resolved. **Backup generators** activate within 30 seconds for common areas.",
      
    gas: "**Gas Supply** 🔥\n\nPNG gas services:\n- 24/7 gas supply available\n- Emergency gas leak response\n- Regular pipeline inspections\n- Safety compliance checks\n\nGas emergency: Contact security immediately!",
      
    internet: "**Internet Services** 🌐\n\nHigh-speed internet available:\n- Fiber optic connection\n- 100+ Mbps speed\n- 24/7 technical support\n- Multiple ISP options\n\nContact IT helpdesk for connectivity issues.",

    // 🚗 Parking - Enhanced
    parking: 
      "**Issue Type:** Parking Violation\n**Status:** Forwarded to Security\n\nThe security team will monitor and take action.\n\n**Reference ID:** SOCIETY-PARK-" + 
      Math.floor(10000 + Math.random() * 90000) + 
      "\n\n**Parking Rules:**\n• Assigned parking only for residents\n- Visitor parking: 2-hour limit\n- No parking in fire lanes\n- Violations: ₹500 fine",
      
    vehicle: "**Vehicle Management** 🚗\n\nVehicle registration includes:\n- Sticker issuance for residents\n- Digital passes for visitors\n- Parking slot allocation\n- Vehicle tracking system\n\nRegister your vehicle at the society office.",
      
    tow: "**Vehicle Towing** 🚛\n\nTowing policy:\n- Unauthorized vehicles will be towed\n- ₹1000 towing fee + daily storage\n- 24-hour notice before towing\n- Release requires ID proof and fee payment",

    // 🧍 Visitor Management - Enhanced
    visitor: 
      "**Issue Type:** Visitor Management\n**Status:** Logged\n\nYour visitor-related concern has been registered.\n\n**Reference ID:** SOCIETY-VIS-" + 
      Math.floor(10000 + Math.random() * 90000) + 
      "\n\n**Visitor Guidelines:**\n• Pre-register visitors via app\n- Gate pass required for all visitors\n- Visitors must carry ID proof\n- 11 PM entry restriction for non-residents",
      
    pass: 
      "You can approve or deny visitor entry directly from the **Society360 dashboard** or app. Digital passes include QR codes for quick verification.",
      
    delivery: "**Delivery Management** 📦\n\nDelivery services:\n- Amazon, Flipkart, etc. accepted at gate\n- Digital delivery notifications\n- Secure package room\n- Contactless delivery available\n\nRegister your preferred delivery time in the app.",
      
    domestic: "**Domestic Help** 👩‍🍳\n\nDomestic help management:\n- Biometric registration required\n- ID cards issued by society\n- Working hours: 8 AM - 8 PM\n- Background verification completed\n\nRegister your domestic help at the security office.",

    // 🏊 Amenities - Enhanced
    amenities: 
      "Amenities like gym, pool, and clubhouse can be booked via the **Society360 app**. Would you like booking help?",
      
    gym: 
      "The gym is open daily from **6:00 AM – 10:00 PM**. Please follow society guidelines. **Facilities include:**\n- Modern cardio equipment\n- Weight training area\n- Personal trainers available\n- Yoga classes on weekends\n\nBook your slot via the Society360 app!",
      
    pool: "**Swimming Pool** 🏊‍♀️\n\nPool facilities:\n- Olympic-size pool\n- Kids' pool area\n- Certified lifeguards on duty\n- Water quality tested daily\n\n**Timings:**\n• Adults: 6 AM - 10 PM\n• Kids: 10 AM - 6 PM (with supervision)\n• Ladies-only: 2 PM - 4 PM",
      
    clubhouse: "**Clubhouse** 🏢\n\nClubhouse amenities:\n- Party hall (capacity: 100)\n- Conference rooms\n- Indoor games area\n- Mini theater\n- Catering service available\n\nBookings open 30 days in advance. Resident discounts available!",
      
    garden: "**Garden & Parks** 🌳\n\nGreen spaces include:\n- Central garden with walking track\n- Children's play area\n- Senior citizen corner\n- Meditation zone\n- Organic garden patch\n\nOpen daily: 5 AM - 10 PM",
      
    sports: "**Sports Facilities** ⚽\n\nSports amenities:\n- Badminton courts (2)\n- Tennis court (1)\n- Basketball court (1)\n- Table tennis tables (4)\n- Chess room\n\nEquipment available on rent. Coaching available for kids.",

    // 💳 Billing & Charges - Enhanced
    bill: 
      "You can view and pay your maintenance bills from the **Society360 dashboard** under *Payments*. **Payment methods:**\n- UPI, Net Banking, Cards\n- Auto-debit facility available\n- EMI options for large amounts\n- Early payment discounts (5% before 5th)",
      
    charges: 
      "Monthly maintenance charges vary by flat size and services. Please check your billing section. **Current rates:**\n- 1BHK: ₹3,000/month\n- 2BHK: ₹4,500/month\n- 3BHK: ₹6,000/month\n- 4BHK+: ₹8,000/month",
      
    receipt: "**Payment Receipts** 🧾\n\nPayment receipts:\n- Auto-generated after payment\n- Sent via email and SMS\n- Available in app history\n- Tax invoices provided\n- Downloadable for tax purposes",
      
    late: "**Late Payment Charges** ⏰\n\nLate payment policy:\n- Due date: 10th of every month\n- Late fee: ₹500 after 15th\n- Interest: 18% per annum after 30 days\n- Service restrictions after 60 days\n\nSet up auto-pay to avoid late fees!",
      
    refund: "**Refund Policy** 💰\n\nRefund process:\n- Maintenance deposits: Refundable in 30 days\n- Amenities booking: 50% refund if cancelled 48h prior\n- Event cancellations: As per policy terms\n\nRefunds processed within 7 working days.",

    // 📋 Rules & Office - Enhanced
    rules: 
      "Society rules are available on the Society360 portal under *Documents*. **Key rules include:**\n- No loud music after 10 PM\n- Pets must be leashed in common areas\n- No commercial activities in residential flats\n- Proper waste segregation mandatory",
      
    office: 
      "**Society Office Hours:**\n- Mon–Fri: 9:00 AM – 6:00 PM\n- Sat: 9:00 AM – 1:00 PM\n- Security: 24/7\n\n**Office Services:**\n- Document verification\n- Complaint registration\n- Bill payments\n- Issuance of certificates",
      
    meeting: "**Society Meetings** 📅\n\nMeeting schedule:\n- AGM: Last Sunday of March\n- Committee meeting: First Saturday of every month\n- Emergency meetings: As required\n\nAll residents can attend AGM. Committee meetings open to committee members.",
      
    notice: "**Notice Board** 📋\n\nImportant notices posted at:\n- Society entrance\n- Each tower lobby\n- Society360 app notifications\n- Email announcements\n- WhatsApp group updates\n\nCheck regularly for important updates!",
      
    certificate: "**Certificates & Documents** 📄\n\nAvailable documents:\n- Residence certificate\n- NOC for loans/visas\n- Tax receipts\n- Society share certificates\n- Parking allotment letters\n\nApply via Society360 app, collect in 3 working days.",

    // 🔍 Tracking - Enhanced
    track: 
      "Please provide your **reference ID** to track the status of your complaint. **Tracking options:**\n- Society360 app (real-time updates)\n- SMS notifications\n- Email updates\n- Call society office\n\nExample: SOCIETY-MNT-12345",
      
    status: "**Complaint Status** 📊\n\nStatus meanings:\n- 🟡 **Pending**: Under review\n- 🟠 **Assigned**: Team assigned\n- 🔵 **In Progress**: Work in progress\n- 🟢 **Resolved**: Issue fixed\n- 🔴 **Escalated**: Senior management involved\n\nAverage resolution time: 48 hours",
      
    feedback: "**Feedback System** ⭐\n\nAfter resolution, please rate:\n⭐⭐⭐⭐⭐ Excellent service\n⭐⭐⭐⭐ Good service\n⭐⭐⭐ Satisfactory\n⭐⭐ Needs improvement\n⭐ Poor service\n\nYour feedback helps us improve!",

    // 🏥 Health & Wellness
    medical: "**Medical Facilities** 🏥\n\nHealth services:\n- First aid room at society office\n- Doctor on call (9 AM - 6 PM)\n- Ambulance on standby\n- Medical emergency contacts\n- Health check-up camps quarterly\n\nEmergency: Dial 108 for ambulance",
    
    pharmacy: "**Pharmacy Services** 💊\n\nNearby pharmacies:\n- Apollo Pharmacy (500m)\n- MedPlus (300m)\n- 24/7 pharmacy available\n- Home delivery available\n\nSociety has tie-up for emergency medicines.",
    
    doctor: "**Doctor Consultation** 👨‍⚕️\n\nMedical services:\n- Resident doctor: Tue/Thu/Sat (4 PM - 6 PM)\n- Online consultation available\n- Specialist appointments arranged\n- Medical reports collection service\n\nBook via Society360 app.",

    // 🎉 Events & Community
    events: "**Society Events** 🎉\n\nUpcoming events:\n- Diwali celebration: Oct 25\n- Annual day: Dec 15\n- Summer camp: April-May\n- Sports tournament: February\n\nRegister via Society360 app. Early bird discounts available!",
    
    festival: "**Festival Celebrations** 🎊\n\nSociety celebrates:\n- Diwali: Fireworks & community dinner\n- Holi: Colors & rain dance\n- Christmas: Tree decoration & carols\n- Eid: Special feast & cultural program\n- Ganesh Chaturthi: 10-day celebration\n\nAll residents welcome to participate!",
    
    community: "**Community Activities** 🤝\n\nCommunity initiatives:\n- Senior citizen club\n- Women's welfare group\n- Youth sports club\n- Environmental awareness group\n- Book reading club\n\nJoin via Society360 app. New members welcome!",

    // 🌿 Environment & Sustainability
    environment: "**Green Initiatives** 🌿\n\nEco-friendly practices:\n- Solar panels for common areas\n- Rainwater harvesting system\n- Organic waste composting\n- LED lighting in all areas\n- Plastic-free society initiative\n\nJoin our green committee!",
    
    waste: "**Waste Management** ♻️\n\nWaste segregation:\n- Wet waste: Daily collection\n- Dry waste: Mon/Wed/Fri\n- E-waste: Monthly collection\n- Medical waste: Special collection\n\nSegregation bins available on each floor.",
    
    solar: "**Solar Energy** ☀️\n\nSolar installations:\n- Rooftop solar panels: 100 kW\n- Common area lighting: Solar powered\n- Water heating: Solar geysers\n- Battery backup: 4 hours\n\nSavings: ₹50,000/month on electricity bills!",

    // 📱 Technology & Innovation
    app: "**Society360 App** 📱\n\nApp features:\n- Maintenance requests\n- Visitor management\n- Bill payments\n- Amenities booking\n- Community notices\n- Emergency contacts\n\nDownload: Android | iOS | Web version available",
    
    smart: "**Smart Society Features** 🏠\n\nSmart technologies:\n- Automated lighting\n- Smart water meters\n- Digital access control\n- IoT sensors for maintenance\n- AI-powered security\n\nMaking your society future-ready!",
    
    digital: "**Digital Services** 💻\n\nOnline services:\n- Digital notice boards\n- Online complaint system\n- Virtual society meetings\n- E-document signing\n- Digital certificates\n\nPaperless society initiative in progress!",

    // 🎓 Education & Kids
    kids: "**Kids Facilities** 👶\n\nChild-friendly amenities:\n- Kids play area (age 2-12)\n- Indoor games room\n- Tuition center support\n- Summer camp programs\n- Safe zone monitoring\n\nKids safety is our priority!",
    
    tuition: "**Education Support** 📚\n\nEducational facilities:\n- Study room in clubhouse\n- WiFi in common areas\n- Printer/scanner service\n- Tutor directory available\n- Exam time special arrangements\n\nBook study slots via app!",
    
    play: "**Play Areas** 🎮\n\nRecreation zones:\n- Toddlers play zone (2-5 years)\n- Kids play area (6-12 years)\n- Teen gaming zone\n- Indoor sports area\n- Outdoor sports courts\n\nAll areas supervised during peak hours.",

    // 🛍️ Shopping & Services
    shopping: "**Shopping Services** 🛍️\n\nConvenience shopping:\n- Society convenience store\n- Milk & newspaper delivery\n- ATM on premises\n- Laundry pickup service\n- Car wash service\n\nDaily essentials available at your doorstep!",
    
    store: "**Convenience Store** 🏪\n\nStore offerings:\n- Groceries & essentials\n- Household items\n- Stationery supplies\n- Emergency medicines\n- Recharge services\n\nOpen: 7 AM - 10 PM daily",
    
    atm: "**Banking Services** 🏦\n\nFinancial facilities:\n- ATM machine (24/7)\n- Cash deposit machine\n- Bank representative (Tue/Thu)\n- Loan document assistance\n- Investment advisory\n\nAll major banks supported.",

    // 🚗 Transportation
    transport: "**Transportation** 🚗\n\nTravel facilities:\n- Society bus service\n- Auto-rickshaw stand\n- Taxi booking service\n- Car rental service\n- Bicycle parking area\n\nEasy commute options available!",
    
    metro: "**Public Transport** 🚇\n\nConnectivity:\n- Metro station: 500m walk\n- Bus stop: 200m\n- Auto stand: Society gate\n- Railway station: 3km\n\nSociety shuttle to metro available (6 AM - 10 PM).",

    // 🏢 Property & Real Estate
    property: "**Property Services** 🏢\n\nProperty assistance:\n- Sale/purchase documentation\n- NOC for property transactions\n- Rental agreement assistance\n- Property valuation service\n- Legal documentation help\n\nAll property services at reasonable rates!",
    
    rent: "**Rental Services** 🏠\n\nRental facilities:\n- Tenant verification service\n- Rental agreement drafting\n- Police verification assistance\n- Move-in/move-out support\n- Security deposit management\n\nProtect your property with our rental services!",
    
    noc: "**NOC Services** 📋\n\nNOC available for:\n- Bank loans\n- Property registration\n- Visa applications\n- Gas connections\n- Business registrations\n\nApply via app, collect in 5 working days.",

    // 🎯 General Help & Support
    help: "**How can I help you?** 🤝\n\nI can assist with:\n- Maintenance issues\n- Visitor management\n- Bill payments\n- Amenities booking\n- Security concerns\n- Society rules\n- Emergency contacts\n- And much more!\n\nWhat specific help do you need?",
    
    contact: "**Contact Information** 📞\n\nSociety contacts:\n- Office: +91-12345-67890\n- Security: +91-98765-43210\n- Emergency: +91-99999-88888\n- Email: info@society360.com\n- Website: www.society360.com\n\nWe're here to help 24/7!",
    
    feedback: "**Feedback & Suggestions** 💡\n\nWe value your feedback!\n- Rate our services in the app\n- Send suggestions to feedback@society360.com\n- Attend monthly meetings\n- Join improvement committees\n\nYour input helps us serve you better!",
    
    complaint: "**Complaint Resolution** 📝\n\nComplaint process:\n1. Register via app or call office\n2. Get reference number\n3. Track status online\n4. Receive updates via SMS\n5. Rate service after resolution\n\nAverage resolution time: 48 hours",
    
    suggestion: "**Suggestions Welcome** 💭\n\nShare your ideas for:\n- New amenities\n- Process improvements\n- Event suggestions\n- Green initiatives\n- Community programs\n\nSubmit suggestions via Society360 app or email suggestions@society360.com",

    // 🎊 Fun & Relaxed Conversations
    joke: "**Society Joke** 😄\n\nWhy did the resident bring a ladder to the society meeting?\n\nBecause they wanted to reach new heights in community living! 🏠✨\n\nWant to hear another one?",
    
    weather: "**Weather Update** 🌤️\n\nToday's weather in your area:\n- Temperature: 28°C\n- Humidity: 65%\n- Forecast: Partly cloudy\n\nPerfect weather for a walk in the society garden! 🌳",
    
    quote: "**Daily Quote** 💭\n\n\"Good communities are built when neighbors help neighbors.\"\n\n- Anonymous\n\nLet's build a better society together! 🏘️",
    
    fun: "**Fun Fact** 🎯\n\nDid you know? Our society has over 200 families from 15 different states, speaking 12 languages! We're truly a mini-India! 🇮🇳",
    
    relax: "**Take a Break** ☕\n\nFeeling stressed? Try our:\n- Garden meditation corner\n- Rooftop sunset view\n- Library reading nook\n- Indoor games room\n\nTake some time for yourself! You deserve it! 🌸",
    
    mood: "**Mood Booster** 🌈\n\nHaving a tough day? Remember:\n- Your neighbors care about you\n- Society staff is here to help\n- Every problem has a solution\n- Tomorrow is a new day\n\nWe're all in this together! 💪",

    // ❓ Default - Enhanced
    default: 
      "Hello! 😊 I'm your **Society360 Assistant** and I can help you with:\n\n🏘️ **About Society360**: Features, benefits, platform details\n🔧 **Maintenance**: Repairs, plumbing, electrical, carpentry\n🧹 **Housekeeping**: Cleaning, garbage, pest control, sanitation\n🔐 **Security**: Guards, CCTV, emergencies, fire safety\n🚰 **Utilities**: Water, electricity, gas, internet\n🚗 **Parking**: Rules, vehicle management, towing\n👥 **Visitors**: Passes, delivery, domestic help\n🏊 **Amenities**: Gym, pool, clubhouse, garden, sports\n💳 **Billing**: Payments, charges, receipts, refunds\n📋 **Rules**: Society regulations, office, meetings, certificates\n🔍 **Tracking**: Complaint status, feedback\n🏥 **Health**: Medical facilities, pharmacy, doctors\n🎉 **Events**: Festivals, community activities\n🌿 **Environment**: Green initiatives, waste management, solar\n📱 **Technology**: App features, smart society, digital services\n👶 **Kids**: Play areas, education, tuition\n🛍️ **Shopping**: Store, ATM, services\n🚗 **Transport**: Metro, bus, society shuttle\n🏢 **Property**: Rental, NOC, property services\n🎯 **Support**: Help, contact, feedback, complaints\n🎊 **Fun**: Jokes, weather, quotes, relaxation\n\n**How may I assist you today?** Just ask me anything!",
  };

  // 🎨 Enhanced UI Functions
  const toggleChat = () => {
    setChatExpanded((prev) => !prev);
    if (!chatExpanded && userPreferences.soundEnabled) {
      playNotificationSound();
    }
  };
  
  const closeChat = () => setChatExpanded(false);
  const minimizeChat = () => setIsMinimized(!isMinimized);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const clearChat = () => {
    setMessages([{
      text: "Chat cleared! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      category: "system"
    }]);
  };
  
  const playNotificationSound = () => {
    if (userPreferences.soundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(() => {});
    }
  };

  // 🎤 Voice Recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) return value;
    }
    return responses.default;
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const sendMessage = (message) => {
    const userMessage = message || userInput.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addMessage(getBotResponse(userMessage), "bot");
      // Automatically show a random question after user sends a message
      const questions = [
        "How can I help you with maintenance today?",
        "Do you need assistance with visitor management?",
        "Would you like to check your maintenance dues?",
        "Is there any security concern I can help with?",
        "Need help booking society amenities?",
        "How can I assist you with billing inquiries?",
        "Do you have any complaints to track?",
        "Would you like information about society events?"
      ];
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      setSuggestions([randomQuestion]);
    }, 1000);
  };

  const formatMessage = (text) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return (
    <div className="z-50" onClick={() => {
      // Close chatbot when clicking outside
      if (chatExpanded) {
        setChatExpanded(false);
        setShowServiceMenu(false);
      }
    }}>
      {/* External 3-Dot Service Button */}
      <motion.div
        className="fixed top-[78%] right-6 cursor-pointer z-[999]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowServiceMenu(!showServiceMenu);
        }}
      >
        <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} text-[#147783] hover:bg-[#1B9AAA] hover:text-white p-3 rounded-full shadow-2xl transition-all duration-300 font-semibold border-2 border-[#1B9AAA]`}>
          <MoreHorizontal className="h-5 w-5" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white animate-pulse" style={{backgroundColor: '#147783'}}></div>
        </div>
      </motion.div>

      {/* External Service Menu */}
      <AnimatePresence>
        {showServiceMenu && !chatExpanded && (
          <motion.div
            id="external-service-menu"
            className={`fixed top-[56%] right-20 w-[200px] ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl border border-gray-200 z-[999] p-3`}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <button
                onClick={() => navigateToService("Dashboard", "/dashboard")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>📊</span>
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => navigateToService("Maintenance", "/maintenance")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>🔧</span>
                <span>Maintenance</span>
              </button>
              <button
                onClick={() => navigateToService("Visitors", "/visitor-management")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>👥</span>
                <span>Visitors</span>
              </button>
              <button
                onClick={() => navigateToService("Finance", "/finance")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>💳</span>
                <span>Finance</span>
              </button>
              <button
                onClick={() => navigateToService("Amenities", "/amenities")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>🏊</span>
                <span>Amenities</span>
              </button>
              <button
                onClick={() => navigateToService("Security", "/security")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>🔐</span>
                <span>Security</span>
              </button>
              <button
                onClick={() => navigateToService("Complaints", "/complaints")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>📋</span>
                <span>Complaints</span>
              </button>
              <button
                onClick={() => navigateToService("Emergency", "/emergency")}
                className={`w-full text-left text-xs p-2 rounded transition-all flex items-center space-x-2 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>🆘</span>
                <span>Emergency</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Advanced Features */}
      {!chatExpanded && (
        <motion.div
          className="fixed top-[68%] right-[14px] cursor-pointer z-[998]"
          onClick={toggleChat}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} text-[#147783] hover:bg-[#1B9AAA] hover:text-white p-4 rounded-full shadow-2xl transition-all duration-300 font-semibold border-2 border-[#1B9AAA]`}>
            <img src="/logo.svg" alt="Society360" className="h-8 w-8" />
            {/* Notification Badge */}
            {messages.length > 1 && (
              <motion.div
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {messages.length - 1}
              </motion.div>
            )}
            {/* Online Indicator */}
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white animate-pulse" style={{backgroundColor: '#147783'}}></div>
          </div>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {chatExpanded && (
          <motion.div
            id="chatbot-container"
            className={`fixed top-16 right-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl flex flex-col border border-gray-200 z-10`}
            style={{width: `${chatbotWidth}px`, height: `${chatbotHeight}px`}}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className={`${darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-[#16808D] to-[#1B9AAA]'} text-white p-4 flex justify-between items-center transition-all`}>
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Bot className="h-6 w-6" />
                </motion.div>
                <div>
                  <h2 className="font-bold text-lg">Society360 AI</h2>
                  <div className="flex items-center space-x-2 text-xs opacity-90">
                    <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online • Advanced AI</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={minimizeChat}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                  title="Minimize"
                >
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                  title="Toggle Dark Mode"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                  title="More Options"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowServiceMenu(!showServiceMenu)}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                  title="Services"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                <button 
                  onClick={closeChat}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Advanced Options Panel */}
            <AnimatePresence>
              {showAdvancedOptions && (
                <motion.div
                  className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-3`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`text-sm rounded px-2 py-1 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}
                      >
                        <option value="all">All Categories</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="security">Security</option>
                        <option value="billing">Billing</option>
                        <option value="amenities">Amenities</option>
                      </select>
                      <button
                        onClick={clearChat}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-colors"
                      >
                        Clear Chat
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors"
                      >
                        {language === 'en' ? 'हिंदी' : 'English'}
                      </button>
                    </div>
                  </div>
                  {/* Size Controls */}
                  <div className="flex items-center justify-between mt-3 space-x-3">
                    <div className="flex items-center space-x-2">
                      <label className="text-xs font-medium">Width:</label>
                      <input
                        type="range"
                        min="300"
                        max="600"
                        value={chatbotWidth}
                        onChange={(e) => setChatbotWidth(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-xs w-8">{chatbotWidth}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-xs font-medium">Height:</label>
                      <input
                        type="range"
                        min="300"
                        max="600"
                        value={chatbotHeight}
                        onChange={(e) => setChatbotHeight(Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-xs w-8">{chatbotHeight}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Service Menu */}
            <AnimatePresence>
              {showServiceMenu && (
                <motion.div
                  className={`border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-3`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateToService("Dashboard", "/dashboard")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      📊 Dashboard
                    </button>
                    <button
                      onClick={() => navigateToService("Maintenance", "/maintenance")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      🔧 Maintenance
                    </button>
                    <button
                      onClick={() => navigateToService("Visitors", "/visitor-management")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      👥 Visitors
                    </button>
                    <button
                      onClick={() => navigateToService("Finance", "/finance")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      💳 Finance
                    </button>
                    <button
                      onClick={() => navigateToService("Amenities", "/amenities")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      🏊 Amenities
                    </button>
                    <button
                      onClick={() => navigateToService("Security", "/security")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      🔐 Security
                    </button>
                    <button
                      onClick={() => navigateToService("Complaints", "/complaints")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      📋 Complaints
                    </button>
                    <button
                      onClick={() => navigateToService("Emergency", "/emergency")}
                      className={`text-xs p-2 rounded transition-all ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      🆘 Emergency
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            {!isMinimized && (
              <div id="chatbot-messages" className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} space-y-3 max-h-[400px]`}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start space-x-2 ${
                      msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.sender === "user" 
                        ? darkMode 
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-gradient-to-r from-[#16808D] to-[#1B9AAA] text-white"
                        : darkMode 
                          ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                          : "bg-gradient-to-r from-[#16808D] to-[#1B9AAA] text-white"
                    }`}>
                      {msg.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex flex-col max-w-[75%]">
                      <div
                        className={`p-3 rounded-2xl ${
                          msg.sender === "user"
                            ? darkMode
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                              : "bg-gradient-to-r from-[#16808D] to-[#1B9AAA] text-white"
                            : darkMode
                              ? "bg-gray-700 text-white border border-gray-600"
                              : "bg-white border border-gray-200 shadow-sm"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(msg.text),
                        }}
                      />
                      {msg.timestamp && (
                        <span className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className={`p-3 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Enhanced Suggestions */}
            {!isMinimized && (
              <div className={`p-3 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(s)}
                      className={`text-sm px-3 py-2 rounded-full transition-all font-medium ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gradient-to-r from-[#16808D] to-[#1B9AAA] hover:from-[#1B9AAA] hover:to-[#16808D] text-white'
                      } shadow-sm`}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            {!isMinimized && (
              <div className={`p-3 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t flex items-center space-x-2`}>
                <button
                  onClick={startListening}
                  className={`p-2 rounded-full transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Voice Input"
                >
                  {isListening ? <Mic className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={isListening ? "Listening..." : "Type or speak your message..."}
                  className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none transition-all ${
                    darkMode 
                      ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                      : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-300'
                  } border focus:border-[#16808D]`}
                />
                
                <button
                  onClick={() => sendMessage()}
                  className="bg-gradient-to-r from-[#16808D] to-[#1B9AAA] hover:from-[#1B9AAA] hover:to-[#16808D] text-white p-2 rounded-full transition-all shadow-sm"
                  title="Send Message"
                >
                  <Send className="h-4 w-4" />
                </button>
                
                <button
                  className={`p-2 rounded-full transition-all ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Attach File"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
