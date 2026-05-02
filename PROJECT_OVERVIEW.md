# TechCo - Commercial Website

A complete, production-ready commercial website showcasing modern web development best practices.

## Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first styling with dark mode
- **Motion (Framer Motion)** - Smooth animations and micro-interactions
- **Context API** - Global state management (Theme & Auth)
- **Axios** - HTTP client for API requests

### Backend
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database with KV store
  - Authentication with JWT tokens
  - Edge Functions (Hono web server)
- **Hono** - Fast, lightweight web framework (running on Deno)

## Features

### 🎨 UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Dark/Light mode toggle with system preference detection
- Smooth scroll animations with Intersection Observer
- Micro-interactions on hover and click
- Gradient accents and modern design system

### 🔐 Authentication
- User registration with email/password
- Secure login with JWT tokens
- Session persistence
- Protected routes and user profile display

### 📧 Contact Form
- Form validation
- Backend integration for submissions
- Success/error feedback
- Submissions stored in database

### 📊 Analytics & SEO
- Page view tracking
- Event tracking (clicks, scrolls, form submissions)
- Performance metrics monitoring
- SEO-optimized meta tags
- Open Graph and Twitter Card support
- Structured data (JSON-LD)

### 🎯 Sections
1. **Hero** - Eye-catching landing with animated gradients and stats
2. **Features** - 6 feature cards with icons and hover effects
3. **Services** - Detailed service offerings with feature lists
4. **Testimonials** - Client reviews with avatars and ratings
5. **Contact** - Working contact form with real backend integration
6. **Footer** - Comprehensive footer with links and newsletter

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Navigation.tsx      # Header with auth and theme toggle
│   │   ├── Hero.tsx            # Landing section with animations
│   │   ├── Features.tsx        # Feature showcase
│   │   ├── Services.tsx        # Service offerings
│   │   ├── Testimonials.tsx    # Customer reviews
│   │   ├── ContactForm.tsx     # Contact form with backend
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── AuthModal.tsx       # Login/signup modal
│   │   ├── SEO.tsx             # SEO meta tags manager
│   │   └── Analytics.tsx       # Analytics tracker
│   ├── contexts/
│   │   ├── ThemeContext.tsx    # Dark mode state
│   │   └── AuthContext.tsx     # Auth state & methods
│   └── App.tsx                 # Main app component
├── styles/
│   ├── theme.css               # Tailwind theme & dark mode
│   └── fonts.css               # Font imports
└── utils/
    └── supabase/
        └── info.ts             # Supabase config

supabase/functions/server/
├── index.tsx                   # API routes
└── kv_store.tsx               # Database utilities
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - Sign in existing user
- `GET /auth/user` - Get current user (protected)

### Contact
- `POST /contact` - Submit contact form
- `GET /contact/submissions` - Get all submissions (protected)

## Development

The site is built with:
- **Type safety** throughout with TypeScript
- **Performance** optimized with lazy loading and efficient re-renders
- **Accessibility** with semantic HTML and ARIA labels
- **Security** with JWT auth and input validation
- **Scalability** with modular component architecture

## Environment Variables

The following are managed by Supabase:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Public anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side admin key (never exposed to client)

## Key Implementation Details

1. **Context API Pattern**: Theme and Auth state managed globally
2. **JWT Authentication**: Secure, stateless auth with Supabase
3. **Scroll Animations**: IntersectionObserver for performance
4. **Dark Mode**: CSS custom properties with class toggle
5. **Analytics**: Custom event tracking with console logging (ready for GA/Mixpanel)
6. **SEO**: Dynamic meta tags and structured data

## Production Considerations

✅ Responsive on all devices
✅ Cross-browser compatible
✅ Performance optimized
✅ SEO-friendly structure
✅ Accessible UI
✅ Type-safe codebase
✅ Secure authentication
✅ Database-backed features

---

**Built with ❤️ using modern web technologies**
