export interface settingDef{
  name:string;
  type:"boolean"|"number"|"string";
  templateStructureType?:"FormatSpecification"|"ImageParameter"|"RegionDefinition";
  description?:string;
  max?:number;
  min?:number;
  default?:number;
}