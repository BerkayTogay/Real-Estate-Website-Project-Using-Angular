import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  constructor(private housingService:HousingService,
              private route:ActivatedRoute) { }

  properties!:Array<IPropertyBase>;
  sellRent=1;

  ngOnInit() {
    if(this.route.snapshot.url.toString())
    {
      this.sellRent=2;
    }

    this.housingService.getAllProperties(this.sellRent).subscribe(
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
  }

}
