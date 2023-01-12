import { newE2EPage } from '@stencil/core/testing';

describe('binarization-modes', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<binarization-modes></binarization-modes>');

    const element = await page.find('binarization-modes');
    expect(element).toHaveClass('hydrated');
  });
});
