const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/V', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define video schema and model
const videoSchema = new mongoose.Schema({
  title: String,
  artist: String,
  videoUrl: String,
});

const Video = mongoose.model('Video', videoSchema);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route to fetch videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Serve streaming.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'streaming.html'));
});

app.get('/download.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'download.html'));
});

app.get('/public/videos/V1.mp4', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'videos', 'V1.mp4');
  res.set('Content-Type', 'video/mp4');
  res.sendFile(filePath);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
