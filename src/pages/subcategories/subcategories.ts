import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { PostPage } from '../post/post';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-subcategories',
  templateUrl: 'subcategories.html',
})
export class SubcategoriesPage {

  catid: any;
  categories: any;
  defaultFont: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public wordpressService: WordpressService,
    public loadingCtrl: LoadingController) {

      this.defaultFont = '1em';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcategoriesPage');

    let loading = this.loadingCtrl.create();

    loading.present();
    
    this.catid = this.navParams.get('parentId');
    this.wordpressService.getSubcategories(this.catid)
      .subscribe(cats => {
          this.categories = cats;
          loading.dismiss();
      });
  }

  goToSearch(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.navCtrl.push(SearchPage);
    loading.dismiss();
  }
  
  goToHome(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.navCtrl.push(HomePage);
    loading.dismiss();
  }


  categoryTapped(cat){

    let loading = this.loadingCtrl.create();
    loading.present();

    // check for subcategories
    this.wordpressService.getSubcategories(cat.id)
      .subscribe(data => {
          if(data.length == 0){ // no sub categories so... there is one post here
            // go to post page
            // before that get the post
            this.wordpressService.getRecentPosts(cat.id)
            .subscribe(data => {
              this.navCtrl.push(PostPage, {
                item: data[0]
              });
              loading.dismiss();
            });
          }else{
            this.navCtrl.push(SubcategoriesPage, {
              parentId: cat.id
            });
            loading.dismiss();
          }
      });


  }

}
