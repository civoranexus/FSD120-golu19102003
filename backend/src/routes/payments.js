const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Mock payment database (in production, use a real database)
const payments = [];
const transactions = [];

// Middleware to validate payment data
const validatePayment = (req, res, next) => {
  const { amount, paymentMethod, planId, billingCycle } = req.body;
  
  if (!amount || !paymentMethod || !planId || !billingCycle) {
    return res.status(400).json({
      success: false,
      message: 'Missing required payment information'
    });
  }

  const validMethods = ['upi', 'card', 'netbanking'];
  if (!validMethods.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid payment method'
    });
  }

  next();
};

// UPI Payment Processing
router.post('/upi', validatePayment, async (req, res) => {
  try {
    const { upiId, amount, planId, billingCycle } = req.body;

    // Validate UPI ID format
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    if (!upiRegex.test(upiId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid UPI ID format'
      });
    }

    // Simulate UPI payment processing
    const transactionId = 'UPI' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const payment = {
      id: transactionId,
      method: 'upi',
      upiId,
      amount,
      planId,
      billingCycle,
      status: 'processing',
      timestamp: new Date().toISOString(),
      gateway: 'GPay/PhonePe/Paytm'
    };

    payments.push(payment);

    // Simulate payment processing delay
    setTimeout(() => {
      const paymentIndex = payments.findIndex(p => p.id === transactionId);
      if (paymentIndex !== -1) {
        // 90% success rate for demo
        payments[paymentIndex].status = Math.random() > 0.1 ? 'success' : 'failed';
        payments[paymentIndex].processedAt = new Date().toISOString();
      }
    }, 2000);

    res.json({
      success: true,
      message: 'UPI payment initiated successfully',
      data: {
        transactionId,
        status: 'processing',
        amount,
        upiId: upiId.replace(/(.{2}).*(@.*)/, '$1***$2') // Mask UPI ID
      }
    });

  } catch (error) {
    console.error('UPI Payment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process UPI payment'
    });
  }
});

// Credit/Debit Card Payment Processing
router.post('/card', validatePayment, async (req, res) => {
  try {
    const { cardNumber, expiryMonth, expiryYear, cvv, cardName, amount, planId, billingCycle } = req.body;

    // Validate card details
    if (!cardNumber || cardNumber.length < 16 || cardNumber.length > 19) {
      return res.status(400).json({
        success: false,
        message: 'Invalid card number'
      });
    }

    if (!expiryMonth || !expiryYear || expiryMonth < 1 || expiryMonth > 12) {
      return res.status(400).json({
        success: false,
        message: 'Invalid expiry date'
      });
    }

    if (!cvv || cvv.length < 3 || cvv.length > 4) {
      return res.status(400).json({
        success: false,
        message: 'Invalid CVV'
      });
    }

    const transactionId = 'CARD' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const payment = {
      id: transactionId,
      method: 'card',
      cardNumber: '****-****-****-' + cardNumber.slice(-4),
      cardName,
      amount,
      planId,
      billingCycle,
      status: 'processing',
      timestamp: new Date().toISOString(),
      gateway: 'Visa/Mastercard/Rupay'
    };

    payments.push(payment);

    // Simulate card payment processing
    setTimeout(() => {
      const paymentIndex = payments.findIndex(p => p.id === transactionId);
      if (paymentIndex !== -1) {
        // 85% success rate for demo
        payments[paymentIndex].status = Math.random() > 0.15 ? 'success' : 'failed';
        payments[paymentIndex].processedAt = new Date().toISOString();
      }
    }, 3000);

    res.json({
      success: true,
      message: 'Card payment initiated successfully',
      data: {
        transactionId,
        status: 'processing',
        amount,
        cardNumber: '****-****-****-' + cardNumber.slice(-4),
        gateway: 'Visa/Mastercard/Rupay'
      }
    });

  } catch (error) {
    console.error('Card Payment Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process card payment'
    });
  }
});

// Net Banking Payment Processing
router.post('/netbanking', validatePayment, async (req, res) => {
  try {
    const { bankCode, accountNumber, ifsc, amount, planId, billingCycle } = req.body;

    // Validate bank details
    const supportedBanks = {
      'SBI': 'STATE BANK OF INDIA',
      'HDFC': 'HDFC BANK',
      'ICICI': 'ICICI BANK',
      'PNB': 'PUNJAB NATIONAL BANK',
      'BOB': 'BANK OF BARODA',
      'KOTAK': 'KOTAK MAHINDRA BANK',
      'AXIS': 'AXIS BANK',
      'CANARA': 'CANARA BANK'
    };

    if (!supportedBanks[bankCode]) {
      return res.status(400).json({
        success: false,
        message: 'Unsupported bank',
        data: { supportedBanks: Object.keys(supportedBanks) }
      });
    }

    if (!accountNumber || accountNumber.length < 9 || accountNumber.length > 18) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account number'
      });
    }

    if (!ifsc || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IFSC code'
      });
    }

    const transactionId = 'NB' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    const payment = {
      id: transactionId,
      method: 'netbanking',
      bankName: supportedBanks[bankCode],
      bankCode,
      accountNumber: 'XX' + accountNumber.slice(-4),
      ifsc,
      amount,
      planId,
      billingCycle,
      status: 'processing',
      timestamp: new Date().toISOString(),
      gateway: 'Net Banking'
    };

    payments.push(payment);

    // Simulate net banking processing
    setTimeout(() => {
      const paymentIndex = payments.findIndex(p => p.id === transactionId);
      if (paymentIndex !== -1) {
        // 80% success rate for demo
        payments[paymentIndex].status = Math.random() > 0.2 ? 'success' : 'failed';
        payments[paymentIndex].processedAt = new Date().toISOString();
      }
    }, 4000);

    res.json({
      success: true,
      message: 'Net banking payment initiated successfully',
      data: {
        transactionId,
        status: 'processing',
        amount,
        bankName: supportedBanks[bankCode],
        accountNumber: 'XX' + accountNumber.slice(-4)
      }
    });

  } catch (error) {
    console.error('Net Banking Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process net banking payment'
    });
  }
});

