import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from 'express';
import { AuthenticationService } from '../service/auth.service';
import { AvatarService } from '../service/avatar.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  category = '';
  categories = [];

  constructor(
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.getCategories();
  }

  getCategories() {
    this.avatarService.getCategories().subscribe((categories) => this.categories = categories);
  }

  async addNewCategory() {
    if (this.category.trim().length > 0) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.addNewCategory(this.category);
      this.getCategories();
      this.category = '';
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Create Failed',
          message: 'There was a problem creating a new category',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
