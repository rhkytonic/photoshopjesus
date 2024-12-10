import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Store media items in memory (in production, use a database)
let mediaItems = [];

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const mediaItem = {
    id: crypto.randomUUID(),
    url: `/uploads/${req.file.filename}`,
    type: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
    name: req.file.originalname,
    uploadedAt: new Date()
  };

  mediaItems.push(mediaItem);
  res.json(mediaItem);
});

// Get all media items
app.get('/api/media', (req, res) => {
  res.json(mediaItems);
});

// Delete media item
app.delete('/api/media/:id', (req, res) => {
  const item = mediaItems.find(item => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Media not found' });
  }

  // Delete file from filesystem
  const filePath = path.join(__dirname, '..', item.url);
  fs.unlink(filePath, (err) => {
    if (err) console.error('Error deleting file:', err);
  });

  mediaItems = mediaItems.filter(item => item.id !== req.params.id);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});