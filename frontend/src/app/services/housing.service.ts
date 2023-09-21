import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HtmlParser } from '@angular/compiler';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';
import { IPropertyBase } from '../model/ipropertybase';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray=>{
        return propertiesArray.find(p=>p.id===id);
      })
    )
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
                propertiesArray.push(localProperties[id]);
              }
            }
            else {
              propertiesArray.push(localProperties[id]);
            }

          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].sellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          }

          else {
            propertiesArray.push(data[id]);
          }

        }
        return propertiesArray;
      })
    );
  }

  addProperty(property: Property) {
    let newProp = [property];
    // add new property in array if newProp already exists in localStorage //
    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropId() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    }

    else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

}
