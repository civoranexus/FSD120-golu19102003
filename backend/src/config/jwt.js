const jwt = require('jsonwebtoken');

// Generate JWT access token
const generateAccessToken = (userId, refreshToken) => {
  return jwt.sign(
    { 
      id: userId,
      refreshToken: refreshToken
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRE || '7d',
      issuer: 'society360',
      audience: 'society360-users'
    }
  );
};

// Generate JWT refresh token
const generateRefreshToken = () => {
  return jwt.sign(
    { 
      type: 'refresh',
      timestamp: Date.now()
    },
    process.env.JWT_REFRESH_SECRET,
    { 
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
      issuer: 'society360',
      audience: 'society360-refresh'
    }
  );
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

// Generate password reset token
const generatePasswordResetToken = () => {
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const hashedToken = jwt.sign(
    { resetToken },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );
  
  return { resetToken, hashedToken };
};

// Verify password reset token
const verifyPasswordResetToken = (hashedToken) => {
  return jwt.verify(hashedToken, process.env.JWT_SECRET);
};

// Generate email verification token
const generateEmailVerificationToken = (userId) => {
  return jwt.sign(
    { 
      id: userId,
      type: 'email_verification'
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify email verification token
const verifyEmailVerificationToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Decode token without verification (for debugging)
const decodeToken = (token) => {
  return jwt.decode(token);
};

// Check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  decodeToken,
  isTokenExpired
};
