import { Component } from '@angular/core';
import { AvatarService } from '../service/avatar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  profile = null;

  constructor(
    public avatarService: AvatarService
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }
}
