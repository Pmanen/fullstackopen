const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = request.body.likes || 0
  const assignedUser = await User.findOne()
  blog.user = assignedUser._id

  const savedBlog = await blog.save()
  assignedUser.blogs = assignedUser.blogs.concat(savedBlog._id)
  await assignedUser.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).end()
  }
  
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

blogsRouter.use(errorHandler)

module.exports = blogsRouter