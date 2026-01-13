const BlogPage = ({ blog }) => {
  if (!blog) return null

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogPage