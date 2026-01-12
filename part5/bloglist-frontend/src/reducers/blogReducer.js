import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { tempMessage } from './messageReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      state.push(action.payload)
    }
  }
})

const { setBlogs, createBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(createBlog(newBlog))
      dispatch(tempMessage(
        `Added a new blog: ${newBlog.title} by ${newBlog.author}.`
      ))
      return { success: true }
    } catch {
      dispatch(tempMessage('Invalid blog', 'error'))
      return { success: false }
    }
  }
}

export default blogSlice.reducer