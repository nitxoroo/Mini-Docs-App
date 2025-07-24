const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploads publicly

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config with overwrite support
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => {
    const fullPath = path.join('uploads', file.originalname);

    // Check if file exists and delete it to allow overwriting
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath); // delete the old file
    }

    cb(null, file.originalname); // save with original name
  }
});

const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    message: 'Upload successful!',
    file: req.file,
    url: fileUrl
  });
});

// Download route (forces download instead of opening in browser)
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  if (!fs.existsSync(filePath)) {
    console.error('Download error: File not found', filePath);
    return res.status(404).send('File not found');
  }

  console.log('Downloading file:', filePath);
  res.download(filePath, req.params.filename);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
