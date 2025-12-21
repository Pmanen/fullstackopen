import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

test('render title and author, don\'t render likes and url at start', () => {
  const blog = {
    title: 'Test Title IV',
    author: 'Testius',
    likes: 5,
    user: 89139721837,
    url: 'https://example.com'
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('Test Title IV', { exact: false })
  const authorElement = screen.getByText('Testius', { exact: false })

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  const likesElement = screen.getByText('likes: 5')
  const urlElement = screen.getByText('https://example.com')
  expect(likesElement).not.toBeVisible()
  expect(urlElement).not.toBeVisible()
})

test('after clicking the button, url and likes are shown', async () => {
  const blog = {
    title: 'Test Title IV',
    author: 'Testius',
    likes: 5,
    user: 89139721837,
    url: 'https://example.com'
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likesElement = screen.getByText('likes: 5')
  const urlElement = screen.getByText('https://example.com')
  expect(likesElement).toBeVisible()
  expect(urlElement).toBeVisible()
})

test('after clicking like twice, like function is called twice and likes are increased by 2', async () => {
  const blog = {
    title: 'Test Title IV',
    author: 'Testius',
    likes: 5,
    user: 89139721837,
    url: 'https://example.com'
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  const updateSpy = vi.spyOn(blogService, 'update').mockResolvedValue({})

  await user.click(likeButton)
  await user.click(likeButton)

  const likesElement = screen.getByText('likes: 7', { exact: false })
  expect(updateSpy).toHaveBeenCalledTimes(2)
  expect(likesElement).toBeDefined()
})