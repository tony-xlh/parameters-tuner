import { newSpecPage } from '@stencil/core/testing';
import { ParametersTuner } from '../parameters-tuner';

describe('parameters-tuner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ParametersTuner],
      html: `<parameters-tuner></parameters-tuner>`,
    });
    expect(page.root).toEqualHtml(`
      <parameters-tuner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </parameters-tuner>
    `);
  });
});
