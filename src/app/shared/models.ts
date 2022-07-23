export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

export interface Category {
  categoryId: string;
  categoryName: string;
}

export class Item {
  id: string;
  category: string;
  description: string;
  imageUrl: string;
  availability: string;
}
