import { NgModule } from '@angular/core';
import { RawHtmlPipe } from './../pipes/raw-html/raw-html';
@NgModule({
	declarations: [RawHtmlPipe],
	imports: [],
	exports: [RawHtmlPipe]
})
export class PipesModule {}
