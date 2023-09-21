import { Component } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/app/model/iproperty';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {

  properties!:Array<IPropertyBase>;
  sellRent=1;
  today=new Date();
  city='';
  searchCity: any;

  constructor(private housingService:HousingService,
              private route:ActivatedRoute){}

  ngOnInit():void
  {
    if(this.route.snapshot.url.toString())
    {
      this.sellRent=2;
    }

    this.housingService.getAllProperties(this.sellRent).subscribe
    (
      data=>
      {
        this.properties=data;

        const newProperties=JSON.parse(localStorage.getItem('newProp'));

        if(newProperties)
        {
          for(const newProperty of newProperties)
          {
            if(newProperty.sellRent===this.sellRent)
            {
              this.properties.unshift(newProperty);
            }
          }
        }
        console.log(data);
        (err:any)=>console.log(err);
      }
    )
    
   /*
   this.housingService.getAll().subscribe(
    data=>
    {
      const newProperty=JSON.parse(localStorage.getItem('newProp'));
      this.properties=data;

      if(newProperty.sellRent==this.sellRent)
      {
        this.properties=[newProperty, ...this.properties];
      }
      console.log(data);
      (err:any)=>console.log(err);
    }
   )
   */
  }

  onCityFilter()
  {
    this.searchCity=this.city
  }

}
