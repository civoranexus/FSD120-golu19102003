const express = require('express');
const router = express.Router();

const payments = [];

router.post('/upi', (req, res) => {
  try {
    const { upiId, amount } = req.body;
    
    if (!upiId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'UPI ID and amount required'
      });
    }
    
    const transactionId = 'UPI' + Date.now();
    const payment = {
      id: transactionId,
      method: 'upi',
      upiId,
      amount,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    payments.push(payment);
    
    setTimeout(() => {
      const index = payments.findIndex(p => p.id === transactionId);
      if (index !== -1) {
        payments[index].status = 'success';
      }
    }, 2000);
    
    res.json({
      success: true,
      message: 'UPI payment initiated',
      transactionId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'UPI payment failed'
    });
  }
});

router.post('/card', (req, res) => {
  try {
    const { cardNumber, expiryMonth, expiryYear, cvv, amount } = req.body;
    
    if (!cardNumber || !expiryMonth || !expiryYear || !cvv || !amount) {
      return res.status(400).json({
        success: false,
        message: 'All card details required'
      });
    }
    
    const transactionId = 'CARD' + Date.now();
    const payment = {
      id: transactionId,
      method: 'card',
      cardNumber: '****-****-****-' + cardNumber.slice(-4),
      amount,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    payments.push(payment);
    
    setTimeout(() => {
      const index = payments.findIndex(p => p.id === transactionId);
      if (index !== -1) {
        payments[index].status = 'success';
      }
    }, 3000);
    
    res.json({
      success: true,
      message: 'Card payment initiated',
      transactionId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Card payment failed'
    });
  }
});

router.post('/netbanking', (req, res) => {
  try {
    const { bankCode, accountNumber, amount } = req.body;
    
    if (!bankCode || !accountNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Bank details required'
      });
    }
    
    const transactionId = 'NB' + Date.now();
    const payment = {
      id: transactionId,
      method: 'netbanking',
      bankCode,
      accountNumber: 'XX' + accountNumber.slice(-4),
      amount,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    payments.push(payment);
    
    setTimeout(() => {
      const index = payments.findIndex(p => p.id === transactionId);
      if (index !== -1) {
        payments[index].status = 'success';
      }
    }, 4000);
    
    res.json({
      success: true,
      message: 'Net banking payment initiated',
      transactionId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Net banking payment failed'
    });
  }
});

router.get('/status/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  
  const payment = payments.find(p => p.id === transactionId);
  
  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Transaction not found'
    });
  }

  res.json({
    success: true,
    data: {
      transactionId: payment.id,
      status: payment.status,
      amount: payment.amount,
      method: payment.method,
      createdAt: payment.createdAt
    }
  });
});

router.get('/history', (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  
  const paginatedPayments = payments.slice(
    parseInt(offset),
    parseInt(offset) + parseInt(limit)
  );

  res.json({
    success: true,
    data: {
      payments: paginatedPayments,
      total: payments.length
    }
  });
});

module.exports = router;
