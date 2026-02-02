import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Building, 
  Shield, 
  CheckCircle, 
  Star, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Zap,
  ChevronRight,
  Clock,
  DollarSign,
  Award,
  MessageSquare
} from 'lucide-react';

const GetStarted = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Community Information
    communityName: '',
    communityType: '',
    totalUnits: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Account Information
    companyName: '',
    role: '',
    password: '',
    confirmPassword: '',
    
    // Preferences
    preferredContact: 'email',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const plans = {
    starter: {
      id: 'starter',
      name: 'Starter',
      freePrice: 0,
      weeklyPrice: 3,
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: [
        'Up to 50 residential units',
        'Essential visitor management',
        'Basic maintenance tracking',
        'Email support assistance'
      ],
      color: '#142C52',
      icon: Building
    },
    professional: {
      id: 'professional',
      name: 'Professional',
      freePrice: 0,
      weeklyPrice: 8,
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 200 residential units',
        'Advanced visitor management system',
        'Complete maintenance workflow',
        'Comprehensive financial dashboard',
        'Priority customer support'
      ],
      color: '#178740',
      icon: Award
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      freePrice: 0,
      weeklyPrice: 20,
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        'Unlimited residential units',
        'All premium features included',
        'Custom integration options',
        'Dedicated account manager',
        '24/7 phone support availability'
      ],
      color: '#1B9AAA',
      icon: Star
    }
  };

  useEffect(() => {
    const planId = searchParams.get('plan');
    const billing = searchParams.get('billing');
    
    if (planId && plans[planId]) {
      setSelectedPlan(plans[planId]);
    }
    if (billing) {
      setBillingCycle(billing);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.communityName && formData.communityType && formData.totalUnits && formData.address;
      case 3:
        return formData.companyName && formData.role && formData.password && formData.password === formData.confirmPassword;
      case 4:
        return formData.agreeToTerms && formData.agreeToPrivacy;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsLoading(true);
    
    try {
      // Save registration data to localStorage for checkout
      localStorage.setItem('registrationData', JSON.stringify(formData));
      
      // Handle free plan - redirect directly to dashboard
      if (billingCycle === 'free') {
        // Simulate API call for free plan
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
        
        // Save free plan subscription data
        const subscriptionData = {
          planId: selectedPlan?.id,
          planName: selectedPlan?.name,
          billingCycle: 'free',
          amount: 0,
          startDate: new Date().toISOString(),
          endDate: null, // Free plan doesn't expire
          status: 'active'
        };
        
        localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // Show success message
        setPaymentStatus('success');
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Paid plans - redirect to checkout
        // Save plan selection data
        const planData = {
          planId: selectedPlan?.id,
          planName: selectedPlan?.name,
          billingCycle,
          amount: billingCycle === 'weekly' ? selectedPlan?.weeklyPrice : 
                 billingCycle === 'monthly' ? selectedPlan?.monthlyPrice : 
                 selectedPlan?.yearlyPrice
        };
        
        localStorage.setItem('selectedPlanData', JSON.stringify(planData));
        
        // Redirect to checkout page
        navigate(`/checkout?plan=${selectedPlan?.id}&billing=${billingCycle}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Community Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Community Name *</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="communityName"
                  value={formData.communityName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="Sunset Apartments"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Community Type *</label>
                <select
                  name="communityType"
                  value={formData.communityType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="apartment">Apartment Complex</option>
                  <option value="condo">Condominium</option>
                  <option value="villa">Villa Community</option>
                  <option value="gated">Gated Community</option>
                  <option value="society">Housing Society</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Units *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="totalUnits"
                    value={formData.totalUnits}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                    placeholder="150"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="123 Main Street"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="New York"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="NY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Setup</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                placeholder="Sunset Management LLC"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
              >
                <option value="">Select your role</option>
                <option value="manager">Community Manager</option>
                <option value="admin">Administrator</option>
                <option value="owner">Property Owner</option>
                <option value="secretary">Secretary</option>
                <option value="treasurer">Treasurer</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Phone className="h-4 w-4 mr-1" />
                  Phone
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Review & Confirm</h3>
            
            {/* Selected Plan Summary */}
            {selectedPlan && (
              <div className="bg-gradient-to-r from-[#E0F7FA] to-[#D4DBE9] rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Selected Plan</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: selectedPlan.color }}>
                      {React.createElement(selectedPlan.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <div>
                      <h5 className="font-bold text-lg">{selectedPlan.name}</h5>
                      <p className="text-gray-600">
                        {billingCycle === 'free' ? (
                          'FREE Forever'
                        ) : billingCycle === 'weekly' ? (
                          `$${selectedPlan.weeklyPrice}/week`
                        ) : billingCycle === 'monthly' ? (
                          `$${selectedPlan.monthlyPrice}/month`
                        ) : (
                          `$${selectedPlan.yearlyPrice}/year`
                        )}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            {/* Summary Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Account Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {formData.email}
                </div>
                <div>
                  <span className="font-medium">Community:</span> {formData.communityName}
                </div>
                <div>
                  <span className="font-medium">Units:</span> {formData.totalUnits}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-[#16808D] hover:underline">Terms of Service</Link> and understand the subscription terms.
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <Link to="/privacy" className="text-[#16808D] hover:underline">Privacy Policy</Link> and consent to data processing.
                </span>
              </label>
            </div>

            {/* Benefits */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">What's Included:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  14-day free trial (no credit card required)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Instant setup and onboarding assistance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Cancel anytime without penalties
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Plan Selected</h1>
          <p className="text-gray-600 mb-6">Please select a plan from the pricing page first.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#142C52] transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-[#16808D] hover:text-[#142C52] transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#16808D]" />
              <span className="text-sm font-medium text-gray-600">Secure Registration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-[#16808D] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-[#16808D]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between mb-8 text-sm">
          <span className={currentStep >= 1 ? 'text-[#16808D] font-semibold' : 'text-gray-600'}>
            Personal Info
          </span>
          <span className={currentStep >= 2 ? 'text-[#16808D] font-semibold' : 'text-gray-600'}>
            Community Info
          </span>
          <span className={currentStep >= 3 ? 'text-[#16808D] font-semibold' : 'text-gray-600'}>
            Account Setup
          </span>
          <span className={currentStep >= 4 ? 'text-[#16808D] font-semibold' : 'text-gray-600'}>
            Review & Confirm
          </span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Error/Success Messages */}
          {paymentStatus === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800">Registration failed. Please try again.</span>
              </div>
            </div>
          )}
          
          {paymentStatus === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800">Registration successful! Redirecting...</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center ${
                    validateStep(currentStep)
                      ? 'bg-[#16808D] text-white hover:bg-[#142C52]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !validateStep(currentStep)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center ${
                    isLoading || !validateStep(currentStep)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#16808D] text-white hover:bg-[#142C52]'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Complete Registration
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help with registration?</p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/contact"
              className="text-[#16808D] hover:text-[#142C52] font-semibold transition-colors"
            >
              <MessageSquare className="h-4 w-4 inline mr-1" />
              Contact Support
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/faq"
              className="text-[#16808D] hover:text-[#142C52] font-semibold transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
