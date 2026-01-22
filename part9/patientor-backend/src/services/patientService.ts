import patients from '../../data/patients';
import { NewPatient, FilteredPatient, Patient } from '../types';
import { v1 } from 'uuid';

const getPatients = (): FilteredPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id: string = v1();

  const newPatient = {
    id: id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};