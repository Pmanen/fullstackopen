import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleFeedback = (val, setVal) => () => setVal(val + 1)

  return (
    <div>
      <Header text="give feedback" />
      <div>
        <Button onClick={handleFeedback(good, setGood)} text="good" />
        <Button onClick={handleFeedback(neutral, setNeutral)} text="neutral" />
        <Button onClick={handleFeedback(bad, setBad)} text="bad" />
      </div>
      <Header text="statistics" />
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    </div>
  )
}

export default App