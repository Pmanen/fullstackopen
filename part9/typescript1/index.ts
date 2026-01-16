import express from 'express';
import calculateBmi from './calculateBmi';
import { BMI } from './calculateBmi'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height)
  const weight: number = Number(req.query.weight)
  if (!isNaN(height) && !isNaN(weight)) {
    try {
      const bmi: BMI = calculateBmi(height, weight)
      res.send({
        weight,
        height,
        bmi
      })
    } catch {
      res.status(400).send({
        error: "malformatted parameters"
      })
    }
  } else {
    res.status(400).send({
      error: "malformatted parameters"
    })
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})