import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BsChevronDown, BsChevronUp, BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [hasLiked, setHasLiked] = useState(false)
  const currentUser = useSelector(state => state.session.user.username)
  const isUser = currentUser === blog.user.username
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
    setHasLiked(true)
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.author}, "{blog.title}"</Link>{' '}
      <Button onClick={toggleVisibility} variant="light" size="sm">{visible ? <BsChevronUp/> : <BsChevronDown/>}</Button>
      <div style={showWhenVisible}>
        <p style={{ fontStyle: 'italic' }}>{blog.url}</p>
        <span><Button variant="light" onClick={handleLike}>{hasLiked ? <BsHeartFill/> : <BsHeart/>}</Button>{blog.likes} </span>
        {<p>added by: {blog.user.name}</p> || false}
        {isUser && (
          <Button onClick={handleRemove} variant="light" size="m"><BsTrash color="red"/></Button>
        )}
      </div>
    </div>
  );
};

export default Blog;
