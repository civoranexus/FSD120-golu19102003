import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, UserPlus, Eye, EyeOff, Mail, Lock, User, Home, Phone } from 'lucide-react';

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitNumber: '',
    password: '',
    confirmPassword: '',
    accountType: 'resident'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const navigateToSignIn = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    
    setRegistrationData(previousData => ({
      ...previousData,
      [fieldName]: fieldValue
    }));
  };

  const validateRegistrationData = () => {
    const errors = {};
    
    if (!registrationData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!registrationData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!registrationData.email.trim()) {
      errors.email = 'Email address is required';
    }
    
    if (!registrationData.password) {
      errors.password = 'Password is required';
    }
    
    if (registrationData.password !== registrationData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setRegistrationError(Object.values(errors).join(', '));
      return false;
    }
    
    return true;
  };

  const attemptRegistration = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setRegistrationError('');

    if (!validateRegistrationData()) {
      setIsLoading(false);
      return;
    }

    try {
      const registrationResult = await registerNewUser(registrationData);
      
      if (registrationResult.success) {
        console.log('User registered successfully:', registrationResult.user);
        localStorage.setItem('currentUser', JSON.stringify(registrationResult.user));
        navigateToSignIn('/signin');
      } else {
        setRegistrationError(registrationResult.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration process failed:', error);
      setRegistrationError('Registration service temporarily unavailable.');
    } finally {
      setIsLoading(false);
    }
  };

  const registerNewUser = async (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    if (existingUsers.some(user => user.email === userData.email)) {
      return {
        success: false,
        message: 'Email address already registered'
      };
    }

    const newUser = {
      id: Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      unit: userData.unitNumber,
      role: userData.accountType,
      registrationDate: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    return {
      success: true,
      message: 'Registration completed successfully',
      user: newUser
    };
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logo.svg" alt="Society360 Logo" className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Society360
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your account for Smart Residential Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={attemptRegistration}>
            {registrationError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {registrationError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={registrationData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={registrationData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
                User Role
              </label>
              <select
                id="userRole"
                name="userRole"
                value={registrationData.userRole}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
              >
                <option value="resident">Resident</option>
                <option value="management">Management/Admin</option>
                <option value="staff">Security/Staff</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={registrationData.email}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={registrationData.phone}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {registrationData.userRole === 'resident' && (
              <div>
                <label htmlFor="unitNumber" className="block text-sm font-medium text-gray-700">
                  Unit Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Home className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    required
                    value={registrationData.unitNumber}
                    onChange={handleInputChange}
                    className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                    placeholder="e.g., A-101"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={registrationData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={registrationData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1B9AAA] focus:border-[#1B9AAA]"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#16808D] hover:bg-[#1B9AAA] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signin"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
