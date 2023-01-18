import { newE2EPage } from '@stencil/core/testing';

describe('parameters-modes', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<parameters-modes></parameters-modes>');

    const element = await page.find('parameters-modes');
    expect(element).toHaveClass('hydrated');
  });
});
