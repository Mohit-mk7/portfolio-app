const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Required to parse JSON in POST requests

let users = [
  {
    name: 'Mohit',
    role: 'DevOps Engineer',
    email: 'ghost@ac.com',
    description: 'Specializes in Monitoring and infrastructure automation'
  },
  {
    name: 'Dina',
    role: 'Senior DevOps Developer',
    email: 'dina@ac.com',
    description: 'Handles CI/CD pipelines and Infra handling'
  }
];

// Health check endpoint (Kubernetes liveness/readiness probe)
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST a new user
app.post('/api/users', (req, res) => {
  const { name, role, email, description } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  const newUser = { name, role, email: email || '', description: description || '' };
  users.push(newUser);
  console.log('✅ New user added:', newUser);
  res.status(201).json(newUser);
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running at http://0.0.0.0:${PORT}`);
});
