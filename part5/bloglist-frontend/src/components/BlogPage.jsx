import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { postComment } from '../reducers/blogReducer'

const BlogPage = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [comment, setComment] = useState('')
  if (!blog || !user) return null

  const handleComment = async (event) => {
    event.preventDefault()
    console.log(comment)
    dispatch(postComment(blog, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Control type="text" value={comment} onChange={({ target }) => setComment(target.value)}/>
        <Button variant="primary" type="submit">add comment</Button>
      </Form>
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