const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const serverless = require('serverless-http'); // 👈 required for Vercel

const app = express();

// CORS
const allowedOrigins = [
  'https://mini-docs-app-eosin.vercel.app',
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

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const fullPath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ message: 'Upload successful!', file: req.file, url: fileUrl });
});

// Download route
app.get('/api/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');
  res.download(filePath, req.params.filename);
});

// ✅ Export for Vercel (no app.listen)
module.exports = app;
module.exports.handler = serverless(app);
