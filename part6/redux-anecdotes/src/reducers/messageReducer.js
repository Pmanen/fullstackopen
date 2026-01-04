import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageChange(state, action) {
      return action.payload
    },
    messageReset() {
      return null
    }
  }
})

export const tempMessage = (message) => (dispatch) => {
  dispatch(messageChange(message))
  setTimeout(() => {
    dispatch(messageReset())
  }, 5000)
}

export const { messageChange, messageReset } = messageSlice.actions

export default messageSlice.reducer