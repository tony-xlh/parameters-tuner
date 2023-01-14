import { newSpecPage } from '@stencil/core/testing';
import { LocalizationModes } from '../localization-modes';

describe('localization-modes', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LocalizationModes],
      html: `<localization-modes></localization-modes>`,
    });
    expect(page.root).toEqualHtml(`
      <localization-modes>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </localization-modes>
    `);
  });
});
