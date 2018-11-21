import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { PostPage } from '../post/post';
import { HomePage } from '../home/home';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public wordPressService: WordpressService) {
  }

  doSearch(ev) {

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.wordPressService.getSearchResult(val)
        .subscribe(cats => {
          this.items = cats;
          console.log(this.items);
        });
    }
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  postTapped(event, post) {
		this.navCtrl.push(PostPage, {
		  item: post
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
