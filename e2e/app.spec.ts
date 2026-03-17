import { expect, test } from '@playwright/test';

test.describe('App smoke tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/KPBoards|Documentation/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('landing page has content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /build better products/i })).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByRole('heading', { name: /what's included/i })).toBeVisible({
      timeout: 5000,
    });
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/KPBoards|Login/i);
    await expect(page.getByRole('button', { name: /login|sign in/i })).toBeVisible({
      timeout: 5000,
    });
  });

  test('admin dashboard loads', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page.getByRole('heading', { name: /dashboard overview/i })).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText(/total revenue|active users/i)).toBeVisible({ timeout: 5000 });
  });

  test('admin users page loads', async ({ page }) => {
    await page.goto('/admin/users');
    await expect(page.getByRole('heading', { name: /users/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByPlaceholder(/search/i)).toBeVisible({ timeout: 5000 });
  });

  test('legacy dashboard route redirects to admin dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/admin\/dashboard$/);
  });

  test('pages index loads', async ({ page }) => {
    await page.goto('/pages');
    await expect(page.getByRole('heading', { name: /^pages$/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/portfolio/i)).toBeVisible({ timeout: 5000 });
  });

  test('portfolio page shows project-only cards and supports filtering', async ({ page }) => {
    await page.goto('/portfolio');

    await expect(
      page.getByRole('heading', { name: /real project work, no company timeline/i })
    ).toBeVisible({
      timeout: 5000,
    });

    await expect(page.locator('[data-slot="card-title"]', { hasText: 'Monie' })).toBeVisible({
      timeout: 5000,
    });
    await expect(page.locator('[data-slot="card-title"]', { hasText: 'Ampisent App' })).toBeVisible(
      { timeout: 5000 }
    );

    await expect(page.locator('[data-slot="card-title"]', { hasText: /Devinci/i })).toHaveCount(0);
    await expect(page.locator('[data-slot="card-title"]', { hasText: /Gorivir/i })).toHaveCount(0);
    await expect(page.locator('[data-slot="card-title"]', { hasText: /Breinchild/i })).toHaveCount(
      0
    );
    await expect(
      page.locator('[data-slot="card-title"]', { hasText: /Change Interaction/i })
    ).toHaveCount(0);
    await expect(page.locator('[data-slot="card-title"]', { hasText: /Hanbiro/i })).toHaveCount(0);
    await expect(page.locator('[data-slot="card-title"]', { hasText: /ISV/i })).toHaveCount(0);

    await page.getByRole('textbox', { name: /search portfolio projects/i }).fill('ampisent');
    await expect(page.locator('[data-slot="card-title"]', { hasText: 'Ampisent App' })).toBeVisible(
      { timeout: 5000 }
    );
    await expect(page.locator('[data-slot="card-title"]', { hasText: 'Monie' })).toHaveCount(0);
  });
});
