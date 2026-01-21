import patients from '../../data/patients';

import { FilteredPatient } from '../types';

const getPatients = (): FilteredPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients
};