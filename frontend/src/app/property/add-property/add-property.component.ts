import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm!: NgForm
  @ViewChild('formTab') formTab: TabsetComponent;

  addPropertyForm: FormGroup;
  nextClicked:boolean;
  property = new Property();

  propertyTypes:Array<string> = ['House', 'Apartment', 'Dublex'];
  propertyView: IProperty = {
    id: null,
    name: '',
    sellRent: null,
    city: '',
    type: null,
    situation: null,
    price: null,
    image: null,
    numberOfRooms: null,
    neighbourhood: null,
    district: null,
    description: null,
    date: null,
    ageOfProperty: null,
    floor: null,
    address: null,
  };
  constructor(private router: Router,
    private fb: FormBuilder, 
    private housingService:HousingService,
    private alertifyService:AlertifyService) { }

  ngOnInit() {
    this.createUser();
  }

  createUser()
  {
    this.addPropertyForm = this.fb.group({
      basicInfo: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        sellRent: ['', Validators.required],
        numberOfRooms: ['', Validators.required],
        type: ['', Validators.required]
      }),
      pricing: this.fb.group({
        price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        district: ['', Validators.required],
        neighbourhood: ['', Validators.required],
        addressFormControl:['', Validators.required],
      }),
      otherDetails: this.fb.group({
        date: ['', Validators.required],
        ageOfProperty:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
        floor:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
        description:['',Validators.required]
      }),
      photo: this.fb.group({
        image: ['',]
      })
    })
  }


  onBack() {
    this.router.navigate(['/']);
  }

  allTabsValid():boolean
  {
    if(this.BasicInfo.invalid)
    {
      this.formTab.tabs[0].active=true;
      return false;
    }
    if(this.Pricing.invalid)
    {
      this.formTab.tabs[1].active=true;
      return false;
    }
    if(this.Address.invalid)
    {
      this.formTab.tabs[2].active=true;
      return false;
    }
    if(this.OtherDetails.invalid)
    {
      this.formTab.tabs[3].active=true;
      return false;
    }
    if(this.Photo.invalid)
    {
      this.formTab.tabs[4].active=true;
      return false;
    }

    return true;
    

  }

  onSubmit() {
    this.nextClicked=true;
    if(this.allTabsValid())
    {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertifyService.success("congrats, submitted");
      console.log(this.addPropertyForm);

      if(this.SellRent.value==='2')
      {
        this.router.navigate(['/rent-property']);
      }

      else
      {
        this.router.navigate(['/']);
      }
    }

    else
    {
      this.alertifyService.error("please review the form and provide all valid entries");
    }
  }

  mapProperty():void
  {
    this.property.id=this.housingService.newPropId();
    this.property.name=this.Name.value;
    this.property.sellRent=this.SellRent.value;
    this.property.numberOfRooms=this.NumberOfRooms.value;
    this.property.type=this.Type.value;
    this.property.price=this.Price.value;
    this.property.city=this.City.value;
    this.property.district=this.District.value;
    this.property.neighbourhood=this.Neighbourhood.value;
    this.property.date=this.Date.value;
    this.property.image=this.Image.value;
    this.property.address=this.AddressFormControl.value;
    this.property.floor=this.Floor.value;
    this.property.ageOfProperty=this.AgeOfProperty.value;
    this.property.description=this.Description.value;
  }

  selectTab(tabId: number, isCurrentTabValid:boolean) {
    this.nextClicked=true;
    if(isCurrentTabValid)
    {
      this.formTab.tabs[tabId].active = true;
    }
  }

  //-- getter methods --//

  //first formGroups//
  get BasicInfo() {
    return this.addPropertyForm.controls['basicInfo'] as FormGroup
  }

  get Address() {
    return this.addPropertyForm.controls['address'] as FormGroup
  }

  get Pricing() {
    return this.addPropertyForm.controls['pricing'] as FormGroup
  }

  get OtherDetails() {
    return this.addPropertyForm.controls['otherDetails'] as FormGroup
  }

  get Photo() {
    return this.addPropertyForm.controls['photo'] as FormGroup
  }

  //then formControls//

  /* -- basic info form controls --*/
  get Name() {
    return this.BasicInfo.controls['name'] as FormControl
  }

  get SellRent() {
    return this.BasicInfo.controls['sellRent'] as FormControl;
  }

  get NumberOfRooms() {
    return this.BasicInfo.controls['numberOfRooms'] as FormControl;
  }

  get Type() {
    return this.BasicInfo.controls['type'] as FormControl;
  }

  /* -- pricing form controls --*/

  get Price() {
    return this.Pricing.controls['price'] as FormControl;
  }

  /* -- address form controls --*/
  get City() {
    return this.Address.controls['city'] as FormControl;
  }

  get District() {
    return this.Address.controls['district'] as FormControl;
  }

  get Neighbourhood() {
    return this.Address.controls['neighbourhood'] as FormControl;
  }

  get AddressFormControl()
  {
    return this.Address.controls['addressFormControl'] as FormControl;
  }

  /* -- other details form control -- */
  get Date() {
    return this.OtherDetails.controls['date'] as FormControl;
  }

  get AgeOfProperty(){
    return this.OtherDetails.controls['ageOfProperty'] as FormControl;
  }

  get Floor()
  {
    return this.OtherDetails.controls['floor'] as FormControl;
  }

  get Description()
  {
    return this.OtherDetails.controls['description'] as FormControl;
  }

  /* -- photo details form control --*/
  get Image() {
    return this.Photo.controls['image'] as FormControl;
  }
}
