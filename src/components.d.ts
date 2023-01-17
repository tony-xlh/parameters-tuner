/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { BinarizationMode } from "./components/binarization-modes/definitions";
import { LocalizationMode } from "./components/localization-modes/definitions";
export namespace Components {
    interface BarcodeFormats {
        /**
          * Update checked barcode formats with an object like the following: {   "BarcodeFormatIds": [     "BF_EAN_13"   ],   "BarcodeFormatIds_2": [     "BF2_POSTALCODE"   ], }
         */
        "loadSettings": (settings: any) => Promise<void>;
        /**
          * Output checked barcode formats to an object like the following: {   "BarcodeFormatIds": [     "BF_EAN_13"   ],   "BarcodeFormatIds_2": [     "BF2_POSTALCODE"   ], }
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
    interface ImageprocessingParameters {
        "loadSettings": (params: any) => Promise<void>;
        "outputSettings": () => Promise<any>;
    }
    interface LocalizationModes {
        /**
          * Update BinarizationModes with an object like the following: {   "LocalizationModes": [       {           "Mode": "LM_CONNECTED_BLOCKS",        }   ] }
         */
        "loadSettings": (settings: any) => Promise<void>;
        /**
          * Output LocalizationModes to an object like the following: {   "LocalizationModes": [       {           "Mode": "LM_CONNECTED_BLOCKS",        }   ] }
         */
        "outputSettings": () => Promise<{ LocalizationModes: LocalizationMode[]; }>;
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
    interface HTMLImageprocessingParametersElement extends Components.ImageprocessingParameters, HTMLStencilElement {
    }
    var HTMLImageprocessingParametersElement: {
        prototype: HTMLImageprocessingParametersElement;
        new (): HTMLImageprocessingParametersElement;
    };
    interface HTMLLocalizationModesElement extends Components.LocalizationModes, HTMLStencilElement {
    }
    var HTMLLocalizationModesElement: {
        prototype: HTMLLocalizationModesElement;
        new (): HTMLLocalizationModesElement;
    };
    interface HTMLElementTagNameMap {
        "barcode-formats": HTMLBarcodeFormatsElement;
        "binarization-modes": HTMLBinarizationModesElement;
        "imageprocessing-parameters": HTMLImageprocessingParametersElement;
        "localization-modes": HTMLLocalizationModesElement;
    }
}
declare namespace LocalJSX {
    interface BarcodeFormats {
    }
    interface BinarizationModes {
    }
    interface ImageprocessingParameters {
    }
    interface LocalizationModes {
    }
    interface IntrinsicElements {
        "barcode-formats": BarcodeFormats;
        "binarization-modes": BinarizationModes;
        "imageprocessing-parameters": ImageprocessingParameters;
        "localization-modes": LocalizationModes;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "barcode-formats": LocalJSX.BarcodeFormats & JSXBase.HTMLAttributes<HTMLBarcodeFormatsElement>;
            "binarization-modes": LocalJSX.BinarizationModes & JSXBase.HTMLAttributes<HTMLBinarizationModesElement>;
            "imageprocessing-parameters": LocalJSX.ImageprocessingParameters & JSXBase.HTMLAttributes<HTMLImageprocessingParametersElement>;
            "localization-modes": LocalJSX.LocalizationModes & JSXBase.HTMLAttributes<HTMLLocalizationModesElement>;
        }
    }
}
