import { useState, useEffect } from 'react';
import type { NonSensitiveDiaryEntry } from './types';
import diaryService from './services/diaries'

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(diaries =>
      setDiaries( diaries )
    )
  }, [])

  return (
    <div>
      {diaries.map(diary => (
        <div key={diary.date}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;