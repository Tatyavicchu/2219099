import { useState } from 'react';
import { log, setToken } from '../../LoggingMiddleware/loggerfrontend';
setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hpdGJoYW5kYXJpMjAwNTdAZ21haWwuY29tIiwiZXhwIjoxNzUyNTYxMzY0LCJpYXQiOjE3NTI1NjA0NjQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkOGE4OTg3Mi0wYjlhLTRlMmUtYTdmNi02ZDg2ZjFiOTUzYmEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtb2hpdCBiaGFuZGFyaSIsInN1YiI6IjliOGMxMGI1LTMzNDEtNGM0My04MjI4LTllNzY1OTdjNThjMiJ9LCJlbWFpbCI6Im1vaGl0YmhhbmRhcmkyMDA1N0BnbWFpbC5jb20iLCJuYW1lIjoibW9oaXQgYmhhbmRhcmkiLCJyb2xsTm8iOiIyMjE5MDk5IiwiYWNjZXNzQ29kZSI6IlFBaERVciIsImNsaWVudElEIjoiOWI4YzEwYjUtMzM0MS00YzQzLTgyMjgtOWU3NjU5N2M1OGMyIiwiY2xpZW50U2VjcmV0IjoiaFJnTVJqcXlXQUVTd25qUyJ9.1YAcNzLCkUu0UCoUu4a8rSDHjtqTSDxfmOysoaOdqG0');

function App() {
  const [url, setUrl] = useState('');
  const [res, setRes] = useState('');

  const shorten = async () => {
    log('frontend', 'info', 'component', 'Sending shorten request');
    const r = await fetch('http://localhost:5000/shorturls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const d = await r.json();
    setRes(JSON.stringify(d));
  };

  return (
    <div>
      <input onChange={e => setUrl(e.target.value)} />
      <button onClick={shorten}>Shorten</button>
      <pre>{res}</pre>
    </div>
  );
}

export default App;
