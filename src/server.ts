import cors from 'cors';
import express from 'express';
import { resolveSpot } from './montrealResolver';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Parko backend is running' });
});
app.get('/spots/:id', (req, res) => {
  const spot = resolveSpot(req.params.id);

  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }

  res.json(spot);
});

app.get('/spots', (_req, res) => {
  const ids = ['A024', 'A025', 'A026'];
  const spots = ids
    .map((id) => resolveSpot(id))
        .filter(Boolean);

  res.json(spots);
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
      console.error(error);
});