# Society360 Frontend Configuration for Netlify

## 🌐 **Frontend Updates for Netlify Deployment**

### **📋 Files to Modify**

#### **1. Update API Configuration**

**File:** `frontend/src/config/api.js` (create if not exists)
```javascript
const API_CONFIG = {
  // For local development
  development: {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000
  },
  
  // For Netlify production
  production: {
    baseURL: '/.netlify/functions',
    timeout: 10000
  }
};

// Export based on environment
const config = process.env.NODE_ENV === 'production' 
  ? API_CONFIG.production 
  : API_CONFIG.development;

export default config;
```

#### **2. Update API Service Calls**

**File:** `frontend/src/services/api.js` (create if not exists)
```javascript
import config from '../config/api';

class APIService {
  constructor() {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: this.timeout,
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    try {
      const response = await fetch(url, finalOptions);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // API Methods
  async getPricingPlans() {
    return this.request('/pricing/plans');
  }

  async getUserProfile() {
    return this.request('/users/profile');
  }

  async getVisitors() {
    return this.request('/visitors');
  }

  async getMaintenanceRequests() {
    return this.request('/maintenance');
  }

  async healthCheck() {
    return this.request('/health');
  }
}

export default new APIService();
```

#### **3. Update Environment Detection**

**File:** `frontend/src/utils/environment.js` (create if not exists)
```javascript
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' || 
         window.location.hostname.includes('netlify.app');
};

export const isDevelopment = () => {
  return !isProduction();
};

export const getAPIBaseURL = () => {
  return isProduction() 
    ? '/.netlify/functions' 
    : 'http://localhost:5000/api';
};
```

### **🔧 Component Updates**

#### **Example: Update Pricing Component**

**File:** `frontend/src/components/PricingPage/Pricing.js`
```javascript
import React, { useState, useEffect } from 'react';
import APIService from '../services/api';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await APIService.getPricingPlans();
        setPlans(data.plans || []);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading pricing plans...</div>;
  }

  return (
    <div className="pricing-container">
      {plans.map(plan => (
        <div key={plan.id} className="plan-card">
          <h3>{plan.name}</h3>
          <p>${plan.price}/{plan.duration}</p>
          <ul>
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
```

### **🔧 Remove/Update Proxy Configuration**

#### **Option 1: Remove Proxy (Recommended)**
**File:** `frontend/package.json`
```json
{
  "name": "residentialhub-frontend",
  "version": "2.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    // ... existing dependencies
  }
  // Remove this line:
  // "proxy": "http://localhost:5000"
}
```

#### **Option 2: Update Proxy for Netlify**
**File:** `frontend/package.json`
```json
{
  "proxy": "https://your-site-name.netlify.app"
}
```

### **🔧 Environment Variables**

#### **For Local Development**
Create `.env.development`:
```
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000/api
```

#### **For Production**
Set in Netlify dashboard:
```
NODE_ENV=production
REACT_APP_API_URL=/.netlify/functions
```

### **🔧 Update API Calls in Components**

#### **Before (Local Development)**
```javascript
// Old way
fetch('http://localhost:5000/api/pricing/plans')
  .then(response => response.json())
```

#### **After (Netlify Ready)**
```javascript
// New way
import APIService from '../services/api';
// ...
const plans = await APIService.getPricingPlans();
```

### **📱 Build Configuration**

#### **Update Build Script**
**File:** `frontend/package.json`
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "predeploy": "npm run build",
    "deploy": "netlify deploy --prod --dir=build"
  }
}
```

### **🔧 Routing Updates**

#### **Netlify Redirects**
Create `netlify.toml` in project root:
```toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### **🎯 Testing Configuration**

#### **Local Testing**
```bash
# Start backend functions locally
cd backend/netlify
npm run serve

# Start frontend
cd frontend
npm start
```

#### **Production Testing**
```bash
# Build for production
cd frontend
npm run build

# Test build locally
npx serve -s build
```

### **📊 Performance Optimization**

#### **Code Splitting**
```javascript
// Lazy load components
const Pricing = React.lazy(() => import('./components/Pricing'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

// Use in component
<Suspense fallback={<div>Loading...</div>}>
  <Pricing />
</Suspense>
```

#### **Bundle Optimization**
```javascript
// In package.json
{
  "browserslist": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ]
}
```

### **🔒 Security Considerations**

#### **CORS Configuration**
- Netlify functions handle CORS automatically
- Frontend calls same origin functions
- No cross-origin issues

#### **Environment Variables**
- Never expose sensitive data in frontend
- Use Netlify environment variables
- Validate API responses

### **📞 Common Issues & Solutions**

| Issue | Cause | Solution |
|--------|--------|----------|
| CORS errors | Wrong API URL | Use `/.netlify/functions` |
| 404 errors | Proxy misconfiguration | Remove proxy or update redirects |
| Build failures | Missing dependencies | Run `npm install` in netlify folder |
| Function timeout | Long running queries | Optimize database queries |

### **🚀 Deployment Checklist**

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Environment variables set in Netlify
- [ ] Frontend API calls updated
- [ ] Proxy configuration removed/updated
- [ ] Build process tested locally
- [ ] Functions deployed to Netlify
- [ ] Frontend deployed to Netlify
- [ ] Custom domain configured (optional)
- [ ] SSL certificates verified (automatic)
- [ ] Monitoring and analytics set up

---

**📚 Additional Resources**
- [Netlify Functions Documentation](https://docs.netlify.com/edge-functions/overview/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [MongoDB Atlas Best Practices](https://docs.atlas.mongodb.com/best-practices/)
