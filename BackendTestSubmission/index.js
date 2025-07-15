const express = require('express');
const cors = require('cors');
const { setToken, log } = require('../LoggingMiddleware/loggerbackend');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hpdGJoYW5kYXJpMjAwNTdAZ21haWwuY29tIiwiZXhwIjoxNzUyNTYxMzY0LCJpYXQiOjE3NTI1NjA0NjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkOGE4OTg3Mi0wYjlhLTRlMmUtYTdmNi02ZDg2ZjFiOTUzYmEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtb2hpdCBiaGFuZGFyaSIsInN1YiI6IjliOGMxMGI1LTMzNDEtNGM0My04MjI4LTllNzY1OTdjNThjMiJ9LCJlbWFpbCI6Im1vaGl0YmhhbmRhcmkyMDA1N0BnbWFpbC5jb20iLCJuYW1lIjoibW9oaXQgYmhhbmRhcmkiLCJyb2xsTm8iOiIyMjE5MDk5IiwiYWNjZXNzQ29kZSI6IlFBaERVciIsImNsaWVudElEIjoiOWI4YzEwYjUtMzM0MS00YzQzLTgyMjgtOWU3NjU5N2M1OGMyIiwiY2xpZW50U2VjcmV0IjoiaFJnTVJqcXlXQUVTd25qUyJ9.1YAcNzLCkUu0UCoUu4a8rSDHjtqTSDxfmOysoaOdqG0');
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
