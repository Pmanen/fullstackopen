import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const tempNotification = (message, type) => {
    if (type === "success") {
      setSuccessMessage(message)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 4000)
    }
    else if (type === "error") {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      tempNotification('Logged in', 'success')
    } catch {
      tempNotification('Login failed: wrong credentials', 'error')
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    try {
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      createFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
      tempNotification(`Added a new blog: ${response.title} by ${response.author}.`, 'success')
    } catch {
      tempNotification('Invalid blog.', 'error')
    }
  }

  const logout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    tempNotification('Logged out.', 'success')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          password
          <input type="text" value={password} onChange={({ target }) => setPassword(target.value)}/>
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createForm = () => (
    <Togglable buttonLabel="create new blog" ref={createFormRef}>
      <div>
        <h2>Create New</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>
              title: 
              <input  type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
            </label>
          </div>
          <div>
            <label>
              author: 
              <input  type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
            </label>
          </div>
          <div>
            <label>
              url: 
              <input  type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={successMessage} type={"success"} />
      <Notification message={errorMessage} type={"error"} />
      {user ? <p>{user.name} is logged in <button onClick={() => logout()}>logout</button></p> : loginForm()}
      {user && createForm()}
      {user && blogList()}
    </div>
  )
}

export default App