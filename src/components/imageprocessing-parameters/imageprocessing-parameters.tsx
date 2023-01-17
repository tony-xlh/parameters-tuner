import { Component, Host, h, Method, Fragment, State } from '@stencil/core';
import { ImageprocessingParameterDef, ModeArgumentDef } from './definition';
import definition from "./definition.json"

@Component({
  tag: 'imageprocessing-parameters',
  styleUrl: 'imageprocessing-parameters.css',
  shadow: true,
})
export class ImageprocessingParameters {
  @State() rerender: boolean = false;
  @State() parameters:any = {};
  parametersDefinitions:ImageprocessingParameterDef[] = [];

  /**
   * JSON Example
   * {
   *   "ImageParameter" :{
   *     "BinarizationModes": [
   *        {
   *           "Mode": "BM_LOCAL_BLOCK"
   *        }
   *      ],
   *     "LocalizationModes": [
   *       {
   *         "Mode": "LM_CONNECTED_BLOCKS", 
   *       }
   *     ]
   *   }
   * }
   */
  componentWillLoad(){
    console.log("will load");
    this.parametersDefinitions = definition.ImageProcessingParameters as ImageprocessingParameterDef[];
    console.log(this.parametersDefinitions);
  }

  @Method()
  async loadSettings(params:any){
    this.parameters = params;
  }

  @Method()
  async outputSettings(){
    return this.parameters;
  }

  renderArgument(mode:any,arg:ModeArgumentDef){
    if (arg.type === "number") {
      return (
        <div>
          <label>
            {arg.name}
          </label>
          <input onChange={(event)=>this.handleArgument(event,arg,mode)} type="range" min={arg.min ?? 0} max={arg.max ?? 1000} step="1" value={mode[arg.name] ?? arg.default}/>
          <input onChange={(event)=>this.handleArgument(event,arg,mode)} type="number" min={arg.min ?? 0} max={arg.max ?? 1000} value={mode[arg.name] ?? arg.default}></input>
        </div>
      );
    }else if (arg.type === "boolean"){
      return (
        <div>
          <label>
            {arg.name}
          </label>
          <input onChange={(event)=>this.handleArgument(event,arg,mode)} type="checkbox" checked={((mode[arg.name] ?? arg.default) === 0) ? false:true}></input>
        </div>
      );
    }
  }

  renderArguments(mode:any,paramDef:ImageprocessingParameterDef){
    let modeDef = this.getModeDef(paramDef,mode.Mode);
    if (modeDef) {
      return (
        <Fragment>
          {modeDef.args.map(arg => (
            this.renderArgument(mode,arg)
          ))}
        </Fragment>
      );
    }else{
      return "";
    }
  }

  handleSelect(event:any,paramDef:ImageprocessingParameterDef,mode:any){
    mode.Mode = event.target.value;
    let args = this.getModeDef(paramDef,mode.Mode).args;
    let argNames = [];
    for (let index = 0; index < args.length; index++) {
      const arg = args[index];
      argNames.push(arg.name);
    }
    let keysToDelete = [];
    for (let key in mode) {
      if (key != "Mode") {
        if (argNames.indexOf(key) === -1) {
          keysToDelete.push(key);
        }
      }
    }

    keysToDelete.forEach(key => {
      delete mode[key];
    });

    this.rerender = !this.rerender;
  }

  handleArgument(event:any,arg:ModeArgumentDef,mode:any) {
    let target = event.target;
    let value = parseInt(target.value);
    if (arg.type === "boolean") {
      mode[arg.name] = target.checked ? 1 : 0;;
    }else{
      mode[arg.name] = value;
    }
    this.rerender = !this.rerender;
  }

  renderOneMode(mode:any,paramDef:ImageprocessingParameterDef){
    return (
      <div>
        <select onInput={(event) => this.handleSelect(event,paramDef,mode)}>
        {paramDef.modes.map(modeDef => (
          <option value={modeDef.name} selected={modeDef.name === mode.Mode}>{modeDef.name}</option>
        ))}
        </select>
        {this.renderArguments(mode,paramDef)}
      </div>
    )
  }

  renderParameter(param:any,paraName:string){
    let paramDef = this.getPrametertDef(paraName);
    return (
      <div>
        {param.map(mode => (
          this.renderOneMode(mode,paramDef)
        ))}
      </div>
    )
  }

  getPrametertDef(parameterName:string){
    let paramsDef = this.parametersDefinitions;
    for (let index = 0; index < paramsDef.length; index++) {
      if (paramsDef[index].name === parameterName) {
        return paramsDef[index];
      }
    }
    return undefined;
  }

  getModeDef(paramDef:ImageprocessingParameterDef,modeName:string){
    for (let index = 0; index < paramDef.modes.length; index++) {
      const mode = paramDef.modes[index];
      if (mode.name === modeName){
        return mode;
      }
    }
    return undefined;
  }

  renderParameters(){
    let paramNames = [];
    for (let param in this.parameters) {
      if (this.getPrametertDef(param)) {
        paramNames.push(param);
      }
    }
    console.log(paramNames);
    return (
      <div class="params">
        {paramNames.map(paraName => (
          <Fragment>
            <div>{paraName}</div>
            {this.renderParameter(this.parameters[paraName],paraName)}
          </Fragment>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.renderParameters()}
        <slot></slot>
      </Host>
    );
  }

}
