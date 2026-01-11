import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: null,
  type: "success"
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    messageChange(state, action) {
      return {
        content: action.payload.content,
        type: action.payload.type
      }
    },
    messageReset() {
      return initialState
    },
    conditionalMessageReset(state, action) {
      if (state.content === action.payload) {
        return initialState
      }
    }
  }
})

export const tempMessage = (message, type = "success", seconds = 3) => (dispatch) => {
  dispatch(messageChange({
    content: message,
    type: type
  }))
  setTimeout(() => {
    dispatch(conditionalMessageReset(message))
  }, seconds * 1000)
}

export const { messageChange, conditionalMessageReset } = messageSlice.actions

export default messageSlice.reducer