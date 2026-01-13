import { Link } from 'react-router-dom'

const User = ({ userItem }) => {
  if (!userItem) return null

  return (
    <div>
      <h2>User: {userItem.name}</h2>
      <h3>added blogs</h3>
      {userItem.blogs.length ? (
        <ul>
          {userItem.blogs.map(blog => (
            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        ))}
        </ul>

      ) : (
        <p>User has not added any blogs</p>
      )}
    </div>
  )
}


export default User