import { newE2EPage } from '@stencil/core/testing';

describe('barcode-formats', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<barcode-formats></barcode-formats>');

    const element = await page.find('barcode-formats');
    expect(element).toHaveClass('hydrated');
  });
});
