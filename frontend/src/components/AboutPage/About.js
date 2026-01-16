import React from 'react';
import { Info, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-16 w-auto mr-3" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Society360</h1>
        <p className="text-xl text-gray-600">Smart Residential Management System</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center mb-6">
          <Target className="h-8 w-8 text-[#1B9AAA] mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Society360 is dedicated to revolutionizing residential society management through innovative technology solutions. 
          We provide a comprehensive platform that connects residents, management committees, and facility staff 
          for efficient, transparent, and secure operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Info className="h-12 w-12 text-[#1B9AAA]" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Management</h3>
          <p className="text-gray-600">
            Complete solution for visitor management, maintenance requests, financial operations, and community communication
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-12 w-12" style={{color: '#178740'}} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Role-Based Access</h3>
          <p className="text-gray-600">
            Secure authentication and authorization for residents, management staff, and security personnel
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Award className="h-12 w-12" style={{color: '#142C52'}} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Excellence</h3>
          <p className="text-gray-600">
            Built with industry best practices and Civora Nexus quality standards
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Civora Nexus Pvt. Ltd.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> info@society360.com</p>
              <p><strong>Phone:</strong> +91 9680211602</p>
              <p><strong>Address:</strong> Jaipur, Rajasthan</p>
              <p><strong>URN:</strong> UDYAM-MH-01-0075817</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Values</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Connecting Citizens Through Intelligent Innovation</strong></p>
              <p>• Quality Assurance</p>
              <p>• Customer Focus</p>
              <p>• Technological Excellence</p>
              <p>• Sustainable Solutions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E0F7FA] text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          <span style={{color: '#16808D'}}>Join the</span>{' '}
          <span style={{color: '#071426', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '2px'}}>Revolution</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Experience the future of residential society management with Society360
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-[#1B9AAA] rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors">
            Learn More
          </button>
          <button className="px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
