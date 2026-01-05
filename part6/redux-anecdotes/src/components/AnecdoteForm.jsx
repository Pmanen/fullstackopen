import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { tempMessage } from '../reducers/messageReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    const responseAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(responseAnecdote))
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