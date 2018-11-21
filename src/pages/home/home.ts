import { Component } from '@angular/core';
import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import { EnglishBookletPage } from '../english-booklet/english-booklet';
import { BanglaBookletPage } from '../bangla-booklet/bangla-booklet';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;
  lan:any;

  categoryId: number;
  categoryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService,
    private nativePageTransitions: NativePageTransitions
  ) {
    this.lan = "bangla";
  }

  ionViewWillEnter() {
    // this.authenticationService.getUser()
    // .then(
    //   data => this.loggedUser = true,
    //   error => this.loggedUser = false
    // );
    // this.morePagesAvailable = true;

    // //if we are browsing a category
    // this.categoryId = this.navParams.get('id');
    // this.categoryTitle = this.navParams.get('title');

    // if(!(this.posts.length > 0)){
    //   let loading = this.loadingCtrl.create();
    //   loading.present();

    //   this.wordpressService.getRecentPosts(this.categoryId)
    //   .subscribe(data => {
    //     for(let post of data){
    //       post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
    //       this.posts.push(post);
    //     }
    //     loading.dismiss();
    //   });
    // }
  }

  postTapped(event, post) {
		this.navCtrl.push(PostPage, {
		  item: post
		});
  }

  // doInfinite(infiniteScroll) {
  //   let page = (Math.ceil(this.posts.length/10)) + 1;
  //   let loading = true;

  //   this.wordpressService.getRecentPosts(this.categoryId, page)
  //   .subscribe(data => {
  //     for(let post of data){
  //       if(!loading){
  //         infiniteScroll.complete();
  //       }
  //       post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
  //       this.posts.push(post);
  //       loading = false;
  //     }
  //   }, err => {
  //     this.morePagesAvailable = false;
  //   })
  // }

  // example of adding a transition when a page/modal closes
ionViewWillLeave() {

  let options: NativeTransitionOptions = {
     direction: 'up',
     duration: 500,
     slowdownfactor: 3,
     slidePixels: 20,
     iosdelay: 100,
     androiddelay: 150,
     fixedPixelsTop: 0,
     fixedPixelsBottom: 60
    };
 
  this.nativePageTransitions.slide(options)
    .then(_=> console.log("success"))
    .catch(_=>console.log("success"));
 
 }
 

  logOut(){
    this.authenticationService.logOut()
    .then(
      res => this.navCtrl.push(LoginPage),
      err => console.log('Error in log out')
    )
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  
  goToBooklet(lan){
    let loading = this.loadingCtrl.create();
    loading.present();
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
     };
    if(lan == "eng"){
      this.nativePageTransitions.slide(options);
      this.navCtrl.push(EnglishBookletPage);
      loading.dismiss();
    }else{
      this.nativePageTransitions.slide(options);
      this.navCtrl.push(BanglaBookletPage);
      loading.dismiss();
    }
  }
}
