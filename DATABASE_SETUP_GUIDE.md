# Society360 Database Setup Guide

## 🗄️ **MongoDB Atlas Configuration**

### **📋 Prerequisites**
- MongoDB Atlas account (free tier available)
- Basic understanding of NoSQL databases

### **🔧 Step 1: Create MongoDB Atlas Cluster**

1. **Sign Up/Login**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create free account or login

2. **Create New Cluster**
   - Click "Build a Database"
   - Select "M0 Sandbox" (free tier)
   - Choose cloud provider and region closest to you
   - Cluster name: `society360-cluster`

3. **Configure Security**
   - Username: `society360-admin`
   - Password: Generate strong password
   - Click "Create Database User"

### **🔧 Step 2: Network Access**

1. **Add IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
   - Click "Confirm"

2. **Why Allow All IPs?**
   - Netlify functions have dynamic IPs
   - Easier for development and deployment
   - Can be restricted later for production

### **🔧 Step 3: Database Setup**

1. **Create Database**
   - Go to "Collections" under your cluster
   - Click "Add My Own Data"
   - Database name: `society360`
   - Collection: `users` (will be created automatically)

2. **Sample Data Structure**
   ```javascript
   // Users Collection
   {
     _id: ObjectId,
     name: String,
     email: String,
     role: String, // 'resident', 'admin', 'staff'
     society: String,
     joinDate: Date,
     createdAt: Date,
     updatedAt: Date
   }
   
   // Visitors Collection
   {
     _id: ObjectId,
     name: String,
     purpose: String,
     host: String,
     date: Date,
     status: String, // 'pending', 'approved', 'rejected'
     createdAt: Date
   }
   
   // Maintenance Collection
   {
     _id: ObjectId,
     title: String,
     description: String,
     priority: String, // 'low', 'medium', 'high'
     status: String, // 'pending', 'in-progress', 'completed'
     requestedBy: String,
     assignedTo: String,
     createdAt: Date,
     completedAt: Date
   }
   ```

### **🔧 Step 4: Get Connection String**

1. **Navigate to Connect**
   - Go to your cluster dashboard
   - Click "Connect" button

2. **Select Connection Method**
   - Choose "Drivers"
   - Select "Node.js" version 4.1 or later

3. **Copy Connection String**
   ```
   mongodb+srv://society360-admin:<PASSWORD>@society360-cluster.mongodb.net/society360?retryWrites=true&w=majority
   ```

4. **Important Notes**
   - Replace `<PASSWORD>` with your actual password
   - Keep this string secure and private
   - Never commit to Git or expose in frontend

### **🔧 Step 5: Environment Variables**

Add to your Netlify environment variables:
```
MONGODB_URI=mongodb+srv://society360-admin:your_password@society360-cluster.mongodb.net/society360?retryWrites=true&w=majority
```

### **📊 Database Collections Needed**

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| `users` | User management | name, email, role, society |
| `visitors` | Visitor tracking | name, purpose, host, status |
| `maintenance` | Maintenance requests | title, description, priority, status |
| `payments` | Billing & payments | amount, dueDate, status |
| `communications` | Messages & notices | message, type, recipients |
| `amenities` | Facility booking | amenity, date, userId |

### **🔒 Security Best Practices**

1. **Connection Security**
   - Always use `mongodb+srv://` for SSL/TLS
   - Enable authentication for all databases
   - Use strong, unique passwords

2. **Network Security**
   - Start with allow all IPs for development
   - Restrict to specific IPs in production
   - Monitor access logs regularly

3. **Data Security**
   - Enable encryption at rest (default in Atlas)
   - Regular backups (automatic in free tier)
   - Implement field-level validation

### **📈 Scaling Considerations**

1. **Free Tier Limits**
   - 512 MB storage
   - Shared resources
   - Suitable for development/small projects

2. **When to Upgrade**
   - >100 concurrent users
   - >1GB data storage
   - Need dedicated resources

3. **Performance Monitoring**
   - Monitor query performance
   - Check connection pool usage
   - Review slow query logs

### **🚀 Production Deployment**

1. **Create Production Database**
   - Separate from development database
   - Use different credentials
   - Implement proper indexing

2. **Backup Strategy**
   - Enable automated backups in Atlas
   - Test restore procedures
   - Document recovery process

### **📞 Troubleshooting**

**Common Issues:**
- "Authentication failed" → Check username/password
- "Connection timeout" → Check IP whitelist
- "Database not found" → Verify database name

**Solutions:**
- Double-check connection string format
- Ensure IP is whitelisted
- Verify user has proper permissions

---

**📚 Additional Resources**
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js MongoDB Driver](https://mongodb.github.io/node-mongodb-native/)
- [Database Design Best Practices](https://www.mongodb.com/blog/post/building-with-patterns-a-summary/)
