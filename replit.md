# Writing Sanctuary Application

## Overview

This is a personalized Microsoft Word-like writing app with celestial purple aesthetics, crafted as a special birthday gift for Rei (Rhiza Marie Manalo). The application features a beautiful birthday landing page with her personal message, followed by a rich text editor with document management capabilities. Built using modern web technologies including React, Express, TypeScript, Tailwind CSS, and TipTap rich text editor.

## Recent Changes (January 2025)

- **Birthday Landing Page**: Created a stunning celestial-themed birthday page with Rei's personal birthday message, featuring subtle star patterns and constellation graphics instead of excessive emojis and animations
- **Celestial Aesthetic**: Implemented a calming cosmic theme with deep purple gradients, soft star fields, and tarot-inspired visual elements throughout the application
- **Rich Text Editor**: Enhanced with TipTap for Microsoft Word-like functionality including bold, italic, underline, text colors, heading levels, and formatting options
- **Refined UI**: Removed excessive animations and emojis, keeping only elegant touches like the single ribbon (🎀) icon for a more sophisticated, comforting aesthetic
- **Personal Touches**: Incorporated references to Rei's interests (Chikawa, poetry, purple colors) in a subtle, meaningful way

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Rich Text Editor**: TipTap for WYSIWYG editing capabilities

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod for schema validation
- **API Design**: RESTful endpoints for document and preference management

### Key Components

#### Database Schema
- **Documents Table**: Stores writing documents with metadata (title, content, word count, character count, timestamps)
- **User Preferences Table**: Stores user settings (theme, font preferences, auto-save settings)

#### Frontend Components
- **Rich Text Editor**: TipTap-based editor with formatting toolbar
- **Document Sidebar**: File explorer with document list and management
- **Theme System**: Dark/light mode toggle with CSS custom properties
- **Responsive Design**: Mobile-first approach with collapsible sidebar

#### Backend Services
- **Storage Interface**: Abstracted storage layer supporting both memory (development) and database implementations
- **Document API**: CRUD operations for document management
- **Preferences API**: User preference management

## Data Flow

1. **Document Creation**: Client sends document data → Server validates with Zod → Stored in database → Response returned
2. **Document Editing**: Real-time content updates → Auto-save functionality → Word/character count tracking
3. **Theme Management**: Client-side theme state → Local storage persistence → CSS variable updates
4. **File Management**: Sidebar displays document list → Click to load → Editor updates with content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@tiptap/react**: Rich text editor framework
- **@radix-ui/***: Headless UI components for accessibility

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles Node.js server to `dist/index.js`
3. **Database**: Drizzle migrations managed via `drizzle-kit push`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment setting (development/production)

### Server Setup
- **Development**: `npm run dev` starts both Vite dev server and Express backend
- **Production**: `npm run build` then `npm start` serves static files and API
- **Database**: Migrations applied via `npm run db:push`

### File Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── dist/            # Build output
└── migrations/      # Database migrations
```

The application uses a monorepo structure with clear separation between frontend, backend, and shared code, enabling easy development and deployment while maintaining type safety across the full stack.