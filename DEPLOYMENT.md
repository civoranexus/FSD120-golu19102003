# Society360 Deployment Configuration

## Production Deployment Guide

### 1. Server Requirements

#### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 50GB SSD
- **OS**: Ubuntu 20.04 LTS or CentOS 8

#### Recommended Requirements
- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 100GB SSD
- **OS**: Ubuntu 22.04 LTS

### 2. Environment Setup

#### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### Install Node.js
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Install MongoDB
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Install Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Install PM2
```bash
sudo npm install -g pm2
```

### 3. Application Setup

#### Clone Repository
```bash
# Create application directory
sudo mkdir -p /var/www/society360
sudo chown $USER:$USER /var/www/society360

# Clone repository
cd /var/www/society360
git clone https://github.com/civora-nexus/FSD120-golu19102003.git .
```

#### Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install --production

# Install frontend dependencies and build
cd ../frontend
npm install
npm run build
```

#### Configure Environment
```bash
# Backend environment
cd /var/www/society360/backend
sudo cp .env.example .env
sudo nano .env
```

**Production .env Configuration:**
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com

# Database
MONGODB_URI=mongodb://localhost:27017/society360_prod

# JWT (Generate strong secrets)
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here
JWT_REFRESH_SECRET=your_very_long_and_secure_refresh_secret_key_here
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your_very_long_and_secure_session_secret_key_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Nginx Configuration

#### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/society360
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Frontend
    location / {
        root /var/www/society360/frontend/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
```

#### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/society360 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. SSL Certificate (Let's Encrypt)

#### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

#### Obtain SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### Auto-renewal
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. PM2 Configuration

#### Create PM2 Ecosystem File
```bash
cd /var/www/society360
nano ecosystem.config.js
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'society360-api',
    script: './backend/src/server.js',
    cwd: '/var/www/society360',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

#### Create Logs Directory
```bash
mkdir -p /var/www/society360/logs
```

#### Start Application with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 7. Database Setup

#### Create Database User
```bash
mongo
```
```javascript
use society360_prod
db.createUser({
  user: "society360",
  pwd: "your_secure_password",
  roles: [
    { role: "readWrite", db: "society360_prod" }
  ]
})
exit
```

#### Update MongoDB Configuration
```bash
sudo nano /etc/mongod.conf
```

**MongoDB Configuration:**
```yaml
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1

# security
security:
  authorization: enabled

# operationProfiling
operationProfiling:
  slowOpThresholdMs: 100
  mode: slowOp
```

#### Restart MongoDB
```bash
sudo systemctl restart mongod
```

### 8. Firewall Configuration

#### Configure UFW
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 9. Monitoring and Logging

#### Set up Log Rotation
```bash
sudo nano /etc/logrotate.d/society360
```

**Log Rotation Configuration:**
```
/var/www/society360/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

#### Monitor PM2
```bash
# Check status
pm2 status

# View logs
pm2 logs

# Monitor
pm2 monit

# Restart application
pm2 restart society360-api
```

### 10. Backup Strategy

#### Create Backup Script
```bash
sudo nano /usr/local/bin/backup-society360.sh
```

**Backup Script:**
```bash
#!/bin/bash

# Variables
BACKUP_DIR="/var/backups/society360"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="society360_prod"
APP_DIR="/var/www/society360"

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
mongodump --db $DB_NAME --out $BACKUP_DIR/db_$DATE

# Application files backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz -C $APP_DIR .

# Remove old backups (keep last 7 days)
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

#### Make Script Executable
```bash
sudo chmod +x /usr/local/bin/backup-society360.sh
```

#### Schedule Daily Backups
```bash
sudo crontab -e
# Add this line for daily backup at 2 AM
0 2 * * * /usr/local/bin/backup-society360.sh >> /var/log/backup-society360.log 2>&1
```

### 11. Performance Optimization

#### Optimize MongoDB
```javascript
// Connect to MongoDB
mongo society360_prod

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ status: 1 })
db.visitors.createIndex({ email: 1 })
db.visitors.createIndex({ status: 1 })
db.visitors.createIndex({ createdAt: -1 })
db.maintenance.createIndex({ status: 1 })
db.maintenance.createIndex({ priority: 1 })
db.maintenance.createIndex({ createdAt: -1 })
db.transactions.createIndex({ unit: 1 })
db.transactions.createIndex({ status: 1 })
db.transactions.createIndex({ createdAt: -1 })
```

#### Enable PM2 Clustering
The ecosystem.config.js already includes clustering with `instances: 'max'` and `exec_mode: 'cluster'`.

### 12. Health Check

#### Create Health Check Endpoint
Add this to your backend server:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

#### Test Health Check
```bash
curl http://localhost:5000/health
```

### 13. Troubleshooting

#### Common Issues

1. **Application not starting**
   ```bash
   # Check PM2 logs
   pm2 logs society360-api
   
   # Check Nginx logs
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Database connection issues**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongod
   
   # Check MongoDB logs
   sudo tail -f /var/log/mongodb/mongod.log
   ```

3. **SSL Certificate issues**
   ```bash
   # Check certificate status
   sudo certbot certificates
   
   # Renew certificate manually
   sudo certbot renew
   ```

#### Performance Monitoring
```bash
# Monitor system resources
htop
iostat -x 1

# Monitor PM2
pm2 monit

# Monitor Nginx
sudo tail -f /var/log/nginx/access.log
```

### 14. Security Checklist

- [ ] Firewall configured
- [ ] SSL certificate installed
- [ ] Security headers implemented
- [ ] Rate limiting configured
- [ ] Database authentication enabled
- [ ] Regular backups scheduled
- [ ] Log rotation configured
- [ ] System updates applied
- [ ] Application running as non-root user
- [ ] Sensitive data in environment variables
- [ ] Password policies enforced
- [ ] Access logs monitored

### 15. Maintenance

#### Regular Maintenance Tasks
- **Weekly**: Check logs, monitor performance, apply security updates
- **Monthly**: Review backup integrity, update dependencies
- **Quarterly**: Security audit, performance optimization
- **Yearly**: SSL certificate renewal, system upgrade planning

#### Update Process
```bash
# Backup current version
/usr/local/bin/backup-society360.sh

# Pull latest changes
cd /var/www/society360
git pull origin main

# Update dependencies
cd backend && npm install --production
cd ../frontend && npm install && npm run build

# Restart application
pm2 restart society360-api
```

---

**Deployment completed! Your Society360 application is now running in production.**
