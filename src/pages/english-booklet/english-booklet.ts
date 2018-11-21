import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { PostPage } from '../post/post';
import { SubcategoriesPage } from '../subcategories/subcategories';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';


/**
 * Generated class for the EnglishBookletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-english-booklet',
  templateUrl: 'english-booklet.html',
})
export class EnglishBookletPage {

  categories: Array<any>;
  defaultFont: any;
	// posts: Array<any> = new Array<any>();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public wordpressService: WordpressService,
    public loadingCtrl: LoadingController) {

      this.defaultFont = '1em';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnglishBookletPage');
    let loading = this.loadingCtrl.create();

    loading.present();
    
    // get categories of english book
    this.wordpressService.getSubcategories('8')
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
