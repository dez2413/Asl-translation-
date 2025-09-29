//testing code


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; // use 5000 for backend, 3000 will be React frontend

app.use(cors()); // allow React frontend to call backend
app.use(express.json()); // allow JSON request bodies

// Example API endpoint
app.get('/api/lessons', (req, res) => {
  res.json([
    { id: 1, title: "ASL Alphabet - A", image: "a.png" },
    { id: 2, title: "ASL Alphabet - B", image: "b.png" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

//Testing Git Push
