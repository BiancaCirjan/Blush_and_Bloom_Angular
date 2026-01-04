import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {  HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "blushbloom-6f191", appId: "1:79113931780:web:ac6c92093f435473b97951", databaseURL: "https://blushbloom-6f191-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "blushbloom-6f191.firebasestorage.app", apiKey: "AIzaSyAbFKhjNP-FUC8G751nPcOYPGfhMLOLIvg", authDomain: "blushbloom-6f191.firebaseapp.com", messagingSenderId: "79113931780" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
