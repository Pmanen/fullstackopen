const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())

mongoose.connect(config.MONGODB_URI, { family: 4 })

app.use('/api/blogs', blogsRouter)

module.exports = app