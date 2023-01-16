import { Component, Host, h, State, Method, Fragment } from '@stencil/core';
import { LocalizationMode } from './definitions';

@Component({
  tag: 'localization-modes',
  styleUrl: 'localization-modes.css',
  shadow: true,
})
export class LocalizationModes {
  @State() modes: LocalizationMode[] = [];
  @State() rerender: boolean = false;
  localizationModesNames:string[] = ["LM_CONNECTED_BLOCKS","LM_STATISTICS","LM_LINES","LM_SCAN_DIRECTLY","LM_STATISTICS_MARKS","LM_STATISTICS_POSTAL_CODE","LM_CENTRE","LM_ONED_FAST_SCAN","LM_SKIP"];
  
  /**
   * Update BinarizationModes with an object like the following:
   * {
   *   "LocalizationModes": [
   *       {
   *           "Mode": "LM_CONNECTED_BLOCKS", 
   *       }
   *   ]
   * }
   */
  @Method()
  async loadSettings(settings:any) {
    this.modes = settings.LocalizationModes;
    if (this.modes.length < 4) {
      for (let index = 0; index < 4 - this.modes.length; index++) {
        let skip:LocalizationMode = {Mode:"LM_SKIP"}
        this.modes.push(skip);
      }
    }
  }

  /**
   * Output LocalizationModes to an object like the following:
   * {
   *   "LocalizationModes": [
   *       {
   *           "Mode": "LM_CONNECTED_BLOCKS", 
   *       }
   *   ]
   * }
   */
  @Method()
  async outputSettings():Promise<{LocalizationModes:LocalizationMode[]}> {
    let settings = {LocalizationModes:this.modes};
    return settings;
  }
  
  handleSelect(event:any,mode:LocalizationMode){
    mode.Mode = event.target.value;
    this.rerender = !this.rerender;
  }

  handleOption(event:any,mode:LocalizationMode) {
    let target = event.target;
    let value = parseInt(target.value);
    if (target.getAttribute("data-key") === "ScanStride"){
      mode.ScanStride = value;
    }else if (target.getAttribute("data-key") === "IsOneDStacked") {
      mode.IsOneDStacked = target.checked ? 1 : 0;
    }
    this.rerender = !this.rerender;
  }

  renderSharedOneOptions(mode:LocalizationMode) {
    return (
      <Fragment>
        <div>
          <label>
            ScanStride
          </label>
          <input data-key="ScanStride" onChange={(event) => this.handleOption(event, mode)} type="range" min="0" max="100" step="1" value={mode.ScanStride ?? 0} />
          <input data-key="ScanStride" onChange={(event) => this.handleOption(event, mode)} type="number" min="0" max="100" value={mode.ScanStride ?? 0} />
        </div>
        <div>
            <label>
              ScanDirection
            </label>
            <input data-key="ScanDirection" onChange={(event) => this.handleOption(event, mode)} type="range" min="0" max="2" step="1" value={mode.ScanDirection ?? 0} />
            <input data-key="ScanDirection" onChange={(event) => this.handleOption(event, mode)} type="number" min="0" max="2" value={mode.ScanDirection ?? 0} />
          </div>
      </Fragment>
    )
  }

  renderOptions(mode:LocalizationMode){
    if (mode.Mode != "LM_SKIP") {
      if (mode.Mode === "LM_SCAN_DIRECTLY") {
        return (
          <div class="options">
            {this.renderSharedOneOptions(mode)}
            <div>
              <label>
                IsOneDStacked
              </label>
              <input data-key="IsOneDStacked" onChange={(event)=>this.handleOption(event,mode)} type="checkbox" checked={((mode.IsOneDStacked ?? 0) === 0) ? false:true}></input>
            </div>
          </div>
        )
      }else if (mode.Mode === "LM_ONED_FAST_SCAN") {
        return (
          <div class="options">
            {this.renderSharedOneOptions(mode)}
            <div>
              <label>
                ConfidenceThreshold
              </label>
              <input data-key="ConfidenceThreshold" onChange={(event) => this.handleOption(event, mode)} type="range" min="0" max="100" step="1" value={mode.ConfidenceThreshold ?? 60} />
              <input data-key="ConfidenceThreshold" onChange={(event) => this.handleOption(event, mode)} type="number" min="0" max="100" value={mode.ConfidenceThreshold ?? 60} />
            </div>
          </div>
        )
      }
      
    } else{
      return "";
    }
  }

  renderOneMode(mode:LocalizationMode){
    return (
      <div>
        <select onInput={(event) => this.handleSelect(event,mode)}>
          {this.localizationModesNames.map(name => (
            <option value={name} selected={mode.Mode === name}>{name.replace("LM_","")}</option>
          ))}
        </select>
        {this.renderOptions(mode)}
      </div>
    );
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
