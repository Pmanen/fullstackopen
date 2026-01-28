import { useState, useEffect } from 'react';
import { type NewDiaryEntry, type NonSensitiveDiaryEntry, Weather, Visibility } from './types';
import diaryService from './services/diaries'

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    diaryService.getAll().then(diaries =>
      setDiaries( diaries )
    )
  }, [])

  const toVisibility = (value: string) : Visibility => {
    const v: string = value.toLowerCase();
    for (const visibility of Object.values(Visibility)) {
      if (visibility.toLowerCase() === v) {
        return visibility;
      }
    }

    throw new Error(`Invalid visibility value: ${value}`)
  }

  const toWeather = (value: string) : Weather => {
    const v: string = value.toLowerCase();
    for (const weather of Object.values(Weather)) {
      if (weather.toLowerCase() === v) {
        return weather;
      }
    }

    throw new Error(`Invalid weather value: ${value}`)
  }

  const handleCreate = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      comment: comment,
      visibility: toVisibility(visibility),
      weather: toWeather(weather),
      date: date
    }

    const response: NonSensitiveDiaryEntry = await diaryService.create(newEntry);
    setDiaries(diaries.concat(response));
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }

  return (
    <div>
     <div>
        <h2>Add new entry</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>
              date:
              <input
                type="text"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              visibility:
              <input
                type="text"
                value={visibility}
                onChange={({ target }) => setVisibility(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              weather:
              <input
                type="text"
                value={weather}
                onChange={({ target }) => setWeather(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              comment:
              <input
                type="text"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      <div>
        {diaries.map(diary => (
          <div key={diary.date}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default App;