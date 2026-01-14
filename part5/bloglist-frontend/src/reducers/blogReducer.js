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
    },
    deleteBlog(state, action) {
      return state.filter(obj => obj.id !== action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map(obj => (obj.id !== id ? obj : action.payload))
    }
  }
})

const { setBlogs, createBlog, deleteBlog, updateBlog } = blogSlice.actions

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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteById(blog.id)
      dispatch(deleteBlog(blog.id))
      dispatch(tempMessage(
        `Deleted blog: ${blog.title} by ${blog.author}.`
      ))
    } catch {
      console.log(`ERROR deleting blog with id ${blog.id}`)
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      await blogService.update(newBlog)
      dispatch(updateBlog(newBlog))
    } catch {
      console.log(`error updating likes for blog: ${blog.title}`)
    }
  }
}

export const postComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const responseObject = await blogService.postComment(blog, comment)
      dispatch(updateBlog(responseObject))
    } catch {
      console.log(`error posting comment to blog ${blog.id}`)
    }
  }
}

export default blogSlice.reducer