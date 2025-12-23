const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

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

    test.only('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title:').fill ('a playwright blog')
      await page.getByLabel('author:').fill ('Bill Shakespeare')
      await page.getByLabel('url:').fill ('shakespeare.io')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.locator('text=/a playwright blog/').first()).toBeVisible()
    })
  })
})