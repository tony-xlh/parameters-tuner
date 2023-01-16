import { Component, Host, h, State, Method } from '@stencil/core';
import { BinarizationMode } from './definitions';

@Component({
  tag: 'binarization-modes',
  styleUrl: 'binarization-modes.css',
  shadow: true,
})
export class BinarizationModes {
  @State() modes: BinarizationMode[] = [];
  @State() rerender: boolean = false;
  handleSelect(event:any,mode:BinarizationMode){
    mode.Mode = event.target.value;
    this.rerender = !this.rerender;
  }

  handleOption(event:any,mode:BinarizationMode) {
    let target = event.target;
    let value = parseInt(target.value);
    if (target.getAttribute("data-key") === "BlockSizeX"){
      mode.BlockSizeX = value;
    }else if (target.getAttribute("data-key") === "BlockSizeY"){
      mode.BlockSizeY = value;
    }else if (target.getAttribute("data-key") === "BlockSizeY"){
      mode.BlockSizeY = value;
    }else if (target.getAttribute("data-key") === "EnableFillBinaryVacancy"){
      mode.EnableFillBinaryVacancy = target.checked ? 1 : 0;
    }else if (target.getAttribute("data-key") === "ImagePreprocessingModesIndex"){
      mode.ImagePreprocessingModesIndex = value;
    }else if (target.getAttribute("data-key") === "ThresholdCompensation"){
      mode.ThresholdCompensation = value;
    }else if (target.getAttribute("data-key") === "BinarizationThreshold"){
      mode.BinarizationThreshold = value;
    }
    this.rerender = !this.rerender;
  }

  renderOptions(mode:BinarizationMode) {
    if (mode.Mode != "BM_SKIP") {
      if (mode.Mode === "BM_LOCAL_BLOCK") {
        return (
          <div class="options">
            <div>
              <label>
                BlockSizeX
              </label>
              <input data-key="BlockSizeX" onChange={(event)=>this.handleOption(event,mode)} type="range" min="0" max="1000" step="1" value={mode.BlockSizeX ?? 0}/>
              <input data-key="BlockSizeX" onChange={(event)=>this.handleOption(event,mode)} type="number" min="0" max="1000" value={mode.BlockSizeX ?? 0}></input>
            </div>
            <div>
              <label>
                BlockSizeY
              </label>
              <input data-key="BlockSizeY" onChange={(event)=>this.handleOption(event,mode)} type="range" min="0" max="1000" step="1" value={mode.BlockSizeY ?? 0}/>
              <input data-key="BlockSizeY" onChange={(event)=>this.handleOption(event,mode)} type="number" min="0" max="1000" value={mode.BlockSizeY ?? 0}></input>
            </div>
            <div>
              <label>
                EnableFillBinaryVacancy
              </label>
              <input data-key="EnableFillBinaryVacancy" onChange={(event)=>this.handleOption(event,mode)} type="checkbox" checked={((mode.EnableFillBinaryVacancy ?? 1) === 0) ? false:true}></input>
            </div>
            <div>
              <label>
                ImagePreprocessingModesIndex
              </label>
              <input data-key="ImagePreprocessingModesIndex" onChange={(event)=>this.handleOption(event,mode)} type="number" min="-1" max="3" value={mode.ImagePreprocessingModesIndex ?? -1}></input>
            </div>
            <div>
              <label>
                ThresholdCompensation
              </label>
              <input data-key="ThresholdCompensation" onChange={(event)=>this.handleOption(event,mode)} type="range" min="-255" max="255" step="1" value={mode.ThresholdCompensation ?? 10}/>
              <input data-key="ThresholdCompensation" onChange={(event)=>this.handleOption(event,mode)} type="number" min="-255" max="255" value={mode.ThresholdCompensation ?? 10}></input>
            </div>
          </div>
        )
      }else{
        return (
          <div class="options">
            <div>
              <label>
                BinarizationThreshold
              </label>
              <input data-key="BinarizationThreshold" onChange={(event)=>this.handleOption(event,mode)} type="range" min="-1" max="255" step="1" value={mode.BinarizationThreshold ?? 0}/>
              <input data-key="BinarizationThreshold" onChange={(event)=>this.handleOption(event,mode)} type="number" min="-1" max="255" step="1" value={mode.BinarizationThreshold ?? 0}/>
            </div>
            <div>
              <label>
                ImagePreprocessingModesIndex
              </label>
              <input data-key="ImagePreprocessingModesIndex" onChange={(event)=>this.handleOption(event,mode)} type="number" min="-1" max="3" value={mode.ImagePreprocessingModesIndex ?? -1}></input>
            </div>
          </div>
        )
      }
      
    } else{
      return "";
    }
  }

  renderOneMode(mode:BinarizationMode){
    return (
      <div>
        <select onInput={(event) => this.handleSelect(event,mode)}>
          <option value="BM_SKIP" selected={mode.Mode === "BM_SKIP"}>SKIP</option>
          <option value="BM_LOCAL_BLOCK" selected={mode.Mode === "BM_LOCAL_BLOCK"}>LOCALBLOCK</option>
          <option value="BM_THRESHOLD" selected={mode.Mode === "BM_THRESHOLD"}>THRESHOLD</option>
        </select>
        {this.renderOptions(mode)}
      </div>
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
    if (this.modes.length < 4) {
      for (let index = 0; index < 4 - this.modes.length; index++) {
        let skip:BinarizationMode = {Mode:"BM_SKIP"}
        this.modes.push(skip);
      }
    }
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
        <div part="container">
        {this.modes.map(mode => (
          this.renderOneMode(mode)
        ))}
        </div>
        <slot></slot>
      </Host>
    );
  }

}
