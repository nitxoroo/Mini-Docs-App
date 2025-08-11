// api/index.js  <-- place this inside "server/api" folder for Vercel
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// ✅ CORS configuration (only allow your Vercel domain)
const allowedOrigins = [
  'https://mini-docs-app-eosin.vercel.app', 
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// ✅ Simple root route
app.get('/', (req, res) => {
  res.send('✅ Server is running successfully on Vercel!');
});

// NOTE: In Vercel, local "uploads" folder is ephemeral
// Files will not persist after serverless function ends

// Serve uploaded files (works only during current runtime)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists (runtime only)
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const fullPath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath); // Overwrite existing
    }
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    message: 'Upload successful!',
    file: req.file,
    url: fileUrl
  });
});

// Download route
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  res.download(filePath, req.params.filename);
});

// ✅ Export app for Vercel
module.exports = app;
