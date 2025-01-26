import express from 'express';
import { calculatePartners } from './api/calculate-partners';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/calculate-partners', (req, res) => {
  try {
    const input = req.body;  // No need to type explicitly unless required
    const averagePartners = calculatePartners(input);
    res.status(200).json({ average_dance_partners: averagePartners });
  } catch (error: any) {
    // If there's an error, return a 422 Unprocessable Entity status with a descriptive message
    res.status(422).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
