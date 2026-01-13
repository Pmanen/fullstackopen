import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import CreateForm from './components/CreateForm';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import { tempMessage } from './reducers/messageReducer';
import { initializeBlogs, appendBlog } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { resetUser, setUser } from './reducers/sessionReducer';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user)
  const createFormRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
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
    dispatch(resetUser())
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

  return (
    <div>
      <h2>Blogs</h2>
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

      <Routes>
        <Route path="/blogs" element={user ? <BlogList /> : null} />
        <Route path="/users" element={user ? <UserList /> : null} />
      </Routes>
      
    </div>
  );
};

export default App;
