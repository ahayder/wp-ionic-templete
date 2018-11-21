import { Component } from '@angular/core';
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { NavController, LoadingController, NavParams, ToastController } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NativeStorage } from '@ionic-native/native-storage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

export interface User {
  id?: string;
  email: string;
}


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  vcode: any;
  users: Observable<any[]>;
  usersCollection: any;
  login_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public fire: AngularFireDatabase,
    public nativeStorage: NativeStorage,
    public formBuilder: FormBuilder
  ) {

  }

  ionViewDidLoad(){

  }

  ionViewWillLoad() {

    this.login_form = this.formBuilder.group({
      email: new FormControl('', Validators.required)
    });

  }

  login(email){

    let loading = this.loadingCtrl.create();
    loading.present();


    this.usersCollection = this.fire.list('/users', ref => ref.orderByChild('email').equalTo(email));

    this.users = this.usersCollection.snapshotChanges().map(actions => {

      return actions.map(action => {
        const data = action.payload.val() as User;
        //const id = action.payload.doc.id;
        return { 
          id: action.payload.key,
          email: data.email
        }
      });

    });

    this.users.subscribe(snapshot => {
      if(snapshot.length == 0) {  
        console.log('Email match NOT found');
        loading.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Email not registered.',
          duration: 4000,
          position: "middle"
        });
        toast.present();
      } else {
        // console.log('Email match found for user' + snapshot[0].email)
        this.nativeStorage.setItem("user", true);
        this.navCtrl.push(HomePage);
        loading.dismiss();
      }
    })
    
    // //check firebase for the email if exist
    // var test = this.fire.list('/users', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().map(actions => {
    //   return actions.map(a => {
    //     const data = a.payload.val();
    //     const id = a.payload.key;
    //     return { id, ...data };
    //   });
    //   });

    //   console.log(test);

    // test.forEach(element => {
    //     if(element['email'] == email){
    //       console.log("true");
    //     }
    // });

    // this.authenticationService.doLogin(value.username, value.password)
    // .subscribe(res => {
    //    this.authenticationService.setUser({
    //      token: res.json().token,
    //      username: value.username,
    //      displayname: res.json().user_display_name,
    //      email: res.json().user_email
    //    });

    //    loading.dismiss();
    //    this.navCtrl.setRoot(HomePage);
    //  },
    //  err => {
    //    loading.dismiss();
    //    this.error_message = "Invalid credentials. Try with username 'aa' password 'aa'.";
    //    console.log(err);
    //  })
  }

  skipLogin(){
    this.navCtrl.setRoot(HomePage);
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
