import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

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

  const like = () => {
    console.log('liked!')
  }

  return (
    <div style={blogStyle}>
      {blog.author}, "{blog.title}" <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p style={{ fontStyle: 'italic' }}>{blog.url}</p>
        likes: {blog.likes} <button onClick={like}>like</button>
        {<p>added by: {blog.user.name}</p> || false }
      </div>
    </div>  
  )
}

export default Blog