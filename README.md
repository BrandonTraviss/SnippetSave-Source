# SnippetHub — Full‑Stack Code Snippet Manager

A secure, scalable, and feature‑rich web application for creating, browsing, filtering, and favoriting code snippets. Built with Node.js, Express, MongoDB, and a Vite + React frontend.

---

## Features

### Secure Authentication
- JWT‑based authentication using httpOnly cookies for secure, XSS‑resistant session handling  
- Protected routes on both frontend and backend  
- Robust login, registration, and logout flows  

### Snippet Management
- Create, view, and browse code snippets  
- Snippets include title, description, language, tags, and favorite count  
- Fully responsive UI designed for desktop and mobile  

### Advanced Filtering and Pagination
- Filter snippets by title, tag, and language  
- Backend‑driven pagination for scalable performance  
- Clean, query‑based API design  

### Favorites System
- Users can favorite or unfavorite snippets  
- Dedicated Favorites page showing saved snippets  
- Snippets display real‑time favorite counts  

### Backend Architecture
- Modular Express controllers and routes  
- MongoDB with Mongoose models and indexing for fast queries  
- Clean separation of concerns and maintainable structure  

### Frontend Experience
- Built with React + Vite for fast development and optimized builds  
- Modern UI with smooth interactions  
- Global state management for authentication and favorites  
- SPA routing with production‑ready fallback support  

### Deployment
- Prepared for deployment on platforms like Render  
- Proper CORS, cookie, and environment configuration  
- Production‑ready build pipeline  

---

## Tech Stack

| Layer     | Technologies                                |
|----------|---------------------------------------------|
| Frontend | React, Vite, JavaScript, Fetch API         |
| Backend  | Node.js, Express 5                         |
| Database | MongoDB, Mongoose                          |
| Auth     | JWT, httpOnly cookies                      |
| Other    | Pagination, filtering, favorites, SPA fallback |

---

## Getting Started

### 1. Clone the repository

    git clone https://github.com/yourusername/snippethub.git
    cd snippethub

### 2. Install dependencies

    cd backend
    npm install

    cd ../frontend
    npm install

### 3. Backend environment variables

Create a `.env` file inside the `backend/` folder:

    PORT=5000
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development

### 4. Run the application

Backend:

    cd backend
    npm run dev

Frontend:

    cd frontend
    npm run dev

---

## API Routes

### Auth Routes

    POST /auth/register        // Register a new user
    POST /auth/login           // Login user
    POST /auth/logout          // Logout user
    GET  /auth/me              // Get current authenticated user (protected)

---

### Snippet Routes

    POST   /snippets/                          // Create a new snippet (protected)

    GET    /snippets/favorites/list            // Get user's favorite snippets (protected)
    GET    /snippets/user/:userId              // Get snippets created by a specific user (protected)

    GET    /snippets/public                    // Get all public snippets (protected)
    GET    /snippets/public/:id                // Get a single public snippet

    POST   /snippets/:snippetId/favorite       // Toggle favorite on a snippet (protected)
    GET    /snippets/:snippetId/favoriteCount  // Get favorite count for a snippet

    GET    /snippets/:id                       // Get a snippet by ID (protected)
    PUT    /snippets/:id                       // Update a snippet (protected)
    DELETE /snippets/:id                       // Delete a snippet (protected)

---

## What I Learned

- Implementing secure JWT auth with httpOnly cookies  
- Designing scalable filtering and pagination APIs  
- Managing relational data (favorites) in MongoDB  
- Handling CORS, cookies, and SPA fallback in production  
- Building a clean, maintainable full‑stack architecture  
