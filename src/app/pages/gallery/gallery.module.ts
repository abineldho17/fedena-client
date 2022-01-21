import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GalleryPageRoutingModule } from './gallery-routing.module';

import { GalleryPage } from './gallery.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GalleryPageRoutingModule
  ],
  declarations: [GalleryPage]
})
export class GalleryPageModule {}
