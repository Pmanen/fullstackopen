import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer';

const Blog = ({ blog, isUser }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  };

  return (
    <div style={blogStyle}>
      {blog.author}, "{blog.title}"{' '}
      <button onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
        <p style={{ fontStyle: 'italic' }}>{blog.url}</p>
        likes: {blog.likes} <button onClick={handleLike}>like</button>
        {<p>added by: {blog.user.name}</p> || false}
        {isUser && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
