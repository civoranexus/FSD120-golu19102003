# Society360 Netlify Deployment Guide

## 🚀 **Deployment Setup for Netlify**

### **📋 Prerequisites**
- Netlify account (free tier works)
- MongoDB Atlas account (free tier available)
- Node.js and npm installed locally
- Git repository for your project

### **🔧 Step 1: Setup MongoDB Atlas**

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create free account
   - Create new cluster (free M0 sandbox)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Select "Drivers" > "Node.js"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add database name: `/society360`

3. **Whitelist IP Address**
   - In Network Access, add IP: `0.0.0.0/0` (allows all IPs)

### **🔧 Step 2: Configure Netlify Functions**

1. **Update Environment Variables in Netlify**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/society360
   NODE_ENV=production
   JWT_SECRET=your_jwt_secret_here
   ```

2. **Deploy Functions**
   - Copy `backend/netlify/functions/` folder to your Netlify site
   - Each `.js` file becomes a serverless function
   - Functions are accessible at `/.netlify/functions/function-name`

### **🔧 Step 3: Update Frontend Configuration**

1. **Update API Calls in React**
   ```javascript
   // Change from localhost to Netlify functions
   const API_BASE_URL = '/.netlify/functions';
   
   // Example API call
   fetch(`${API_BASE_URL}/pricing/plans`)
     .then(response => response.json())
   ```

2. **Update package.json proxy** (remove or modify)
   ```json
   {
     "proxy": "https://your-site.netlify.app"
   }
   ```

### **🔧 Step 4: Deploy to Netlify**

1. **Connect Repository**
   - Go to Netlify dashboard
   - "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: frontend/build
   ```

3. **Set Environment Variables**
   - Add all variables from `.env.production`
   - Set them in Site settings > Environment variables

### **🔧 Step 5: Test Deployment**

1. **Function URLs**
   - Pricing: `https://your-site.netlify.app/.netlify/functions/pricing`
   - Users: `https://your-site.netlify.app/.netlify/functions/users`
   - Health: `https://your-site.netlify.app/.netlify/functions/health`

2. **Frontend URL**
   - Main site: `https://your-site.netlify.app`

### **🎯 Available Functions**

| Function | Endpoint | Description |
|----------|----------|-------------|
| `health.js` | `/health` | API health check |
| `pricing.js` | `/pricing/plans` | Get subscription plans |
| `users.js` | `/users/profile` | User profile data |
| `visitors.js` | `/visitors` | Visitor management |
| `maintenance.js` | `/maintenance` | Maintenance requests |

### **🔧 Local Development**

1. **Install Serverless Dependencies**
   ```bash
   cd backend/netlify
   npm install
   ```

2. **Test Functions Locally**
   ```bash
   npm run serve
   ```

### **📱 Mobile App Considerations**

For future mobile app deployment:
- Use same MongoDB Atlas database
- API endpoints remain the same
- Netlify functions can serve mobile apps too

### **🔒 Security Notes**

- Environment variables are encrypted in Netlify
- MongoDB Atlas uses SSL/TLS encryption
- CORS is configured for all origins
- Rate limiting can be added per function

### **📊 Monitoring**

- Netlify provides built-in function logs
- MongoDB Atlas has performance monitoring
- Set up alerts for database usage

### **🎉 Next Steps**

1. Deploy frontend to Netlify
2. Set up custom domain (optional)
3. Configure SSL certificates (automatic on Netlify)
4. Set up analytics and monitoring

---

**📞 Need Help?**
- Netlify Docs: https://docs.netlify.com/
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Serverless HTTP: https://github.com/dougmoscrop/serverless-http
