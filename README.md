Firebase CRUD Task App
A protected CRUD app with Firebase Auth & Firestore.
Description
This is a task management application built with Next.js and TypeScript, integrated with Firebase Authentication and Firestore for user authentication and data storage. Users can register, log in, and manage their tasks with CRUD operations. The dashboard is protected, accessible only to logged-in users, and displays a personalized greeting with the user's email. Tasks are user-specific, stored in Firestore with fields for title, description, priority, completed status, and user email.

Technologies Used

Next.js
TypeScript
Firebase Auth
Firestore

Features

Firebase Authentication (email/password register, login, logout)
Protected Routes (dashboard accessible only to authenticated users)
CRUD Operations (create, read, update, delete tasks in Firestore)
Personalized Dashboard Greeting (e.g., "Hello, testuser@gmail.com")

Setup Instructions

Clone the repository: git clone https://your-repo-url.git
Run npm install to install dependencies (including firebase, react-firebase-hooks/auth).
Add your Firebase config in .env.local (e.g., NEXT_PUBLIC_FIREBASE_API_KEY=your_key, etc.).
Run npm run dev to start the development server at http://localhost:3000.

