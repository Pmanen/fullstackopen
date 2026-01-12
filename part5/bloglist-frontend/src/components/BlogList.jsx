import { useSelector } from 'react-redux'
import Blog from './Blog';

const BlogList = ({ user, deleteBlog }) => {
  const sortedBlogs = useSelector(state => state.blogs.slice().sort((a, b) => b.likes - a.likes))
  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteFunction={deleteBlog}
          isUser={user && blog.user.username === user.username}
        />
      ))}
    </div>
  );
};

export default BlogList