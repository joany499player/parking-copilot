import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const spots = [
  {
    id: '1',
    name: 'Rue Peel',
    status: 'Allowed',
    until: '5:30 PM',
    price: '$1.50 / hour',
  },
  {
    id: '2',
    name: 'Rue Bishop',
        status: 'Warning',
    until: '6:00 PM',
    price: '$2.00 / hour',
  },
];

app.get('/', (_req, res) => {
  res.json({ message: 'Parko backend is running' });
});

app.get('/spots', (_req, res) => {
  res.json(spots);
});

app.get('/spots/:id', (req, res) => {
      const spot = spots.find((item) => item.id === req.params.id);

  if (!spot) {
    return res.status(404).json({ message: 'Spot not found' });
  }

  res.json(spot);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
