import { Component, Host, h, State, Method } from '@stencil/core';
import { barcodeFormatOption, Enum1DBarcodeFormat, Enum2DBarcodeFormat, EnumBarcodeFormatCollection, EnumOtherBarcodeFormat } from './definitions';

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
    this.formatsArray = [this.OneDBarcodeFormats,this.TwoDBarcodeFormats,this.OtherBarcodeFormats];
  }

  componentDidLoad() {
   
  }

  formatNameForRead(name:string){
    name = name.replace("BF_","");
    name = name.replace("BF2_","");
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
    return this.getFormatOptions(EnumOtherBarcodeFormat);
  }

  updateFormatStatus(e:any,formatOption:barcodeFormatOption){
    formatOption.enabled = e.target.checked;
  }

  /**
   * Update checked barcode formats with an object like the following:
   * {
   *   "BarcodeFormatIds": [
   *     "BF_EAN_13"
   *   ],
   *   "BarcodeFormatIds_2": [
   *     "BF2_POSTALCODE"
   *   ],
   * }
   */
  @Method()
  async loadSettings(settings:any) 
  {
    let enabledFormats:string[] = settings.BarcodeFormatIds;
    enabledFormats = enabledFormats.concat(settings.BarcodeFormatIds_2);
    console.log(settings);
    console.log(enabledFormats);
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
          this.checkAllBarcodeFormats(false);
        }else if (collectionEnumValue === EnumBarcodeFormatCollection.BF_ONED) {
          this.checkAllOneDBarcodeFormats();
        }else if (collectionEnumValue === EnumBarcodeFormatCollection.BF2_ALL) {
          this.checkAllBarcodeFormats(true);
        }else if (collectionEnumValue === EnumBarcodeFormatCollection.BF_NULL) {
          this.uncheckAllBarcodeFormats(false);
        }else if (collectionEnumValue === EnumBarcodeFormatCollection.BF2_NULL) {
          this.uncheckAllBarcodeFormats(true);
        }
      }
    }
    this.rerender = !this.rerender;
  }

  checkAllBarcodeFormats(other:boolean){
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        if (other === false && i === 2) {
          return;
        }
        if (other === true && i != 2) {
          continue;
        }
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

  uncheckAllBarcodeFormats(other:boolean){
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        if (other === false && i === 2) {
          return;
        }
        if (other === true && i != 2) {
          continue;
        }
        const barcodeFormat = formats[j];
        barcodeFormat.enabled = false;
      }
    }
  }

  /**
   * Output checked barcode formats to an object like the following:
   * {
   *   "BarcodeFormatIds": [
   *     "BF_EAN_13"
   *   ],
   *   "BarcodeFormatIds_2": [
   *     "BF2_POSTALCODE"
   *   ],
   * }
   */
  @Method()
  async outputSettings():Promise<any> {
    let settings = {BarcodeFormatIds:[],BarcodeFormatIds_2:[]};
    for (let i = 0; i < this.formatsArray.length; i++) {
      const formats = this.formatsArray[i];
      for (let j = 0; j < formats.length; j++) {
        const format = formats[j];
        if (format.enabled) {
          if (i != 2) {
            settings.BarcodeFormatIds.push(format.name);
          }else{
            settings.BarcodeFormatIds_2.push(format.name);
          }
          
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
          <div>
            <h2>Other</h2>
            {this.OtherBarcodeFormats.map(format => (
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
