/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ParametersTuner {
    }
}
declare global {
    interface HTMLParametersTunerElement extends Components.ParametersTuner, HTMLStencilElement {
    }
    var HTMLParametersTunerElement: {
        prototype: HTMLParametersTunerElement;
        new (): HTMLParametersTunerElement;
    };
    interface HTMLElementTagNameMap {
        "parameters-tuner": HTMLParametersTunerElement;
    }
}
declare namespace LocalJSX {
    interface ParametersTuner {
    }
    interface IntrinsicElements {
        "parameters-tuner": ParametersTuner;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "parameters-tuner": LocalJSX.ParametersTuner & JSXBase.HTMLAttributes<HTMLParametersTunerElement>;
        }
    }
}
