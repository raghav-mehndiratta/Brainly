# Brainly-15

A full-stack application with React frontend and Express backend.

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

## Deployment

### Backend (Render)
1. Connect your GitHub repo to Render
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables:
   - `PORT` (auto-set by Render)
   - `MONGO_URI` (your MongoDB connection string)
   - `JWT_SECRET` (your JWT secret)
   - `FRONTEND_URL` (your frontend domain)
   - `NODE_ENV=production`

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `VITE_BACKEND_URL` (your backend domain)

## API Endpoints

- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `GET /api/v1/content` - Get content
- `POST /api/v1/content` - Create content
- `GET /api/v1/brain` - Get shared content
