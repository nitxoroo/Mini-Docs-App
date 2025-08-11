# 📄 Mini Docs App

This is a sleek and interactive document cards interface built with **React.js**, **Tailwind CSS**, and **Framer Motion**, backed by a lightweight **Express.js server** to handle file uploads. Users can upload documents via the frontend, preview them, and download them instantly.

![Mini Docs App Screenshot](./path-to-screenshot.png) <!-- Replace with actual path or GitHub image URL -->

---

## 🚀 Features

- 📁 Stylish document cards UI
- 📤 Upload documents via Express backend
- 📥 Instant download button with file size indicator
- 🖱️ Drag-and-drop cards using `Framer Motion`
- ⚡ Fully responsive with Tailwind CSS
- 🌐 Backend deployed on Railway

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** – UI library
- **Tailwind CSS** – Utility-first CSS framework
- **Framer Motion** – Drag animations and transitions
- **Vite** – Frontend build tool

### Backend:
- **Node.js + Express.js** – Server for file uploads
- **Multer** – Middleware for handling `multipart/form-data`
- **CORS** – Allow frontend-backend communication
- **Hosted on Railway**

---

## 🖼️ Preview

![Preview](./path-to-screenshot.png) <!-- Replace with actual image path -->

---

## 📦 Installation

To run the **project locally**, both **frontend** and **backend**:

---

### 🔹 Frontend Setup

1. **Clone the Repo**
   ```bash
   git clone https://github.com/your-username/mini-docs-app.git
   cd mini-docs-app


### 2. Install dependencies:
   ```bash
   npm install
   Run the development server:
   ```
### 3. Run the development server:
   ```bash
   npm run dev
   ```
### 4.Open your browser and navigate to 
  ```bash
 http://localhost:5173 (or whatever port Vite provides).
 ```

##  📁 Folder Structure (Simplified)
```
mini-docs-app/
│
├── public/
├── src/
│ ├── components/
│ │ └── DocCard.jsx
│ ├── App.jsx
│ ├── index.js
│
├── server/
│ ├── index.js
│ └── uploads/
│
├── tailwind.config.js
├── package.json
└── README.md

```
## 🔹 Backend Setup (File Upload API)

This backend uses **Express.js** and **Multer** to handle file uploads and downloads.

### 📁 Navigate to your server folder:
```bash
cd server
```
### 📦 Install dependencies:
```bash
npm install
```
### 🗂️ Create the uploads folder (if not present):
```bash
mkdir uploads
```
### ▶️ Start the backend server:
```bash
node index.js
```
### By default, the server runs at:
```bash
http://localhost:8080
```

## FeedBack
If you have any feedback, please reach out to me at nitin141020@gmail.com
