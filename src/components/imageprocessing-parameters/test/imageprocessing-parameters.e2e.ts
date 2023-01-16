import { newE2EPage } from '@stencil/core/testing';

describe('imageprocessing-parameters', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<imageprocessing-parameters></imageprocessing-parameters>');

    const element = await page.find('imageprocessing-parameters');
    expect(element).toHaveClass('hydrated');
  });
});
