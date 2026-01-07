import { createContext, useReducer } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const tempMessage = (message, seconds) => (dispatch) => {
  dispatch({ type: 'SET', payload: message })
  setTimeout(() => {
    dispatch({ type: 'RESET'})
  }, seconds * 1000)
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, null)

  return (
    <MessageContext.Provider value={{ message, messageDispatch }}>
      {props.children}
    </MessageContext.Provider>
  )
}

export default MessageContext