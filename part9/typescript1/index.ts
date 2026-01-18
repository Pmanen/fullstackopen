import express from 'express';
import calculateBmi from './calculateBmi';
import { calculateExercises, Result } from './exerciseCalculator';
import { BMI } from './calculateBmi';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    try {
      const bmi: BMI = calculateBmi(height, weight);
      res.send({
        weight,
        height,
        bmi
      });
    } catch {
      res.status(400).send({
        error: "malformatted parameters"
      });
    }
  } else {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises = undefined, target = undefined } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  else if (daily_exercises.some(i => isNaN(Number(i))) || isNaN(Number(target))) {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  
  const validated_exercises: number[] = daily_exercises.map(i => Number(i));
  const result: Result = calculateExercises(validated_exercises, Number(target));
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});