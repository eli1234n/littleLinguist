import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'littlelinguist-2ed70',
        appId: '1:510350322513:web:e4b17d2e91b9a9deff0170',
        storageBucket: 'littlelinguist-2ed70.appspot.com',
        apiKey: 'AIzaSyB-x-EqVltE30wHy7s9cwuXzh1JzvHk6dc',
        authDomain: 'littlelinguist-2ed70.firebaseapp.com',
        messagingSenderId: '510350322513',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
