# TechCo Architecture Documentation

## Overview

This is a full-stack commercial website with a clear separation between frontend (client) and backend (server). The architecture follows modern best practices with TypeScript throughout, RESTful API design, and MongoDB for data persistence.

## Technology Stack

### Frontend (Client)
```
React 18.3 + TypeScript + Vite
├── UI Framework: React with functional components & hooks
├── Type Safety: TypeScript with strict mode
├── Build Tool: Vite (fast HMR, optimized builds)
├── Styling: Tailwind CSS 4.0 with custom theme
├── State Management: Context API (Theme + Auth)
├── Animations: Motion (Framer Motion)
├── HTTP Client: Axios
└── Development: Hot Module Replacement (HMR)
```

### Backend (Server)
```
Node.js + Express + TypeScript + MongoDB
├── Framework: Express.js (RESTful API)
├── Type Safety: TypeScript with strict mode
├── Database: MongoDB with Mongoose ODM
├── Authentication: JWT (JSON Web Tokens)
├── Security: Helmet, CORS, Rate Limiting
├── Password Hashing: bcryptjs
├── Logging: Morgan
├── Validation: Express Validator
└── Development: Nodemon with ts-node
```

## Project Structure

### Client Architecture

```
client/
├── src/
│   ├── app/
│   │   ├── components/          # React components
│   │   │   ├── Navigation.tsx   # Header with auth/theme
│   │   │   ├── Hero.tsx         # Landing section
│   │   │   ├── Features.tsx     # Feature showcase
│   │   │   ├── Services.tsx     # Services grid
│   │   │   ├── Testimonials.tsx # Customer reviews
│   │   │   ├── ContactForm.tsx  # Contact with API
│   │   │   ├── Footer.tsx       # Footer links
│   │   │   ├── AuthModal.tsx    # Login/signup modal
│   │   │   ├── SEO.tsx          # Meta tags manager
│   │   │   └── Analytics.tsx    # Event tracking
│   │   │
│   │   ├── contexts/           # React Context providers
│   │   │   ├── ThemeContext.tsx # Dark/light mode
│   │   │   └── AuthContext.tsx  # User authentication
│   │   │
│   │   └── App.tsx             # Main application
│   │
│   ├── styles/                 # CSS files
│   │   ├── theme.css          # Tailwind theme + dark mode
│   │   └── fonts.css          # Font imports
│   │
│   └── main.tsx               # Entry point
│
├── index.html                 # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

### Server Architecture

```
server/
├── src/
│   ├── config/
│   │   └── database.ts        # MongoDB connection
│   │
│   ├── models/                # MongoDB schemas
│   │   ├── User.ts           # User model
│   │   └── Contact.ts        # Contact submission model
│   │
│   ├── controllers/           # Business logic
│   │   ├── authController.ts # Auth handlers
│   │   └── contactController.ts # Contact handlers
│   │
│   ├── routes/               # API route definitions
│   │   ├── authRoutes.ts    # /api/auth/*
│   │   └── contactRoutes.ts # /api/contact/*
│   │
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts          # JWT verification
│   │   └── errorHandler.ts  # Global error handler
│   │
│   ├── utils/               # Helper functions
│   │   └── generateToken.ts # JWT token generator
│   │
│   └── server.ts            # Express app & entry point
│
├── tsconfig.json            # TypeScript config
└── package.json             # Dependencies
```

## Data Flow

### Authentication Flow

```
1. User Signup/Signin (Client)
   └─> POST /api/auth/signup or /api/auth/signin

2. Server Validates Input
   └─> Check email format, password length

3. Database Operation
   └─> Create user or find existing user

4. Password Verification
   └─> bcrypt.compare() for signin
   └─> bcrypt.hash() for signup

5. JWT Token Generation
   └─> jwt.sign({ id: user._id }, JWT_SECRET)

6. Response to Client
   └─> { user: {...}, token: "..." }

7. Client Stores Token
   └─> localStorage.setItem('token', token)

8. Subsequent Requests
   └─> Authorization: Bearer <token>

9. Server Validates Token
   └─> jwt.verify(token, JWT_SECRET)
   └─> Attach user to req.user

10. Protected Route Access
    └─> User can access authenticated endpoints
```

### Contact Form Flow

```
1. User Fills Form (Client)
   └─> Name, Email, Subject, Message

2. Form Submission
   └─> POST /api/contact

3. Server Validation
   └─> Check required fields
   └─> Validate email format

4. Database Save
   └─> Contact.create({ name, email, ... })

