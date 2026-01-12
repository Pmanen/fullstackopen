import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import CreateForm from './components/CreateForm';
import BlogList from './components/BlogList';
import { tempMessage } from './reducers/messageReducer';
import { initializeBlogs, appendBlog } from './reducers/blogReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const createFormRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(tempMessage('Logged in'))
    } catch {
      dispatch(tempMessage('Login failed: wrong credentials', "error"))
    }
  };

  const handleCreate = async (blog) => {
    const result = await dispatch(appendBlog(blog))
    if (result.success) {
      createFormRef.current.toggleVisibility()
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
    dispatch(tempMessage('Logged out'))
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );

  const deleteBlog = async id => {
    const blog = blogs.find(n => n.id === id);
    if (blog && window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteById(id);
        setBlogs(blogs.filter(b => b.id !== id));
        dispatch(tempMessage(
          `Deleted blog: ${blog.title} by ${blog.author}.`
        ))
      } catch {
        dispatch(tempMessage('Error with deleting blog', 'error'))
      }
    }
  };

  return (
    <div>
      <Notification />
      {user ? (
        <p>
          {user.name} is logged in{' '}
          <button onClick={() => logout()}>logout</button>
        </p>
      ) : (
        loginForm()
      )}
      {user && (
        <Togglable buttonLabel="create new blog" ref={createFormRef}>
          <CreateForm onSubmit={handleCreate} />
        </Togglable>
      )}
      {user && <BlogList user={user} deleteBlog={deleteBlog} />}
    </div>
  );
};

export default App;
