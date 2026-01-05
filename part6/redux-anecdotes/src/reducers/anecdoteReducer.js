import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const toChange = state.find(n => n.id === id)
      const newAnecdote = {
        ...toChange,
        votes: toChange.votes + 1
      }
      return state.map(obj => (obj.id !== id ? obj : newAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { voteFor } = anecdoteSlice.actions

export default anecdoteSlice.reducer
