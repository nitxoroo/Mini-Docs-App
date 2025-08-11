const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// ✅ Allow frontend origins
const allowedOrigins = [
  'https://mini-docs-app-ob8j.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Root route
app.get('/', (req, res) => {
  res.send('✅ Vercel Express API running!');
});

// Temporary "uploads" folder (non-persistent)
const uploadDir = path.join('/tmp', 'uploads'); // ✅ Use /tmp in Vercel
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const fullPath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
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
  const fileUrl = `${req.protocol}://${req.get('host')}/api/uploads/${req.file.filename}`;
  res.json({ message: 'Upload successful!', file: req.file, url: fileUrl });
});

// Download route
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  res.download(filePath, req.params.filename);
});

module.exports = app; // ✅ Important for Vercel
