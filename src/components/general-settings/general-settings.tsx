import { Component, Host, h, Method, State, Event, EventEmitter } from '@stencil/core';
import { settingDef } from './definition';
import definition from './definition.json'


@Component({
  tag: 'general-settings',
  styleUrl: 'general-settings.css',
  shadow: true,
})
export class GeneralSettings {
  @Event() updated?: EventEmitter<void>;
  @State() rerender: boolean = false;
  settingDefinitions:settingDef[] = [];
  items:{} = {};
  settings:any;
  componentWillLoad(){
    this.settingDefinitions = definition.settings as settingDef[];
  }

  @Method()
  async loadSettings(settings:any){
    this.settings = settings;
    for (let index = 0; index < this.settingDefinitions.length; index++) {
      const settingDef = this.settingDefinitions[index];
      if (settings[settingDef.templateStructureType]) {
        if (settings[settingDef.templateStructureType][settingDef.name]) {
          this.items[settingDef.name] = settings[settingDef.templateStructureType][settingDef.name];
        }
      }
    }
    this.dataModified();
  }

  @Method()
  async outputSettings(){
    console.log(this.items);
    let output = {
      FormatSpecification:{
        Name:"default"
      },
      ImageParameter:{
        FormatSpecificationNameArray:["default"]
      }
    };
    if (this.settings.FormatSpecification && this.settings.FormatSpecification.Name) {
       output.FormatSpecification.Name = this.settings.FormatSpecification.Name;
       delete output.ImageParameter.FormatSpecificationNameArray;
       console.log("delete")
    }
    
    for (let index = 0; index < this.settingDefinitions.length; index++) {
      const settingDef = this.settingDefinitions[index];
      let item = this.items[settingDef.name];
      if (item) {
        output[settingDef.templateStructureType][settingDef.name] = item;
      }
    }
    if (!this.settings.FormatSpecification) {
      this.settings.FormatSpecification = output.FormatSpecification;
    }else{
      for (let key in output.FormatSpecification) {
        this.settings.FormatSpecification[key] = output.FormatSpecification[key];
      }
    }
    for (let key in output.ImageParameter) {
      this.settings.ImageParameter[key] = output.ImageParameter[key];
    }
    return this.settings;
  }

  handleInput(event:any,def:settingDef) {
    let target = event.target;
    let value = parseInt(target.value);
    if (def.type === "number") {
      this.items[def.name] = value;
    }
    this.dataModified();
  }

  dataModified(){
    this.rerender = !this.rerender;
    if (this.updated) {
      this.updated.emit();
    }
  }

  renderOneSetting(def:settingDef){
    if (def.type === "number") {
      return (
        <div>
          <label>
            {def.name}
          </label>
          <input onChange={(event)=>this.handleInput(event,def)} type="range" min={def.min ?? 0} max={def.max ?? 1000} step="1" value={this.items[def.name] ?? def.default}/>
          <input onChange={(event)=>this.handleInput(event,def)} type="number" min={def.min ?? 0} max={def.max ?? 1000} value={this.items[def.name] ?? def.default}></input>
        </div>
      );
    }
    return "";
  }

  render() {
    return (
      <Host>
        <div class="settings">
          {this.settingDefinitions.map(def => (
            this.renderOneSetting(def)
          ))}
        </div>
        <slot></slot>
      </Host>
    );
  }

}
