import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { tempMessage } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.newAnecdote.value))
    dispatch(tempMessage('New anecdote created!'))

    event.target.newAnecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
          <div>
            <input name="newAnecdote" />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm