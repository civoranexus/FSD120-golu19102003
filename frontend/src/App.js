import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './components/HomePage/Home';
import AboutPage from './components/AboutPage/About';
import ContactPage from './components/ContactPage/Contact';
import SignInPage from './components/AuthPages/Login';
import SignUpPage from './components/AuthPages/Register';
import UserDashboard from './components/UserDashboard/Dashboard';
import GuestRegistration from './components/ServiceModules/VisitorManagement';
import RepairServices from './components/ServiceModules/Maintenance';
import AccountingModule from './components/ServiceModules/Finance';
import MessagingHub from './components/ServiceModules/Communication';
import ManagementPanel from './components/ServiceModules/Administration';
import FacilityBooking from './components/ServiceModules/Amenities';
import IssueReporting from './components/ServiceModules/Complaints';
import SafetyMonitoring from './components/ServiceModules/Security';
import CrisisManagement from './components/ServiceModules/Emergency';
import ConfidentialityPolicy from './components/PrivacyPage/Privacy';
import TermsOfService from './components/TermsPage/Terms';
import HelpCenter from './components/HelpCenter/Support';
import FeaturesPage from './components/FeaturesPage/Features';
import GetStartedPage from './components/GetStartedPage/GetStarted';
import CheckoutPage from './components/CheckoutPage/Checkout';
import './App.css';

// Component to control scroll behavior
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top for specific routes, not for feature navigation
    const shouldScrollToTop = !location.pathname.startsWith('/features/');
    if (shouldScrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

function Application() {
  return (
    <Router 
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      scrollRestoration="manual"
    >
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/guest-registration" element={<GuestRegistration />} />
          <Route path="/repair-services" element={<RepairServices />} />
          <Route path="/accounting" element={<AccountingModule />} />
          <Route path="/messaging" element={<MessagingHub />} />
          <Route path="/management" element={<ManagementPanel />} />
          <Route path="/facilities" element={<FacilityBooking />} />
          <Route path="/safety" element={<SafetyMonitoring />} />
          <Route path="/issues" element={<IssueReporting />} />
          <Route path="/crisis" element={<CrisisManagement />} />
          <Route path="/confidentiality" element={<ConfidentialityPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/features" element={<FeaturesPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default Application;
