import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Target className="h-12 w-12" style={{ color: '#0C4A50' }} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Management</h3>
          <p className="text-gray-600">Comprehensive residential society management with modern technology solutions</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12" style={{ color: '#178740' }} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Centric</h3>
          <p className="text-gray-600">Designed for residents, management, and staff with role-based access</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12" style={{color: '#5B74A3'}} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Excellence</h3>
          <p className="text-gray-600">Industry-standard practices with Civora Nexus quality assurance</p>
        </div>
      </div>

      <div className="bg-[#E0F7FA] rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span style={{color: '#16808D'}}>Society360</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px'}}>at a Glance</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center shadow flex flex-col justify-center items-center" style={{minHeight: '240px'}}>
            <div className="text-3xl font-bold mb-2" style={{color: '#0C4A50'}}>156</div>
            <div className="text-gray-600">Active Residents</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow flex flex-col justify-center items-center" style={{minHeight: '240px'}}>
            <div className="text-3xl font-bold mb-2" style={{color: '#22C55E'}}>8</div>
            <div className="text-gray-600">Pending Requests</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow flex flex-col justify-center items-center" style={{minHeight: '240px'}}>
            <div className="text-3xl font-bold mb-2" style={{color: '#5B74A3'}}>23</div>
            <div className="text-gray-600">Active Visitors</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow flex flex-col justify-center items-center" style={{minHeight: '240px'}}>
            <div className="text-3xl font-bold mb-2" style={{color: '#EF4444'}}>99.9%</div>
            <div className="text-gray-600">System Uptime</div>
          </div>
        </div>
      </div>

      <div className="bg-[#E0F7FA] rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-center">
          <span style={{color: '#16808D'}}>Ready to</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px'}}>Get Started?</span>
        </h2>
        <p className="text-gray-600 mb-6">Join Society360 and experience modern residential management</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] transition-colors"
          >
            Create Account
          </Link>
          <Link
            to="/signin"
            className="px-8 py-3 bg-white text-[#1B9AAA] border border-[#4C97A8] rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
