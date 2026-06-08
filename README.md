Real-Time Chat Application (QuickChat)

A full-stack real-time chat application that allows users to communicate instantly with each other.

🌐 Live Demo: https://realtime-chat-app-xi-inky.vercel.app

QuickChat supports authentication, online/offline status, profile management, image sharing, and real-time messaging using Socket.IO.

This project demonstrates how modern chat applications work under the hood using WebSockets.

🚀 Features

🔐 User Authentication

Sign up & login with JWT-based authentication

👤 User Profiles

Update name, bio, and profile picture

💬 Real-Time Messaging

Instant message delivery using Socket.IO

🟢 Online / Offline Status

Live user presence tracking

📸 Image Messaging

Send images in chat (Cloudinary integration)

👀 Seen / Unseen Messages

Message read tracking

📂 Media Panel

View shared images in chat sidebar

🔍 User Search

Search users from sidebar

🔒 Protected Routes

Secure APIs using middleware

🛠️ Tech Stack
Frontend:
React
Context API
Axios
React Router
Tailwind CSS
Socket.IO Client

Backend:
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
Socket.IO
Cloudinary

📁 Project Structure
realtime-chat-app/
│
├── client/        # React frontend
│   ├── pages
│   ├── components
│   ├── context
│   └── assets
│
├── server/        # Node.js backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── lib
│
├── .gitignore
├── README.md
└── LICENSE

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/KotapatiSaiMounika/realtime-chat-app.git
cd realtime-chat-app

2️⃣ Backend Setup
cd server
npm install


Create a .env file in the server folder:

PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Start backend:
npm run server

3️⃣ Frontend Setup
cd client
npm install
npm run dev

Create .env in client:
VITE_BACKEND_URL=http://localhost:5000

Start frontend:
npm run dev


🧪 How It Works:

JWT token is stored in localStorage

Axios attaches token to all protected requests

Socket.IO connects using userId

Server tracks online users using a socket map

Messages are emitted instantly to receiver

MongoDB stores chats, users, and message status



📚 What I Learned

Implementing real-time communication using Socket.IO

Managing authentication & protected routes

Handling global state with Context API

Building a full-stack MERN application

Debugging real-world issues like:

socket reconnections

auth token handling

online status sync

📌 Future Improvements

Typing indicators

Message reactions

Group chats

Notifications

Deployment (Render / Vercel)

👩‍💻 Author

Kotapati Sai Mounika

GitHub: @KotapatiSaiMounika

📄 License

This project is licensed under the MIT License.
