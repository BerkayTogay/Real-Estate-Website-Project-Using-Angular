import { IPropertyBase } from "./ipropertybase";

export class Property implements IPropertyBase
{
    id:number;
    name:string;
    sellRent:string;
    type:string;
    situation:string;
    numberOfRooms:string;
    price:number;
    image:string;
    neighbourhood:string;
    district:string;
    city:string;
    description:string;
    date:string;
    ageOfProperty: number;
    floor: number;
    address: string;

}