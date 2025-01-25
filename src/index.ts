import express from 'express';
import { calculateDifference } from './api/subtract';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/subtract', (req, res) => {
  const { minuend, subtrahend } = req.body;

  try {
    const difference = calculateDifference(minuend, subtrahend);
    res.status(200).json({ difference });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
