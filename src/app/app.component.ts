import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { RegisterPage } from '../pages/register/register';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public nativeStorage: NativeStorage,
  ) {
    platform.ready().then(() => {

      console.log(this.nativeStorage.getItem('user'));
      
      //if local storage has user login or go to registration page
      this.nativeStorage.getItem('user')
      .then(
        data => this.rootPage = HomePage,
        error => this.rootPage = RegisterPage
      );
      // if(this.nativeStorage.getItem('user')){
      //   this.rootPage = HomePage
      // }else{
      //   this.rootPage = RegisterPage
      // }
      // authenticationService.getUser()
      // .then(
      //   data => {
      //     authenticationService.validateAuthToken(data.token)
      //     .subscribe(
      //       res => this.rootPage = HomePage,
      //       err =>   this.rootPage = HomePage
      //     )
      //   },
      //   err => this.rootPage = HomePage
      // );
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
