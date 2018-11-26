import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {

  post: any;
  user: string;
  comments: Array<any> = new Array<any>();
  categories: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  defaultFont: any;
  showControls: boolean = false;
  scale: number = 1;
  bodyhtml:any;
  imgURL;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService
  ) {

    this.defaultFont = '1em';

  }

  ionViewDidLoad(){
    console.log("Post page");
    this.morePagesAvailable = true;
    let loading = this.loadingCtrl.create();

    loading.present();

    var rawPost = this.navParams.get('item');

    // Check if there is image
    console.log(rawPost);

    // var el = document.createElement( 'html' );

    // el.innerHTML = rawPost.content.redered;

    var temp = rawPost.content.rendered.replace(/-\d*x\d*/g, "");
    temp = rawPost.content.rendered.replace(/\/>/g, "</zoom-area>");
    this.bodyhtml = temp.replace(/<img/g, '<zoom-area [(scale)]="scale" [(controls)]="showControls"> <img ');

    this.post = rawPost;

    // this.imgURL = rawPost.content.rendered.match(/<img[^>]+src="([^">]+)"/);
    // if(this.imgURL){
    //   this.imgURL = this.imgURL[1];
    //   this.imgURL = this.imgURL.replace(/-\d*x\d*/, "");
    // }
    // console.log(this.imgURL);

    // var fullImageTag = rawPost.content.rendered.match(/<img([^\s>]*)(\s[^<]*)>/);
    // if(fullImageTag)fullImageTag = fullImageTag[0];

    // this.bodyhtml = rawPost.content.rendered.replace(/<img([^\s>]*)(\s[^<]*)>/, '<ion-scroll zoom="true" maxZoom="20"><img src="'+ this.imgURL +'" /></ion-scroll>');
    // console.log(this.bodyhtml);

    // this.post = rawPost;


    loading.dismiss();

    // Observable.forkJoin(
    //   this.getAuthorData(),
    //   this.getCategories(),
    //   this.getComments())
    //   .subscribe(data => {
    //     this.user = data[0].name;
    //     this.categories = data[1];
    //     this.comments = data[2];
    //     loading.dismiss();
    //   });
  }

  goToSearch(){
    this.navCtrl.push(SearchPage);
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  // getAuthorData(){
  //   return this.wordpressService.getAuthor(this.post.author);
  // }

  // getCategories(){
  //   return this.wordpressService.getPostCategories(this.post);
  // }

  // getComments(){
  //   return this.wordpressService.getComments(this.post.id);
  // }

  // loadMoreComments(infiniteScroll) {
  //   let page = (this.comments.length/10) + 1;
  //   this.wordpressService.getComments(this.post.id, page)
  //   .subscribe(data => {
  //     for(let item of data){
  //       this.comments.push(item);
  //     }
  //     infiniteScroll.complete();
  //   }, err => {
  //     console.log(err);
  //     this.morePagesAvailable = false;
  //   })
  // }

  // goToCategoryPosts(categoryId, categoryTitle){
  //   this.navCtrl.push(HomePage, {
  //     id: categoryId,
  //     title: categoryTitle
  //   })
  // }

  // createComment(){
  //   let user: any;

  //   this.authenticationService.getUser()
  //   .then(res => {
  //     user = res;

  //     let alert = this.alertCtrl.create({
  //     title: 'Add a comment',
  //     inputs: [
  //       {
  //         name: 'comment',
  //         placeholder: 'Comment'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Accept',
  //         handler: data => {
  //           let loading = this.loadingCtrl.create();
  //           loading.present();
  //           this.wordpressService.createComment(this.post.id, user, data.comment)
  //           .subscribe(
  //             (data) => {
  //               console.log("ok", data);
  //               this.getComments();
  //               loading.dismiss();
  //             },
  //             (err) => {
  //               console.log("err", err);
  //               loading.dismiss();
  //             }
  //           );
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  //   },
  //   err => {
  //     let alert = this.alertCtrl.create({
  //       title: 'Please login',
  //       message: 'You need to login in order to comment',
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: () => {
  //             console.log('Cancel clicked');
  //           }
  //         },
  //         {
  //           text: 'Login',
  //           handler: () => {
  //             this.navCtrl.push(LoginPage);
  //           }
  //         }
  //       ]
  //     });
  //   alert.present();
  //   });
  // }
}
