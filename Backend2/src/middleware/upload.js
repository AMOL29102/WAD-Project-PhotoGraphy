// src/middleware/upload.js
const multer = require('multer');
const path = require('path');

// Sanitize filename
function sanitizeFileName(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const sanitizedBase = base.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
  return `${Date.now()}-${sanitizedBase}${ext}`;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = sanitizeFileName(file.originalname);
    cb(null, sanitizedFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
