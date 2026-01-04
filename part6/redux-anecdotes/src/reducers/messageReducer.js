import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageChange(state, action) {
      return action.payload
    }
  }
})

export const { messageChange } = messageSlice.actions

export default messageSlice.reducer