const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, getLoggedInUser} = require('./test_helper')
const { nonExistingId } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs) 
})

test('get returns correct # blogs in json format', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('returned id property is named id and not _id', async () => {
  const response = await api.get('/api/blogs')

  assert(response.body[0].id && !(response.body[0]._id))
})

describe('post', () => {
  test('a valid blog can be added', async () => {
    const { logInUser, token } = await getLoggedInUser(api)
    const newBlog = {
      title: 'Exercise is good',
      author: 'Allison Jerk',
      url: 'https://home.page',
      likes: 0
    }

   const response = await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newDatabase = await blogsInDb()
    assert.strictEqual(newDatabase.length, initialBlogs.length + 1)
    assert.strictEqual(response.body.title, newBlog.title)
  })

  test('likes property defaults to 0', async () => {
    const { logInUser, token } = await getLoggedInUser(api)
    const newBlog = {
      title: 'Exercise is bood',
      author: 'Bllison Jrk',
      url: 'https://exercise.io',
    }

    const response = await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)

    // const newDatabase = await blogsInDb()
    // const blogInDb = newDatabase.find(blog => blog.id === response.body.id)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title or url is rejected', async () => {
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
    
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
  })

  test.only('blog without valid token is rejected', async () => {
    const newBlog = {
      title: 'Exercise is good',
      author: 'Allison Jerk',
      url: 'https://home.page',
      likes: 0
    }

   const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('delete', () => {
  test.only('post gets succesfully deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const { logInUser, token } = await getLoggedInUser(api)

    const newBlog = {
      title: 'Exercise is good',
      author: 'Allison Jerk',
      url: 'https://home.page',
      likes: 0
    }

   const response = await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api 
      .delete(`/api/blogs/${response.body.id}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(response.body.id))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)    
  })
})

describe('put', () => {
  test('unknown post returns 404', async () => {
    const nonId = await nonExistingId()

    const newBlog = {
      author: 'Benny B',
      url: '4902348.eu',
      likes: 4
    }

    await api
      .put(`/api/blogs/${nonId}`)
      .send(newBlog)
      .expect(404)
  })

  test('valid edit works', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToEdit = blogsAtStart[0]

    const newBlog = {
      author: blogToEdit.author,
      url: blogToEdit.url,
      title: blogToEdit.title,
      likes: blogToEdit.likes + 1
    }

    const response = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    assert.strictEqual(response.body.likes, newBlog.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})