5. Response to Client
   └─> { message: "...", submissionId: "..." }

6. Client Feedback
   └─> Show success message
   └─> Reset form
```

## API Design

### RESTful Conventions

```
Resource: Users
├── POST   /api/auth/signup      # Create new user
├── POST   /api/auth/signin      # Authenticate user
├── GET    /api/auth/me          # Get current user (protected)
└── POST   /api/auth/logout      # Logout user (protected)

Resource: Contacts
├── POST   /api/contact           # Create contact submission
├── GET    /api/contact/submissions # Get all (admin only)
├── GET    /api/contact/:id       # Get one (admin only)
├── PUT    /api/contact/:id       # Update (admin only)
└── DELETE /api/contact/:id       # Delete (admin only)
```

### Request/Response Format

**Request:**
```typescript
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```typescript
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response:**
```typescript
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "User already exists with this email"
}
```

## Database Schema

### Users Collection

```typescript
{
  _id: ObjectId,
  name: String,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  role: "user" | "admin",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contacts Collection

```typescript
{
  _id: ObjectId,
  name: String,
  email: String (indexed),
  subject: String,
  message: String,
  status: "new" | "read" | "replied" | "archived",
  ipAddress: String,
  userAgent: String,
  createdAt: Date (indexed),
  updatedAt: Date
}

// Compound Index
{ status: 1, createdAt: -1 }
```

## Security Implementation

### Password Security
```typescript
// Signup - Hash password before saving
userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Signin - Compare hashed passwords
const isMatch = await user.matchPassword(enteredPassword);
```

### JWT Token Security
```typescript
// Generate token with expiration
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify token on protected routes
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Request Security
```typescript
// Helmet - Security headers
app.use(helmet());

// CORS - Restrict origins
app.use(cors({ origin: process.env.CLIENT_URL }));

// Rate Limiting - Prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

## Environment Configuration

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TechCo
VITE_APP_VERSION=1.0.0
```

### Server (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/techco
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

## State Management

### Theme Context
```typescript
// Manages dark/light mode
- State: theme ('light' | 'dark')
- Actions: toggleTheme()
- Persistence: localStorage
- Effect: Toggles 'dark' class on <html>
```

### Auth Context
```typescript
// Manages user authentication
- State: user, loading, accessToken
- Actions: signUp(), signIn(), signOut()
- Persistence: localStorage (token)
- Effect: Auto-checks auth on mount
```

## Build & Deployment

### Development
```bash
# Backend: TypeScript → Node.js (ts-node)
npm run dev

# Frontend: TypeScript + React → Vite Dev Server
npm run dev
```

### Production
```bash
# Backend: TypeScript → JavaScript (dist/)
npm run build
npm start

# Frontend: TypeScript + React → Optimized bundle (dist/)
npm run build
npm run preview
```

## Performance Optimizations

### Frontend
- ✅ Vite for fast HMR and optimized builds
- ✅ Code splitting (React.lazy potential)
- ✅ Image optimization (srcset potential)
- ✅ Intersection Observer for lazy animations
- ✅ LocalStorage for theme/token persistence

### Backend
- ✅ MongoDB indexes on frequently queried fields
- ✅ JWT stateless authentication (no session storage)
- ✅ Rate limiting to prevent abuse
- ✅ Mongoose lean() for read-only queries (potential)
- ✅ Compression middleware (potential addition)

## Scalability Considerations

### Current Architecture Supports:
- ✅ Horizontal scaling (stateless JWT auth)
- ✅ Database indexing for performance
- ✅ Environment-based configuration
- ✅ API versioning ready (/api/v1)
- ✅ Modular component structure

### Future Enhancements:
- 🔄 Redis for session/cache management
- 🔄 CDN for static assets
- 🔄 Load balancer for multiple server instances
- 🔄 Database replication and sharding
- 🔄 Microservices architecture (if needed)

## Testing Strategy (Recommended)

### Frontend
- Unit: Jest + React Testing Library
- E2E: Cypress or Playwright
- Coverage: Aim for >80%

### Backend
- Unit: Jest + Supertest
- Integration: MongoDB Memory Server
- Coverage: Aim for >80%

## Monitoring & Logging

### Current Implementation
- ✅ Morgan HTTP request logging
- ✅ Console error logging
- ✅ Frontend analytics tracking

### Production Recommendations
- Monitor: PM2, New Relic, or DataDog
- Logs: Winston with log rotation
- Errors: Sentry for error tracking
- Analytics: Google Analytics or Mixpanel

---

**Architecture designed for scalability, maintainability, and developer experience.**
