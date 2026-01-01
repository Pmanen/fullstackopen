import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.newAnecdote.value))
    event.target.newAnecdote.value = ''
  }

  return (
    <form onSubmit={createNew}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
  )
}

export default AnecdoteForm