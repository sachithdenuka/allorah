import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }
  ngOnInit(){}
  signUp(email, password){
      this.authService.registerUser(email.value, password.value)
      .then((res) => {
        // Do something here
        this.authService.sendVerificationMail();
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
