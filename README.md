# 🏘️ Society360 - Smart Residential Management System

**Project ID: FSD120**  
**CivoraX Internship Program 2025-26**  
**Company: Civora Nexus Pvt. Ltd.**

A comprehensive full-stack residential society management system that connects residents, management committee, and facility staff for efficient and transparent operations.

## 📋 Project Overview

Society360 is a secure, integrated platform designed to manage all administrative, communication, and facility needs of a modern residential society. The system provides role-based access control for residents, management, and staff members.

## 🎯 Core Features

### 🔐 User & Authentication Module
- Secure user registration and login
- Role-based access control (Resident/Management/Staff)
- Password management and secure session handling
- JWT-based authentication with refresh tokens

### 👥 Visitor & Gate Management Module
- Pre-approval system for expected visitors
- Real-time entry/exit logging
- Secure audit trail of all gate movements
- Vehicle tracking

### 🔧 Maintenance & Complaint Module
- Resident interface for maintenance requests
- Staff workflow for task assignment and resolution
- Real-time status tracking
- Work log and rating system

### 💰 Finance & Billing Module
- Monthly maintenance bill generation
- Simulated payment gateway integration
- Digital receipt generation
- Basic financial reporting

### 💬 Communication & Announcement Module
- Official society announcements
- Community discussion forum
- Real-time notifications
- Content moderation

### ⚙️ Administration & Reporting Module
- User and unit management
- System configuration
- Analytical reports and statistics
- Dashboard with key metrics

## 🏗️ Technical Architecture

### Backend (Node.js + Express)
```
backend/
├── src/
│   ├── config/          # Database and JWT configuration
│   ├── controllers/     # Business logic handlers
│   ├── middleware/      # Authentication, validation, authorization
│   ├── models/          # MongoDB data models
│   ├── routes/          # API route definitions
│   └── server.js        # Express server setup
├── .env.example         # Environment variables template
└── package.json         # Dependencies and scripts
```

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── components/      # React components
│   │   ├── Auth/       # Login/Register forms
│   │   ├── Dashboard/  # Main dashboard
│   │   ├── Layout/     # Navigation and layout
│   │   └── UI/         # Reusable UI components
│   ├── contexts/       # React contexts (Auth)
│   └── App.tsx         # Main application component
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## 🗄️ Database Schema

### Core Models
- **User**: Authentication, roles, permissions
- **Unit**: Residential units with owners/tenants
- **Visitor**: Guest management with gate logs
- **Maintenance**: Service requests and work tracking
- **Billing**: Invoices, payments, financial records
- **Communication**: Announcements, discussions, notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FSD120-golu19102003
```

2. **Install all dependencies**
```bash
npm run install-all
```

3. **Environment Setup**

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Edit .env with your API URL
```

4. **Start MongoDB**
```bash
# Ensure MongoDB is running on localhost:27017
# or configure your MongoDB URI in backend/.env
```

5. **Run the application**

**Development Mode:**
```bash
# From project root
npm run dev
```

**Individual Services:**
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

### Default Access
- **Backend API**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **Health Check**: http://localhost:5000/api/health

## 🧪 Testing

### API Testing
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123456","phone":"9876543210","role":"resident"}'
```

### Frontend Testing
- Open http://localhost:3000 in browser
- Register a new account or login
- Navigate through dashboard and modules

## 🔐 Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Request rate limiting
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Responsive navigation
- Touch-friendly interfaces

## 🎨 Civora Nexus Branding

The application follows Civora Nexus Pvt. Ltd. branding guidelines:
- Official color palette and UI theme
- Consistent typography and spacing
- Clean, trustworthy interface design
- Professional visual hierarchy

## 📊 User Roles & Permissions

### Resident
- Visitor management (pre-approval)
- Maintenance requests
- Bill viewing and payment
- Community communication
- Personal profile management

### Management
- All resident permissions
- User and unit management
- Billing administration
- System reporting
- Administrative functions

### Staff
- Gate management operations
- Maintenance task assignment
- Visitor check-in/out
- Service request handling

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Modules
- `/api/users` - User management
- `/api/visitors` - Visitor management
- `/api/maintenance` - Maintenance requests
- `/api/billing` - Billing and payments
- `/api/communications` - Announcements and discussions
- `/api/admin` - Administrative functions

## 🛠️ Development Workflow

### Phase 1: ✅ Completed
- [x] Project structure setup
- [x] Database schema design
- [x] Authentication system
- [x] Basic frontend layout

### Phase 2: 🚧 In Progress
- [ ] Visitor management implementation
- [ ] Maintenance module development
- [ ] Billing system integration
- [ ] Communication features

### Phase 3: 📋 Planned
- [ ] Advanced reporting
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Testing and documentation

## 📝 Project Guidelines

### Mandatory Requirements
- ✅ Only official Civora Nexus branding
- ✅ Secure authentication and RBAC
- ✅ Role-based feature separation
- ✅ Responsive design
- ✅ Clean, maintainable code

### Development Standards
- TypeScript for frontend
- Express.js for backend
- MongoDB for data storage
- RESTful API design
- Component-based architecture

## 🤝 Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 📞 Support

**Civora Nexus Pvt. Ltd.**
- 📧 Email: info@civoranexus.com
- 📱 Phone: +91-7350 675192
- 📍 Location: Sangamner, Maharashtra – 422605 India

## 📄 License

This project is developed under the CivoraX Internship Program and follows the company's licensing terms.

---

**© 2025 Civora Nexus Pvt. Ltd. All rights reserved.**  
**Developed as part of CivoraX Internship Program 2025-26**


