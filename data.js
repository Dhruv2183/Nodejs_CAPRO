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

// Array of video data
const videosData = [
  {
    title: 'Heartless (The Weeknd)',
    artist: 'The Weeknd',
    videoUrl: 'https://www.youtube.com/watch?v=1DpH-icPpl0',
  },
  {
    title: 'Blinding Lights (The Weeknd)',
    artist: 'The Weeknd',
    videoUrl: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
  },
  {
    title: 'Save Your Tears (The Weeknd)',
    artist: 'The Weeknd',
    videoUrl: 'https://www.youtube.com/watch?v=XXYlFuWEuKI',
  },
  {
    title: 'Until I Bleed Out (The Weeknd)',
    artist: 'The Weeknd',
    videoUrl: 'https://www.youtube.com/watch?v=oq9AgxHvGjw',
  },
  {
    title: 'After Hours (The Weeknd)',
    artist: 'The Weeknd',
    videoUrl: 'https://www.youtube.com/watch?v=i58MNnk6BhY',
  },
];

// Function to upload videos to MongoDB
async function uploadVideos() {
  try {
    // Insert each video into the database
    for (const videoData of videosData) {
      const video = new Video(videoData);
      await video.save();
      console.log(`Uploaded video: ${video.title}`);
    }
    console.log('All videos uploaded successfully');
  } catch (error) {
    console.error('Error uploading videos:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the function to upload videos
uploadVideos();
