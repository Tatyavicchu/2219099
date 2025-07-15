const express = require('express');
const cors = require('cors');
const { setToken, log } = require('../LoggingMiddleware/loggerbackend');
const { store, getStats, click } = require('./urlStore');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hpdGJoYW5kYXJpMjAwNTdAZ21haWwuY29tIiwiZXhwIjoxNzUyNTYxMzY0LCJpYXQiOjE3NTI1NjA0NjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkOGE4OTg3Mi0wYjlhLTRlMmUtYTdmNi02ZDg2ZjFiOTUzYmEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtb2hpdCBiaGFuZGFyaSIsInN1YiI6IjliOGMxMGI1LTMzNDEtNGM0My04MjI4LTllNzY1OTdjNThjMiJ9LCJlbWFpbCI6Im1vaGl0YmhhbmRhcmkyMDA1N0BnbWFpbC5jb20iLCJuYW1lIjoibW9oaXQgYmhhbmRhcmkiLCJyb2xsTm8iOiIyMjE5MDk5IiwiYWNjZXNzQ29kZSI6IlFBaERVciIsImNsaWVudElEIjoiOWI4YzEwYjUtMzM0MS00YzQzLTgyMjgtOWU3NjU5N2M1OGMyIiwiY2xpZW50U2VjcmV0IjoiaFJnTVJqcXlXQUVTd25qUyJ9.1YAcNzLCkUu0UCoUu4a8rSDHjtqTSDxfmOysoaOdqG0');

app.post('/shorturls', async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  const result = store(url, validity, shortcode);
  if (!result.success) return res.status(400).json({ error: result.error });
  await log('backend', 'info', 'handler', `Shortened: ${result.code}`);
  res.status(201).json({ shortLink: `http://localhost:${PORT}/${result.code}`, expiry: result.expiry });
});

app.get('/shorturls/:code', async (req, res) => {
  const data = getStats(req.params.code);
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.json(data);
});

app.get('/:code', async (req, res) => {
  const redir = click(req.params.code, req.get('referer'));
  if (!redir.success) return res.status(410).json({ error: redir.error });
  res.redirect(redir.url);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
