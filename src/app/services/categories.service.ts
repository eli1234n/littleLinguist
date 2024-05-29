import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { categoryConverter } from './converters/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestoreService: Firestore) {}

  async list(): Promise<Category[]> {
    const collectionConnection = collection(
      this.firestoreService,
      'category'
    ).withConverter(categoryConverter);

    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      collectionConnection
    );
    const result: Category[] = [];
    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });

    return result;
  }

  async get(id: string): Promise<Category | undefined> {
    const categoryDocRef = doc(
      this.firestoreService,
      'category',
      id
    ).withConverter(categoryConverter);

    return (await getDoc(categoryDocRef)).data();
  }

  async add(category: Category) {
    category.lastUpdateDate = new Date();
    await addDoc(
      collection(this.firestoreService, 'category').withConverter(
        categoryConverter
      ),
      category
    );
  }

  async update(category: Category): Promise<void> {
    category.lastUpdateDate = new Date();
    const categoryDocRef = doc(
      this.firestoreService,
      'category',
      category.id
    ).withConverter(categoryConverter);
    return await setDoc(categoryDocRef, category);
  }

  async delete(id: string) {
    const personDocRef = doc(
      this.firestoreService,
      'category',
      id
    ).withConverter(categoryConverter);
    return deleteDoc(personDocRef);
  }
}
