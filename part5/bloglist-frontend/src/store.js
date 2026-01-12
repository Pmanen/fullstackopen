import { configureStore } from '@reduxjs/toolkit'

import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import sessionReducer from './reducers/sessionReducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer,
    session: sessionReducer
  }
})

export default store