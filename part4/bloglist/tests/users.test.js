const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, nonExistingId, usersInDb } = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('ex 4.16 user and password validation', () => {
  test('creation fails with error 400 when given insuitable username', async () => {
    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'hiutnaehit',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('no duplicate usernames!', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'duplicate',
      name: 'Sandra',
      password: '94890348',
    }

    const newUser2 = {
      username: 'duplicate',
      name: 'Kendra',
      password: '9489354524348',
    }

    await api.post('/api/users').send(newUser).expect(201)
    result = await api.post('/api/users').send(newUser2).expect(400)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('no invalid passwords!', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'duplicate',
      name: 'Sandra',
      password: '12',
    }

    await api.post('/api/users').send(newUser).expect(400)
    const usersAtEnd = await usersInDb
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})