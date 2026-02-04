import { useState, useEffect } from 'react';
import axios from 'axios';
import { type NewDiaryEntry, type NonSensitiveDiaryEntry, Weather, Visibility } from './types';
import diaryService from './services/diaries'
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

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

    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setMessage(
          `${error.response?.data}`
        );
        setTimeout(() => {
          setMessage("")
        }, 5000);
      } else if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
        setTimeout(() => {
          setMessage("")
        }, 5000);
      } else {
        console.log(error);
      }
    }
  }

  return (
    <div>
     <div>
        <h2>Add new entry</h2>
        <Notification message={message} />
        <form onSubmit={handleCreate}>
          <div>
            <label>
              date:
              <input
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </label>
          </div>
          <div>
            <fieldset>
              <legend>visibility:</legend>
             <label>
              <input
                type="radio"
                value="great"
                checked={visibility === "great"}
                onChange={({ target }) => setVisibility(target.value)}
              />
              great
            </label> 
            <label>
              <input
                type="radio"
                value="good"
                checked={visibility === "good"}
                onChange={({ target }) => setVisibility(target.value)}
              />
              good
            </label>
            <label>
              <input
                type="radio"
                value="ok"
                checked={visibility === "ok"}
                onChange={({ target }) => setVisibility(target.value)}
              />
              ok
            </label>
            <label>
              <input
                type="radio"
                value="poor"
                checked={visibility === "poor"}
                onChange={({ target }) => setVisibility(target.value)}
              />
              poor
            </label>
            </fieldset>
          </div>
          <div>
            <fieldset>
              <legend>weather:</legend>
              <label>
                <input
                  type="radio"
                  value="sunny"
                  checked={weather === "sunny"}
                  onChange={({ target }) => setWeather(target.value)}
                />
                sunny
              </label>
              <label>
                <input
                  type="radio"
                  value="rainy"
                  checked={weather === "rainy"}
                  onChange={({ target }) => setWeather(target.value)}
                />
                rainy
              </label>
              <label>
                <input
                  type="radio"
                  value="cloudy"
                  checked={weather === "cloudy"}
                  onChange={({ target }) => setWeather(target.value)}
                />
                cloudy
              </label>
              <label>
                <input
                  type="radio"
                  value="stormy"
                  checked={weather === "stormy"}
                  onChange={({ target }) => setWeather(target.value)}
                />
                stormy
              </label>
              <label>
                <input
                  type="radio"
                  value="windy"
                  checked={weather === "windy"}
                  onChange={({ target }) => setWeather(target.value)}
                />
                windy
              </label>
            </fieldset>
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