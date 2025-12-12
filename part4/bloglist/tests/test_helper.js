const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fb',
    title: 'The Mythical Man-Month',
    author: 'Fred P. Brooks Jr.',
    url: 'https://example.com/mythical-man-month.pdf',
    likes: 15,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fc',
    title: 'Design Patterns',
    author: 'Gang of Four',
    url: 'https://example.com/design-patterns.pdf',
    likes: 18,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17fd',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    url: 'https://example.com/clean-code.pdf',
    likes: 18,
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'ben', url: 'http://example.com', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}