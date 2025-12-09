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

const mostLikes = (blogs) => {
  if (!blogs.length) return null
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const likesByAuthor = _.mapValues(blogsByAuthor, group => _.sumBy(group, 'likes'))
  const [topAuthor, topLikes] = _.maxBy(
    Object.entries(likesByAuthor),
    ([author, likes]) => likes
  )
  return { author: topAuthor, likes: topLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}