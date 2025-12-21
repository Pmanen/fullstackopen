import { render, screen } from '@testing-library/react'
import CreateForm from './CreateForm'
import userEvent from '@testing-library/user-event'

test('Calls event handler with the correct details when create button is pressed', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'https://example.com')
  await user.click(sendButton)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 0
  })
})