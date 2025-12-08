const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()

app.use(express.json())

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(`blog: ${blog}`)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = app