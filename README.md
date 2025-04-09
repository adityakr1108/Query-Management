# Query Management System

A full-stack Query Management System designed to streamline the handling of user queries, built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- User Registration and Login
- Admin & User Dashboards
- Submit, View, and Track Queries
- Admin Management of All Queries
- Role-based Access Control
- RESTful API Integration
- Authentication with JWT

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js

## 📁 Project Structure

```
Query-Management/
│
├── backend/                # Express server & MongoDB integration
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── package.json
```

## 💡 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/adityakr1108/Query-Management.git
cd Query-Management
```

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

> Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

> Frontend will run on `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## 🧪 Admin Test Credentials

Use the following credentials to log in as an admin:

```
ADMIN_EMAIL = "admin@test.com"
ADMIN_PASSWORD = "admin123"
```

## 👤 Author

- [Aditya Kumar](https://github.com/adityakr1108)

## 📝 License

This project is licensed under the MIT License.

---

Feel free to contribute or fork the project!

