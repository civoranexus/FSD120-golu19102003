import React from 'react';
import { Link } from 'react-router-dom';
import { Building, ArrowRight, Users, Target, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-xl p-12 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Building className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Welcome to Civora Nexus</h1>
          <p className="text-xl mb-8 text-blue-100">Empowering next generation through innovative internship programs</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Society 360
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Submit Session Attendance
              <Users className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Target className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Management</h3>
          <p className="text-gray-600">Comprehensive residential society management with modern technology solutions</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Centric</h3>
          <p className="text-gray-600">Designed for residents, management, and staff with role-based access</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Excellence</h3>
          <p className="text-gray-600">Industry-standard practices with Civora Nexus quality assurance</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Society360 at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-gray-600">Active Residents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-gray-600">Pending Requests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
            <div className="text-gray-600">Active Visitors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
            <div className="text-gray-600">System Uptime</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">Join Society360 and experience modern residential management</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
