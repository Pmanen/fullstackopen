import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { tempMessage } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    dispatch(appendAnecdote(content))
    dispatch(tempMessage('New anecdote created!', 5))
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