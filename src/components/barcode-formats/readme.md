# barcode-formats



<!-- Auto Generated Below -->


## Events

| Event     | Description | Type                |
| --------- | ----------- | ------------------- |
| `updated` |             | `CustomEvent<void>` |


## Methods

### `loadSettings(settings: any) => Promise<void>`

Update checked barcode formats with an object like the following:
{
  "BarcodeFormatIds": [
    "BF_EAN_13"
  ],
  "BarcodeFormatIds_2": [
    "BF2_POSTALCODE"
  ],
}

#### Returns

Type: `Promise<void>`



### `outputSettings() => Promise<any>`

Output checked barcode formats to an object like the following:
{
  "BarcodeFormatIds": [
    "BF_EAN_13"
  ],
  "BarcodeFormatIds_2": [
    "BF2_POSTALCODE"
  ],
}

#### Returns

Type: `Promise<any>`




## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"container"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
