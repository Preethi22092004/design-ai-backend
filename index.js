const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/generate', upload.single('image'), (req, res) => {
  const preferences = req.body.preferences;
  const image = req.file;

  if (!preferences || !image) {
    return res.status(400).json({ error: 'Missing preferences or image file' });
  }

  console.log('Received preferences:', preferences);
  console.log('Received file:', image.originalname);

  const dummyGeneratedImageURL = 'https://via.placeholder.com/600x400?text=AI+Design';

  res.json({ imageUrl: dummyGeneratedImageURL });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
