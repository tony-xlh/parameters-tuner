import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'imageprocessing-parameters',
  styleUrl: 'imageprocessing-parameters.css',
  shadow: true,
})
export class ImageprocessingParameters {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
