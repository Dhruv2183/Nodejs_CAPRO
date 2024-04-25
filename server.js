const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'localhost',
  password: '',
  database: 'project'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Define route to fetch video entries
app.get('/videos', (req, res) => {
  const query = 'SELECT title, artist, video_link AS link, thumbnail_url AS thumbnail FROM videos';
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
