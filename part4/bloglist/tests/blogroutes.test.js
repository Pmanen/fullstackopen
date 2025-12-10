const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs) 
})

test.only('get returns correct # blogs in json format', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test.only('returned id property is named id and not _id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id && !(response.body[0]._id))
})

describe('post', () => {
  test.only('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Exercise is good',
      author: 'Allison Jerk',
      url: 'https://home.page',
      likes: 0
    }

   const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newDatabase = await blogsInDb()
    assert.strictEqual(newDatabase.length, initialBlogs.length + 1)
    assert.strictEqual(response.body.title, newBlog.title)
  })
})

after(async () => {
  await mongoose.connection.close()
})