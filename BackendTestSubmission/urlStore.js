const shortid = require('shortid');
const db = {};

function store(url, validity, shortcode) {
  const code = shortcode || shortid.generate();
  if (db[code]) return { success: false, error: 'Shortcode exists' };
  const expiry = new Date(Date.now() + validity * 60000).toISOString();
  db[code] = { url, expiry, created: new Date().toISOString(), clicks: [] };
  return { success: true, code, expiry };
}

function getStats(code) {
  const entry = db[code];
  if (!entry) return null;
  return { url: entry.url, created: entry.created, expiry: entry.expiry, clicks: entry.clicks, totalClicks: entry.clicks.length };
}

function click(code, source) {
  const entry = db[code];
  if (!entry) return { success: false, error: 'Invalid code' };
  if (new Date(entry.expiry) < new Date()) return { success: false, error: 'Link expired' };
  entry.clicks.push({ time: new Date().toISOString(), ref: source || 'unknown', location: 'IN' });
  return { success: true, url: entry.url };
}

module.exports = { store, getStats, click };
