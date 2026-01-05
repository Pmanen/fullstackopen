const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const getAnecdoteById = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)
  return await response.json()
}

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })

  if (!response.ok) {
    throw new Error('failed to create anecdote')
  }

  return await response.json()
}

const vote = async (id) => {
  const anecdote = await getAnecdoteById(id)
  const newAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  })
  
  return await response.json()
}

export default { getAll, createNew, vote }