import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import VisitorManagement from './components/Modules/VisitorManagement';
import Maintenance from './components/Modules/Maintenance';
import Finance from './components/Modules/Finance';
import Communication from './components/Modules/Communication';
import Administration from './components/Modules/Administration';
import Amenities from './components/Modules/Amenities';
import Complaints from './components/Modules/Complaints';
import Security from './components/Modules/Security';
import Emergency from './components/Modules/Emergency';
import Privacy from './components/Privacy/Privacy';
import Terms from './components/Terms/Terms';
import Support from './components/Support/Support';
import './App.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/visitor-management" element={<VisitorManagement />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/security" element={<Security />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
