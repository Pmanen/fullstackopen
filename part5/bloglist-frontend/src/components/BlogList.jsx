import { useSelector } from 'react-redux'
import Blog from './Blog';

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default BlogList