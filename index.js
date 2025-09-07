const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Base de données JSON
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB() {
  await db.read();
  db.data = db.data || { users: [], items: [], donations: [], offers: [] };
  await db.write();
}
initDB();

// Reconnaissance d’image simulée
function mockRecognizeImage() {
  const sample = [
    { name: 'tomates', category: 'légumes', shelfLifeDays: 5 },
    { name: 'lait', category: 'produits laitiers', shelfLifeDays: 7 },
    { name: 'pain', category: 'boulangerie', shelfLifeDays: 2 },
    { name: 'poulet', category: 'viande', shelfLifeDays: 3 }
  ];
  const pick = sample[Math.floor(Math.random() * sample.length)];
  const now = Date.now();
  return {
    ...pick,
    confidence: 0.82,
    estimatedExpiry: new Date(now + pick.shelfLifeDays * 24 * 3600 * 1000).toISOString()
  };
}

// Routes API
app.get('/api/ping', (req, res) => res.json({ ok: true, ts: Date.now() }));

app.post('/api/recognize', async (req, res) => {
  const result = mockRecognizeImage();
  res.json({ ok: true, prediction: result });
});

app.post('/api/items', async (req, res) => {
  const { ownerId, name, category, estimatedExpiry } = req.body;
  const item = { id: nanoid(), ownerId, name, category, estimatedExpiry, createdAt: new Date().toISOString() };
  db.data.items.push(item);
  await db.write();
  res.json({ ok: true, item });
});

app.get('/api/items', async (req, res) => {
  await db.read();
  res.json({ ok: true, items: db.data.items });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('✅ Backend démarré sur le port', PORT));
