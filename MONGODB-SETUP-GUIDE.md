# MongoDB Atlas Cluster Setup Guide

## 🚀 Quick Setup Steps

### 1. Create MongoDB Atlas Account & Cluster

1. **Sign Up**: Go to https://www.mongodb.com/cloud/atlas/register
2. **Create Organization**: Follow the prompts to create your organization
3. **Create Project**: Name it "WorldPassport" or similar
4. **Build Database**:
   - Click "Build a Database"
   - Select **M0 FREE** tier (perfect for development)
   - Choose **AWS** as cloud provider
   - Select region closest to you
   - Cluster Name: `Cluster0` (or your preferred name)
   - Click "Create"

### 2. Create Database User

1. Navigate to **Security → Database Access**
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `worldpassport_user`
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 3. Configure Network Access

1. Navigate to **Security → Network Access**
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click **"Confirm"**

### 4. Get Connection String

1. Go to **Database** view
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. Copy the connection string (looks like):
   ```
   mongodb+srv://worldpassport_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 5. Update Your .env File

1. Open `server/.env`
2. Replace the `MONGODB_URI` with your connection string
3. Replace `<password>` with your actual password
4. Add `/worldpassport` before the `?` to specify database name:
   ```
   MONGODB_URI=mongodb+srv://worldpassport_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/worldpassport?retryWrites=true&w=majority
   ```

### 6. Seed Your Database

Run these commands to populate your database with initial data:

```bash
cd server
npm install
node seed.js
```

You should see:
```
✓ Connected to MongoDB
✓ Cleared all collections
✓ Created 6 destinations
✓ Created 2 consultations
✓ Created 1 contacts
✓ Database seeded successfully!
```

### 7. Start Your Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

## 📊 Collections Created

Your database will have these collections:

1. **destinations** - Study abroad destinations (Malta, South Korea, Malaysia, etc.)
2. **consultations** - Student consultation requests
3. **contacts** - Contact form submissions

## 🔍 Verify Your Setup

### Option 1: MongoDB Atlas UI
1. Go to your cluster in MongoDB Atlas
2. Click "Browse Collections"
3. You should see the `worldpassport` database with 3 collections

### Option 2: Test API Endpoints
```bash
# Get all destinations
curl http://localhost:5000/api/destinations

# Get all consultations
curl http://localhost:5000/api/consultations

# Get all contacts
curl http://localhost:5000/api/contacts
```

## 🛠️ Troubleshooting

### Connection Issues
- Verify your IP is whitelisted in Network Access
- Check username and password are correct
- Ensure password doesn't contain special characters that need URL encoding

### Seed Script Fails
- Make sure MongoDB connection string is correct in `.env`
- Check that all dependencies are installed: `npm install`
- Verify your database user has write permissions

### Server Won't Start
- Check if port 5000 is already in use
- Verify all environment variables are set
- Check MongoDB connection string format

## 🔐 Security Best Practices

For production:
- Use specific IP addresses instead of 0.0.0.0/0
- Use strong, unique passwords
- Enable MongoDB Atlas encryption
- Regularly rotate credentials
- Use environment variables (never commit .env files)

## 📝 Next Steps

1. ✅ Cluster created
2. ✅ Database seeded
3. ✅ Server connected
4. 🔄 Start building your application!

Need help? Check the MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
