import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Wrench, DollarSign, MessageSquare, Settings, LogIn, Info, ChevronDown, Menu, X, MapPin, Phone, Mail, Globe, BarChart3, Building, Shield, AlertTriangle, FileText } from 'lucide-react';
import ScrollArrows from '../ScrollArrows/ScrollArrows';
import Translate from '../Translate/Translate.js';
import Chatbot from '../Chatbot/Chatbot.js';
import Notifications from '../Notifications/Notifications';
import { NotificationsProvider } from '../../contexts/NotificationsContext';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Check if current page is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
    { path: '/login', label: 'Login', icon: LogIn },
  ];

  const servicesItems = [
    { path: '/visitor-management', label: 'Visitors', icon: Users },
    { path: '/maintenance', label: 'Maintenance', icon: Wrench },
    { path: '/finance', label: 'Finance', icon: DollarSign },
    { path: '/communication', label: 'Communication', icon: MessageSquare },
    { path: '/administration', label: 'Administration', icon: Settings },
    { path: '/amenities', label: 'Amenities', icon: Building },
    { path: '/security', label: 'Security', icon: Shield },
    { path: '/complaints', label: 'Complaints', icon: FileText },
    { path: '/emergency', label: 'Emergency', icon: AlertTriangle },
  ];

  const isActiveLink = (path) => location.pathname === path;

  return (
    <NotificationsProvider>
      <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
                <img 
                  src="/Long_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-2"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold" style={{color: '#16808D'}}>Society360</span>
                  <span className="text-xs" style={{color: '#020509'}}>by Civora Nexus</span>
                </div>
              </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 ml-auto">
              {navigationItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? 'text-[#147783] underline decoration-2 underline-offset-8'
                        : 'text-gray-700 hover:text-[#147783] hover:bg-white'
                    }`}
                    style={{
                      color: isActiveLink(item.path) ? '#147783' : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (!isActiveLink(item.path)) {
                        e.currentTarget.style.backgroundColor = '#CCE7EC';
                        e.currentTarget.style.color = '#147783';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActiveLink(item.path)) {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => {
                      // Clear hover styles from all navigation items
                      document.querySelectorAll('a[href^="/"]').forEach(link => {
                        link.style.backgroundColor = '';
                        link.style.color = '';
                      });
                      // Scroll to top before navigation
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`flex items-center space-x-0.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActiveLink('/services') || servicesItems.some(item => isActiveLink(item.path))
                      ? 'text-[#147783] underline decoration-2 underline-offset-8'
                      : 'text-gray-700 hover:text-[#147783] hover:bg-white'
                  }`}
                  style={{
                    color: isActiveLink('/services') || servicesItems.some(item => isActiveLink(item.path)) ? '#147783' : undefined
                  }}
                  onMouseEnter={(e) => {
                    if (!(isActiveLink('/services') || servicesItems.some(item => isActiveLink(item.path)))) {
                      e.currentTarget.style.backgroundColor = '#CCE7EC';
                      e.currentTarget.style.color = '#147783';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(isActiveLink('/services') || servicesItems.some(item => isActiveLink(item.path)))) {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = '';
                    }
                  }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Services</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {isServicesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {servicesItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsServicesDropdownOpen(false)}
                            className={`flex items-center space-x-0.5 px-3 py-2 text-sm font-medium transition-colors ${
                              isActiveLink(item.path)
                                ? 'text-[#147783]'
                                : 'text-gray-700 hover:text-[#147783] hover:bg-gray-100'
                            }`}
                            style={{
                              color: isActiveLink(item.path) ? '#147783' : undefined,
                              backgroundColor: isActiveLink(item.path) ? '#CCE7EC' : undefined
                            }}
                            onMouseEnter={(e) => {
                              if (!isActiveLink(item.path)) {
                                e.currentTarget.style.color = '#01181F';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActiveLink(item.path)) {
                                e.currentTarget.style.color = '';
                              }
                            }}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Remaining Navigation Items */}
              {navigationItems.slice(3).map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? 'text-[#147783] underline decoration-2 underline-offset-8'
                        : 'text-gray-700 hover:text-[#147783] hover:bg-white'
                    }`}
                    style={{
                      color: isActiveLink(item.path) ? '#147783' : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (!isActiveLink(item.path)) {
                        e.currentTarget.style.backgroundColor = '#CCE7EC';
                        e.currentTarget.style.color = '#147783';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActiveLink(item.path)) {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => {
                      // Clear hover styles from all navigation items
                      document.querySelectorAll('a[href^="/"]').forEach(link => {
                        link.style.backgroundColor = '';
                        link.style.color = '';
                      });
                      // Scroll to top before navigation
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Notifications */}
              <Notifications />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4C97A8B9AAA]"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent border-t border-gray-200">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? 'text-[#147783] underline decoration-2 underline-offset-8'
                        : 'text-gray-700 hover:text-[#147783] hover:bg-white'
                    }`}
                    style={{
                      color: isActiveLink(item.path) ? '#147783' : undefined
                    }}
                    onMouseEnter={(e) => {
                      if (!isActiveLink(item.path)) {
                        e.currentTarget.style.backgroundColor = '#CCE7EC';
                        e.currentTarget.style.color = '#147783';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActiveLink(item.path)) {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                      }
                    }}
                    onClick={() => {
                      // Clear hover styles from all navigation items
                      document.querySelectorAll('a[href^="/"]').forEach(link => {
                        link.style.backgroundColor = '';
                        link.style.color = '';
                      });
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isAuthPage ? 'pt-8' : 'pt-24'} pb-8`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Company Info */}
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img 
                  src="/Short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-6 w-auto mr-3"
                />
                <div>
                  <h3 className="text-lg font-bold leading-tight mb-1" style={{color: '#16808D'}}>Society360</h3>
                  <h4 className="text-xs font-medium leading-tight" style={{color: '#020509'}}>by Civora Nexus</h4>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Smart Residential Management System powered by Civora Nexus Pvt. Ltd.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/society360" target="_blank" rel="noopener noreferrer" className="text-[#147783] hover:text-[#147783] transition-colors">
                  <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/society360" target="_blank" rel="noopener noreferrer" className="text-[#147783] hover:text-[#147783] transition-colors">
                  <img src="/instagram.png" alt="Instagram" className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/society360" target="_blank" rel="noopener noreferrer" className="text-[#147783] hover:text-[#147783] transition-colors">
                  <img src="/twitter.png" alt="Twitter" className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/society360" target="_blank" rel="noopener noreferrer" className="text-[#147783] hover:text-[#147783] transition-colors">
                  <img src="/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/society360" target="_blank" rel="noopener noreferrer" className="text-[#147783] hover:text-[#147783] transition-colors">
                  <img src="/youtube.png" alt="YouTube" className="w-5 h-5" />
                </a>
                <a href="https://github.com/society360" target="_blank" rel="noopener noreferrer" className="text-[#147783] hover:text-[#147783] transition-colors">
                  <img src="/github.png" alt="GitHub" className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold mb-4" style={{color: '#01181F'}}>Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>About</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
                <li><Link to="/login" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Login</Link></li>
                <li><Link to="/dashboard" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Dashboard</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold mb-4" style={{color: '#01181F'}}>Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/visitor-management" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Visitor Management</Link></li>
                <li><Link to="/maintenance" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Maintenance</Link></li>
                <li><Link to="/finance" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Finance</Link></li>
                <li><Link to="/communication" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Communication</Link></li>
                <li><Link to="/administration" className="text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Administration</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold mb-4" style={{color: '#01181F'}}>Contact Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#147783]" />
                  <span>Jaipur, Rajasthan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#147783]" />
                  <span>+91 9680211602</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#147783]" />
                  <span>info@society360.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-[#147783]" />
                  <span>www.society360.com</span>
                </div>
              </div>
            </div>

            {/* Our Partners */}
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold mb-4" style={{color: '#01181F'}}>Our Partners</h3>
              <p className="text-gray-600 text-sm">
                Partnering and Collaborating with an innovative community-tech platform to deliver smart, integrated, and real-world management solutions for modern societies.
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-600">
                <p>&copy; 2026 Society360. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Privacy & Policy</Link>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link>
                <Link to="/support" className="text-sm text-gray-600 hover:text-[#4C97A8] transition-colors" onClick={() => window.scrollTo(0, 0)}>Support</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Translate Component */}
      <Translate />
      
      {/* Chatbot Component */}
      <Chatbot />
      
      {/* Scroll Arrows */}
      <ScrollArrows />
    </div>
    </NotificationsProvider>
  );
};

export default Layout;
