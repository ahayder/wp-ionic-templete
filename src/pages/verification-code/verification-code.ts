import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the VerificationCodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification-code',
  templateUrl: 'verification-code.html',
})
export class VerificationCodePage {

  vcode: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
    this.vcode = this.navParams.get("verificationCode");
  }


  login(code){

    let loading = this.loadingCtrl.create();
    loading.present();

    if(this.vcode == code){
      this.navCtrl.push(HomePage);
      loading.dismiss();
      this.nativeStorage.setItem('user', true);
    }else{
      loading.dismiss();

      const toast = this.toastCtrl.create({
        message: 'Verification code does not match. Please try again.',
        duration: 2000,
        position: "middle"
      });
      toast.present();
    }


  }

}
