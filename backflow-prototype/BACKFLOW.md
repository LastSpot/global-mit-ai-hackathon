# Overview

> **⚠️ WARNING:**
> If your project uses a `src` folder, your `middleware.ts` file must be placed inside the `src` folder (e.g., `src/middleware.ts`).
> If you do **not** use a `src` folder, `middleware.ts` must be at the project root (e.g., `middleware.ts`).
> This is required for Next.js to correctly pick up your middleware.

Backflow is a process mapping tool with flow graphs designed for manufacturing cost analysis. It allows users to create visual representations of processes and analyze their costs.

# Tech Stack

- **Frontend:** Next.js 15 (App Router), TailwindCSS, Shadcn/UI, Magic UI
- **Canvas Library:** ReactFlow (installed but not yet fully implemented)
- **Backend:** Supabase
- **Authentication:** Supabase Auth
- **State Management:** Zustand
- **Form Validation:** Zod

# Features

## Implemented
- **Authentication System**
  - Login functionality
  - Signup functionality 
  - Route protection with middleware
  - Form validation with Zod
  - Error handling

- **UI Framework**
  - Custom UI components based on Shadcn/UI
  - Responsive design with mobile support
  - Dark/light mode support
  - Navigation sidebar

## Pending Implementation
- **Whiteboard Feature**
  - ReactFlow canvas integration
  - Node creation and editing
  - Connection management
  - Process flow visualization

- **Dashboard**
  - Project management
  - Whiteboard listing and creation
  - Analytics and reporting

# Routes

- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - Main application dashboard (protected)
- `/dashboard/whiteboard/[id]` - Whiteboard editor (to be implemented)

# Database Schema

Current schema in Supabase:

## Users (Managed by Supabase Auth)
- id: UUID (primary key)
- email: String
- password: String (hashed)
- created_at: Timestamp

## Future Tables to Implement

### Whiteboards
- id: UUID (primary key)
- user_id: UUID (foreign key to Users)
- name: String
- description: String
- created_at: Timestamp
- updated_at: Timestamp

### Nodes
- id: UUID (primary key)
- whiteboard_id: UUID (foreign key to Whiteboards)
- type: String
- position_x: Number
- position_y: Number
- data: JSON
- created_at: Timestamp
- updated_at: Timestamp

### Connections
- id: UUID (primary key)
- whiteboard_id: UUID (foreign key to Whiteboards)
- source_id: UUID (foreign key to Nodes)
- target_id: UUID (foreign key to Nodes)
- type: String
- data: JSON
- created_at: Timestamp
- updated_at: Timestamp

# Migration Plans

1. Create Whiteboards table
2. Create Nodes table
3. Create Connections table
4. Add indexes for performance
   - Index on whiteboard_id in Nodes table
   - Index on whiteboard_id in Connections table
   - Index on user_id in Whiteboards table

# API Endpoints

## Authentication
- POST /api/auth/login
- POST /api/auth/signup
- POST /api/auth/logout

## Whiteboards (To Be Implemented)
- GET /api/whiteboards
- GET /api/whiteboards/:id
- POST /api/whiteboards
- PUT /api/whiteboards/:id
- DELETE /api/whiteboards/:id

## Nodes (To Be Implemented)
- GET /api/whiteboards/:id/nodes
- POST /api/whiteboards/:id/nodes
- PUT /api/whiteboards/:id/nodes/:nodeId
- DELETE /api/whiteboards/:id/nodes/:nodeId

## Connections (To Be Implemented)
- GET /api/whiteboards/:id/connections
- POST /api/whiteboards/:id/connections
- PUT /api/whiteboards/:id/connections/:connectionId
- DELETE /api/whiteboards/:id/connections/:connectionId