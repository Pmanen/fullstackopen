import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import CreateForm from './components/CreateForm';
import BlogList from './components/BlogList';
import { tempMessage } from './reducers/messageReducer';
import { initializeBlogs, appendBlog } from './reducers/blogReducer';
import { resetUser, setUser } from './reducers/sessionReducer';
import { __DO_NOT_USE__ActionTypes } from 'redux';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user)
  const createFormRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
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
      {user && <BlogList />}
    </div>
  );
};

export default App;
