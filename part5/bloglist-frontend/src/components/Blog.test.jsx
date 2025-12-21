import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  screen.debug(authorElement)

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  const likesElement = screen.getByText('likes: 5')
  const urlElement = screen.getByText('https://example.com')
  expect(likesElement).not.toBeVisible()
  expect(urlElement).not.toBeVisible()
})