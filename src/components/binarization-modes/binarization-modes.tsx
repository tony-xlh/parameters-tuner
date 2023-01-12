import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'binarization-modes',
  styleUrl: 'binarization-modes.css',
  shadow: true,
})
export class BinarizationModes {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
