import { configureStore } from '@reduxjs/toolkit'

import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import sessionReducer from './reducers/sessionReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer,
    session: sessionReducer,
    users: userReducer,
  }
})

export default store