import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import VisitorManagement from './components/Modules/VisitorManagement';
import Maintenance from './components/Modules/Maintenance';
import Finance from './components/Modules/Finance';
import Communication from './components/Modules/Communication';
import Administration from './components/Modules/Administration';
import Privacy from './components/Privacy/Privacy';
import './App.css';

function App() {
  return (
    <Router>
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
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
