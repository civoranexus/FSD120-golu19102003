import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, Download, Search, Calendar, TrendingUp, TrendingDown, Receipt, CreditCard, X, User, Home, FileText, Eye, Printer, Mail, Share2, CheckCircle, AlertCircle, Clock, Building, Phone, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';

const Finance = () => {
  const paymentModalRef = useRef(null);
  const viewModalRef = useRef(null);
  const receiptModalRef = useRef(null);
  const [transactions, setTransactions] = useState([
    { id: 1, unit: 'A-101', type: 'Maintenance', amount: '₹2,500', date: 'Jan 5, 2024', status: 'paid' },
    { id: 2, unit: 'B-205', type: 'Parking', amount: '₹500', date: 'Jan 4, 2024', status: 'pending' },
    { id: 3, unit: 'C-302', type: 'Maintenance', amount: '₹2,500', date: 'Jan 3, 2024', status: 'paid' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    unit: '',
    type: 'Maintenance',
    amount: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const stats = [
    { title: 'Total Revenue', value: '₹2.4L', change: '+8%', icon: TrendingUp, color: 'text-green-600', customColor: '#22C55E' },
    { title: 'Pending Dues', value: '₹45K', change: '-12%', icon: TrendingDown, color: 'text-red-600', customColor: '#EF4444', iconColor: '#EB1414' },
    { title: 'This Month', value: '₹1.2L', change: '+15%', icon: Calendar, color: 'text-blue-600', customColor: '#1B9AAA', iconColor: '#147783' },
  ];

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPaymentForm && paymentModalRef.current && !paymentModalRef.current.contains(event.target)) {
        setShowPaymentForm(false);
      }
      if (showViewModal && viewModalRef.current && !viewModalRef.current.contains(event.target)) {
        setShowViewModal(false);
      }
      if (showReceiptModal && receiptModalRef.current && !receiptModalRef.current.contains(event.target)) {
        setShowReceiptModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPaymentForm, showViewModal, showReceiptModal]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentMessage('');

    try {
      // Simulate API call to payment gateway
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          timestamp: new Date().toISOString(),
          transactionId: `TXN${Date.now()}`
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Add new transaction to the list
        const newTransaction = {
          id: transactions.length + 1,
          unit: paymentData.unit,
          type: paymentData.type,
          amount: `₹${paymentData.amount}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'paid',
          transactionId: result.transactionId
        };
        
        setTransactions([newTransaction, ...transactions]);
        setPaymentMessage('Payment completed successfully!');
        
        // Reset form
        setPaymentData({
          unit: '',
          type: 'Maintenance',
          amount: '',
          cardNumber: '',
          cardName: '',
          expiryDate: '',
          cvv: '',
          upiId: '',
          paymentMethod: 'card'
        });
        
        setTimeout(() => {
          setShowPaymentForm(false);
          setPaymentMessage('');
        }, 2000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setPaymentMessage('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // View transaction details
  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowViewModal(true);
  };

  // Generate receipt data
  const generateReceiptData = (transaction) => {
    const receiptNumber = `RCP${Date.now()}`;
    const receiptDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Clean amount from database format and format it properly
    const amountNumber = Number(
      String(transaction.amount).replace(/[^\d.]/g, "")
    );
    const formattedAmount = new Intl.NumberFormat("en-IN").format(amountNumber);
    
    return {
      receiptNumber,
      receiptDate,
      transactionId: transaction.transactionId || `TXN${transaction.id}${Date.now()}`,
      transactionDate: transaction.date,
      unit: transaction.unit,
      type: transaction.type,
      amount: formattedAmount,
      status: transaction.status,
      paymentMethod: transaction.paymentMethod || 'Online',
      societyName: 'Society360',
      societyAddress: '123 Society Complex, Mumbai, Maharashtra 400001',
      societyPhone: '+91-22-12345678',
      societyEmail: 'finance@society360.com',
      gstNumber: '27AAAPL1234C1ZV',
      panNumber: 'AAAPL1234C'
    };
  };

  // Show receipt
  const handleShowReceipt = (transaction) => {
    const receipt = generateReceiptData(transaction);
    setReceiptData(receipt);
    setShowReceiptModal(true);
  };

  // Download receipt as PDF
  const handleDownloadReceipt = (receipt) => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;

    /* ================= HEADER ================= */
    try {
      pdf.addImage("/short_logo.png", "PNG", margin, 18, 30, 30);
    } catch {
      pdf.setFillColor(27, 154, 170);
      pdf.circle(margin + 11, 29, 11, "F");
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(14, 42, 71);
    pdf.text("Society360", margin + 30, 32);

    pdf.setFontSize(18);
    pdf.text("PAYMENT RECEIPT", pageWidth / 2, 48, { align: "center" });

    /* ================= RECEIPT INFO ================= */
    let y = 58;
    pdf.setDrawColor(230, 238, 245);
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 35, 4, 4);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Receipt No: ${receipt.receiptNumber}`, margin + 10, y + 10);
    pdf.text(`Date: ${receipt.receiptDate}`, margin + 10, y + 18);
    pdf.text(`Transaction ID: ${receipt.transactionId}`, margin + 10, y + 26);

    /* ================= TRANSACTION DETAILS ================= */
    y += 40;
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 75, 6, 6);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Transaction Details", margin + 10, y + 15);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    pdf.text("Unit:", margin + 10, y + 25);
    pdf.text(receipt.unit, margin + 50, y + 25);

    pdf.text("Type:", margin + 10, y + 35);
    pdf.text(receipt.type, margin + 50, y + 35);

    pdf.text("Amount:", margin + 10, y + 45);
    const amount = Number(receipt.amount || 0);

    pdf.text(
      "Rs. " + amount.toLocaleString("en-IN"),
      margin + 50,
      y + 45
    );

    pdf.text("Status:", margin + 10, y + 55);
    const statusColor =
      receipt.status.toLowerCase() === "paid" ? [31, 143, 95] : [251, 146, 60];

    pdf.setFillColor(...statusColor);
    pdf.roundedRect(margin + 50, y + 47, 45, 10, 4, 4, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.text(receipt.status.toUpperCase(), margin + 72, y + 54, {
      align: "center",
    });

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.text("Payment Method:", margin + 10, y + 65);
    pdf.text(receipt.paymentMethod, margin + 50, y + 65);

    /* ================= SOCIETY DETAILS ================= */
    y += 80;
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 60, 6, 6);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Society Details", margin + 10, y + 12);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text("Society360", margin + 10, y + 22);
    pdf.text(receipt.societyAddress, margin + 10, y + 32);
    pdf.text(`Phone: ${receipt.societyPhone}`, margin + 10, y + 42);
    pdf.text(`Email: ${receipt.societyEmail}`, margin + 10, y + 52);

    /* ================= TAX INFO ================= */
    y += 65;
    pdf.roundedRect(margin, y, pageWidth - margin * 2, 40, 6, 6);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Tax Information", margin + 10, y + 12);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text(`GST: ${receipt.gstNumber}`, margin + 10, y + 22);
    pdf.text(`PAN: ${receipt.panNumber}`, margin + 10, y + 30);

    /* ================= FOOTER ================= */
    pdf.setFontSize(10);
    pdf.setTextColor(120, 120, 120);
    pdf.setFont("helvetica", "italic");
    pdf.text(
      "This is a computer-generated receipt and does not require a signature.",
      pageWidth / 2,
      290,
      { align: "center" }
    );

    pdf.save(`receipt_${receipt.receiptNumber}.pdf`);
  };

  // Print receipt
  const handlePrintReceipt = (receipt) => {
    const printContent = `
      <html>
        <head>
          <title>Payment Receipt - ${receipt.receiptNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { color: #1B9AAA; font-size: 24px; font-weight: bold; }
            .subtitle { font-size: 18px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #333; }
            .value { margin-left: 10px; }
            .footer { margin-top: 30px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Society360</div>
            <div class="subtitle">PAYMENT RECEIPT</div>
          </div>
          
          <div class="section">
            <div><span class="label">Receipt No:</span><span class="value">${receipt.receiptNumber}</span></div>
            <div><span class="label">Date:</span><span class="value">${receipt.receiptDate}</span></div>
            <div><span class="label">Transaction ID:</span><span class="value">${receipt.transactionId}</span></div>
          </div>
          
          <div class="section">
            <div class="label">Transaction Details:</div>
            <div><span class="label">Unit:</span><span class="value">${receipt.unit}</span></div>
            <div><span class="label">Type:</span><span class="value">${receipt.type}</span></div>
            <div><span class="label">Amount:</span><span class="value">${receipt.amount}</span></div>
            <div><span class="label">Status:</span><span class="value">${receipt.status.toUpperCase()}</span></div>
            <div><span class="label">Payment Method:</span><span class="value">${receipt.paymentMethod}</span></div>
          </div>
          
          <div class="section">
            <div class="label">Society Details:</div>
            <div>${receipt.societyName}</div>
            <div>${receipt.societyAddress}</div>
            <div>Phone: ${receipt.societyPhone}</div>
            <div>Email: ${receipt.societyEmail}</div>
          </div>
          
          <div class="section">
            <div class="label">Tax Information:</div>
            <div>GST: ${receipt.gstNumber}</div>
            <div>PAN: ${receipt.panNumber}</div>
          </div>
          
          <div class="footer">
            This is a computer-generated receipt and does not require a signature.
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Email receipt
  const handleEmailReceipt = (receipt) => {
    const emailSubject = `Payment Receipt - ${receipt.receiptNumber}`;
    const emailBody = `
      Dear Resident,
      
      Please find your payment receipt details below:
      
      Receipt Number: ${receipt.receiptNumber}
      Date: ${receipt.receiptDate}
      Transaction ID: ${receipt.transactionId}
      Unit: ${receipt.unit}
      Type: ${receipt.type}
      Amount: ${receipt.amount}
      Status: ${receipt.status}
      
      Thank you for your payment.
      
      Regards,
      Society360 Management
      ${receipt.societyPhone}
      ${receipt.societyEmail}
    `;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  // Share receipt
  const handleShareReceipt = (receipt) => {
    const shareText = `Payment Receipt - ${receipt.receiptNumber}
Amount: ${receipt.amount}
Unit: ${receipt.unit}
Type: ${receipt.type}
Date: ${receipt.receiptDate}
Transaction ID: ${receipt.transactionId}
Status: ${receipt.status}

Generated by Society360`;
    
    if (navigator.share) {
      navigator.share({
        title: `Payment Receipt - ${receipt.receiptNumber}`,
        text: shareText
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Receipt details copied to clipboard!');
    }
  };

  const generateReport = () => {
    // Calculate comprehensive report data
    const reportData = {
      generatedAt: new Date().toLocaleString(),
      totalRevenue: stats.find(s => s.title === 'Total Revenue')?.value || '₹0',
      pendingDues: stats.find(s => s.title === 'Pending Dues')?.value || '₹0',
      thisMonthRevenue: stats.find(s => s.title === 'This Month')?.value || '₹0',
      transactions: filteredTransactions,
      summary: {
        totalTransactions: filteredTransactions.length,
        paidTransactions: filteredTransactions.filter(t => t.status === 'paid').length,
        pendingTransactions: filteredTransactions.filter(t => t.status === 'pending').length,
        overdueTransactions: filteredTransactions.filter(t => t.status === 'overdue').length,
        totalAmount: filteredTransactions.reduce((sum, t) => {
          const amount = parseFloat(t.amount.replace('₹', '').replace(',', ''));
          return sum + amount;
        }, 0),
        averageTransaction: filteredTransactions.length > 0 ? 
          filteredTransactions.reduce((sum, t) => sum + parseFloat(t.amount.replace('₹', '').replace(',', '')), 0) / filteredTransactions.length : 0,
        highestTransaction: filteredTransactions.length > 0 ? 
          Math.max(...filteredTransactions.map(t => parseFloat(t.amount.replace('₹', '').replace(',', '')))) : 0,
        lowestTransaction: filteredTransactions.length > 0 ? 
          Math.min(...filteredTransactions.map(t => parseFloat(t.amount.replace('₹', '').replace(',', '')))) : 0
      },
      trends: {
        paymentMethods: {
          card: filteredTransactions.filter(t => t.type === 'Maintenance').length,
          upi: filteredTransactions.filter(t => t.type === 'Parking').length,
          other: filteredTransactions.filter(t => t.type === 'Other').length
        },
        transactionTypes: {
          maintenance: filteredTransactions.filter(t => t.type === 'Maintenance').length,
          parking: filteredTransactions.filter(t => t.type === 'Parking').length,
          other: filteredTransactions.filter(t => t.type === 'Other').length
        },
        statusDistribution: {
          paid: (filteredTransactions.filter(t => t.status === 'paid').length / filteredTransactions.length * 100).toFixed(1),
          pending: (filteredTransactions.filter(t => t.status === 'pending').length / filteredTransactions.length * 100).toFixed(1),
          overdue: (filteredTransactions.filter(t => t.status === 'overdue').length / filteredTransactions.length * 100).toFixed(1)
        }
      },
      insights: {
        collectionRate: filteredTransactions.length > 0 ? 
          (filteredTransactions.filter(t => t.status === 'paid').length / filteredTransactions.length * 100).toFixed(1) : 0,
        pendingAmount: filteredTransactions
          .filter(t => t.status === 'pending')
          .reduce((sum, t) => sum + parseFloat(t.amount.replace('₹', '').replace(',', '')), 0),
        overdueAmount: filteredTransactions
          .filter(t => t.status === 'overdue')
          .reduce((sum, t) => sum + parseFloat(t.amount.replace('₹', '').replace(',', '')), 0),
        mostActiveUnit: filteredTransactions.length > 0 ? 
          Object.entries(
            filteredTransactions.reduce((acc, t) => {
              acc[t.unit] = (acc[t.unit] || 0) + 1;
              return acc;
            }, {})
          ).reduce((a, b) => b[1] > a[1] ? b : a)[0] : 'N/A'
      }
    };

    // Create advanced PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add company logo to top left corner
    const logoImg = new Image();
    logoImg.src = '/short_logo.png';
    
    // Add short logo to top left
    doc.addImage(logoImg, 15, 10, 30, 30);
    
    // Add title with enhanced styling
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Society360 Financial Report', 60, 25);
    
    // Add subtitle
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Comprehensive Financial Analysis & Insights', 60, 35);
    
    // Add generation date
    doc.setFontSize(10);
    doc.text(`Generated: ${reportData.generatedAt}`, 60, 42);
    
    // Add decorative line
    doc.setLineWidth(1);
    doc.line(15, 50, 195, 50);
    
    // Executive Summary Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', 15, 60);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Key Metrics Box
    doc.setDrawColor('#147783');
    doc.setFillColor('#f0f8ff');
    doc.roundedRect(15, 70, 180, 40, 3, 3);
    doc.setFillColor('#147783');
    doc.rect(15, 70, 180, 8);
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Financial Metrics', 20, 76);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Revenue: ${reportData.totalRevenue}`, 20, 88);
    doc.text(`Pending Dues: ${reportData.pendingDues}`, 20, 96);
    doc.text(`This Month: ${reportData.thisMonthRevenue}`, 20, 104);
    doc.text(`Collection Rate: ${reportData.insights.collectionRate}%`, 110, 88);
    doc.text(`Avg Transaction: ₹${reportData.summary.averageTransaction.toFixed(2)}`, 110, 96);
    doc.text(`Total Amount: ₹${reportData.summary.totalAmount.toLocaleString('en-IN')}`, 110, 104);
    
    // Transaction Summary Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Transaction Analysis', 15, 125);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Create transaction summary table
    const summaryData = [
      ['Metric', 'Count', 'Percentage', 'Amount'],
      ['Total Transactions', reportData.summary.totalTransactions, '100%', `₹${reportData.summary.totalAmount.toLocaleString('en-IN')}`],
      ['Paid Transactions', reportData.summary.paidTransactions, `${reportData.trends.statusDistribution.paid}%`, `₹${filteredTransactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + parseFloat(t.amount.replace('₹', '').replace(',', '')), 0).toLocaleString('en-IN')}`],
      ['Pending Transactions', reportData.summary.pendingTransactions, `${reportData.trends.statusDistribution.pending}%`, `₹${reportData.insights.pendingAmount.toLocaleString('en-IN')}`],
      ['Overdue Transactions', reportData.summary.overdueTransactions, `${reportData.trends.statusDistribution.overdue}%`, `₹${reportData.insights.overdueAmount.toLocaleString('en-IN')}`],
      ['Average Transaction', '-', '-', `₹${reportData.summary.averageTransaction.toFixed(2)}`],
      ['Highest Transaction', '-', '-', `₹${reportData.summary.highestTransaction.toFixed(2)}`],
      ['Lowest Transaction', '-', '-', `₹${reportData.summary.lowestTransaction.toFixed(2)}`]
    ];
    
    let yPos = 140;
    summaryData.forEach((row, index) => {
      if (index === 0) {
        // Header row
        doc.setFillColor('#147783');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        row.forEach((cell, cellIndex) => {
          doc.text(cell, 15 + (cellIndex * 35), yPos);
        });
      } else {
        // Data rows
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        row.forEach((cell, cellIndex) => {
          doc.text(cell, 15 + (cellIndex * 35), yPos);
        });
      }
      yPos += 8;
    });
    
    // Payment Methods Breakdown
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Methods Distribution', 15, yPos + 10);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const paymentMethodsData = [
      ['Payment Method', 'Count', 'Percentage'],
      ['Maintenance', reportData.trends.transactionTypes.maintenance, `${((reportData.trends.transactionTypes.maintenance / reportData.summary.totalTransactions) * 100).toFixed(1)}%`],
      ['Parking', reportData.trends.transactionTypes.parking, `${((reportData.trends.transactionTypes.parking / reportData.summary.totalTransactions) * 100).toFixed(1)}%`],
      ['Other', reportData.trends.transactionTypes.other, `${((reportData.trends.transactionTypes.other / reportData.summary.totalTransactions) * 100).toFixed(1)}%`]
    ];
    
    yPos += 15;
    paymentMethodsData.forEach((row, index) => {
      if (index === 0) {
        doc.setFillColor('#147783');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      }
      row.forEach((cell, cellIndex) => {
        doc.text(cell, 15 + (cellIndex * 60), yPos);
      });
      yPos += 8;
    });
    
    // Detailed Transactions Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Transaction Records', 15, yPos + 10);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    yPos += 15;
    reportData.transactions.forEach((t, index) => {
      if (yPos > 250) {
        doc.addPage();
        // Add logo to new page
        doc.addImage(logoImg, 15, 10, 30, 30);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Financial Report (Continued)', 60, 25);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        yPos = 50;
      }
      
      // Transaction box with status-based coloring
      if (t.status === 'paid') {
        doc.setDrawColor('#22C55E');
        doc.setFillColor('#f0fdf4');
      } else if (t.status === 'pending') {
        doc.setDrawColor('#f59e0b');
        doc.setFillColor('#fffbeb');
      } else {
        doc.setDrawColor('#ef4444');
        doc.setFillColor('#fef2f2');
      }
      
      doc.roundedRect(15, yPos, 180, 35, 2, 2);
      
      // Transaction details
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(`Unit: ${t.unit}`, 20, yPos + 8);
      doc.text(`Type: ${t.type}`, 20, yPos + 16);
      doc.text(`Amount: ${t.amount}`, 20, yPos + 24);
      doc.text(`Date: ${t.date}`, 100, yPos + 8);
      doc.text(`Status: ${t.status.toUpperCase()}`, 100, yPos + 16);
      
      // Status indicator
      if (t.status === 'paid') {
        doc.setTextColor('#22C55E');
        doc.text('✓ PAID', 100, yPos + 24);
      } else if (t.status === 'pending') {
        doc.setTextColor('#f59e0b');
        doc.text('⏳ PENDING', 100, yPos + 24);
      } else {
        doc.setTextColor('#ef4444');
        doc.text('⚠ OVERDUE', 100, yPos + 24);
      }
      
      yPos += 42;
    });
    
    // Insights Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Insights & Recommendations', 15, yPos + 10);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const insights = [
      `• Collection Rate: ${reportData.insights.collectionRate}% (${reportData.insights.collectionRate >= 80 ? 'Excellent' : reportData.insights.collectionRate >= 60 ? 'Good' : 'Needs Improvement'})`,
      `• Most Active Unit: ${reportData.insights.mostActiveUnit}`,
      `• Pending Amount: ₹${reportData.insights.pendingAmount.toLocaleString('en-IN')}`,
      `• Overdue Amount: ₹${reportData.insights.overdueAmount.toLocaleString('en-IN')}`,
      `• Average Transaction Size: ₹${reportData.summary.averageTransaction.toFixed(2)}`,
      `• Total Transaction Volume: ${reportData.summary.totalTransactions}`
    ];
    
    yPos += 20;
    insights.forEach(insight => {
      doc.text(insight, 20, yPos);
      yPos += 8;
    });
    
    // Footer section
    doc.setLineWidth(0.5);
    doc.line(15, yPos + 10, 195, yPos + 10);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('This is an automatically generated comprehensive financial report from Society360 Management System', 15, yPos + 20);
    doc.text('For detailed analysis or queries, please contact the finance department.', 15, yPos + 27);
    doc.text('Report generated with advanced analytics and insights for strategic decision-making.', 15, yPos + 34);
    
    // Save the PDF
    doc.save(`Society360_Advanced_Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold">
            <span style={{color: '#147783'}}>Finance</span>
            <span style={{color: '#020509'}}> & Billing</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-colors" 
            style={{backgroundColor: '#1B9AAA'}} 
            onMouseEnter={(e) => e.target.style.backgroundColor = '#147783'} 
            onMouseLeave={(e) => e.target.style.backgroundColor = '#1B9AAA'}
            onClick={() => setShowPaymentForm(true)}
          >
            <CreditCard className="h-4 w-4" />
            <span>Pay Now</span>
          </button>
          <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#178740'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'} onClick={generateReport}>
            <Download className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`} style={stat.customColor ? {color: stat.customColor} : {}}>{stat.change} from last month</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} style={stat.iconColor ? {color: stat.iconColor} : (stat.customColor ? {color: stat.customColor} : {})} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            >
              <option value="all">All Types</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Parking">Parking</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'paid' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-[#E0F7FA] text-[#142C52]' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewTransaction(transaction)}
                      className="mr-3 flex items-center" 
                      style={{color: '#1B9AAA'}} 
                      onMouseEnter={(e) => e.target.style.color = '#147783'} 
                      onMouseLeave={(e) => e.target.style.color = '#1B9AAA'}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    {transaction.status === 'paid' && (
                      <button 
                        onClick={() => handleShowReceipt(transaction)}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                      >
                        <Receipt className="h-4 w-4 mr-1" />
                        Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={paymentModalRef} className="bg-white rounded-lg shadow-xl p-5 w-full max-w-md mx-4 border-2" style={{borderColor: '#147783'}}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-7 w-auto mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Complete Payment</h2>
              </div>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit Number</label>
                <input
                  type="text"
                  name="unit"
                  value={paymentData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                  style={{borderColor: '#147783', focusRingColor: '#147783'}}
                  placeholder="e.g., A-101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                <select
                  name="type"
                  value={paymentData.type}
                  onChange={handleInputChange}
                  className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                  style={{borderColor: '#147783', focusRingColor: '#147783'}}
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Parking">Parking</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                  style={{borderColor: '#147783', focusRingColor: '#147783'}}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`px-3 py-2 text-sm rounded-lg border-2 transition-colors ${
                      paymentData.paymentMethod === 'card'
                        ? 'border-[#147783] bg-[#147783] text-white'
                        : 'border-[#147783] text-gray-700 hover:border-[#147783]'
                    }`}
                    style={{borderColor: '#147783'}}
                  >
                    <CreditCard className="h-3 w-3 inline mr-1" />
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                    className={`px-3 py-2 text-sm rounded-lg border-2 transition-colors ${
                      paymentData.paymentMethod === 'upi'
                        ? 'border-[#147783] bg-[#147783] text-white'
                        : 'border-[#147783] text-gray-700 hover:border-[#147783]'
                    }`}
                    style={{borderColor: '#147783'}}
                  >
                    <span className="inline mr-1">📱</span>
                    UPI
                  </button>
                </div>
              </div>

              <div className="border-t pt-3" style={{borderColor: '#147783'}}>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Payment Information</h3>
                
                {paymentData.paymentMethod === 'card' ? (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                        style={{borderColor: '#147783', focusRingColor: '#147783'}}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength="19"
                        className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                        style={{borderColor: '#147783', focusRingColor: '#147783'}}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handleInputChange}
                          required
                          maxLength="5"
                          className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                          style={{borderColor: '#147783', focusRingColor: '#147783'}}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength="3"
                          className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                          style={{borderColor: '#147783', focusRingColor: '#147783'}}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                      <input
                        type="text"
                        name="upiId"
                        value={paymentData.upiId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2.5 py-2 text-sm border-2 rounded-lg focus:outline-none focus:ring-1"
                        style={{borderColor: '#147783', focusRingColor: '#147783'}}
                        placeholder="9680211602"
                      />
                    </div>
                    <div className="bg-blue-50 border-2 rounded-lg p-2" style={{borderColor: '#1B9AAA'}}>
                      <p className="text-sm" style={{color: '#1B9AAA'}}>
                        <strong>Default UPI ID:</strong> 9680211602
                      </p>
                      <p className="text-sm mt-1" style={{color: '#1B9AAA'}}>
                        Scan QR code or enter UPI ID above to complete payment
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {paymentMessage && (
                <div className={`p-2 rounded-lg text-sm ${
                  paymentMessage.includes('success') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {paymentMessage}
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 px-3 py-2 text-sm border-2 text-gray-700 rounded-lg hover:bg-gray-50"
                  style={{borderColor: '#147783'}}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#1B9AAA] text-white py-3 rounded-lg hover:bg-[#147783] disabled:opacity-50 flex items-center justify-center"
                >
                  {isProcessing ? 'Processing...' : 'Complete Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Transaction Modal */}
      {showViewModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={viewModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-3"
                />
                <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Transaction Summary */}
              <div className="bg-gradient-to-r from-[#1B9AAA] to-[#147783] text-white p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transaction Summary</h3>
                    <div className="space-y-1">
                      <p className="text-sm opacity-90">Transaction ID: {selectedTransaction.transactionId || `TXN${selectedTransaction.id}${Date.now()}`}</p>
                      <p className="text-sm opacity-90">Date: {selectedTransaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{selectedTransaction.amount}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      selectedTransaction.status === 'paid' ? 'bg-white text-green-600' :
                      selectedTransaction.status === 'pending' ? 'bg-white text-orange-600' :
                      'bg-white text-red-600'
                    }`}>
                      {selectedTransaction.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Home className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                    Property Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit/Apartment:</span>
                      <span className="font-medium">{selectedTransaction.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Type:</span>
                      <span className="font-medium">{selectedTransaction.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium">{selectedTransaction.paymentMethod || 'Online'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                    Timeline Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Date:</span>
                      <span className="font-medium">{selectedTransaction.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-medium">2-3 business days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${
                        selectedTransaction.status === 'paid' ? 'text-green-600' :
                        selectedTransaction.status === 'pending' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Additional Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Society Name:</p>
                      <p className="font-medium">Society360</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Society ID:</p>
                      <p className="font-medium">SOC360001</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Billing Period:</p>
                      <p className="font-medium">January 2024</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Due Date:</p>
                      <p className="font-medium">January 31, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedTransaction.status === 'paid' && (
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleShowReceipt(selectedTransaction);
                    }}
                    className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#147783] flex items-center"
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    View Receipt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && receiptData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={receiptModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-3"
                />
                <h2 className="text-xl font-semibold text-gray-900">Payment Receipt</h2>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Receipt Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Society360</h1>
                <p className="text-lg font-semibold text-gray-700">PAYMENT RECEIPT</p>
                <div className="w-24 h-1 bg-[#1B9AAA] mx-auto mt-2"></div>
              </div>

              {/* Receipt Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Receipt Information</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Receipt No:</span>
                      <span className="font-medium">{receiptData.receiptNumber}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Date:</span>
                      <span className="font-medium">{receiptData.receiptDate}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Transaction ID:</span>
                      <span className="font-medium">{receiptData.transactionId}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 w-32">Unit:</span>
                      <span className="font-medium">{receiptData.unit}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Type:</span>
                      <span className="font-medium">{receiptData.type}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 w-32">Method:</span>
                      <span className="font-medium">{receiptData.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount Display */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount Paid:</span>
                  <span className="text-2xl font-bold text-green-600">{receiptData.amount}</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    receiptData.status === 'paid' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {receiptData.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Society Information */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Society Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name:</p>
                      <p className="font-medium">{receiptData.societyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address:</p>
                      <p className="font-medium">{receiptData.societyAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone:</p>
                      <p className="font-medium">{receiptData.societyPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email:</p>
                      <p className="font-medium">{receiptData.societyEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Tax Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">GST Number:</p>
                      <p className="font-medium">{receiptData.gstNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">PAN Number:</p>
                      <p className="font-medium">{receiptData.panNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadReceipt(receiptData)}
                  className="px-4 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#147783] flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={() => handlePrintReceipt(receiptData)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
                <button
                  onClick={() => handleEmailReceipt(receiptData)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </button>
                <button
                  onClick={() => handleShareReceipt(receiptData)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  This is a computer-generated receipt and does not require a signature.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Generated on {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
