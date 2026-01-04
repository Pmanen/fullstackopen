import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import Filter from "./Filter";
import { tempMessage } from "../reducers/messageReducer";

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
        .slice().sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .slice().sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteFor(id))
    dispatch(tempMessage("Voted!"))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList