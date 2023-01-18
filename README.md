## Parameters Tuner Web Component

This component can be used to adjust the parameters of [Dynamsoft Barcode Reader](https://www.dynamsoft.com/barcode-reader/overview/).

### Usage

In your HTML, add the component:

```html
<barcode-formats>
</barcode-formats>
<imageprocessing-parameters>
</imageprocessing-parameters>
```

## Install this component

### Script tag

- Put a script tag similar to this 

   ```html
   <script type="module">
     import { defineCustomElements } from 'https://cdn.jsdelivr.net/npm/camera-preview-component/dist/esm/loader.js';
     defineCustomElements();
   </script>
   ```
   
   in the head of your index.html
   
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install camera-preview-component --save`
- Put a script tag similar to this 

   ```html
   <script type="module">
     import { defineCustomElements } from 'node_modules/camera-preview-component/dist/esm/loader.js';
     defineCustomElements();
   </script>
   ```
   
   in the head of your index.html
   
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install camera-preview-component --save`
- Add an import to the npm packages `import camera-preview-component;`
- Then you can use the element anywhere in your template, JSX, html etc

## FAQ

How to specify which camera to use?

1. Use the `desiredCamera` prop. If one of the camera's name contains it, then it will be used. You can get the devices list using the `getAllCameras` method.
2. Use the `facingMode` prop. Set it to `environment` to use the back camera. Set it to `user` to use the front camera. Please note that this is not supported on Desktop.

You can use the two props together.