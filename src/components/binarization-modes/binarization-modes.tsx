import { Component, Host, h, State, Method } from '@stencil/core';
import { BinarizationMode } from './definitions';

@Component({
  tag: 'binarization-modes',
  styleUrl: 'binarization-modes.css',
  shadow: true,
})
export class BinarizationModes {
  @State() modes: BinarizationMode[] = [];
  renderOneMode(mode:BinarizationMode){
    return (
      <div>{mode.Mode}</div>
    );
  }

  /**
   * Update BinarizationModes with an object like the following:
   * {
   *   "BinarizationModes": [
   *      {
   *           "Mode": "BM_LOCAL_BLOCK", 
   *           "BlockSizeX": 5,
   *           "BlockSizeY": 5
   *       },
   *       {
   *           "Mode": "BM_THRESHOLD", 
   *           "BinarizationThreshold": 125
   *       }
   *   ]
   * }
   */
  @Method()
  async loadSettings(settings:any) {
    this.modes = settings.BinarizationModes;
  }

  /**
   * Output BinarizationModes to an object like the following:
   * {
   *   "BinarizationModes": [
   *      {
   *           "Mode": "BM_LOCAL_BLOCK", 
   *           "BlockSizeX": 5,
   *           "BlockSizeY": 5
   *       },
   *       {
   *           "Mode": "BM_THRESHOLD", 
   *           "BinarizationThreshold": 125
   *       }
   *   ]
   * }
   */
  @Method()
  async outputSettings():Promise<{BinarizationModes:BinarizationMode[]}> {
    let settings = {BinarizationModes:this.modes};
    return settings;
  }

  render() {
    return (
      <Host>
        <div>
        {this.modes.map(mode => (
          this.renderOneMode(mode)
        ))}
        </div>
        <slot></slot>
      </Host>
    );
  }

}
