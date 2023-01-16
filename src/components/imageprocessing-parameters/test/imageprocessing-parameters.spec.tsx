import { newSpecPage } from '@stencil/core/testing';
import { ImageprocessingParameters } from '../imageprocessing-parameters';

describe('imageprocessing-parameters', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ImageprocessingParameters],
      html: `<imageprocessing-parameters></imageprocessing-parameters>`,
    });
    expect(page.root).toEqualHtml(`
      <imageprocessing-parameters>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </imageprocessing-parameters>
    `);
  });
});
