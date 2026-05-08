# Quick Start Guide

Get your TechCo website up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB installed (or MongoDB Atlas account)
- [ ] Code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies  
cd ../client
npm install
```

### 2. Configure Environment Variables

**Server (.env):**
```bash
cd ../server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/techco
JWT_SECRET=change-this-to-a-random-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Client (.env):**
```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

**If using local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**If using MongoDB Atlas:**
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGODB_URI` in `server/.env`

### 4. Run the Application

Open **TWO** terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Server running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd client  
npm run dev
```
✅ Client running on http://localhost:5173

### 5. Open in Browser

Navigate to: **http://localhost:5173**

## Test the Application

### 1. Test Sign Up
- Click "Sign Up" button
- Fill in name, email, password
- Submit form
- You should be automatically logged in

### 2. Test Contact Form
- Scroll to "Contact" section
- Fill out the form
- Submit
- Check MongoDB for the submission:

```bash
# Connect to MongoDB
mongosh

# Use the database
use techco

# View contact submissions
db.contacts.find().pretty()

# View users
db.users.find().pretty()
```

### 3. Test Dark Mode
- Click the moon/sun icon in navigation
- Page should switch themes
- Refresh page - theme should persist

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running, start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Issue: "Port already in use"

**Solution:**
Change port in `server/.env`:
```env
PORT=5001  # or any other available port
```

Then update `client/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### Issue: "Module not found"

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS error"

**Solution:**
Make sure:
- Backend is running on port 5000
- Frontend is running on port 5173
- `CLIENT_URL` in server/.env matches frontend URL

## Production Build

```bash
# Build backend
cd server
npm run build

# Build frontend
cd ../client
npm run build
```

## Next Steps

1. ✅ Customize the content in components
2. ✅ Add your own branding/colors
3. ✅ Configure email service (optional)
4. ✅ Add more features as needed
5. ✅ Deploy to production

## Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints documentation
- Check MongoDB connection string format
- Ensure all environment variables are set correctly

---

**Happy coding! 🚀**
