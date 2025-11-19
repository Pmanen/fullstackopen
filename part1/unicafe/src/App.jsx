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
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0.0)

  const handleFeedback = (val, setVal, type) => () => {
    const newVal = val + 1
    const newAll = all + 1
    let newScore = score
    let newPositive = positive * all / 100
    setVal(newVal)
    setAll(newAll)
    if (type === "good") {
      newScore = score + 1
      newPositive = (newPositive + 1) / newAll * 100
    }
    else if (type === "bad") {
      newScore = score - 1
      newPositive = newPositive / newAll * 100
    }
    else if (type === "neutral") {
      newPositive = newPositive / newAll * 100
    }
    setAvg(newScore / newAll)
    setScore(newScore)
    setPositive(newPositive)
  }

  return (
    <div>
      <Header text="give feedback" />
      <div>
        <Button onClick={handleFeedback(good, setGood, "good")} text="good" />
        <Button onClick={handleFeedback(neutral, setNeutral, "neutral")} text="neutral" />
        <Button onClick={handleFeedback(bad, setBad, "bad")} text="bad" />
      </div>
      <Header text="statistics" />
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {avg}</p>
        <p>positive {positive} %</p>
      </div>
    </div>
  )
}

export default App