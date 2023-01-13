import { newSpecPage } from '@stencil/core/testing';
import { BarcodeFormats } from '../barcode-formats';

describe('barcode-formats', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BarcodeFormats],
      html: `<barcode-formats></barcode-formats>`,
    });
    expect(page.root).toEqualHtml(`
      <barcode-formats>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </barcode-formats>
    `);
  });
});
