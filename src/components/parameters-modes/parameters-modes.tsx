import { Component, Host, h, Method, Fragment, State, Event, EventEmitter } from '@stencil/core';
import { ImageprocessingParameterDef, ModeArgumentDef } from './definition';
import definition from "./definition.json"

@Component({
  tag: 'parameters-modes',
  styleUrl: 'parameters-modes.css',
  shadow: true,
})
export class ParametersModes {
  @Event() updated?: EventEmitter<void>;
  @State() rerender: boolean = false;
  @State() parameters:any = {};
  parametersDefinitions:ImageprocessingParameterDef[] = [];
  modifiedParams:{} = {};
  componentWillLoad(){
    this.parametersDefinitions = definition.ImageProcessingParameters as ImageprocessingParameterDef[];
  }

  @Method()
  async loadExternalDefinition(defs:ImageprocessingParameterDef[]){
    this.parametersDefinitions = defs;
  }

  @Method()
  async loadSettings(params:any){
    this.modifiedParams = {};
    let paramsCopy = JSON.parse(JSON.stringify(params));
    let parametersNotSupported = [];
    for (let param in paramsCopy) {
      if (!this.getParametertDef(param)) {
        parametersNotSupported.push(param);
      }
    }
    parametersNotSupported.forEach(param => {
      delete paramsCopy[param];
    });
    this.addMissingSupportedParams(paramsCopy)
    this.parameters = paramsCopy
  }

  addMissingSupportedParams(paramsCopy:any){
    let paramNames = [];
    for (let param in paramsCopy) {
      paramNames.push(param);
    }
    for (let index = 0; index < this.parametersDefinitions.length; index++) {
      const paramDef = this.parametersDefinitions[index];
      if (paramNames.indexOf(paramDef.name) === -1) {
        paramsCopy[paramDef.name] = [];
      }
    }
  }

  dataModified(paramDef:ImageprocessingParameterDef){
    this.modifiedParams[paramDef.name] = true;
    this.rerender = !this.rerender;
    if (this.updated) {
      this.updated.emit();
    }
  }

  @Method()
  async outputSettings(){
    let paramsCopy = JSON.parse(JSON.stringify(this.parameters));
    for (let key in paramsCopy) {
      let param = paramsCopy[key];
      this.RemoveSkip(param);
    }
    let paramsModified = {};
    for (let key in paramsCopy) {
      if (this.modifiedParams[key] === true)  {
        paramsModified[key] = paramsCopy[key];
      }
    }
    return paramsModified;
  }

  renderArgument(mode:any,arg:ModeArgumentDef,paramDef:ImageprocessingParameterDef){
    if (arg.type === "number") {
      return (
        <div>
          <label>
            {arg.name}
          </label>
          <input onChange={(event)=>this.handleArgument(event,arg,mode,paramDef)} type="range" min={arg.min ?? 0} max={arg.max ?? 1000} step="1" value={mode[arg.name] ?? arg.default}/>
          <input onChange={(event)=>this.handleArgument(event,arg,mode,paramDef)} type="number" min={arg.min ?? 0} max={arg.max ?? 1000} value={mode[arg.name] ?? arg.default}></input>
        </div>
      );
    }else if (arg.type === "boolean"){
      return (
        <div>
          <label>
            {arg.name}
          </label>
          <input onChange={(event)=>this.handleArgument(event,arg,mode,paramDef)} type="checkbox" checked={((mode[arg.name] ?? arg.default) === 0) ? false:true}></input>
        </div>
      );
    }else if (arg.type === "string"){
      return (
        <div>
          <label>
            {arg.name}
          </label>
          <select onChange={(event)=>this.handleArgument(event,arg,mode,paramDef)}>
            {arg.options.map(option => (
              <option value={option} selected={option === mode[arg.name]}>{option}</option>
            ))}
          </select>
        </div>
      );
    }
  }

  renderArguments(mode:any,paramDef:ImageprocessingParameterDef){
    let modeDef = this.getModeDef(paramDef,mode.Mode);
    if (modeDef) {
      return (
        <div class="arguments">
          {modeDef.args.map(arg => (
            this.renderArgument(mode,arg,paramDef)
          ))}
        </div>
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

    for (let index = 0; index < keysToDelete.length; index++) {
      const key = keysToDelete[index];
      delete mode[key];
    }

    this.dataModified(paramDef);
  }

  handleArgument(event:any,arg:ModeArgumentDef,mode:any,paramDef:ImageprocessingParameterDef) {
    let target = event.target;
    let value = parseInt(target.value);
    if (arg.type === "boolean") {
      mode[arg.name] = target.checked ? 1 : 0;;
    }else if (arg.type === "number") {
      mode[arg.name] = value;
    }else if (arg.type === "string") {
      mode[arg.name] = event.target.selectedOptions[0].value;
    }
    this.dataModified(paramDef);
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
    let paramDef = this.getParametertDef(paraName);
    this.AddSkip(param,paramDef);
    return (
      <div class="modes">
        {param.map(mode => (
          this.renderOneMode(mode,paramDef)
        ))}
      </div>
    )
  }

  AddSkip(param:any,paramDef:ImageprocessingParameterDef){
    let diff = paramDef.length - param.length;
    if (diff > 0) {
      for (let index = 0; index < diff; index++) {
        let mode = {Mode:paramDef.skipName};
        param.push(mode);
      }
    }
    //this.rerender = !this.rerender;
  }

  RemoveSkip(param:any){
    let skipRemoved = [];
    for (let index = 0; index < param.length; index++) {
      const mode = param[index];
      if (mode.Mode.indexOf("SKIP") === -1) {
        skipRemoved.push(mode);
      }
    }
    while (param.length != 0) {
      param.pop();
    }
    for (let index = 0; index < skipRemoved.length; index++) {
      param.push(skipRemoved[index]);
    }
  }

  getParametertDef(parameterName:string){
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
      paramNames.push(param);
    }
    paramNames.sort();
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
