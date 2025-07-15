const express = require('express');
const cors = require('cors');
const { setToken, log } = require('../LoggingMiddleware/logger-backend');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
setToken('PASTE_YOUR_BEARER_TOKEN_HERE');
app.use((req, res, next) => {
  log('backend', 'info', 'middleware', `Incoming request: ${req.method} ${req.url}`);
  next();
});
app.get('/api/greet', (req, res) => {
  log('backend', 'debug', 'handler', 'Greet route hit');
  res.json({ message: 'Hello from Backend!' });
});

app.get('/api/fail',  (req, res) => {
  log('backend', 'error', 'handler', 'Expected bool, got string');
  res.status(400).json({ error: 'Bad input type' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
