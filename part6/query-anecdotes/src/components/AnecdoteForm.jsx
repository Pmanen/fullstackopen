import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import MessageContext, { tempMessage } from '../MessageContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { messageDispatch } = useContext(MessageContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      tempMessage('New anecdote created!', 5)(messageDispatch)
    },
    onError: () => {
      tempMessage('Error: anecdote must be at least 5 characters long', 5)(messageDispatch)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
