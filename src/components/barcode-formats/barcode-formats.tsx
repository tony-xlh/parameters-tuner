import { Component, Host, h, State } from '@stencil/core';
import { barcodeFormatOption, Enum1DBarcodeFormat, Enum2DBarcodeFormat } from './definitions';

@Component({
  tag: 'barcode-formats',
  styleUrl: 'barcode-formats.css',
  shadow: true,
})

export class ParametersTuner {
  @State() OneDBarcodeFormats: barcodeFormatOption[] = [];
  @State() TwoDBarcodeFormats: barcodeFormatOption[] = [];
  @State() OtherBarcodeFormats: barcodeFormatOption[] = [];
  componentDidLoad() {
    this.OneDBarcodeFormats = this.getOneDBarcodeFormats();
    this.TwoDBarcodeFormats = this.getTwoDBarcodeFormats();
    this.OtherBarcodeFormats = this.getOtherBarcodeFormats();
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

  render() {
    return (
      <Host>
        <div>
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
