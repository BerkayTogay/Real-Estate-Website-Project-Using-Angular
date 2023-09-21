import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RentComponent } from './property/rent/rent.component';
import { BuyComponent } from './property/buy/buy.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { AuthGuard } from './auth/AuthGuard';

const routes: Routes= [
  {path:'', component:PropertyListComponent},
  {path:'home', redirectTo:'', pathMatch:'full', component:HomeComponent},
  {path:'buy-property', component:BuyComponent},
  {path:'list-property', component:PropertyListComponent},
  {path:'rent-property',component:RentComponent},
  {path:'add-property',component:AddPropertyComponent, canActivate:[AuthGuard]},
  {path:'property-detail/:id',component:PropertyDetailComponent, resolve:{prp: PropertyDetailResolverService}},
  {path:'user/login', component:UserLoginComponent},
  {path:'user/register', component:UserRegisterComponent},
  {path:'**', component:NotFoundPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
