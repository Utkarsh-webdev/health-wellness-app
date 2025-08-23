# 🩺 Health Wellness App

A **full-stack MERN application** designed to help users track their wellness journey, share progress with the community, and stay motivated.  
This project includes a **React (Vite) frontend** and a **Node.js + Express + MongoDB backend**.

---

## ✨ Features

### 🔹 Frontend (React + Vite + Tailwind)
- 🌟 Modern UI with **React** and **Tailwind CSS**
- 📝 Community feed (Motivation, Questions, Achievements)
- ❤️ Like, delete, and manage posts
- 👤 Authentication & user sessions (JWT-based)
- 📊 Dashboard with wellness stats
- 📱 Fully responsive design

### 🔹 Backend (Node.js + Express + MongoDB)
- 🔑 User authentication (JWT + bcrypt)
- 📦 REST API routes for users & posts
- 🗄️ MongoDB models (User, Post)
- 🛡️ Protected routes with middleware
- 📝 CRUD operations for posts

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Axios
- Lucide Icons

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure

```
health-wellness-app/
│── backend/          # Express + MongoDB server
│   ├── config/       # Database connection & env
│   ├── controllers/  # API controllers
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   └── server.js     # Entry point
│
│── frontend/         # React (Vite) app
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # App pages (Community, Dashboard, etc.)
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/Utkarsh-webdev/health-wellness-app.git
cd health-wellness-app
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```
Create a `.env` file in `/backend` with:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

- Frontend 👉 `http://localhost:5173`  
- Backend 👉 `http://localhost:5000`

---

## 📸 Screenshots

> _(Add screenshots or demo gifs of your app UI here)_

---

## 🤝 Contributing
1. Fork this repo
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added feature"`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request 🚀

---

## 👨‍💻 Authors
- **Utkarsh Jha** – Frontend Development  
- **(Teammate’s Name)** – Backend Development  

---

## ⭐ Support
If you like this project, please ⭐ the repo and share it!
