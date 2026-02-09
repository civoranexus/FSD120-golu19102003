import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Building, 
  Shield,
  ChevronRight
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const plans = {
    starter: {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: ['Up to 50 units', 'Visitor management', 'Basic maintenance', 'Email support'],
      color: '#142C52'
    },
    professional: {
      id: 'professional', 
      name: 'Professional',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: ['Up to 200 units', 'Advanced visitor system', 'Maintenance workflow', 'Financial dashboard'],
      color: '#178740'
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise', 
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: ['Unlimited units', 'All premium features', 'Custom integrations', '24/7 support'],
      color: '#1B9AAA'
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

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

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
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

  const validatePaymentDetails = () => {
    if (paymentMethod === 'upi') {
      return upiId && upiId.includes('@');
    } else if (paymentMethod === 'card') {
      return cardDetails.cardNumber && 
             cardDetails.cardNumber.replace(/\s/g, '').length >= 16 &&
             cardDetails.cardName && 
             cardDetails.expiryDate && 
             cardDetails.cvv;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentDetails()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const getPrice = () => {
    if (!selectedPlan) return 0;
    return billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No plan selected</h2>
          <Link to="/get-started" className="text-blue-600 hover:text-blue-700">
            Choose a plan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to plans
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Purchase</h1>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
                <p className="text-gray-600">{billingCycle} billing</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">₹{getPrice()}</p>
                <p className="text-sm text-gray-600">per {billingCycle === 'yearly' ? 'year' : 'month'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Choose Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handlePaymentMethodChange('upi')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">UPI</p>
              </button>

              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">Credit/Debit Card</p>
              </button>

              <button
                onClick={() => handlePaymentMethodChange('netbanking')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">Net Banking</p>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="your-upi@paytm"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formatCardNumber(cardDetails.cardNumber)}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardDetails.cardName}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Pay ₹{getPrice()}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Secure Payment</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
