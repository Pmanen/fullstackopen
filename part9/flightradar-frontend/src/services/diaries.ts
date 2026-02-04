import axios from 'axios';
import type { NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const baseUrl: string = 'http://localhost:3003/api/diaries';

const getAll = () => {
  const request = axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return request.then(response => response.data)
}

const create = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<NonSensitiveDiaryEntry>(baseUrl, newEntry);
  return response.data;
};

export default { getAll, create }