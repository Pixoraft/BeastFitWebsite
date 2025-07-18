# BeastFit Arena - Fitness Center Web Application

## Overview

BeastFit Arena is a modern fitness center web application built with React, Express, and TypeScript. The application serves as a comprehensive platform for a premium gym, featuring user registration, membership inquiries, reviews, trainer profiles, and administrative capabilities. The project follows a full-stack architecture with a React frontend and Express backend, utilizing Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI components with shadcn/ui design system
- **State Management**: React Query (TanStack Query) for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: In-memory storage with fallback to PostgreSQL
- **API Design**: RESTful API structure
- **Validation**: Zod schemas for data validation

## Key Components

### Database Schema
The application uses five main database tables:
- **Users**: Stores user profiles with authentication data
- **Reviews**: Customer reviews and ratings
- **Membership Inquiries**: Lead capture for membership sales
- **Contact Messages**: General contact form submissions
- **Site Stats**: Analytics and visitor tracking data

### Authentication System
- Simple email/password authentication
- Local storage persistence for user sessions
- Admin role-based access control
- No complex JWT or session management

### UI Components
- Comprehensive component library using Radix UI primitives
- Custom themed components following a dark fitness aesthetic
- Responsive design optimized for mobile and desktop
- Form components with built-in validation

### Business Features
- **Hero Section**: Call-to-action for free trials and membership
- **About Section**: Facility highlights and features
- **Membership Plans**: Tiered pricing with WhatsApp integration
- **Trainer Profiles**: Staff showcase with credentials
- **Gallery**: Visual facility tour
- **Reviews System**: Customer feedback and ratings
- **Contact Forms**: Multiple lead capture points
- **Admin Dashboard**: Analytics and data management

## Data Flow

1. **User Registration/Login**: Frontend forms → API validation → Database storage → Local storage persistence
2. **Review Submission**: Authenticated user → Form validation → Database storage → Real-time UI update
3. **Membership Inquiries**: Contact form → Database storage → WhatsApp integration for follow-up
4. **Admin Analytics**: Database aggregation → API endpoints → Dashboard visualization
5. **Visitor Tracking**: Page load → API call → Statistics update

## External Dependencies

### Core Technologies
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle with PostgreSQL dialect
- **UI Library**: Radix UI components
- **Styling**: Tailwind CSS with custom configuration
- **Validation**: Zod for schema validation
- **HTTP Client**: Native fetch API
- **Date Handling**: date-fns library

### External Services
- **WhatsApp Integration**: Direct links for business communication
- **Image Hosting**: Unsplash for stock images
- **Icons**: Lucide React and Font Awesome
- **Fonts**: Google Fonts (Inter and Open Sans)

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Strict mode configuration
- **Linting**: Basic TypeScript checking
- **Hot Reload**: Vite development server
- **Error Handling**: Runtime error modal for development

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations to `migrations/` directory

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Development and production build separation
- Static file serving from built frontend

### Production Considerations
- Express serves static React build in production
- Database migrations managed through Drizzle Kit
- Error handling for both client and server components
- Mobile-responsive design for all screen sizes

The application prioritizes user experience with smooth animations, intuitive navigation, and clear calls-to-action, while maintaining a robust backend for data management and business operations.