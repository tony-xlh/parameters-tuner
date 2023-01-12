import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'parameters-tuner',
  styleUrl: 'parameters-tuner.css',
  shadow: true,
})
export class ParametersTuner {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
