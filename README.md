# BookFace – Fullstack MERN (Final Project)

BookFace is a MERN-stack social app where users can register, log in/out, create posts, and upload post media (images/videos).

**Live URLs**
- **Frontend (Vercel):** https://bookface-fullstack-mern.vercel.app  
- **Backend (Render):** https://bookface-nwjl.onrender.com

**Tech stack**
- **Frontend:** React + TypeScript (CRA) + styled-components + Axios
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB Atlas
- **Media hosting:** Cloudinary
- **Deploy:** Backend on Render, Frontend on Vercel

---

## Features
- ✅ Register / Login / Logout (JWT)
- ✅ Auth-protected routes
- ✅ Feed and posts
- ✅ Create post with optional media uploads
- ✅ Upload constraints and validation:
  - **Avatar:** max 5MB (image only)
  - **Cover:** max 8MB (image only)
  - **Post media:** max 25MB per file, max 4 files (image/video)

---

## Project Structure

```

Bookface_Fullstack_MERN/
backend/
src/
config/
controllers/
middlewares/
models/
routes/
schemas/
services/
utils/
server.ts
package.json
tsconfig.json
tsconfig.build.json

frontend/
src/
components/
provider/
routes/
service/
utils/
view/
package.json

````

---

## Local Development

### 1) Clone and install dependencies
```bash
git clone <YOUR_REPO_URL>
cd Bookface_Fullstack_MERN
````

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

---

## Backend Setup (Local)

### Environment variables (`backend/.env`)

Create a `.env` file inside `backend/`:

```env
SERVER_PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000

MONGO_URI=<your_mongodb_atlas_uri>
DB_NAME=bookface-mern

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

JWT_SECRET=<your_random_secret>
```

### Run backend

```bash
npm run startts
```

Backend should run at:

```
http://localhost:3001
```

---

## Frontend Setup (Local)

### Environment variables (`frontend/.env`)

Create `frontend/.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

### Run frontend

```bash
npm start
```

Frontend should run at:

```
http://localhost:3000
```

---

## Deployment

### Backend → Render

**Render service settings**

* Root directory: `backend`
* Build command:

  ```bash
  npm ci && npm run build
  ```
* Start command:

  ```bash
  npm start
  ```

**Render Environment Variables (Production)**
Set these in Render dashboard:

```env
NODE_ENV=production
SERVER_PORT=3001
CORS_ORIGINS=https://bookface-fullstack-mern.vercel.app

MONGO_URI=<your_mongodb_atlas_uri>
DB_NAME=bookface-mern

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

JWT_SECRET=<your_random_secret>
```

✅ MongoDB Atlas access:

* In Atlas → **Network Access**, whitelist Render:

  * Quick option (development/testing): `0.0.0.0/0`
  * Best practice: restrict to trusted IPs if available

Backend live:

```
https://bookface-nwjl.onrender.com
```

---

### Frontend → Vercel

**Vercel settings**

* Root directory: `frontend`
* Framework preset: **Create React App**
* Build command:

  ```bash
  npm run build
  ```
* Output directory: `build`

**Vercel Environment Variables**
Set in Vercel dashboard:

```env
REACT_APP_API_BASE_URL=https://bookface-nwjl.onrender.com
```

Frontend live:

```
https://bookface-fullstack-mern.vercel.app
```

---

## Common Issues

### 1) CORS blocked (preflight fails)

Make sure `CORS_ORIGINS` includes your Vercel domain:

```env
CORS_ORIGINS=https://bookface-fullstack-mern.vercel.app
```

If using multiple domains, separate with commas:

```env
CORS_ORIGINS=https://bookface-fullstack-mern.vercel.app,http://localhost:3000
```

### 2) Post creation fails with 400 (Bad Request)

If the response says:

> `Media file is too large (max 25MB per file)`

Your upload file is bigger than 25MB.
Compress the file or upload a smaller one.

### 3) MongoDB connection error on Render (IP not whitelisted)

Whitelist Render’s access in MongoDB Atlas:
Atlas → Network Access → Add IP Address

---

## Scripts

### Backend

```bash
npm run startts   # run dev server with tsx watch
npm run build     # compile TypeScript into /dist
npm start         # run dist/server.js
npm test          # run tests
```

### Frontend

```bash
npm start         # dev server
npm run build     # production build
```

---

## Planning

Project planning and tasks were managed with Jira:

* [https://girlie-razon84.atlassian.net/jira/software/c/projects/BMFP/issues](https://girlie-razon84.atlassian.net/jira/software/c/projects/BMFP/issues)

---

## Author

**Girlie Razon**