const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
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
  // List with blogs by the same author
  const listSameAuthor = [
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

  // List with all different authors
  const listDifferentAuthors = [
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

  // Diverse list
  const listDiverse = [
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
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has one blog, equals that author and count 1', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepEqual(result, {author: "Edsger W. Dijkstra", blogs: 1})
  })

  test('when list has all blogs by the same author, return that author and the length of the list', () => {
    const result = listHelper.mostBlogs(listSameAuthor)
    assert.deepEqual(result, {author: "Edsger W. Dijkstra", blogs: listSameAuthor.length})
  })

  test('case list has all different authors: just return one and count 1', () => {
    const result = listHelper.mostBlogs(listDifferentAuthors)
    assert.equal(result.blogs, 1)
  })

  test('case diverse list: return the author with the most blogs and the related count', () => {
    const result = listHelper.mostBlogs(listDiverse)
    assert.deepEqual(result, {author: 'Edsger W. Dijkstra', blogs: 2})
  })
})