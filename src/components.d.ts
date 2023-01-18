/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ImageprocessingParameterDef } from "./components/parameters-modes/definition";
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
    interface ParametersModes {
        "loadExternalDefinition": (defs: ImageprocessingParameterDef[]) => Promise<void>;
        "loadSettings": (params: any) => Promise<void>;
        "outputSettings": () => Promise<{}>;
    }
}
declare global {
    interface HTMLBarcodeFormatsElement extends Components.BarcodeFormats, HTMLStencilElement {
    }
    var HTMLBarcodeFormatsElement: {
        prototype: HTMLBarcodeFormatsElement;
        new (): HTMLBarcodeFormatsElement;
    };
    interface HTMLParametersModesElement extends Components.ParametersModes, HTMLStencilElement {
    }
    var HTMLParametersModesElement: {
        prototype: HTMLParametersModesElement;
        new (): HTMLParametersModesElement;
    };
    interface HTMLElementTagNameMap {
        "barcode-formats": HTMLBarcodeFormatsElement;
        "parameters-modes": HTMLParametersModesElement;
    }
}
declare namespace LocalJSX {
    interface BarcodeFormats {
    }
    interface ParametersModes {
    }
    interface IntrinsicElements {
        "barcode-formats": BarcodeFormats;
        "parameters-modes": ParametersModes;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "barcode-formats": LocalJSX.BarcodeFormats & JSXBase.HTMLAttributes<HTMLBarcodeFormatsElement>;
            "parameters-modes": LocalJSX.ParametersModes & JSXBase.HTMLAttributes<HTMLParametersModesElement>;
        }
    }
}
