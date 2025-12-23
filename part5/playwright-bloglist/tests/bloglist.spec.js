const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'testificate9',
        name: 'Test user',
        password: '1234'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByLabel('username')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testificate9', '1234')
      await expect(page.getByText('Logged in', { exact: true })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testificate9', '12345')
      await expect(page.getByText('Logged in', { exact: true })).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testificate9', '1234')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a playwright blog', 'Bill Shakespeare', 'shakespeare.io')
      await expect(page.locator('text=/a playwright blog/').first()).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'a playwright blog', 'Bill Shakespeare', 'shakespeare.io')
      })
  
      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).first().click()
        await expect(page.getByText('likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })

      test('a blog can be deleted (if user is the owner)', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).first().click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).first().click()
        await expect(page.getByRole('button', { name: 'view' })).not.toBeVisible()
      })

      test('Bob cannot see the remove button for Alice\'s blog', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            username: 'bob_test',
            name: 'Bob Test',
            password: '1234'
          }
        })
        await page.getByRole('button', { name: 'logout'}).click()
        await loginWith(page, 'bob_test', '1234')
        await expect(page.locator('text=/a playwright blog/').first()).toBeVisible()
        await page.getByRole('button', { name: 'view' }).first().click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('and several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'four likes for this blog', 'Andrew', 'facebook.com')
        await createBlog(page, 'two likes for this blog', 'Mike', 'facebook.com')
        await createBlog(page, 'zero likes for this blog', 'Pippa', 'facebook.com')
        await createBlog(page, 'three likes for this blog', 'Sarah', 'facebook.com')
      })

      test('a blog can be liked multiple times, even when multiple blogs are present', async ({ page }) => {
        const twoLikesBlog = page.locator('text=/two likes for this blog/').last()
        await likeBlog(twoLikesBlog, 2)
        
        const threeLikesBlog = page.locator('text=/three likes for this blog/').last()
        await likeBlog(threeLikesBlog, 3)

        const fourLikesBlog = page.locator('text=/four likes for this blog/').last()
        await likeBlog(fourLikesBlog, 4)

        await page.reload()

        const blog0 = await page.locator('text=/zero likes for this blog/').boundingBox()
        const blog2 = await page.locator('text=/two likes for this blog/').boundingBox()
        const blog3 = await page.locator('text=/three likes for this blog/').boundingBox()
        const blog4 = await page.locator('text=/four likes for this blog/').boundingBox()

        expect(blog4.y).toBeLessThan(blog3.y)
        expect(blog3.y).toBeLessThan(blog2.y)
        expect(blog2.y).toBeLessThan(blog0.y)
      })
    })
  })
})