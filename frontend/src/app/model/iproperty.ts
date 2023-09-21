import { IPropertyBase } from "./ipropertybase";

export interface IProperty extends IPropertyBase
{
  neighbourhood:string,
  district:string,
  description:string,
  date:string
}
