/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { BinarizationMode } from "./components/binarization-modes/definitions";
export namespace Components {
    interface BarcodeFormats {
        /**
          * Update checked barcode formats with an object like the following: {   "BarcodeFormatIds": [     "BF_ALL"   ] }
         */
        "loadSettings": (settings: any) => Promise<void>;
        /**
          * Output checked barcode formats to an object like the following: {   "BarcodeFormatIds": [     "BF_ALL"   ] }
         */
        "outputSettings": () => Promise<any>;
    }
    interface BinarizationModes {
        /**
          * Update BinarizationModes with an object like the following: {   "BinarizationModes": [      {           "Mode": "BM_LOCAL_BLOCK",            "BlockSizeX": 5,           "BlockSizeY": 5       },       {           "Mode": "BM_THRESHOLD",            "BinarizationThreshold": 125       }   ] }
         */
        "loadSettings": (settings: any) => Promise<void>;
        /**
          * Output BinarizationModes to an object like the following: {   "BinarizationModes": [      {           "Mode": "BM_LOCAL_BLOCK",            "BlockSizeX": 5,           "BlockSizeY": 5       },       {           "Mode": "BM_THRESHOLD",            "BinarizationThreshold": 125       }   ] }
         */
        "outputSettings": () => Promise<{ BinarizationModes: BinarizationMode[]; }>;
    }
}
declare global {
    interface HTMLBarcodeFormatsElement extends Components.BarcodeFormats, HTMLStencilElement {
    }
    var HTMLBarcodeFormatsElement: {
        prototype: HTMLBarcodeFormatsElement;
        new (): HTMLBarcodeFormatsElement;
    };
    interface HTMLBinarizationModesElement extends Components.BinarizationModes, HTMLStencilElement {
    }
    var HTMLBinarizationModesElement: {
        prototype: HTMLBinarizationModesElement;
        new (): HTMLBinarizationModesElement;
    };
    interface HTMLElementTagNameMap {
        "barcode-formats": HTMLBarcodeFormatsElement;
        "binarization-modes": HTMLBinarizationModesElement;
    }
}
declare namespace LocalJSX {
    interface BarcodeFormats {
    }
    interface BinarizationModes {
    }
    interface IntrinsicElements {
        "barcode-formats": BarcodeFormats;
        "binarization-modes": BinarizationModes;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "barcode-formats": LocalJSX.BarcodeFormats & JSXBase.HTMLAttributes<HTMLBarcodeFormatsElement>;
            "binarization-modes": LocalJSX.BinarizationModes & JSXBase.HTMLAttributes<HTMLBinarizationModesElement>;
        }
    }
}
