# 🏘️ Society360 - Smart Residential Management System

**Project ID: FSD120**  
**CivoraX Internship Program 2025-26**  
**Company: Civora Nexus Pvt. Ltd.**

A comprehensive full-stack residential society management system that connects residents, management committee, and facility staff for efficient and transparent operations.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Security Features](#-security-features)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Features

### 🔐 User & Authentication Module
- ✅ Secure user registration and login
- ✅ Role-based access control (Resident/Management/Staff)
- ✅ Password management and secure session handling
- ✅ JWT-based authentication with refresh tokens
- ✅ Email verification and password reset

### 👥 Visitor & Gate Management Module
- ✅ Pre-approval system for expected visitors
- ✅ Real-time entry/exit logging
- ✅ Secure audit trail of all gate movements
- ✅ Vehicle tracking and management
- ✅ Host notification system

### 🔧 Maintenance & Complaint Module
- ✅ Resident interface for maintenance requests
- ✅ Staff workflow for task assignment and resolution
- ✅ Real-time status tracking
- ✅ Work log and rating system
- ✅ Priority-based task management

### 💰 Finance & Billing Module
- ✅ Monthly maintenance bill generation
- ✅ Simulated payment gateway integration
- ✅ Digital receipt generation
- ✅ Basic financial reporting
- ✅ Transaction history and analytics

### 💬 Communication & Announcement Module
- ✅ Official society announcements
- ✅ Community discussion forum
- ✅ Real-time notifications
- ✅ Content moderation
- ✅ Event management

### ⚙️ Administration & Reporting Module
- ✅ User and unit management
- ✅ System configuration
- ✅ Analytical reports and statistics
- ✅ Dashboard with key metrics
- ✅ System health monitoring

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI framework
- **React Router 6.8.0** - Client-side routing
- **Tailwind CSS 3.2.7** - Styling framework
- **Lucide React** - Icon library
- **Axios** - HTTP client
- **jsPDF** - PDF generation
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

### Development Tools
- **nodemon** - Development server
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

### Required Software
1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (Local or Cloud)
   - **Option 1 - Local**: Install MongoDB Community Server
     - Download: https://www.mongodb.com/try/download/community
     - Install and start MongoDB service
   - **Option 2 - Cloud**: Use MongoDB Atlas
     - Sign up: https://www.mongodb.com/atlas
     - Create free cluster and get connection string

3. **Git** (for version control)
   - Download: https://git-scm.com/

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/civora-nexus/FSD120-golu19102003.git
cd FSD120-golu19102003
```

### 2. Install Dependencies
```bash
# Install all dependencies (backend + frontend)
npm run install-all

# Or install separately
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Environment
```bash
# Navigate to backend folder
cd backend

# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
notepad .env  # On Windows
nano .env     # On Linux/Mac
```

**Backend .env Configuration:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/society360

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_make_it_long_and_random
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_key_here_make_it_long_and_random
```

#### Frontend Environment
```bash
# Navigate to frontend folder
cd frontend

# Create .env file
touch .env

# Add frontend environment variables
echo "REACT_APP_API_URL=http://localhost:5000/api" >> .env
```

## 🏃‍♂️ Running the Application

### Option 1: Using npm scripts (Recommended)
```bash
# From project root
npm run dev

# This will start both backend and frontend concurrently
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
```

### Option 2: Manual Start
```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm start
```

### Option 3: Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-domain.com/api`

### Authentication Endpoints
```http
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh access token
POST   /api/auth/forgot-password   # Forgot password
POST   /api/auth/reset-password    # Reset password
```

### User Management
```http
GET    /api/users                  # Get all users
GET    /api/users/:id              # Get user by ID
POST   /api/users                  # Create new user
PUT    /api/users/:id              # Update user
DELETE /api/users/:id              # Delete user
PUT    /api/users/:id/status       # Update user status
GET    /api/users/statistics       # Get user statistics
```

### Visitor Management
```http
GET    /api/visitors               # Get all visitors
POST   /api/visitors               # Create new visitor
PUT    /api/visitors/:id           # Update visitor
DELETE /api/visitors/:id           # Delete visitor
PUT    /api/visitors/:id/status    # Update visitor status
GET    /api/visitors/statistics    # Get visitor statistics
```

### Maintenance Management
```http
GET    /api/maintenance            # Get maintenance requests
POST   /api/maintenance            # Create maintenance request
PUT    /api/maintenance/:id        # Update maintenance request
DELETE /api/maintenance/:id        # Delete maintenance request
PUT    /api/maintenance/:id/status # Update maintenance status
GET    /api/maintenance/statistics # Get maintenance statistics
```

### Finance Management
```http
GET    /api/finance/transactions   # Get transactions
POST   /api/finance/transactions   # Create transaction
PUT    /api/finance/transactions/:id # Update transaction
POST   /api/finance/payments       # Process payment
GET    /api/finance/statistics     # Get finance statistics
```

### Communication
```http
GET    /api/communication/announcements # Get announcements
POST   /api/communication/announcements # Create announcement
PUT    /api/communication/announcements/:id # Update announcement
DELETE /api/communication/announcements/:id # Delete announcement
GET    /api/communication/forums   # Get discussion forums
POST   /api/communication/forums   # Create discussion post
```

### Administration
```http
GET    /api/administration/dashboard # Get dashboard data
GET    /api/administration/statistics # Get system statistics
GET    /api/administration/health    # Get system health
```

## 📁 Project Structure

```
FSD120-golu19102003/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Database configuration
│   │   ├── middleware/
│   │   │   ├── auth.js             # Authentication middleware
│   │   │   ├── security.js         # Security middleware
│   │   │   └── validation.js       # Input validation
│   │   ├── models/
│   │   │   └── User.js             # User model
│   │   ├── routes/
│   │   │   ├── administration.js   # Admin routes
│   │   │   ├── amenities.js        # Facility routes
│   │   │   ├── auth.js             # Auth routes
│   │   │   ├── communication.js    # Communication routes
│   │   │   ├── finance.js          # Finance routes
│   │   │   ├── maintenance.js      # Maintenance routes
│   │   │   ├── visitors.js         # Visitor routes
│   │   │   └── users.js            # User routes
│   │   └── server.js               # Server entry point
│   ├── .env.example                # Environment template
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthPages/          # Authentication pages
│   │   │   ├── HomePage/           # Home page
│   │   │   ├── Layout/             # Layout components
│   │   │   ├── ServiceModules/     # Service modules
│   │   │   ├── PrivacyPage/        # Privacy policy
│   │   │   ├── SupportPage/        # Support page
│   │   │   ├── TermsPage/          # Terms of service
│   │   │   └── UserDashboard/      # Dashboard
│   │   ├── contexts/
│   │   │   └── AppContext.js       # Global state management
│   │   ├── services/
│   │   │   └── api.js              # API service
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # App entry point
│   └── package.json
├── docs/                           # Documentation
├── resources/                      # Resources
├── README.md                       # This file
├── RUN_PROJECT.md                  # Quick start guide
└── package.json                    # Root package.json
```

## 🔒 Security Features

### Authentication & Authorization
- ✅ JWT-based authentication with refresh tokens
- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcrypt
- ✅ Session management
- ✅ Email verification

### Input Validation & Sanitization
- ✅ Express-validator for input validation
- ✅ XSS protection with DOMPurify
- ✅ SQL injection prevention
- ✅ HTML entity encoding
- ✅ Custom validation rules

### Security Headers
- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Content Security Policy (CSP)
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection

### Rate Limiting
- ✅ Express-rate-limit for API protection
- ✅ Configurable rate limits
- ✅ IP-based limiting
- ✅ Custom key generation

### Data Protection
- ✅ Encrypted password storage
- ✅ Secure token generation
- ✅ Environment variable protection
- ✅ Sensitive data masking

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure
```
tests/
├── unit/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── services/
├── integration/
│   ├── auth.test.js
│   ├── users.test.js
│   └── visitors.test.js
└── e2e/
    ├── auth.e2e.js
    └── dashboard.e2e.js
```

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/society360
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret
```

### Docker Deployment
```bash
# Build Docker images
docker-compose build

# Run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines
- Use ESLint for code linting
- Follow Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and queries:
- **Email**: support@society360.com
- **Phone**: +91 9680211602
- **Website**: https://society360.com

## 🙏 Acknowledgments

- **Civora Nexus Pvt. Ltd.** - For the opportunity and guidance
- **React Team** - For the amazing UI framework
- **MongoDB** - For the robust database solution
- **Tailwind CSS** - For the utility-first CSS framework

---

**© 2026 Society360. All rights reserved.**
