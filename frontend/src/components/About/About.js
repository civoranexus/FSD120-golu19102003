import React from 'react';
import { Building, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Society360</h1>
        <p className="text-xl text-gray-600">Smart Residential Management System</p>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center mb-6">
          <Target className="h-8 w-8 text-blue-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Society360 is dedicated to revolutionizing residential society management through innovative technology solutions. 
          We provide a comprehensive platform that connects residents, management committees, and facility staff 
          for efficient, transparent, and secure operations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Building className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Management</h3>
          <p className="text-gray-600">
            Complete solution for visitor management, maintenance requests, financial operations, and community communication
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Users className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Role-Based Access</h3>
          <p className="text-gray-600">
            Secure authentication and authorization for residents, management staff, and security personnel
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Award className="h-12 w-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Excellence</h3>
          <p className="text-gray-600">
            Built with industry best practices and Civora Nexus quality standards
          </p>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Civora Nexus Pvt. Ltd.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-2 text-gray-600">
              <p><strong>Email:</strong> info@civoranexus.com</p>
              <p><strong>Phone:</strong> +91-7350 675192</p>
              <p><strong>Address:</strong> Sangamner, Maharashtra – 422605 India</p>
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

      {/* Call to Action */}
      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the Revolution</h2>
        <p className="text-blue-100 mb-6">
          Experience the future of residential society management with Society360
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Learn More
          </button>
          <button className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