// Check Payment Status
router.get('/status/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  
  const payment = payments.find(p => p.id === transactionId);
  
  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }

  // Return masked payment details
  const response = {
    success: true,
    data: {
      transactionId: payment.id,
      status: payment.status,
      amount: payment.amount,
      method: payment.method,
      timestamp: payment.timestamp,
      processedAt: payment.processedAt
    }
  };

  // Add method-specific details
  if (payment.method === 'upi') {
    response.data.upiId = payment.upiId;
  } else if (payment.method === 'card') {
    response.data.cardNumber = payment.cardNumber;
    response.data.gateway = payment.gateway;
  } else if (payment.method === 'netbanking') {
    response.data.bankName = payment.bankName;
    response.data.accountNumber = payment.accountNumber;
  }

  res.json(response);
});

// Get Payment History
router.get('/history', (req, res) => {
  const { limit = 10, offset = 0, status } = req.query;
  
  let filteredPayments = payments;
  
  if (status) {
    filteredPayments = payments.filter(p => p.status === status);
  }
  
  // Sort by timestamp (newest first)
  filteredPayments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  // Apply pagination
  const paginatedPayments = filteredPayments.slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );

  res.json({
    success: true,
    data: {
      payments: paginatedPayments.map(payment => ({
        id: payment.id,
        method: payment.method,
        amount: payment.amount,
        status: payment.status,
        timestamp: payment.timestamp,
        processedAt: payment.processedAt,
        // Add method-specific masked details
        ...(payment.method === 'upi' && { upiId: payment.upiId }),
        ...(payment.method === 'card' && { 
          cardNumber: payment.cardNumber,
          gateway: payment.gateway 
        }),
        ...(payment.method === 'netbanking' && { 
          bankName: payment.bankName,
          accountNumber: payment.accountNumber 
        })
      })),
      total: filteredPayments.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    }
  });
});

// Refund Payment (Admin functionality)
router.post('/refund/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  const { reason } = req.body;
  
  const payment = payments.find(p => p.id === transactionId);
  
  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }

  if (payment.status !== 'success') {
    return res.status(400).json({
      success: false,
      message: 'Only successful transactions can be refunded'
    });
  }

  // Create refund transaction
  const refundId = 'REF' + Date.now() + Math.random().toString(36).substr(2, 9);
  
  const refund = {
    id: refundId,
    originalTransactionId: transactionId,
    method: payment.method,
    amount: -payment.amount, // Negative amount for refund
    status: 'processing',
    reason: reason || 'Customer requested refund',
    timestamp: new Date().toISOString()
  };

  payments.push(refund);

  // Simulate refund processing
  setTimeout(() => {
    const refundIndex = payments.findIndex(p => p.id === refundId);
    if (refundIndex !== -1) {
      payments[refundIndex].status = 'success';
      payments[refundIndex].processedAt = new Date().toISOString();
    }
  }, 2000);

  res.json({
    success: true,
    message: 'Refund initiated successfully',
    data: {
      refundId,
      originalTransactionId: transactionId,
      amount: Math.abs(payment.amount),
      status: 'processing'
    }
  });
});

// Get Supported Banks for Net Banking
router.get('/banks', (req, res) => {
  const supportedBanks = {
    'SBI': 'STATE BANK OF INDIA',
    'HDFC': 'HDFC BANK',
    'ICICI': 'ICICI BANK',
    'PNB': 'PUNJAB NATIONAL BANK',
    'BOB': 'BANK OF BARODA',
    'KOTAK': 'KOTAK MAHINDRA BANK',
    'AXIS': 'AXIS BANK',
    'CANARA': 'CANARA BANK',
    'UNION': 'UNION BANK OF INDIA',
    'INDIAN': 'INDIAN BANK',
    'CENTRAL': 'CENTRAL BANK OF INDIA',
    'UCO': 'UCO BANK',
    'IDBI': 'IDBI BANK',
    'BANK_OF_INDIA': 'BANK OF INDIA',
    'ANDHRA': 'ANDHRA BANK'
  };

  res.json({
    success: true,
    data: {
      banks: Object.entries(supportedBanks).map(([code, name]) => ({
        code,
        name,
        status: 'active'
      }))
    }
  });
});

module.exports = router;
