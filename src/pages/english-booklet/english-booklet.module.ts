import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnglishBookletPage } from './english-booklet';

@NgModule({
  declarations: [
    EnglishBookletPage,
  ],
  imports: [
    IonicPageModule.forChild(EnglishBookletPage),
  ],
})
export class EnglishBookletPageModule {}
