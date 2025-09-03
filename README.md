# Brainly-15

A full-stack application with React frontend and Express backend. Brainly acts as your second brain where you can store the links of any videos, tweets etc. which you wanna look into later.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Material-UI
- **Backend**: Express + TypeScript + MongoDB + JWT Authentication

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd Brainly-15
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Environment setup:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your values
   
   # Frontend  
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your backend URL
   ```

3. **Run locally:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## API Endpoints

- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `GET /api/v1/content` - Get content
- `POST /api/v1/content` - Create content
- `GET /api/v1/brain` - Get shared content
