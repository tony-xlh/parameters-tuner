import { newE2EPage } from '@stencil/core/testing';

describe('general-settings', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<general-settings></general-settings>');

    const element = await page.find('general-settings');
    expect(element).toHaveClass('hydrated');
  });
});
