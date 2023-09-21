import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  @ViewChild('formTab') formTab:TabsetComponent;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  public propertyId!: number;
  property=new Property();

  constructor(private route:ActivatedRoute,
              private router:Router,
              private housingService:HousingService) { }

  ngOnInit() {
    this.propertyId=this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data:any)=>
      {
        this.property=data['prp'];
      }
    )

    /*
    this.route.params.subscribe(
      (params)=>
      {
        this.propertyId=+params['id'];
        this.housingService.getProperty(this.propertyId).subscribe(
          (data : any)=>
          {
            this.property=data;
          }
        )
      }
    )
    */

    this.galleryOptions = [
      {
        width: '100%',
        height: '470px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      /*
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
      */
    ];

    this.galleryImages = [
      {
        small: 'assets/images/apartmanResmi1.jpg',
        medium: 'assets/images/apartmanResmi1.jpg',
        big: 'assets/images/apartmanResmi1.jpg'
      },
      {
        small: 'assets/images/apartmanResmi4.jpg',
        medium: 'assets/images/apartmanResmi4.jpg',
        big: 'assets/images/apartmanResmi4.jpg'
      }
    ];

  }

  selectTab(tabId:number)
  {
    this.formTab.tabs[tabId].active=true;
  }

  onBack()
  {
    this.router.navigate(['/']);
  }

  onSelectNext()
  {
    this.propertyId+=1;
    this.router.navigate(['property-detail/'+this.propertyId]);
  }
}
