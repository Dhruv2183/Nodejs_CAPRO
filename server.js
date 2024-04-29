const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

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
// app.get('/videos', async (req, res) => {
//   try {
//     const videos = await Video.find();
//     res.json(videos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Define route to fetch videos
app.get('/videos/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const filePath = getFilePathForVideoId(videoId);
    if (!filePath) {
      return res.status(404).send('Video not found');
    }
    res.sendFile(filePath);
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

// app.get('/public/videos/V1.mp4', (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'videos', 'V1.mp4');
//   res.set('Content-Type', 'video/mp4');
//   res.sendFile(filePath);
// });

function getFilePathForVideoId(videoId) {
  // Implement your logic to map video IDs to file paths here
  // Example:
  if (videoId === 'Heartless (The Weeknd) - The Weeknd') {
    return path.join(__dirname, 'public', 'videos', 'Heartless (The Weeknd) - The Weeknd.mp4');
  } else if (videoId === 'Blinding Lights (The Weeknd) - The Weeknd') {
    return path.join(__dirname, 'public', 'videos', 'Blinding Lights (The Weeknd) - The Weeknd.mp4');
  }
  else if (videoId === 'Save Your Tears (The Weeknd) - The Weeknd') {
    return path.join(__dirname, 'public', 'videos', 'Save Your Tears (The Weeknd) - The Weeknd.mp4');
  }
  else if (videoId === 'Until I Bleed Out (The Weeknd) - The Weeknd') {
    return path.join(__dirname, 'public', 'videos', 'Until I Bleed Out (The Weeknd) - The Weeknd.mp4');
  }
  else if (videoId === 'After Hours (The Weeknd) - The Weeknd') {
    return path.join(__dirname, 'public', 'videos', 'After Hours (The Weeknd) - The Weeknd.mp4');
  }
  // Add more mappings as needed
  return null; // Return null if video ID is not found
}

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});