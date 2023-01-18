## Parameters Tuner Web Component

This component can be used to adjust the parameters of [Dynamsoft Barcode Reader](https://www.dynamsoft.com/barcode-reader/overview/).

[Online demo](https://enchanting-lokum-85d559.netlify.app/)

You can learn more about the parameters of Dynamsoft Barcode Reader by checking out the [docs](https://www.dynamsoft.com/barcode-reader/docs/core/parameters/reference/?ver=latest).

### Usage

In your HTML, add the component:

```html
<barcode-formats></barcode-formats>
<general-settings></general-settings>
<parameters-modes></parameters-modes>
```

Load the settings from a JSON template:

```js
let template = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
let settings = JSON.parse(template);
const generalSettings = document.querySelector("general-settings");
const parametersModes = document.querySelector("parameters-modes");
const barcodeFormats = document.querySelector("barcode-formats");
generalSettings.loadSettings(settings);
barcodeFormats.loadSettings(settings.ImageParameter);
parametersModes.loadSettings(settings.ImageParameter);
```

Output the settings modified with the components:

```js
const generalSettings = document.querySelector("general-settings");
const parametersModes = document.querySelector("parameters-modes");
const barcodeFormats = document.querySelector("barcode-formats");
let settings = await generalSettings.outputSettings();
let formatOutput = await barcodeFormats.outputSettings();
let params = await parametersModes.outputSettings();
for (let key in params) {
  settings.ImageParameter[key] = params[key];
}
settings.ImageParameter.BarcodeFormatIds = formatOutput.BarcodeFormatIds;
settings.ImageParameter.BarcodeFormatIds_2 = formatOutput.BarcodeFormatIds_2;
```

## Install this component

### Script tag

- Put a script tag similar to this 

   ```html
   <script type="module">
     import { defineCustomElements } from 'https://cdn.jsdelivr.net/npm/parameters-tuner/dist/esm/loader.js';
     defineCustomElements();
   </script>
   ```
   
   in the head of your index.html
   
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install parameters-tuner --save`
- Put a script tag similar to this 

   ```html
   <script type="module">
     import { defineCustomElements } from 'node_modules/parameters-tuner/dist/esm/loader.js';
     defineCustomElements();
   </script>
   ```
   
   in the head of your index.html
   
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install parameters-tuner --save`
- Add an import to the npm packages `import parameters-tuner;`
- Then you can use the element anywhere in your template, JSX, html etc
