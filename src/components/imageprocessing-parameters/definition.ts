
export interface ImageprocessingParameterDef {
  name:string;
  modes:ModeDef[];
  skipName:string;
  length:number;
}

export interface ModeDef {
  name:"string";
  args:ModeArgumentDef[];
}

export interface ModeArgumentDef {
  name:string;
  type:"boolean"|"number";
  description?:string;
  max?:number;
  min?:number;
  default?:number;
}