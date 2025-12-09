const blog = require("../models/blog")

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}