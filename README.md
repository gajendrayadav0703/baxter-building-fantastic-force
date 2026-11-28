# Baxter Building — Fantastic Force (Nexus Command Center)

Full-stack MERN application featuring the Cyberpunk Nexus UI (`frontend/`) and Express + MongoDB REST API (`backend/`).

## Prerequisites

- **Node.js** (LTS 18+ or 20+) and **npm**
- **MongoDB** (local MongoDB Community Server or MongoDB Atlas URI)

## 1. Environment Configuration

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and set your local values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/baxter_nexus
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace_with_a_strong_random_secret_at_least_32_chars
JWT_EXPIRES_IN=7d
```

### Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Security Note:** Never commit `.env` files or real secrets to version control.

## 2. Install Dependencies & Run

### Start Backend
```bash
cd backend
npm install
npm run dev
```
The API listens on `http://localhost:5000` (health check: `GET /api/health`).

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```
The React app runs on `http://localhost:5173`.

## 3. Authentication Endpoints (`/api/auth`)

- `POST /api/auth/register` — Register a new user (`commander` for the first account, `operator` thereafter)
- `POST /api/auth/login` — Sign in with email or username and receive a JWT
- `GET /api/auth/me` — Get current authenticated user (`Authorization: Bearer <token>`)
- `POST /api/auth/logout` — Sign out acknowledgement

## 4. Running Tests

```bash
cd backend
npm test
```
