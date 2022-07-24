import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  timer;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {
    document.addEventListener('input', (e) => {
      const el = e.target as HTMLTextAreaElement;

      if (el.matches('[data-color]')) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          document.documentElement.style.setProperty(
            `--color-${el.dataset.color}`,
            el.value
          );
        }, 100);
      }
    });
  }
  logIn(email, password) {
    this.authService
      .signIn(email.value, password.value)
      .then((res) => {
        console.log(res);
        this.authService.setLocalUserData(res.user);
        if (this.authService.isEmailVerified) {
          this.router.navigate(['tabs/allorah/tab3']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
