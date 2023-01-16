export interface ImageProcessingParameter {
  name:string;
  modes:Mode[];
  length:number;
}

export interface Mode {
  name:"string";
  args:ModeArgument[];
}

export interface ModeArgument {
  name:string;
  type:"boolean"|"number";
  description?:string;
  max?:number;
  min?:number;
  default?:number;
}