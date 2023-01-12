import { newSpecPage } from '@stencil/core/testing';
import { BinarizationModes } from '../binarization-modes';

describe('binarization-modes', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BinarizationModes],
      html: `<binarization-modes></binarization-modes>`,
    });
    expect(page.root).toEqualHtml(`
      <binarization-modes>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </binarization-modes>
    `);
  });
});
