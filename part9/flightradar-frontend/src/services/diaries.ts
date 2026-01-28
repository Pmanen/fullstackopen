import axios from 'axios';
import type { NonSensitiveDiaryEntry } from '../types';

const baseUrl: string = 'http://localhost:3003/api/diaries';

const getAll = () => {
  const request = axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return request.then(response => response.data)
}

export default { getAll }