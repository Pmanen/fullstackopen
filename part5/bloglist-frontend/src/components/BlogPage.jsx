const BlogPage = ({ blog }) => {
  if (!blog) return null

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      {blog.comments.length ? (
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )
      }
    </div>
  )
}

export default BlogPage