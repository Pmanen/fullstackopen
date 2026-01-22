import { NewPatient, Gender } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseStringValue(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringValue(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringValue(object.occupation)
    };

    return newPatient;
  };

  throw new Error('Incorrect data: some fields are missing' );
};

const parseStringValue = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing string value');
  }
  return text;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Error parsing gender value: ' + gender);
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};