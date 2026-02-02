import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Zap,
  Lock,
  User,
  Building,
  DollarSign,
  Calendar,
  Award,
  Star,
  ChevronRight,
  QrCode,
  IndianRupee,
  Phone,
  Mail
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [currentStep, setCurrentStep] = useState('payment');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsCommunity: true,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  // Get plan and user data from URL params or localStorage
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userData, setUserData] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

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
    // Get data from URL params or localStorage
    const planId = searchParams.get('plan');
    const billing = searchParams.get('billing');
    const savedUserData = localStorage.getItem('registrationData');
    
    if (planId && plans[planId]) {
      setSelectedPlan(plans[planId]);
    }
    if (billing) {
      setBillingCycle(billing);
    }
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, [searchParams]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentStatus('');
  };

  const handleCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBillingAddressChange = (e) => {
    const { name, value, checked } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setPaymentStatus('error');
        return false;
      }
    } else if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16 ||
          !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
        setPaymentStatus('error');
        return false;
      }
    } else if (paymentMethod === 'netbanking') {
      // Net banking validation - in real app, would check if bank is selected
      // For now, we'll allow it to proceed
      return true;
    }
    return true;
  };

  const handlePayment = async () => {
    // Handle free plan - no payment required
    if (billingCycle === 'free') {
      setIsLoading(true);
      setPaymentStatus('processing');

      try {
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const paymentData = {
          method: 'free',
          amount: 0,
          planId: selectedPlan?.id,
          billingCycle: 'free',
          userId: userData?.email,
          timestamp: new Date().toISOString()
        };

        localStorage.setItem('paymentData', JSON.stringify(paymentData));
        setPaymentStatus('success');
        setCurrentStep('confirmation');
        
        // Auto-redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);

      } catch (error) {
        console.error('Free plan error:', error);
        setPaymentStatus('error');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Paid plans - validate and process payment
    if (!validatePaymentDetails()) {
      return;
    }

    setIsLoading(true);
    setPaymentStatus('processing');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock payment success
      const paymentData = {
        method: paymentMethod,
        amount: billingCycle === 'weekly' ? selectedPlan.weeklyPrice : 
               billingCycle === 'monthly' ? selectedPlan.monthlyPrice : 
               selectedPlan.yearlyPrice,
        planId: selectedPlan.id,
        billingCycle,
        userId: userData?.email,
        timestamp: new Date().toISOString(),
        paymentId: `PAY${Date.now()}`,
        status: 'success'
      };

      // Save payment data to localStorage (in real app, this would be sent to backend)
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      localStorage.setItem('userSubscription', JSON.stringify({
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        billingCycle,
        amount: paymentData.amount,
        startDate: new Date().toISOString(),
        endDate: billingCycle === 'yearly' ? 
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() :
          billingCycle === 'monthly' ? 
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() :
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      
      setPaymentStatus('success');
      setCurrentStep('confirmation');
      
      // Auto-redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const generateUPIQR = () => {
    // Mock UPI QR code data
    return `upi://pay?pa=society360@okicici&pn=Society360&am=${billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}&cu=INR`;
  };

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {billingCycle === 'free' ? 'Free Plan Activation' : 'Choose Payment Method'}
      </h3>
      
      {/* Free Plan Message */}
      {billingCycle === 'free' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <h4 className="text-lg font-semibold text-green-800">You've chosen the Free Plan!</h4>
          </div>
          <p className="text-green-700 mb-4">
            Enjoy basic features forever without any cost. No credit card required.
          </p>
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold mb-2">What you'll get:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedPlan?.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Payment Method Selection - Only show for paid plans */}
      {billingCycle !== 'free' && (
        <div className="space-y-6 mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-6">Choose Payment Method</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* UPI Payment */}
            <button
              onClick={() => handlePaymentMethodChange('upi')}
              className={`p-8 rounded-xl border-2 transition-all hover:shadow-xl hover:scale-105 ${
                paymentMethod === 'upi'
                  ? 'border-[#16808D] bg-gradient-to-br from-[#E0F7FA] to-[#B3E5FC] shadow-lg'
                  : 'border-gray-200 hover:border-[#16808D] bg-white'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-blue-500 p-4 rounded-full shadow-md">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-2">UPI</h4>
                  <p className="text-sm text-gray-600 font-medium">Instant Payment</p>
                </div>
                <div className="flex space-x-2">
                  <div className="bg-green-500 px-3 py-1 rounded-full text-white text-xs font-bold">GPAY</div>
                  <div className="bg-purple-500 px-3 py-1 rounded-full text-white text-xs font-bold">PAYTM</div>
                </div>
              </div>
            </button>

            {/* Credit/Debit Card */}
            <button
              onClick={() => handlePaymentMethodChange('card')}
              className={`p-8 rounded-xl border-2 transition-all hover:shadow-xl hover:scale-105 ${
                paymentMethod === 'card'
                  ? 'border-[#16808D] bg-gradient-to-br from-[#E0F7FA] to-[#B3E5FC] shadow-lg'
                  : 'border-gray-200 hover:border-[#16808D] bg-white'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-blue-600 p-4 rounded-full shadow-md">
                  <CreditCard className="h-8 w-8 text-white"/>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-2">Card</h4>
                  <p className="text-sm text-gray-600 font-medium">Credit/Debit</p>
                </div>
                <div className="flex space-x-2">
                  <div className="bg-red-500 px-3 py-1 rounded-full text-white text-xs font-bold">VISA</div>
                  <div className="bg-yellow-500 px-3 py-1 rounded-full text-white text-xs font-bold">MC</div>
                </div>
              </div>
            </button>

            {/* Net Banking */}
            <button
              onClick={() => handlePaymentMethodChange('netbanking')}
              className={`p-8 rounded-xl border-2 transition-all hover:shadow-xl hover:scale-105 ${
                paymentMethod === 'netbanking'
                  ? 'border-[#16808D] bg-gradient-to-br from-[#E0F7FA] to-[#B3E5FC] shadow-lg'
                  : 'border-gray-200 hover:border-[#16808D] bg-white'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-green-600 p-4 rounded-full shadow-md">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-xl mb-2">Banking</h4>
                  <p className="text-sm text-gray-600 font-medium">Net Banking</p>
                </div>
                <div className="flex space-x-2">
                  <div className="bg-blue-500 px-3 py-1 rounded-full text-white text-xs font-bold">SBI</div>
                  <div className="bg-orange-500 px-3 py-1 rounded-full text-white text-xs font-bold">HDFC</div>
                </div>
              </div>
            </button>
          </div>

          {/* Popular Payment Apps - Simplified */}
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">Popular Payment Apps</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="bg-green-500 w-6 h-6 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Google Pay</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="bg-purple-500 w-6 h-6 rounded-full mr-2"></div>
                <span className="text-sm font-medium">PhonePe</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="bg-blue-500 w-6 h-6 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Paytm</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="bg-orange-500 w-6 h-6 rounded-full mr-2"></div>
                <span className="text-sm font-medium">BHIM</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment Form - Only show for paid plans */}
      {billingCycle !== 'free' && paymentMethod === 'upi' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-[#16808D]" />
            UPI Payment Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID *</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@okbank"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., username@okbank)</p>
              
              {/* Popular UPI Apps */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Popular UPI Apps:</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-green-50 p-2 rounded">
                    <div className="bg-green-500 w-6 h-6 rounded mr-2"></div>
                    <span className="text-xs">Google Pay</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-2 rounded">
                    <div className="bg-blue-500 w-6 h-6 rounded mr-2"></div>
                    <span className="text-xs">PhonePe</span>
                  </div>
                  <div className="flex items-center bg-purple-50 p-2 rounded">
                    <div className="bg-purple-500 w-6 h-6 rounded mr-2"></div>
                    <span className="text-xs">Paytm</span>
                  </div>
                  <div className="flex items-center bg-orange-50 p-2 rounded">
                    <div className="bg-orange-500 w-6 h-6 rounded mr-2"></div>
                    <span className="text-xs">BHIM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded-lg mb-2">
                  <QrCode className="h-32 w-32 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600">Scan QR code to pay</p>
                <p className="text-xs text-gray-500">Amount: ₹{billingCycle === 'weekly' ? (selectedPlan.weeklyPrice * 83) : billingCycle === 'monthly' ? (selectedPlan.monthlyPrice * 83) : (selectedPlan.yearlyPrice * 83)}</p>
                <div className="mt-2 p-2 bg-yellow-50 rounded">
                  <p className="text-xs text-yellow-800">QR code expires in 10 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Instructions:</strong> Enter your UPI ID above or scan the QR code using any UPI app. 
              You will receive a payment request on your UPI app. Approve to complete payment.
            </p>
          </div>
        </div>
      )}

      {/* Net Banking Form - Only show for paid plans */}
      {billingCycle !== 'free' && paymentMethod === 'netbanking' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Building className="h-5 w-5 mr-2 text-[#16808D]" />
            Net Banking
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Bank *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent">
                <option value="">-- Select Bank --</option>
                <optgroup label="Popular Banks">
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="bob">Bank of Baroda</option>
                  <option value="canara">Canara Bank</option>
                  <option value="union">Union Bank of India</option>
                </optgroup>
                <optgroup label="Other Banks">
                  <option value="kotak">Kotak Mahindra Bank</option>
                  <option value="indusind">IndusInd Bank</option>
                  <option value="yesbank">Yes Bank</option>
                  <option value="idfc">IDFC First Bank</option>
                  <option value="federal">Federal Bank</option>
                  <option value="rbl">RBL Bank</option>
                </optgroup>
              </select>
            </div>

            {/* Popular Banks Grid */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Popular Banks:</p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                <div className="bg-blue-50 p-2 rounded text-center">
                  <div className="bg-blue-600 w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">SBI</span>
                  </div>
                  <span className="text-xs">SBI</span>
                </div>
                <div className="bg-red-50 p-2 rounded text-center">
                  <div className="bg-red-600 w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">HDFC</span>
                  </div>
                  <span className="text-xs">HDFC</span>
                </div>
                <div className="bg-orange-50 p-2 rounded text-center">
                  <div className="bg-orange-600 w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ICICI</span>
                  </div>
                  <span className="text-xs">ICICI</span>
                </div>
                <div className="bg-green-50 p-2 rounded text-center">
                  <div className="bg-green-600 w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PNB</span>
                  </div>
                  <span className="text-xs">PNB</span>
                </div>
                <div className="bg-purple-50 p-2 rounded text-center">
                  <div className="bg-purple-600 w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AXIS</span>
                  </div>
                  <span className="text-xs">Axis</span>
                </div>
                <div className="bg-indigo-50 p-2 rounded text-center">
                  <div className="bg-indigo-600 w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">BOB</span>
                  </div>
                  <span className="text-xs">BOB</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instructions:</strong> Select your bank from the dropdown above. You will be redirected to your bank's secure payment portal to complete the transaction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Card Payment Form - Only show for paid plans */}
      {billingCycle !== 'free' && paymentMethod === 'card' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-[#16808D]" />
            Card Details
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardInputChange({
                    ...e,
                    target: { ...e.target, value: formatCardNumber(e.target.value) }
                  })}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
              <input
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleCardInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={(e) => handleCardInputChange({
                    ...e,
                    target: { ...e.target, value: formatExpiryDate(e.target.value) }
                  })}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  maxLength="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="saveCard"
                checked={cardDetails.saveCard}
                onChange={handleCardInputChange}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">Save card for future payments</label>
            </div>
          </div>
        </div>
      )}

      {/* Billing Address - Only show for paid plans */}
      {billingCycle !== 'free' && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h4 className="font-semibold text-lg mb-4">Billing Address</h4>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sameAsCommunity"
                checked={billingAddress.sameAsCommunity}
                onChange={handleBillingAddressChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Same as community address</span>
            </label>
          </div>

          {!billingAddress.sameAsCommunity && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={billingAddress.address}
                  onChange={handleBillingAddressChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={billingAddress.city}
                    onChange={handleBillingAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={billingAddress.state}
                    onChange={handleBillingAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16808D] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Status Messages */}
      {paymentStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800">
              {billingCycle === 'free' ? 'Activation failed. Please try again.' : 'Payment failed. Please check your details and try again.'}
            </span>
          </div>
        </div>
      )}

      {paymentStatus === 'processing' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800">
              {billingCycle === 'free' ? 'Activating your free plan... Please wait.' : 'Processing payment... Please wait.'}
            </span>
          </div>
        </div>
      )}

      {/* Pay/Activate Button */}
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className={`w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center ${
          isLoading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : billingCycle === 'free'
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-[#16808D] text-white hover:bg-[#142C52]'
        }`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {billingCycle === 'free' ? 'Activating...' : 'Processing Payment...'}
          </>
        ) : (
          <>
            {billingCycle === 'free' ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Activate Free Plan
              </>
            ) : (
              <>
                <Lock className="mr-2 h-5 w-5" />
                Pay ₹{billingCycle === 'weekly' ? (selectedPlan.weeklyPrice * 83) : billingCycle === 'monthly' ? (selectedPlan.monthlyPrice * 83) : (selectedPlan.yearlyPrice * 83)}
              </>
            )}
          </>
        )}
      </button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900">
        {billingCycle === 'free' ? 'Free Plan Activated!' : 'Payment Successful!'}
      </h2>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4 text-green-800">Transaction Details</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">TXN{Date.now()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">
              {billingCycle === 'free' ? 'FREE' : `₹${billingCycle === 'yearly' ? (selectedPlan.yearlyPrice * 83) : (billingCycle === 'monthly' ? (selectedPlan.monthlyPrice * 83) : (selectedPlan.weeklyPrice * 83))}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <span className="font-medium">{selectedPlan.name} ({billingCycle})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium">
              {billingCycle === 'free' ? 'Free Plan' : 
               paymentMethod === 'upi' ? 'UPI Payment' : 
               paymentMethod === 'card' ? 'Credit/Debit Card' : 
               'Net Banking'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          <strong>Welcome to Society360!</strong> Your account has been successfully created and activated. 
          Redirecting to your dashboard in 3 seconds...
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#142C52] transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] to-[#D4DBE9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Plan Selected</h1>
          <p className="text-gray-600 mb-6">Please select a plan first.</p>
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
            <Link to="/get-started" className="flex items-center text-[#16808D] hover:text-[#142C52] transition-colors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Registration
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#16808D]" />
              <span className="text-sm font-medium text-gray-600">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 'payment' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {renderPaymentForm()}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: selectedPlan.color }}>
                      {React.createElement(selectedPlan.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <div>
                      <h4 className="font-bold">{selectedPlan.name}</h4>
                      <p className="text-sm text-gray-600">{billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} Plan</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Plan Price:</span>
                      <span className="font-medium">
                        {billingCycle === 'free' ? 'FREE' : 
                         `₹${billingCycle === 'yearly' ? (selectedPlan.yearlyPrice * 83) : 
                               billingCycle === 'monthly' ? (selectedPlan.monthlyPrice * 83) : 
                               (selectedPlan.weeklyPrice * 83)}`}
                      </span>
                    </div>
                    {billingCycle !== 'free' && (
                      <>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">GST (18%):</span>
                          <span className="font-medium">
                            ₹{Math.round((billingCycle === 'yearly' ? selectedPlan.yearlyPrice * 83 : 
                                          billingCycle === 'monthly' ? selectedPlan.monthlyPrice * 83 : 
                                          selectedPlan.weeklyPrice * 83) * 0.18)}
                          </span>
                        </div>
                        {billingCycle === 'yearly' && (
                          <div className="flex justify-between mb-2 text-green-600">
                            <span>Yearly Discount:</span>
                            <span className="font-medium">
                              -₹{Math.round(selectedPlan.monthlyPrice * 12 * 83 - selectedPlan.yearlyPrice * 83)}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount:</span>
                        <span className="text-[#16808D]">
                          {billingCycle === 'free' ? 'FREE' : 
                           `₹${Math.round((billingCycle === 'yearly' ? selectedPlan.yearlyPrice * 83 : 
                                         billingCycle === 'monthly' ? selectedPlan.monthlyPrice * 83 : 
                                         selectedPlan.weeklyPrice * 83) * 1.18)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Plan Features:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedPlan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {selectedPlan.features.length > 3 && (
                        <li className="text-blue-600">+{selectedPlan.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center text-blue-800">
                      <Shield className="h-4 w-4 mr-2" />
                      <span className="text-sm">Secure payment powered by Razorpay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {renderConfirmation()}
          </div>
        )}
      </div>

      {/* Security Badges */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Lock className="h-4 w-4 mr-1" />
              256-bit SSL Encryption
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              PCI DSS Compliant
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Secure Payment Gateway
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
