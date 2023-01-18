import { newSpecPage } from '@stencil/core/testing';
import { GeneralSettings } from '../general-settings';

describe('general-settings', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GeneralSettings],
      html: `<general-settings></general-settings>`,
    });
    expect(page.root).toEqualHtml(`
      <general-settings>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </general-settings>
    `);
  });
});
