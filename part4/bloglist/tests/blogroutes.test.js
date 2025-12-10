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

  test.only('likes property defaults to 0', async () => {
    const newBlog = {
      title: 'Exercise is bood',
      author: 'Bllison Jrk',
      url: 'https://exercise.io',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    // const newDatabase = await blogsInDb()
    // const blogInDb = newDatabase.find(blog => blog.id === response.body.id)

    assert.strictEqual(response.body.likes, 0)
  })

  test.only('blog without title or url is rejected', async () => {
    const newBlog = {
      author: 'Benny B',
      url: '4902348.eu',
      likes: 4
    }

    const newBlog2 = {
      title: 'Exercise is great',
      author: 'Benny B',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})