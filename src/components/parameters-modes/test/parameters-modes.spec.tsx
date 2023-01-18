import { newSpecPage } from '@stencil/core/testing';
import { ParametersModes } from '../parameters-modes';

describe('parameters-modes', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ParametersModes],
      html: `<parameters-modes></parameters-modes>`,
    });
    expect(page.root).toEqualHtml(`
      <parameters-modes>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </parameters-modes>
    `);
  });
});
