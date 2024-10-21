const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const registrations = [];

app.post('/register', (req, res) => {
  const { firstName, lastName, email, discountCode } = req.body;
  
  // Check if email already exists
  if (registrations.some(r => r.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  // Add new registration
  registrations.push({ firstName, lastName, email, discountCode });
  
  res.status(201).json({ message: 'Registration successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
