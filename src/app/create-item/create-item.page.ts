import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PlatformRef,
} from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { AvatarService } from '../service/avatar.service';
import { Item } from '../shared/models';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {
  @Input() isEdit = false;
  @Input() item: Item = new Item();

  @Output() confirm = new EventEmitter<boolean>();
  @Output() dismiss = new EventEmitter<boolean>();

  categories = [];
  availability = [1, 2, 3, 4, 5];
  image: Photo;
  subscription;

  constructor(
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.getCategories();
    console.log(this.item);
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        // do nothing
      }
    );
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  getCategories() {
    this.avatarService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getBase64Image() {
    if (this.image) {
      return `data:image/${this.image.format};base64,${this.image.base64String}`;
    }
    return '';
  }

  async photoPicker() {
    this.image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    });
  }

  async downloadImage() {
    // retrieve the image
    const response = await fetch(this.item.imageUrl);
    // convert to a Blob
    const blob = await response.blob();
    // convert to base64 data, which the Filesystem plugin requires
    const base64Data = (await this.convertBlobToBase64(blob)) as string;

    const savedFile = await Filesystem.writeFile({
      path: this.item.id,
      data: base64Data,
      directory: Directory.Data,
    });

    if (savedFile) {
      console.log('Saved');
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async addNewItem() {
    if (this.image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.addNewItem(this.image, this.item);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        this.clear();
      }
    }
  }

  clear() {
    this.item = new Item();
    this.image = null;
  }

  async updateItem() {
    if (this.item) {
      const loading = await this.loadingController.create();
      await loading.present();

      // eslint-disable-next-line max-len
      const result = await this.avatarService.updateItem(this.item);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Update failed',
          message: 'There was a problem updating data.',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        this.dismiss.emit(true);
      }
    }
  }
}
