// backend/server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Required to parse JSON in POST requests

const users = [
  { name: 'Mohit', role: 'DevOps Engineer', email: 'mohit@ac.com', description: 'Specializes in Monitoring and infrastructure automation' },
  { name: 'Dina', role: 'Senior DevOps Developer', email: 'dina@ac.com', description: 'Handles CI/CD pipelines and Infra handling' },
];

// GET users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST new user
app.post('/api/users', (req, res) => {
  const { name, role, email, description } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  const newUser = { name, role, email, description };
  users.push(newUser);
  console.log('New user added:', newUser);
  res.status(201).json(newUser);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
