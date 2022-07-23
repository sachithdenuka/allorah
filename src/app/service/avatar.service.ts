import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import {
  collectionData,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { collection } from 'firebase/firestore';
import { tap } from 'rxjs/operators';
import { Item } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private afs: AngularFirestore
  ) {}

  getUserProfile() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  getCategories() {
    const categoryDocRef = collection(this.firestore, `categories`);
    return collectionData(categoryDocRef);
  }

  getItems() {
    const categoryDocRef = collection(this.firestore, `items`);
    return collectionData(categoryDocRef);
  }

  async addNewCategory(description: string) {
    const categoryId = `${description}${new Date()
      .getMilliseconds()
      .toString()}`;
    const categoryDocRef = doc(this.firestore, `categories/${categoryId}`);
    try {
      await setDoc(categoryDocRef, { categoryId, description });
      return true;
    } catch (e) {
      return null;
    }
  }

  async addNewItem(cameraFile: Photo, item: Item) {
    const responseObject = await this.uploadImage(cameraFile);
    if (responseObject) {
      const itemDocRef = doc(this.firestore, `items/${responseObject.id}`);
      item.id = responseObject.id;
      item.imageUrl = responseObject.imageUrl;
      try {
        await setDoc(itemDocRef, JSON.parse(JSON.stringify(item)));
        return true;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  async idTest() {
    console.log(this.afs.createId());
  }

  async uploadImage(cameraFile: Photo) {
    const id = await this.afs.createId();
    const path = `uploads/items/${id}.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      return { id, imageUrl };
    } catch (e) {
      return null;
    }
  }

  async updateItem(item: Item) {
    try {
      const itemDocRef = doc(this.firestore, `items/${item.id}`);
      await updateDoc(itemDocRef, item as DocumentData);
      return true;
    } catch (e) {
      return false;
    }
  }
}
