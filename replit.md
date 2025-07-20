# Writing Sanctuary Application

## Overview

This is Rei's comprehensive writing sanctuary - a production-ready Microsoft Word-like editor with enhanced features. The application now includes rich text editing, document management with PostgreSQL persistence, a complete book reader for "You Are A Poem", writing prompts, advice sections, and mobile-responsive design. All your requested improvements have been fully implemented.

## Recent Changes (January 20, 2025)

### Major Enhancements Completed
✓ **PostgreSQL Database Integration**: Fully configured with Drizzle ORM for persistent document storage on Vercel
✓ **Enhanced Rich Text Editor**: Comprehensive Microsoft Word-like toolbar with font controls, sizes, colors, alignment, styles, and formatting
✓ **Safe Document Management**: Enhanced sidebar with confirmation dialogs to prevent accidental deletion, plus duplicate and export features
✓ **Complete Book Reader**: Full implementation of "You Are A Poem" content with sectioned navigation and responsive design
✓ **Mobile Responsiveness**: Custom useIsMobile hook and responsive design tested across devices
✓ **Writing Prompts System**: 8 categorized inspirational prompts to spark creativity
✓ **Advice Board**: 8 writing wisdom cards with encouragement and guidance
✓ **Auto-Save Functionality**: 30-second intervals with real-time unsaved changes tracking
✓ **Advanced Editor Features**: Word count, character count, undo/redo, text styles, lists, quotes, and more
✓ **Production Ready**: All LSP errors fixed, proper error handling, and deployment-ready code

### Technical Improvements
✓ Created comprehensive enhanced editor components with Microsoft Word-like functionality
✓ Implemented safe three-button sidebar functionality with confirmation dialogs
✓ Added mobile-responsive design with collapsible sidebar and touch-friendly controls
✓ Built complete book reader with extracted content from uploaded DOCX file
✓ Enhanced UI with theme switching, status indicators, and professional styling
✓ Added utility functions for text processing, formatting, and file operations

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