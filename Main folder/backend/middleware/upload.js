const multer = require('multer');
const path = require('path');

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define upload directory
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Create a unique filename for the uploaded file
  },
});

const upload = multer({ storage });

module.exports = upload;
