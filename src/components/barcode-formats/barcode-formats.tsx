import { Component, Host, h, State, Method } from '@stencil/core';
import { barcodeFormatOption, Enum1DBarcodeFormat, Enum2DBarcodeFormat, EnumBarcodeFormatCollection } from './definitions';

@Component({
  tag: 'barcode-formats',
  styleUrl: 'barcode-formats.css',
  shadow: true,
})

export class BarcodeFormats {
  @State() OneDBarcodeFormats: barcodeFormatOption[] = [];
  @State() TwoDBarcodeFormats: barcodeFormatOption[] = [];
  @State() OtherBarcodeFormats: barcodeFormatOption[] = [];
  @State() rerender:boolean = false;
  formatsArray = [];
  componentWillLoad(){
    console.log("will load");
    this.OneDBarcodeFormats = this.getOneDBarcodeFormats();
    this.TwoDBarcodeFormats = this.getTwoDBarcodeFormats();
    this.OtherBarcodeFormats = this.getOtherBarcodeFormats();
    this.formatsArray = [this.OneDBarcodeFormats,this.TwoDBarcodeFormats];
  }

  componentDidLoad() {
   
  }

  formatNameForRead(name:string){
    name = name.replace("BF_","");
    name = name.split("_").join(" ");
    return name;
  }

  getFormatOptions(formatEnum:any){
    let formats:barcodeFormatOption[] = [];
    for (var enumMember in formatEnum) {
      if (!Number.isInteger(parseInt(enumMember))) { //name
        formats.push({name:enumMember,enabled:true});
      }
    }
    return formats;
  }

  getOneDBarcodeFormats():barcodeFormatOption[] {
    return this.getFormatOptions(Enum1DBarcodeFormat);
  }

  getTwoDBarcodeFormats():barcodeFormatOption[] {
    return this.getFormatOptions(Enum2DBarcodeFormat);
  }

  getOtherBarcodeFormats():barcodeFormatOption[] {
    let formats:barcodeFormatOption[] = [];
    return formats;
  }

  updateFormatStatus(e:any,formatOption:barcodeFormatOption){
    console.log(e.target.checked);
    formatOption.enabled = e.target.checked;
    console.log(this.OneDBarcodeFormats);
    console.log(this.TwoDBarcodeFormats);
  }

  /**
   * Update checked barcode formats with an object like the following:
   * {
   *   "BarcodeFormatIds": [
   *     "BF_ALL"
   *   ]
   * }
   */
  @Method()
  async loadSettings(settings:any) 
  {
    let enabledFormats:string[] = settings.BarcodeFormatIds;
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        const barcodeFormat = formats[j];      
        if (enabledFormats.indexOf(barcodeFormat.name) != -1) {
          barcodeFormat.enabled = true;
        }else{
          barcodeFormat.enabled = false;
        }
      }
    }
    for (let index = 0; index < enabledFormats.length; index++) {
      const enabledFormat = enabledFormats[index];
      const collectionEnumValue = EnumBarcodeFormatCollection[enabledFormat];
      if (collectionEnumValue === EnumBarcodeFormatCollection[enabledFormat]) {
        if (collectionEnumValue === EnumBarcodeFormatCollection.BF_ALL) {
          this.checkAllBarcodeFormats();
        }else if (collectionEnumValue === EnumBarcodeFormatCollection.BF_ONED) {
          this.checkAllOneDBarcodeFormats();
        }else if (collectionEnumValue === EnumBarcodeFormatCollection.BF_NULL) {
          this.uncheckAllBarcodeFormats();
        }
      }
    }
    this.rerender = !this.rerender;
  }

  checkAllBarcodeFormats(){
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        const barcodeFormat = formats[j];
        barcodeFormat.enabled = true;
      }
    }
  }

  checkAllOneDBarcodeFormats(){
    for (let j = 0; j < this.OneDBarcodeFormats.length; j++) {
      const barcodeFormat = this.OneDBarcodeFormats[j];
      barcodeFormat.enabled = true;
    }
  }

  uncheckAllBarcodeFormats(){
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        const barcodeFormat = formats[j];
        barcodeFormat.enabled = false;
      }
    }
  }

  /**
   * Output checked barcode formats to an object like the following:
   * {
   *   "BarcodeFormatIds": [
   *     "BF_ALL"
   *   ]
   * }
   */
  @Method()
  async outputSettings():Promise<any> {
    let settings = {BarcodeFormatIds:[]};
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        const format = formats[j];
        if (format.enabled) {
          settings.BarcodeFormatIds.push(format.name);
        }
      }
    }
    return settings;
  }

  render() {
    return (
      <Host>
        <div part="container">
          <div>
            <h2>1D</h2>
            {this.OneDBarcodeFormats.map(format => (
              <div class="barcodeFormat">
                <input type="checkbox" id={format.name} name={format.name} checked={format.enabled} onChange={(e:any) => (this.updateFormatStatus(e,format))}/>
                <label htmlFor={format.name}>{this.formatNameForRead(format.name)}</label>
              </div>
            ))}
          </div>
          <div>
            <h2>2D</h2>
            {this.TwoDBarcodeFormats.map(format => (
              <div class="barcodeFormat">
                <input type="checkbox" id={format.name} name={format.name} checked={format.enabled} onChange={(e:any) => (this.updateFormatStatus(e,format))}/>
                <label htmlFor={format.name}>{this.formatNameForRead(format.name)}</label>
              </div>
            ))}
          </div>
        </div>
        <slot></slot>
      </Host>
    );
  }

}
