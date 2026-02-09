import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Award, 
  Building, 
  Shield, 
  Zap, 
  TrendingUp, 
  Globe, 
  Heart, 
  Lightbulb, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BarChart3,
  Cpu,
  Database,
  Lock,
  MessageSquare,
  FileText,
  Wrench,
  Camera,
  Bell,
  UserCheck,
  Building2,
  Rocket,
  HeartHandshake,
  Eye,
  Brain,
  Puzzle,
  Activity,
  TrendingDown,
  PieChart,
  LineChart,
  Code,
  Cloud,
  Server,
  Wifi,
  Smartphone,
  Monitor,
  Globe2,
  Map,
  Navigation,
  Filter,
  Search,
  Settings,
  Layers,
  Grid3X3,
  Boxes,
  Package,
  Truck,
  Headphones,
  MessageCircle,
  Video,
  FileCheck,
  Certificate,
  Medal,
  Trophy,
  Crown,
  Diamond,
  Sparkles,
  Infinity,
  Timer,
  Gauge,
  Targeted,
  Crosshair,
  Compass,
  Anchor,
  Flag,
  Bookmark,
  Share2,
  Download,
  Upload,
  RefreshCw,
  RotateCw,
  Sync,
  Link2,
  Unlink,
  Key,
  Fingerprint,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  UserPlus,
  UserMinus,
  UserX,
  Users2,
  UserCheck2,
  UserCog,
  UserSquare,
  IdCard,
  CreditCard,
  Banknote,
  Receipt,
  Calculator,
  Abacus,
  GraduationCap,
  BookOpen,
  Library,
  BookmarkCheck,
  PenTool,
  Eraser,
  Palette,
  Brush,
  Image,
  Film,
  CameraOff,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Speaker,
  Radio,
  Tv,
  Tv2,
  Gamepad2,
  Dumbbell,
  Bike,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Mountain,
  Trees,
  Flower,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Flame,
  ZapOff,
  Battery,
  BatteryCharging,
  Plug,
  Power,
  PowerOff,
  HardDrive,
  Disc,
  Usb,
  Bluetooth,
  WifiOff,
  Router,
  Server2,
  Database2,
  CloudDrizzle,
  CloudLightning,
  CloudMoon,
  CloudSun,
  Cloudy,
  SunMedium,
  SunDim,
  Sunrise,
  Sunset,
  Twilight,
  BedDouble,
  Bath,
  Sofa,
  Armchair,
  Table,
  Desk,
  Lamp,
  LightbulbOff,
  CandlestickChart,
  BarChartBig,
  BarChartHorizontal,
  BarChartVertical,
  PieChart as PieChartIcon,
  ScatterChart,
  AreaChart,
  RadarChart,
  Heatmap,
  Timeline,
  GitBranch,
  GitMerge,
  GitPullRequest,
  GitCommit,
  GitCompare,
  Terminal,
  TerminalSquare,
  Code2,
  Braces,
  Parentheses,
  Bracket,
  Percent,
  Hash,
  AtSign,
  Slash,
  Backslash,
  Minus,
  Plus,
  Equal,
  NotEqual,
  LessThan,
  GreaterThan,
  Divide,
  Multiply,
  Pi,
  Sigma,
  Omega,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Sigma2,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega2,
  DollarSign
} from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [scrollY, setScrollY] = useState(0);
  const [visibleSection, setVisibleSection] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const statsRef = useRef(null);
  const [animatedStats, setAnimatedStats] = useState({
    communities: 0,
    residents: 0,
    satisfaction: 0,
    uptime: 0,
    features: 0,
    integrations: 0,
    supportTickets: 0,
    responseTime: 0
  });

  // Advanced mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handling with performance optimization
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Advanced intersection observer with multiple thresholds
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
            if (entry.target.id === 'stats') {
              animateStats();
            }
            if (entry.target.id.startsWith('timeline-')) {
              const index = parseInt(entry.target.id.split('-')[1]);
              setActiveTimelineIndex(index);
            }
          }
        });
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9] }
    );

    const sections = document.querySelectorAll('.observe-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Enhanced statistics animation with staggered timing
  const animateStats = useCallback(() => {
    const duration = 2500;
    const steps = 80;
    const increment = duration / steps;

    const stats = {
      communities: { target: 750, current: 0, delay: 0 },
      residents: { target: 75000, current: 0, delay: 200 },
      satisfaction: { target: 99.2, current: 0, delay: 400 },
      uptime: { target: 99.97, current: 0, delay: 600 },
      features: { target: 150, current: 0, delay: 800 },
      integrations: { target: 50, current: 0, delay: 1000 },
      supportTickets: { target: 24, current: 0, delay: 1200 },
      responseTime: { target: 2.5, current: 0, delay: 1400 }
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      
      setAnimatedStats({
        communities: Math.floor(stats.communities.target * easeProgress),
        residents: Math.floor(stats.residents.target * easeProgress),
        satisfaction: (stats.satisfaction.target * easeProgress).toFixed(1),
        uptime: (stats.uptime.target * easeProgress).toFixed(2),
        features: Math.floor(stats.features.target * easeProgress),
        integrations: Math.floor(stats.integrations.target * easeProgress),
        supportTickets: Math.floor(stats.supportTickets.target * easeProgress),
        responseTime: (stats.responseTime.target * easeProgress).toFixed(1)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, increment);
  }, []);

  // Enhanced timeline data with advanced milestones up to 2026
  const timelineData = [
    {
      year: "2020",
      quarter: "Q2",
      title: "The Genesis",
      description: "Founded with a vision to transform residential community management",
      detailedDescription: "Started in a small co-working space with 3 founders and a revolutionary idea to digitize society management.",
      color: "#142C52",
      icon: Rocket,
      metrics: {
        team: "3",
        funding: "$50K",
        users: "0",
        features: "5"
      },
      achievements: [
        "Seed funding secured",
        "First prototype developed",
        "Initial market research completed",
        "Company registration completed"
      ]
    },
    {
      year: "2021",
      quarter: "Q1",
      title: "Product Launch",
      description: "Launched MVP with core society management features",
      detailedDescription: "Released the first version of Society360 with essential features for residential communities.",
      color: "#16808D",
      icon: Zap,
      metrics: {
        team: "12",
        funding: "$500K",
        users: "1K",
        features: "25"
      },
      achievements: [
        "MVP launched successfully",
        "First 10 communities onboarded",
        "Series A funding completed",
        "Mobile apps released"
      ]
    },
    {
      year: "2021",
      quarter: "Q3",
      title: "Market Expansion",
      description: "Expanded to 50+ communities across major cities",
      detailedDescription: "Rapid growth phase with adoption in tier-1 and tier-2 cities, establishing market presence.",
      color: "#1B9AAA",
      icon: TrendingUp,
      metrics: {
        team: "25",
        funding: "$1.5M",
        users: "10K",
        features: "45"
      },
      achievements: [
        "50+ communities served",
        "AI-powered features introduced",
        "Partnership with 5 property developers",
        "Customer satisfaction reached 95%"
      ]
    },
    {
      year: "2022",
      quarter: "Q2",
      title: "Technology Breakthrough",
      description: "Launched AI-powered predictive maintenance system",
      detailedDescription: "Revolutionary AI implementation that predicts maintenance needs before issues occur.",
      color: "#178740",
      icon: Brain,
      metrics: {
        team: "45",
        funding: "$3M",
        users: "25K",
        features: "80"
      },
      achievements: [
        "AI predictive maintenance launched",
        "100+ communities milestone",
        "International expansion started",
        "Patent filed for core technology"
      ]
    },
    {
      year: "2023",
      quarter: "Q1",
      title: "National Leadership",
      description: "Became the leading society management platform in India",
      detailedDescription: "Achieved market leadership position with the largest user base and comprehensive feature set.",
      color: "#8B5CF6",
      icon: Award,
      metrics: {
        team: "80",
        funding: "$5M",
        users: "50K",
        features: "120"
      },
      achievements: [
        "Market leadership achieved",
        "500+ communities served",
        "Enterprise-grade security implemented",
        "ISO 27001 certification obtained"
      ]
    },
    {
      year: "2024",
      quarter: "Q2",
      title: "Global Innovation Hub",
      description: "Established R&D center for next-generation community solutions",
      detailedDescription: "Advanced research facility focusing on IoT, blockchain, and AI for smart communities.",
      color: "#F59E0B",
      icon: Globe,
      metrics: {
        team: "120",
        funding: "$10M",
        users: "75K",
        features: "150"
      },
      achievements: [
        "R&D center established",
        "Blockchain security implemented",
        "IoT device integration launched",
        "Global partnerships formed"
      ]
    },
    {
      year: "2025",
      quarter: "Q1",
      title: "Smart City Integration",
      description: "Integrated with smart city initiatives across 5 countries",
      detailedDescription: "Strategic partnerships with governments for smart city implementations worldwide.",
      color: "#10B981",
      icon: Building2,
      metrics: {
        team: "200",
        funding: "$25M",
        users: "150K",
        features: "200"
      },
      achievements: [
        "Smart city partnerships secured",
        "Global presence in 5 countries",
        "Advanced analytics platform launched",
        "Carbon-neutral operations achieved"
      ]
    },
    {
      year: "2026",
      quarter: "Q2",
      title: "Future of Communities",
      description: "Pioneering autonomous community management with quantum computing",
      detailedDescription: "Revolutionary quantum computing integration for real-time optimization and predictive analytics.",
      color: "#EF4444",
      icon: Sparkles,
      metrics: {
        team: "300",
        funding: "$50M",
        users: "300K",
        features: "300"
      },
      achievements: [
        "Quantum computing integration",
        "Autonomous management systems",
        "1000+ communities served",
        "Industry standard established"
      ]
    }
  ];

  // Enhanced core values with detailed metrics and KPIs
  const coreValues = [
    {
      title: "Innovation First",
      description: "Continuously pushing boundaries with cutting-edge technology solutions",
      icon: Lightbulb,
      color: "#16808D",
      features: ["AI-Powered Solutions", "Cloud Infrastructure", "Mobile-First Design", "IoT Integration", "Blockchain Security"],
      metrics: {
        patents: 12,
        research: "15% of revenue",
        innovations: 48,
        satisfaction: 96
      },
      detailedDescription: "We dedicate 15% of our revenue to R&D, filing patents and creating breakthrough solutions that redefine community living."
    },
    {
      title: "Security & Trust",
      description: "Bank-level security and data protection for complete peace of mind",
      icon: Shield,
      color: "#142C52",
      features: ["End-to-End Encryption", "Regular Security Audits", "GDPR Compliant", "SOC 2 Type II", "ISO 27001"],
      metrics: {
        uptime: "99.97%",
        breaches: 0,
        audits: 24,
        compliance: 100
      },
      detailedDescription: "Military-grade encryption with zero-trust architecture. 24/7 security monitoring and instant threat response."
    },
    {
      title: "User-Centric Design",
      description: "Intuitive interfaces designed for users of all technical abilities",
      icon: Users,
      color: "#178740",
      features: ["Accessibility First", "Multi-Language Support", "24/7 Training", "UX Research", "A/B Testing"],
      metrics: {
        accessibility: 98,
        languages: 12,
        training: 1000,
        satisfaction: 94
      },
      detailedDescription: "Designed for everyone from tech-savvy millennials to senior citizens. Comprehensive accessibility and multilingual support."
    },
    {
      title: "Sustainable Impact",
      description: "Building solutions that contribute to sustainable community development",
      icon: Heart,
      color: "#1B9AAA",
      features: ["Green Operations", "Paperless Management", "Energy Optimization", "Carbon Neutral", "Renewable Energy"],
      metrics: {
        carbon: "-45%",
        paper: "100% digital",
        energy: "-30%",
        renewable: 80
      },
      detailedDescription: "Helping communities reduce their carbon footprint by 45% through smart energy management and digital transformation."
    }
  ];

  // Ultra-advanced technology stack with comprehensive details
  const technologyStack = [
    {
      category: "Frontend Architecture",
      icon: Eye,
      color: "#16808D",
      technologies: ["React.js 18.2", "TypeScript 5.0", "Tailwind CSS 3.3", "Next.js 14", "Redux Toolkit", "React Query 4", "Framer Motion 10", "Zustand 4"],
      description: "Modern, responsive, and accessible user interfaces with cutting-edge performance optimization",
      performance: { score: 98, lighthouse: 96, accessibility: 99, bestPractices: 97, seo: 95 },
      frameworks: ["React", "Next.js", "Vue.js 3", "Angular 16", "Svelte 4"],
      tools: ["VS Code", "Webpack 5", "Vite 4", "ESLint", "Prettier", "Storybook"],
      architecture: "Micro-frontend architecture with module federation and lazy loading",
      testing: ["Jest", "React Testing Library", "Cypress", "Playwright", "MSW"],
      optimization: ["Code splitting", "Tree shaking", "Minification", "Image optimization", "CDN caching"]
    },
    {
      category: "Backend Infrastructure",
      icon: Database,
      color: "#142C52",
      technologies: ["Node.js 20", "Express 4.18", "MongoDB 7.0", "Redis 7.0", "PostgreSQL 15", "GraphQL", "Prisma 5", "Mongoose 7"],
      description: "Scalable, secure, and high-performance backend infrastructure with microservices architecture",
      performance: { responseTime: "<50ms", throughput: "10K req/s", availability: "99.97%", scalability: "Horizontal" },
      databases: ["MongoDB", "PostgreSQL", "Redis", "Elasticsearch", "InfluxDB"],
      apis: ["REST", "GraphQL", "WebSocket", "gRPC", "WebRTC"],
      architecture: "Event-driven microservices with CQRS pattern and event sourcing",
      monitoring: ["Prometheus", "Grafana", "ELK Stack", "Jaeger", "Sentry"],
      security: ["JWT", "OAuth 2.0", "Rate Limiting", "Input Validation", "SQL Injection Prevention"]
    },
    {
      category: "Cloud & DevOps",
      icon: Cpu,
      color: "#178740",
      technologies: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Terraform", "Jenkins", "GitHub Actions", "ArgoCD"],
      description: "Enterprise-grade cloud infrastructure with automated deployment and monitoring",
      performance: { deploymentTime: "<5min", uptime: "99.97%", scalability: "Auto", regions: 5 },
      services: ["EC2", "EKS", "RDS", "S3", "CloudFront", "Lambda", "SQS", "SNS"],
      monitoring: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic"],
      infrastructure: "Infrastructure as Code with GitOps and automated compliance checking",
      deployment: ["Blue-green deployment", "Canary releases", "Feature flags", "Rollback automation"],
      scaling: ["Auto-scaling groups", "Load balancers", "CDN", "Edge computing", "Serverless"]
    },
    {
      category: "Security & Compliance",
      icon: Lock,
      color: "#1B9AAA",
      technologies: ["OAuth 2.0", "JWT Authentication", "SSL/TLS", "Rate Limiting", "WAF", "DDoS Protection", "Encryption", "Zero Trust"],
      description: "Multi-layered security architecture with advanced threat detection and prevention",
      performance: { threatsBlocked: "1M+", responseTime: "<1s", falsePositives: "<0.1%", compliance: 100 },
      standards: ["ISO 27001", "SOC 2 Type II", "GDPR", "HIPAA", "PCI DSS", "CCPA"],
      tools: ["OWASP ZAP", "Burp Suite", "Veracode", "Snyk", "Checkmarx"],
      securityLayers: ["Network security", "Application security", "Data encryption", "Identity management", "Compliance automation"],
      threatDetection: ["AI-powered anomaly detection", "Real-time monitoring", "Automated incident response", "Forensic analysis"],
      dataProtection: ["End-to-end encryption", "Data masking", "Access control", "Audit logging", "Data loss prevention"]
    },
    {
      category: "AI & Machine Learning",
      icon: Brain,
      color: "#8B5CF6",
      technologies: ["TensorFlow 2.13", "PyTorch 2.0", "Scikit-learn", "OpenAI API", "Hugging Face", "MLflow", "Kubeflow", "Apache Spark"],
      description: "Advanced AI and machine learning capabilities for predictive analytics and automation",
      performance: { accuracy: 98.5, models: 25, trainingTime: "<1hr", inferenceTime: "<100ms" },
      models: ["Predictive Maintenance", "Anomaly Detection", "Natural Language Processing", "Computer Vision", "Recommendation Systems"],
      frameworks: ["TensorFlow", "PyTorch", "Keras", "XGBoost", "LightGBM", "CatBoost"],
      infrastructure: ["GPU clusters", "TPU acceleration", "Model serving", "A/B testing", "Model monitoring"],
      applications: ["Predictive analytics", "Natural language processing", "Computer vision", "Recommendation engines", "Fraud detection"],
      research: ["Deep learning", "Reinforcement learning", "Transfer learning", "MLOps", "AI ethics"]
    },
    {
      category: "Mobile & Edge Computing",
      icon: Smartphone,
      color: "#EC4899",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Push Notifications", "Offline Support"],
      description: "Cross-platform mobile applications with native performance and offline capabilities",
      performance: { rating: 4.8, downloads: "100K+", crashRate: "<0.1%", loadTime: "<2s" },
      platforms: ["iOS", "Android", "Tablet", "Wear OS", "WatchOS", "Smart TV"],
      features: ["Offline Mode", "Push Notifications", "Biometric Auth", "Dark Mode", "Voice Commands"],
      edgeComputing: ["Edge AI", "Local processing", "Offline sync", "Progressive Web Apps", "WebAssembly"],
      integration: ["IoT devices", "Wearables", "Smart home", "Connected cars", "Industrial IoT"],
      optimization: ["Code splitting", "Image optimization", "Caching strategies", "Network optimization", "Battery optimization"]
    },
    {
      category: "Data & Analytics",
      icon: BarChart3,
      color: "#F59E0B",
      technologies: ["Apache Kafka", "Apache Spark", "Apache Flink", "ClickHouse", "Apache Druid", "Superset", "Grafana", "Tableau"],
      description: "Real-time data processing and advanced analytics for business intelligence",
      performance: { throughput: "1M events/sec", latency: "<100ms", storage: "PB scale", queries: "<1sec" },
      dataPipeline: ["Ingestion", "Processing", "Storage", "Analysis", "Visualization", "ML integration"],
      analytics: ["Real-time analytics", "Batch processing", "Stream processing", "Predictive analytics", "Business intelligence"],
      storage: ["Data lakes", "Data warehouses", "Time series databases", "Graph databases", "Search engines"],
      visualization: ["Interactive dashboards", "Custom reports", "Real-time monitoring", "Alert systems", "Data storytelling"]
    },
    {
      category: "Blockchain & Web3",
      icon: Shield,
      color: "#10B981",
      technologies: ["Ethereum", "Solidity", "Web3.js", "IPFS", "Smart Contracts", "DeFi Protocols", "NFTs", "DAOs"],
      description: "Blockchain-based solutions for transparency, security, and decentralized operations",
      performance: { tps: 1000, finality: "<30s", security: "Enterprise grade", scalability: "Layer 2" },
      platforms: ["Ethereum", "Polygon", "BSC", "Avalanche", "Solana", "Arbitrum"],
      applications: ["Smart contracts", "Digital identity", "Supply chain tracking", "Tokenization", "DeFi integration"],
      security: ["Multi-sig wallets", "Hardware security modules", "Audit trails", "Compliance tools", "Risk management"],
      integration: ["Traditional finance", "IoT devices", "Supply chain", "Digital assets", "Enterprise systems"]
    }
  ];

  // Enhanced leadership team with detailed profiles including Pranjal Khandelwal as founder
  const leadershipTeam = [
    {
      name: "Pranjal Khandelwal",
      role: "Co-Founder & Chief Product Officer",
      bio: "Visionary product leader with expertise in scaling SaaS platforms and user experience design",
      expertise: "Product Strategy, User Experience, Growth Hacking",
      background: "Former Product Lead at Microsoft with 12+ years in product management. MBA from Stanford, Computer Science from IIT Bombay. Led product teams that scaled from 0 to 10M+ users.",
      achievements: ["Founded 3 successful startups", "Product Excellence Award", "50+ product launches", "Growth hacking expert"],
      social: { linkedin: "linkedin.com/in/pranjalkhandelwal", twitter: "@pranjalk", speaking: "100+ conferences", publications: "Product management books" },
      photo: "/team/pranjal.jpg",
      quote: "Building products that people love is not just a job, it's a passion.",
      specialties: ["Product Strategy", "User Research", "Growth Analytics", "Design Thinking", "Agile Leadership"]
    },
    {
      name: "Rajesh Kumar",
      role: "CEO & Co-Founder",
      bio: "15+ years in real estate technology, passionate about community innovation",
      expertise: "Strategic Vision, Product Development",
      background: "Former VP of Product at PropTech unicorn, led 3 successful exits. MBA from IIM Ahmedabad, Computer Science from IIT Delhi.",
      achievements: ["Founded 2 successful startups", "15+ patents filed", "Led 100+ person teams", "Industry thought leader"],
      social: { linkedin: "linkedin.com/in/rajeshkumar", twitter: "@rajeshkumar", speaking: "50+ conferences" },
      photo: "/team/rajesh.jpg",
      quote: "Innovation happens when we dare to challenge the status quo.",
      specialties: ["Strategic Planning", "Business Development", "Team Leadership", "Market Analysis", "Investor Relations"]
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      bio: "Former Google engineer, expert in scalable systems and AI implementation",
      expertise: "Technical Architecture, AI/ML",
      background: "10+ years at Google leading infrastructure teams. MS in Computer Science from Stanford, PhD in AI from MIT.",
      achievements: ["Google Scale Award", "20+ research papers", "AI patents", "Open source contributor"],
      social: { linkedin: "linkedin.com/in/priyasharma", github: "github.com/priya", publications: "25+ papers" },
      photo: "/team/priya.jpg",
      quote: "Technology should simplify complexity, not add to it.",
      specialties: ["Cloud Architecture", "Machine Learning", "System Design", "DevOps", "Technical Leadership"]
    },
    {
      name: "Amit Patel",
      role: "Head of Operations",
      bio: "Operations expert with experience managing 100+ residential communities",
      expertise: "Process Optimization, Customer Success",
      background: "Former COO at major property management company. MBA from Harvard, 20+ years in operations management.",
      achievements: ["Scaled operations 10x", "Reduced costs 40%", "Improved satisfaction 35%", "Process automation expert"],
      social: { linkedin: "linkedin.com/in/amitpatel", certifications: "PMP, Six Sigma" },
      photo: "/team/amit.jpg",
      quote: "Excellence in operations is the foundation of great customer experience.",
      specialties: ["Operations Management", "Process Improvement", "Quality Control", "Supply Chain", "Customer Service"]
    },
    {
      name: "Sneha Reddy",
      role: "Head of Design",
      bio: "UX/UI specialist focused on creating inclusive digital experiences",
      expertise: "User Experience, Design Systems",
      background: "Former Design Lead at Microsoft, design thinking advocate. Masters in Human-Computer Interaction from Carnegie Mellon.",
      achievements: ["Red Dot Design Award", "Design patents", "Accessibility champion", "Design system architect"],
      social: { linkedin: "linkedin.com/in/snehareddy", dribbble: "dribbble.com/sneha", behance: "behance.net/sneha" },
      photo: "/team/sneha.jpg",
      quote: "Good design is invisible. Great design is unforgettable.",
      specialties: ["User Research", "Interface Design", "Design Systems", "Accessibility", "Design Leadership"]
    },
    {
      name: "Vikram Singh",
      role: "Head of Engineering",
      bio: "Full-stack architect with expertise in building scalable distributed systems",
      expertise: "System Architecture, Cloud Infrastructure",
      background: "Former Principal Engineer at Amazon AWS. MS in Computer Science from UC Berkeley, 12+ years in cloud computing.",
      achievements: ["AWS certified architect", "Kubernetes contributor", "Open source maintainer", "Tech conference speaker"],
      social: { linkedin: "linkedin.com/in/vikramsingh", github: "github.com/vikram", blog: "vikram.tech" },
      photo: "/team/vikram.jpg",
      quote: "Code is poetry. Architecture is the art that makes it sing.",
      specialties: ["Cloud Computing", "Microservices", "DevOps", "System Architecture", "Technical Leadership"]
    },
    {
      name: "Anjali Gupta",
      role: "Head of Marketing",
      bio: "Growth marketing expert with experience in B2B SaaS and community building",
      expertise: "Growth Strategy, Brand Building",
      background: "Former CMO at successful SaaS startup. MBA from INSEAD, 10+ years in digital marketing.",
      achievements: ["1000% growth", "Industry awards", "Thought leader", "Community builder"],
      social: { linkedin: "linkedin.com/in/anjaligupta", twitter: "@anjaligupta", podcast: "Marketing Maven" },
      photo: "/team/anjali.jpg",
      quote: "Great marketing doesn't feel like marketing. It feels like a conversation.",
      specialties: ["Growth Marketing", "Brand Strategy", "Content Marketing", "Community Building", "Analytics"]
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief AI Officer",
      bio: "AI research scientist with expertise in deep learning and predictive analytics",
      expertise: "Artificial Intelligence, Machine Learning, Data Science",
      background: "PhD in AI from MIT, former research scientist at DeepMind. 15+ years in AI research and development.",
      achievements: ["50+ research papers", "AI patents", "Kaggle Grandmaster", "TED speaker"],
      social: { linkedin: "linkedin.com/in/michaelchen", github: "github.com/mchenai", publications: "Nature, Science, IEEE" },
      photo: "/team/michael.jpg",
      quote: "AI is not about replacing humans, it's about augmenting human potential.",
      specialties: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Predictive Analytics", "AI Ethics"]
    }
  ];

  // Enhanced certifications and compliance
  const certifications = [
    { name: "ISO 27001:2013", category: "Security", description: "Information Security Management", icon: ShieldCheck, status: "Active", expiry: "2025-12-31" },
    { name: "GDPR Compliant", category: "Privacy", description: "General Data Protection Regulation", icon: Lock, status: "Active", expiry: "N/A" },
    { name: "SOC 2 Type II", category: "Security", description: "Service Organization Control 2", icon: ShieldCheck, status: "Active", expiry: "2025-06-30" },
    { name: "ISO 9001:2015", category: "Quality", description: "Quality Management System", icon: Award, status: "Active", expiry: "2025-09-30" },
    { name: "AWS Partner", category: "Cloud", description: "Amazon Web Services Partner", icon: Cloud, status: "Advanced", expiry: "2025-03-31" },
    { name: "Microsoft Gold Partner", category: "Technology", description: "Microsoft Solutions Partner", icon: Server, status: "Gold", expiry: "2025-06-30" },
    { name: "HIPAA Compliant", category: "Healthcare", description: "Health Insurance Portability", icon: HeartHandshake, status: "Active", expiry: "2025-12-31" },
    { name: "PCI DSS Level 1", category: "Security", description: "Payment Card Industry", icon: CreditCard, status: "Active", expiry: "2025-08-31" },
    { name: "ISO 27701:2019", category: "Privacy", description: "Privacy Information Management", icon: Key, status: "Active", expiry: "2025-11-30" }
  ];

  // Advanced company metrics and KPIs
  const companyMetrics = {
    growth: {
      revenue: { current: "$10M", growth: "400%", projected: "$25M by 2025" },
      users: { current: "75K", growth: "1500%", projected: "200K by 2025" },
      communities: { current: 500, growth: "4900%", projected: "1500 by 2025" },
      team: { current: 120, growth: "2300%", projected: "300 by 2025" }
    },
    performance: {
      customerSatisfaction: 99.2,
      netPromoterScore: 78,
      customerRetention: 96,
      averageResponseTime: "2.5 hours",
      systemUptime: 99.97,
      bugResolutionTime: "4.2 hours"
    },
    impact: {
      carbonReduction: "45%",
      paperSaved: "2M sheets/year",
      energyOptimized: "30%",
      waterConserved: "1M gallons/year",
      communitiesServed: 500,
      livesImpacted: 75000
    }
  };

  // Advanced features and capabilities
  const advancedFeatures = [
    {
      category: "AI & Automation",
      icon: Brain,
      color: "#8B5CF6",
      features: [
        { name: "Predictive Maintenance", description: "AI predicts equipment failures before they occur", impact: "Reduces downtime by 80%" },
        { name: "Smart Visitor Management", description: "Automated visitor screening and check-in", impact: "95% faster processing" },
        { name: "Energy Optimization", description: "AI-powered energy consumption optimization", impact: "30% energy savings" },
        { name: "Anomaly Detection", description: "Real-time detection of unusual patterns", impact: "99.5% accuracy" }
      ]
    },
    {
      category: "IoT Integration",
      icon: Wifi,
      color: "#10B981",
      features: [
        { name: "Smart Sensors", description: "Connected sensors for real-time monitoring", impact: "24/7 monitoring" },
        { name: "Automated Controls", description: "Remote control of community systems", impact: "90% automation" },
        { name: "Environmental Monitoring", description: "Air quality, temperature, humidity tracking", impact: "Health & safety" },
        { name: "Asset Tracking", description: "Real-time location and status tracking", impact: "100% visibility" }
      ]
    },
    {
      category: "Blockchain Security",
      icon: Shield,
      color: "#F59E0B",
      features: [
        { name: "Immutable Records", description: "Blockchain-based record keeping", impact: "Tamper-proof data" },
        { name: "Smart Contracts", description: "Automated agreement execution", impact: "100% compliance" },
        { name: "Digital Identity", description: "Secure digital identity management", impact: "Zero fraud" },
        { name: "Transparent Transactions", description: "Visible and verifiable transactions", impact: "Full trust" }
      ]
    },
    {
      category: "Advanced Analytics",
      icon: BarChart3,
      color: "#EF4444",
      features: [
        { name: "Real-time Dashboards", description: "Live data visualization and insights", impact: "Instant decisions" },
        { name: "Predictive Analytics", description: "Future trend prediction and forecasting", impact: "Proactive management" },
        { name: "Custom Reports", description: "Tailored reporting for different stakeholders", impact: "Better insights" },
        { name: "Data Mining", description: "Deep insights from community data", impact: "Hidden patterns" }
      ]
    }
  ];

  // Client success stories
  const clientSuccessStories = [
    {
      name: "Green Valley Estates",
      type: "Premium Residential",
      location: "Mumbai",
      size: "500 units",
      challenge: "Manual visitor management and maintenance tracking",
      solution: "Complete digital transformation with Society360",
      results: {
        efficiency: "+85%",
        satisfaction: "+40%",
        costs: "-35%",
        time: "-60%"
      },
      testimonial: "Society360 transformed our community management completely. We've seen remarkable improvements in efficiency and resident satisfaction.",
      logo: "/clients/greenvalley.png"
    },
    {
      name: "Sunset Apartments",
      type: "Mixed-Use Complex",
      location: "Bangalore",
      size: "1200 units",
      challenge: "Complex operations across residential and commercial spaces",
      solution: "Enterprise-grade implementation with custom modules",
      results: {
        revenue: "+25%",
        occupancy: "+15%",
        complaints: "-70%",
        retention: "+30%"
      },
      testimonial: "The ROI has been exceptional. Society360 paid for itself within the first year through operational efficiencies.",
      logo: "/clients/sunset.png"
    },
    {
      name: "Riverside Community",
      type: "Gated Community",
      location: "Delhi",
      size: "800 units",
      challenge: "Security concerns and poor communication",
      solution: "Advanced security and communication modules",
      results: {
        security: "+90%",
        communication: "+95%",
        response: "+80%",
        engagement: "+60%"
      },
      testimonial: "Our residents feel safer and more connected than ever. The communication features have brought our community together.",
      logo: "/clients/riverside.png"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax */}
      <div 
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#142C52]/90 to-[#16808D]/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center text-white">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-16 w-auto" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Society360</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 max-w-3xl mx-auto">
              Transforming Residential Communities Through Intelligent Innovation and Connected Living
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 bg-white text-[#142C52] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#142C52] transition-all"
              >
                Schedule Demo
                <Calendar className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {['mission', 'story', 'values', 'technology', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#16808D] text-[#16808D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      {activeTab === 'mission' && (
        <div className="observe-section" id="mission">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-[#16808D] to-[#142C52] rounded-xl">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
                    <p className="text-sm text-[#16808D] font-medium">Driving Digital Transformation</p>
                  </div>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed">
                  To revolutionize residential society management through innovative technology, 
                  creating seamless, secure, and sustainable communities where residents thrive 
                  and management excels. We envision a future where every community operates 
                  with maximum efficiency, transparency, and environmental responsibility.
                </p>
                
                {/* Mission Pillars */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Our Core Mission Pillars</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: <Shield className="h-6 w-6" />,
                        title: "Security First",
                        description: "Enterprise-grade security protecting 75K+ residents",
                        color: "#142C52"
                      },
                      {
                        icon: <Users className="h-6 w-6" />,
                        title: "User-Centric",
                        description: "Designed for all technical abilities and ages",
                        color: "#178740"
                      },
                      {
                        icon: <Zap className="h-6 w-6" />,
                        title: "Smart Automation",
                        description: "AI-powered processes reducing manual work by 80%",
                        color: "#1B9AAA"
                      },
                      {
                        icon: <Heart className="h-6 w-6" />,
                        title: "Sustainable Impact",
                        description: "45% reduction in carbon footprint across communities",
                        color: "#16808D"
                      }
                    ].map((pillar, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="p-2 rounded-lg" style={{backgroundColor: pillar.color + '20'}}>
                          <div style={{color: pillar.color}}>{pillar.icon}</div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{pillar.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{pillar.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission Statistics */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Mission Impact Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: "500+", label: "Communities", icon: Building2 },
                      { value: "75K+", label: "Residents", icon: Users },
                      { value: "99.2%", label: "Satisfaction", icon: Star },
                      { value: "99.97%", label: "Uptime", icon: Shield }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <stat.icon className="h-8 w-8 mx-auto mb-2 text-[#16808D]" />
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Vision Card */}
                <div className="bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9] rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-md">
                      <Globe className="h-8 w-8 text-[#142C52]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Our Vision for 2030</h3>
                      <p className="text-sm text-gray-600">Global Leadership in Smart Communities</p>
                    </div>
                  </div>
                  
                  {/* Vision Metrics */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {[
                      { icon: Building2, label: "Smart Cities", value: "50+", description: "Major metropolitan areas" },
                      { icon: Users, label: "Communities", value: "1000+", description: "Residential societies" },
                      { icon: Globe, label: "Global Reach", value: "5 Countries", description: "International presence" },
                      { icon: Zap, label: "AI Features", value: "100+", description: "Intelligent capabilities" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-white rounded-xl shadow-md">
                        <stat.icon className="h-10 w-10 mx-auto mb-3 text-[#16808D]" />
                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                        <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                        <div className="text-xs text-gray-500">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Vision Roadmap */}
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Strategic Roadmap 2024-2030</h4>
                    <div className="space-y-3">
                      {[
                        { year: "2024", milestone: "National Expansion", status: "In Progress", completed: 75 },
                        { year: "2025", milestone: "AI Integration Complete", status: "Planned", completed: 0 },
                        { year: "2026", milestone: "Global Launch", status: "Planned", completed: 0 },
                        { year: "2030", milestone: "Industry Leadership", status: "Goal", completed: 0 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-semibold text-gray-700">{item.year}</span>
                            <span className="text-sm text-gray-900">{item.milestone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 bg-gradient-to-r from-[#16808D] to-[#142C52] rounded-full"
                                style={{width: `${item.completed}%`}}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section - Only in Mission */}
      {activeTab === 'mission' && (
        <div id="stats" className="observe-section bg-gradient-to-r from-[#142C52] to-[#16808D] text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Impact at a Glance</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Real-time metrics showcasing our growth and community impact
              </p>
            </div>
            
            {/* Primary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { 
                  label: "Communities Managed", 
                  value: animatedStats.communities, 
                  icon: Building2, 
                  change: "+400%",
                  description: "Active residential societies"
                },
                { 
                  label: "Happy Residents", 
                  value: animatedStats.residents.toLocaleString(), 
                  icon: Users, 
                  change: "+1500%",
                  description: "Satisfied users across communities"
                },
                { 
                  label: "Satisfaction Rate", 
                  value: `${animatedStats.satisfaction}%`, 
                  icon: Star, 
                  change: "+15%",
                  description: "Customer satisfaction score"
                },
                { 
                  label: "System Uptime", 
                  value: `${animatedStats.uptime}%`, 
                  icon: Shield, 
                  change: "+0.07%",
                  description: "Platform availability"
                }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 opacity-90 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold mb-2 group-hover:scale-105 transition-transform">{stat.value}</div>
                    <div className="text-lg opacity-90 mb-1">{stat.label}</div>
                    <div className="text-sm opacity-75">{stat.description}</div>
                    <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-500/20 rounded-full">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Features Deployed", value: animatedStats.features, icon: Zap, color: "#8B5CF6" },
                { label: "API Integrations", value: animatedStats.integrations, icon: Link2, color: "#10B981" },
                { label: "Support Tickets", value: `${animatedStats.supportTickets}h avg`, icon: MessageCircle, color: "#F59E0B" },
                { label: "Response Time", value: `${animatedStats.responseTime}h`, icon: Clock, color: "#EC4899" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-90" style={{color: stat.color}} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Detailed Metrics Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">Detailed Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { metric: "Daily Active Users", value: "45,000+", trend: "+12%", icon: Users },
                  { metric: "Monthly Transactions", value: "2.5M+", trend: "+25%", icon: CreditCard },
                  { metric: "Data Processed", value: "10TB/day", trend: "+40%", icon: Database },
                  { metric: "API Calls", value: "50M/day", trend: "+60%", icon: Code }
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-white/20 rounded-xl">
                    <item.icon className="h-6 w-6 mx-auto mb-2 text-white opacity-80" />
                    <div className="text-lg font-semibold text-white mb-1">{item.value}</div>
                    <div className="text-sm text-white/80 mb-1">{item.metric}</div>
                    <div className="inline-flex items-center px-2 py-1 bg-green-500/20 rounded-full">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span className="text-xs text-white">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Timeline */}
      {activeTab === 'story' && (
        <div className="observe-section bg-gray-50" id="story">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small startup to a national leader in community management innovation
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#16808D] via-[#1B9AAA] to-[#142C52]"></div>
              {timelineData.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-10" style={{backgroundColor: item.color}}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="w-1/2 px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold px-3 py-1 rounded-full text-white" style={{backgroundColor: item.color}}>
                            {item.year}
                          </span>
                          <span className="text-sm text-gray-500">Q{item.quarter}</span>
                        </div>
                        <div className="flex space-x-2">
                          {item.achievements.slice(0, 2).map((achievement, achIndex) => (
                            <div key={achIndex} className="w-2 h-2 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                      <p className="text-sm text-gray-500 mb-4 italic">{item.detailedDescription}</p>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {Object.entries(item.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500 capitalize mb-1">{key}</div>
                            <div className="text-lg font-bold text-gray-900">{value}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Achievements List */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {item.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-center text-sm text-gray-600">
                              <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Timeline Summary */}
            <div className="mt-16 bg-gradient-to-r from-[#142C52] to-[#16808D] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold text-center mb-6">Journey Summary (2020-2026)</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Years in Operation", value: "6+", icon: Clock },
                  { label: "Total Funding Raised", value: "$50M+", icon: DollarSign },
                  { label: "Team Size", value: "300+", icon: Users2 },
                  { label: "Communities Served", value: "1000+", icon: Award }
                ].map((summary, index) => (
                  <div key={index} className="text-center">
                    <summary.icon className="h-8 w-8 mx-auto mb-2 opacity-80" />
                    <div className="text-2xl font-bold mb-1">{summary.value}</div>
                    <div className="text-sm opacity-90">{summary.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Future Projections */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="text-lg font-semibold text-center mb-4">Future Projections (2026-2030)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { metric: "Global Expansion", value: "20+ Countries", icon: Globe },
                    { metric: "Quantum Computing", value: "Fully Integrated", icon: Sparkles },
                    { metric: "AI Automation", value: "90% Autonomous", icon: Brain }
                  ].map((projection, index) => (
                    <div key={index} className="text-center p-3 bg-white/10 rounded-lg">
                      <projection.icon className="h-6 w-6 mx-auto mb-2 opacity-80" />
                      <div className="text-sm font-semibold mb-1">{projection.value}</div>
                      <div className="text-xs opacity-90">{projection.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Core Values */}
      {activeTab === 'values' && (
        <div className="observe-section bg-gray-50" id="values">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Core Values & Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{backgroundColor: value.color + '20'}}>
                      <value.icon className="h-8 w-8" style={{color: value.color}} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">{value.description}</p>
                  <div className="space-y-3">
                    {value.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-3" style={{color: value.color}} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technology Stack */}
      {activeTab === 'technology' && (
        <div className="observe-section" id="technology">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">Ultra-Advanced Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {technologyStack.map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                  onMouseEnter={() => setHoveredTech(index)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="flex items-center mb-4">
                    <tech.icon className="h-8 w-8 mr-3" style={{color: tech.color}} />
                    <h3 className="text-lg font-bold text-gray-900">{tech.category}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tech.description}</p>
                  
                  {/* Performance Metrics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(tech.performance).map(([key, value]) => (
                        <div key={key} className="text-xs bg-gray-100 rounded px-2 py-1">
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Core Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.technologies.slice(0, 4).map((item, itemIndex) => (
                        <span key={itemIndex} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">
                          {item}
                        </span>
                      ))}
                      {tech.technologies.length > 4 && (
                        <span className="text-xs bg-gray-200 text-gray-600 rounded px-2 py-1">
                          +{tech.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Advanced Features */}
                  {(tech.architecture || tech.securityLayers || tech.infrastructure) && (
                    <div className="border-t pt-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Advanced Architecture
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Technology Breakdown */}
            {hoveredTech !== null && (
              <div className="bg-gradient-to-r from-[#E0F7FA] to-[#D4DBE9] rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6" style={{color: '#071426'}}>
                  {technologyStack[hoveredTech].category} - Deep Dive
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Full Technology List */}
                  <div>
                    <h4 className="font-semibold mb-3">All Technologies:</h4>
                    <div className="space-y-2">
                      {technologyStack[hoveredTech].technologies.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center">
                          <ChevronRight className="h-3 w-3 mr-2" style={{color: technologyStack[hoveredTech].color}} />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Frameworks/Tools */}
                  {(technologyStack[hoveredTech].frameworks || technologyStack[hoveredTech].tools) && (
                    <div>
                      <h4 className="font-semibold mb-3">Frameworks & Tools:</h4>
                      <div className="space-y-2">
                        {[...(technologyStack[hoveredTech].frameworks || []), ...(technologyStack[hoveredTech].tools || [])].map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center">
                            <Settings className="h-3 w-3 mr-2" style={{color: technologyStack[hoveredTech].color}} />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Advanced Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Advanced Features:</h4>
                    <div className="space-y-2">
                      {technologyStack[hoveredTech].architecture && (
                        <div className="flex items-center">
                          <Layers className="h-3 w-3 mr-2" style={{color: technologyStack[hoveredTech].color}} />
                          <span className="text-sm text-gray-700">{technologyStack[hoveredTech].architecture}</span>
                        </div>
                      )}
                      {technologyStack[hoveredTech].securityLayers && (
                        <div className="flex items-center">
                          <ShieldCheck className="h-3 w-3 mr-2" style={{color: technologyStack[hoveredTech].color}} />
                          <span className="text-sm text-gray-700">Multi-layer Security</span>
                        </div>
                      )}
                      {technologyStack[hoveredTech].infrastructure && (
                        <div className="flex items-center">
                          <Server className="h-3 w-3 mr-2" style={{color: technologyStack[hoveredTech].color}} />
                          <span className="text-sm text-gray-700">{technologyStack[hoveredTech].infrastructure}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certifications */}
            <div className="bg-gradient-to-r from-[#E0F7FA] to-[#D4DBE9] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6" style={{color: '#071426'}}>Certifications & Compliance</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                    <cert.icon className="h-8 w-8 mx-auto mb-2" style={{color: '#16808D'}} />
                    <div className="text-sm font-medium text-gray-700 mb-1">{cert.name}</div>
                    <div className="text-xs text-gray-500">{cert.category}</div>
                    <div className="text-xs text-green-600 mt-1">{cert.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Team */}
      {activeTab === 'team' && (
        <div className="observe-section bg-gray-50" id="team">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-4">Leadership Team</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Meet the visionary leaders behind Society360, bringing together decades of expertise in technology, product, and community management
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 group">
                  {/* Profile Header */}
                  <div className="h-40 bg-gradient-to-br from-[#16808D] to-[#142C52] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-20 w-20 text-white opacity-50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Profile Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-[#16808D] font-semibold mb-3 text-sm">{member.role}</p>
                    
                    {/* Quote */}
                    {member.quote && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 italic">"{member.quote}"</p>
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                    
                    {/* Specialties */}
                    {member.specialties && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.slice(0, 3).map((specialty, specIndex) => (
                            <span key={specIndex} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">
                              {specialty}
                            </span>
                          ))}
                          {member.specialties.length > 3 && (
                            <span className="text-xs bg-gray-200 text-gray-600 rounded px-2 py-1">
                              +{member.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 mb-2">Key Achievements:</h4>
                      <div className="space-y-1">
                        {member.achievements.slice(0, 2).map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-center">
                            <Trophy className="h-3 w-3 mr-2 text-yellow-500" />
                            <span className="text-xs text-gray-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {member.social.linkedin && (
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs text-blue-600 font-bold">in</span>
                            </div>
                          )}
                          {member.social.github && (
                            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-bold">gh</span>
                            </div>
                          )}
                          {member.social.twitter && (
                            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-bold">tw</span>
                            </div>
                          )}
                        </div>
                        <button className="text-xs text-[#16808D] hover:text-[#142C52] font-medium">
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Team Stats */}
            <div className="mt-16 bg-gradient-to-r from-[#142C52] to-[#16808D] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold text-center mb-8">Team Excellence Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Combined Experience", value: "100+ Years", icon: Clock },
                  { label: "Companies Founded", value: "15+", icon: Rocket },
                  { label: "Patents Filed", value: "50+", icon: Award },
                  { label: "Publications", value: "200+", icon: BookOpen }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 opacity-80" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Information */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{color: '#071426'}}>About Civora Nexus Pvt. Ltd.</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Civora Nexus Private Limited is a technology innovation company dedicated to creating 
                intelligent solutions for modern communities. With our flagship product Society360, 
                we're transforming how residential societies operate, communicate, and thrive in the digital age.
              </p>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Our Philosophy</h3>
                <p className="text-gray-600 italic">
                  "Connecting Citizens Through Intelligent Innovation"
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["Quality Assurance", "Customer Focus", "Technological Excellence", "Sustainable Solutions"].map((value, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9] rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color: '#071426'}}>Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" style={{color: '#16808D'}} />
                  <span className="text-gray-700">info@society360.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" style={{color: '#16808D'}} />
                  <span className="text-gray-700">+91 9680211602</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" style={{color: '#16808D'}} />
                  <span className="text-gray-700">Jaipur, Rajasthan, India</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3" style={{color: '#16808D'}} />
                  <span className="text-gray-700">URN: UDYAM-MH-01-0075817</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className="font-semibold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#142C52] to-[#16808D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of communities already experiencing the Society360 advantage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-white text-[#142C52] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Get Started Today
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#142C52] transition-all"
            >
              <HeartHandshake className="mr-2 h-5 w-5" />
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;
