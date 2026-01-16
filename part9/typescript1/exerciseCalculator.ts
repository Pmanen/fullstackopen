interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter(hour => hour > 0).length;
  const average: number = hours.length > 0 
    ? hours.reduce((acc, hour) => acc + hour, 0) / hours.length 
    : 0;
  const success: boolean = average >= target;

  let rating: number;
  let ratingDescription: string;
  const averageTargetRatio: number = target > 0 ? average / target : 1;
  if (averageTargetRatio <= 0.5) {
    rating = 1;
    ratingDescription = "low results";
  }
  else if (averageTargetRatio <= 0.97) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }
  else {
    rating = 3;
    ratingDescription = "good results"
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const parseCalcArguments = (args: string[]): { hours: number[], target: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.slice(2).some(arg => isNaN(Number(arg)))) throw new Error('Arguments must be valid numbers');

  const target = Number(args[2]);
  const hours = args.slice(3).map(arg => Number(arg));

  return {
    hours,
    target
  }
}

if (require.main === module) {
  try {
    const { hours, target } = parseCalcArguments(process.argv);
    const result = calculateExercises(hours, target);
    console.log(result)
  } catch (error: unknown) {
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = `Error: ` + error.message
    }
    console.log(errorMessage)
  }
}