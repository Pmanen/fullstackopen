const blog = require("../models/blog")
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, blog) =>
      blog.likes > max.likes ? blog : max
    )
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return null
  const blogsByAuthor = _.countBy(blogs, 'author')
  const [topAuthor, topCount] = _.maxBy(
    Object.entries(blogsByAuthor), 
    ([author, count]) => count
  )
  return { author: topAuthor, blogs: topCount}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}