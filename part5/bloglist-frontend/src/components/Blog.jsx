import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteFunction, isUser }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = async () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const response = await blogService.update(blogObject)
      setLikes(likes + 1)
    } catch {
      console.log(`error updating likes for blog: ${blog.title}`)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.author}, "{blog.title}" <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p style={{ fontStyle: 'italic' }}>{blog.url}</p>
        likes: {likes} <button onClick={like}>like</button>
        {<p>added by: {blog.user.name}</p> || false }
        {isUser && <button onClick={() => deleteFunction(blog.id)}>remove</button>}
      </div>
    </div>  
  )
}

export default Blog