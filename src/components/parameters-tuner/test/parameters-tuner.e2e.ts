import { newE2EPage } from '@stencil/core/testing';

describe('parameters-tuner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<parameters-tuner></parameters-tuner>');

    const element = await page.find('parameters-tuner');
    expect(element).toHaveClass('hydrated');
  });
});
