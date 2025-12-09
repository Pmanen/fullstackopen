const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  listSameAuthor = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Structured Programming',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com/structured-programming.pdf',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'The Humble Programmer',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com/humble-programmer.pdf',
      likes: 12,
      __v: 0
    }
  ]

  // List with all different authors, some same likes
  listDifferentAuthors = [
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

  listDiverse = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Structured Programming',
      author: 'Edsger W. Dijkstra',
      url: 'https://example.com/structured-programming.pdf',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'The Mythical Man-Month',
      author: 'Fred P. Brooks Jr.',
      url: 'https://example.com/mythical-man-month.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fb',
      title: 'The Silver Bullet',
      author: 'Fred P. Brooks Jr.',
      url: 'https://example.com/silver-bullet.pdf',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fc',
      title: 'Design Patterns',
      author: 'Gang of Four',
      url: 'https://example.com/design-patterns.pdf',
      likes: 20,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fd',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      url: 'https://example.com/clean-code.pdf',
      likes: 18,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fe',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      url: 'https://example.com/pragmatic-programmer.pdf',
      likes: 16,
      __v: 0
    }
  ]

  test('when list is empty, return null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when list has one blog, equals that author and count that blogs likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepEqual(result, {author: "Edsger W. Dijkstra", likes: 5})
  })

  test('when list has all blogs by the same author, return that author and the length of the list', () => {
    const result = listHelper.mostLikes(listSameAuthor)
    assert.deepEqual(result, {author: "Edsger W. Dijkstra", likes: 25})
  })

  test('case all different authors: choose one of the authors with most likes', () => {
    const result = listHelper.mostLikes(listDifferentAuthors)
    assert.equal(result.likes, 18)
  })

  test('case diverse list: return total likes of author with most likes', () => {
    const result = listHelper.mostLikes(listDiverse)
    assert.deepEqual(result, {author: "Fred P. Brooks Jr.", likes: 27})
  })
})