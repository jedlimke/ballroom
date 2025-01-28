import express from 'express';
import { calculatePartners } from './api/calculate-partners';
import { ValidationError } from './error/ValidationError';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/calculate-partners', (req, res) => {
  try {
    const input = req.body;
    const averagePartners = calculatePartners(input);
    res.status(200).json({ average_dance_partners: averagePartners });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
