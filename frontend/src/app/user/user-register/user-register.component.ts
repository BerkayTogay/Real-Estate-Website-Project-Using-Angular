import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user-service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
  phonePattern = '[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}'
  user: User;


  constructor(private fb: FormBuilder,
              private userService:UserService,
              private alertify:AlertifyService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() // with formBuilder class, it makes easier
  {
    this.registrationForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.pattern(this.emailRegex), Validators.minLength(6), Validators.maxLength(40)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(this.phonePattern), Validators.minLength(13), Validators.maxLength(13)]]
      },
      {
        Validators: this.passwordMatchingValidator
      }
    )

  }



  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    /*
    const password=fc.get('password');
    const confirmPassword=fc.get('confirmPassword');
    if(password && confirmPassword && (password?.value != confirmPassword?.value))
    {
      return {
        notMatched:true
      }
    }
    return null;
    */

    return fc.get('password')?.value === fc.get('confirmPassword')?.value &&
      fc.get('password') && fc.get('confirmPassword') ? null :
      { notMatched: true }

  };


  onSubmit() {
    if(this.registrationForm.valid)
    {
    console.log(this.registrationForm.value);
    //this.user=Object.assign(this.user, this.registrationForm.value);
    this.userService.addUser(this.userData());
    this.alertify.success("congrats, you are successfully registered");
    }
    else
    {
      this.alertify.error("please provide the required fields");
    }
    this.registrationForm.reset();

  }

  userData():User
  {
    return this.user = {
      userName : this.userName.value,
      email:this.email.value,
      password:this.password.value,
      confirmPassword:this.confirmPassword.value,
      phone:this.phone.value
    }
  }

  // getter methods for all form controls //

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get phone(){
    return this.registrationForm.get('phone') as FormControl;
  }
}

/*
function passwordMatchingValidator(group: AbstractControl): { [key: string]: any } | null {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  if (password!.value === confirmPassword!.value) {
    return null;
  }
  else {
    return { 'notmatched': true }
  }
}
*/

