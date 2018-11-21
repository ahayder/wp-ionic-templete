import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';
import { VerificationCodePage } from '../verification-code/verification-code';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  register_form: FormGroup;
  generatedCode: any;
  dbref: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    fire: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {

    this.dbref = fire.list('users');
    
  }

  ionViewWillLoad() {
    this.register_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required)
    });
  }

  saveToFireBase(values) {

    let loading = this.loadingCtrl.create();
    loading.present();

    this.generatedCode = Math.floor(1000 + Math.random() * 9000);

    this.dbref.push({
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      designation: values.designation,
      organization: values.organization,
      verificationCode: this.generatedCode,
      date: Date.now()

    }).then(_ => {

      Email.send("Booklet App <info@pencilfoundation.com>",
                  values.email,
                  "Confirm Registration",
                  "Hi, " + values.name + ", <br><br> The 4 digit code is: " + this.generatedCode + "<br><br>Use this code to login into the app.",
                  "box5338.bluehost.com",
                  "info@pencilfoundation.com",
                  "!S-D-IV_Tp*%");
      loading.dismiss();
      
      const toast = this.toastCtrl.create({
        message: 'Registration successfull!! Please check your mail for 4 digit code and enter it to login.',
        duration: 7000,
        position: "middle"
      });
      toast.present();
      this.navCtrl.push(VerificationCodePage, {verificationCode: this.generatedCode});
    });
  }//else
  
  
  goToLogin(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.navCtrl.push(LoginPage);
    loading.dismiss();
  }

  // onSubmit(values){
  //   var un = 'rusho127'; // this should be an administrator Username
  //   var pd = '9Q^%BEN^(*asGaTZdZ6tBVQs'; // this should be an administrator Password
  //   //only authenticated administrators can create users
  //   console.log(values);
  //   this.authenticationService.doLogin(un, pd)
  //   .subscribe(
  //     res => {
  //       let user_data = {
  //         username: values.username,
  //         name: values.displayName,
  //         email: values.email,
  //         password: values.password
  //       };
  //       this.authenticationService.doRegister(user_data, res.json().token)
  //       .subscribe(
  //         result => {
  //           console.log(result);
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

}
