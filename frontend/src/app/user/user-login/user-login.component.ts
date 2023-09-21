import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  //loginForm:FormGroup;
  //emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private authService:AuthService,
              private alertify:AlertifyService,
              private router:Router,
              private loginBuilder:FormBuilder) { }


  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  ngOnInit(){

  }

  onLogin(loginForm:NgForm)
  {
    console.log(loginForm.value)
    const token=this.authService.authUser(loginForm.value);
    if(token)
    {
      localStorage.setItem('token', token.email);
      this.alertify.success('login successful');
      this.router.navigate(['/']);
    }
    else
    {
      this.alertify.error('email or password wrong, login not successful');
      loginForm.reset();
    }
  }

}
