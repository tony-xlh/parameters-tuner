import { newE2EPage } from '@stencil/core/testing';

describe('localization-modes', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<localization-modes></localization-modes>');

    const element = await page.find('localization-modes');
    expect(element).toHaveClass('hydrated');
  });
});
