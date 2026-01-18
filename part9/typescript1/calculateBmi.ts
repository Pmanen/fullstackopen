const calculateBmi = (height: number, weight: number) : BMI => {
  const result = weight / ((height / 100.0) ** 2);
  
  if (result < 18.5) return 'Underweight';
  else if (result < 25) return 'Normal range';
  else if (result < 30) return 'Overweight';
  else if (result < 100) return 'Obese';
  else throw new Error('Calculation error: BMI is higher than 100');
};

const parseArguments = (args: string[]): { height: number, weight: number } => {
  if (args.length < 4) throw new Error('Not enought arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) < Number(args[3])) {
      console.log("Warning: first arg should be height, second should be weight.");
    }
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not number');
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    const result = calculateBmi(height, weight);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = `Error: ` + error.message;
    }
    console.log(errorMessage);
  }
}

export type BMI = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';
export default calculateBmi;