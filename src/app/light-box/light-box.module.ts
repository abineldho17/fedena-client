import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightBoxPageRoutingModule } from './light-box-routing.module';

import { LightBoxPage } from './light-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightBoxPageRoutingModule
  ],
  declarations: [LightBoxPage]
})
export class LightBoxPageModule {}
