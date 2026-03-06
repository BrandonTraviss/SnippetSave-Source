 # SnippetSave - Full‑Stack Code Snippet Manager
<img width="1904" height="911" alt="screen1" src="https://github.com/user-attachments/assets/0a267096-ff02-4316-bdf8-57674bad6b06" />
A secure, scalable, and feature‑rich web application for creating, browsing, filtering, and favoriting code snippets. Built with Node.js, Express, MongoDB, and a Vite + React frontend.

---

## Features

### Secure Authentication
- JWT‑based authentication using httpOnly cookies for secure, XSS‑resistant session handling  
- Protected routes on both frontend and backend  
- Robust login, registration, and logout flows  

### Snippet Management
![screen2](https://github.com/user-attachments/assets/e60068b5-ad4d-4866-a6cc-e76d00d3d92a)

- Create, view, and browse code snippets  
- Snippets include title, description, language, tags, and favorite count  
- Fully responsive UI designed for desktop and mobile  

### Advanced Filtering and Pagination
<img width="1908" height="904" alt="screen3" src="https://github.com/user-attachments/assets/28398dd9-de72-41f4-a7b5-3ef3ac67229d" />

- Filter snippets by title, tag, and language  
- Backend‑driven pagination for scalable performance  
- Clean, query‑based API design  

### Favorites System
<img width="1899" height="911" alt="{A3EA0C3B-F8E9-4AE1-8719-EAAC0045875E}" src="https://github.com/user-attachments/assets/01fc3e64-c765-43ca-9239-7b1902309a46" />
<img width="1906" height="905" alt="{5777BF88-26BE-4BA0-AE8C-4DC9835C0F99}" src="https://github.com/user-attachments/assets/fb80ec96-537d-4f83-b4dc-a7693b9f48dc" />

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
| Frontend | React, Vite, JavaScript, Axios             |
| Backend  | Node.js, Express 5                         |
| Database | MongoDB, Mongoose                          |
| Auth     | JWT                                        |
| Other    | Pagination, filtering, favorites, SPA fallback |

---

## Getting Started

### 1. Clone the repository

    git clone https://github.com/BrandonTraviss/SnippetSave-Source.git
    cd SnippetSave-Source

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
