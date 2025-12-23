const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

    describe('and a note exists', () => {
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

      test.only('Bob cannot see the remove button for Alice\'s blog', async ({ page, request }) => {
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
  })
})