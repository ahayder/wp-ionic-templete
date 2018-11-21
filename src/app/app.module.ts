import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PostPage } from '../pages/post/post';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { EnglishBookletPage } from '../pages/english-booklet/english-booklet';
import { BanglaBookletPage } from '../pages/bangla-booklet/bangla-booklet';
import { SubcategoriesPage } from '../pages/subcategories/subcategories';
import { SearchPage } from '../pages/search/search';
import { VerificationCodePage } from '../pages/verification-code/verification-code';


import { WordpressService } from '../services/wordpress.service';
import { AuthenticationService } from '../services/authentication.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZoomAreaModule } from 'ionic2-zoom-area';
import {PinchZoomModule} from 'ngx-pinch-zoom';

// angular fire 2
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RawHtmlPipe } from '../pipes/raw-html/raw-html';


  export const firebaseConfig = {
    apiKey: "AIzaSyBI5sbhYw6O5sMrtEUIwyzWBRo50wnSjSw",
    authDomain: "booklet-91a6e.firebaseapp.com",
    databaseURL: "https://booklet-91a6e.firebaseio.com",
    projectId: "booklet-91a6e",
    storageBucket: "booklet-91a6e.appspot.com",
    messagingSenderId: "467570350971"
  };

@NgModule({
  declarations: [
    MyApp,
    PostPage,
    HomePage,
    LoginPage,
    RegisterPage,
    EnglishBookletPage,
    SubcategoriesPage,
    BanglaBookletPage,
    SearchPage,
    VerificationCodePage,
    RawHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    PinchZoomModule,
    IonicModule.forRoot(MyApp),
    ZoomAreaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PostPage,
    HomePage,
    LoginPage,
    RegisterPage,
    EnglishBookletPage,
    SubcategoriesPage,
    BanglaBookletPage,
    SearchPage,
    VerificationCodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    WordpressService,
    AuthenticationService,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
