import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
