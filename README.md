# TechCo - Full Stack Commercial Website

A complete, production-ready commercial website built with modern technologies, featuring a React/TypeScript frontend and Express.js/MongoDB backend.

## 🚀 Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # React components
│   │   │   ├── contexts/     # Context providers (Theme, Auth)
│   │   │   └── App.tsx       # Main app component
│   │   ├── styles/           # CSS and theme files
│   │   └── main.tsx          # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env.example
│
├── server/                 # Express.js backend application
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth & error handling
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.ts        # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS 4.0** - Styling with dark mode
- **Motion (Framer Motion)** - Animations
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - Request logging

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher)
- **npm** or **pnpm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd techco
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# IMPORTANT: Update MONGODB_URI and JWT_SECRET
```

**Configure your `.env` file:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/techco
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
```

**Configure your `.env` file:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TechCo
VITE_APP_VERSION=1.0.0
```

### 4. MongoDB Setup

**Option A: Local MongoDB**

```bash
# Install MongoDB on your system
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually
mongod --dbpath=/path/to/data/directory
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techco
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

Client runs on: `http://localhost:5173`

### Production Build

**Backend:**

```bash
cd server
npm run build
npm start
```

**Frontend:**

```bash
cd client
npm run build
npm run preview
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/signin` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/logout` | Logout user | Private |

### Contact Form

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact/submissions` | Get all submissions | Admin |
| GET | `/api/contact/:id` | Get single submission | Admin |
| PUT | `/api/contact/:id` | Update submission status | Admin |
| DELETE | `/api/contact/:id` | Delete submission | Admin |

### Example Requests

**Sign Up:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Sign In:**
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Current User:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Submit Contact Form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Partnership Inquiry",
    "message": "I would like to discuss a potential partnership."
  }'
```

## 🗄️ Database Models

### User Model

```typescript
{
  name: String (required, max 50 chars)
  email: String (required, unique, lowercase)
  password: String (required, min 6 chars, hashed)
  role: String (enum: 'user', 'admin', default: 'user')
  isActive: Boolean (default: true)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Contact Model

```typescript
{
  name: String (required, max 100 chars)
  email: String (required, lowercase)
  subject: String (max 200 chars)
  message: String (required, max 2000 chars)
  status: String (enum: 'new', 'read', 'replied', 'archived')
  ipAddress: String (optional)
  userAgent: String (optional)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🔐 Authentication Flow

1. User signs up with email, password, and name
2. Password is hashed with bcrypt (10 salt rounds)
3. User record is created in MongoDB
4. JWT token is generated and returned
5. Client stores token in localStorage
6. Token is sent in Authorization header for protected routes
7. Server validates token and attaches user to request

## 🎨 Features

### Frontend Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark/Light mode toggle with persistence
- ✅ Smooth scroll animations (Intersection Observer)
- ✅ Micro-interactions (hover, click effects)
- ✅ Form validation
- ✅ Error handling with user feedback
- ✅ SEO optimized (meta tags, Open Graph, structured data)
- ✅ Analytics tracking
- ✅ Type-safe with TypeScript

### Backend Features
- ✅ RESTful API design
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Request logging (Morgan)
- ✅ Security headers (Helmet)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ MongoDB integration with Mongoose
- ✅ Type-safe with TypeScript

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens with expiration
- ✅ Helmet for security headers
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ MongoDB injection prevention (Mongoose)

## 🚧 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite HMR
- Backend: Nodemon

### Debugging
- Frontend: React DevTools
- Backend: VS Code debugger or console.log
- Database: MongoDB Compass

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting

## 📦 Build for Production

### Backend

```bash
cd server
npm run build
# Outputs to dist/ folder
```

### Frontend

```bash
cd client
npm run build
# Outputs to dist/ folder
```

## 🚀 Deployment

### Backend Deployment (Heroku, Render, Railway)

1. Set environment variables on your platform
2. Update `MONGODB_URI` to production database
3. Update `CLIENT_URL` to production frontend URL
4. Deploy from `server/dist/` folder

### Frontend Deployment (Vercel, Netlify, Cloudflare Pages)

1. Set `VITE_API_URL` to production backend URL
2. Deploy from `client/dist/` folder
3. Configure build command: `npm run build`
4. Configure output directory: `dist`

### Environment Variables for Production

**Backend:**
- `MONGODB_URI` - Production MongoDB connection
- `JWT_SECRET` - Strong secret key (use random generator)
- `CLIENT_URL` - Production frontend URL
- `NODE_ENV=production`

**Frontend:**
- `VITE_API_URL` - Production backend URL

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email hello@techco.com or open an issue in the repository.

---

**Built with ❤️ using modern web technologies**
