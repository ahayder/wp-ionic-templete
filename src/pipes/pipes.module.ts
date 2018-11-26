import { NgModule } from '@angular/core';
import { RawHtmlPipe } from './../pipes/raw-html/raw-html';
@NgModule({
	declarations: [RawHtmlPipe,
    RawHtmlPipe],
	imports: [],
	exports: [RawHtmlPipe,
    RawHtmlPipe]
})
export class PipesModule {}
