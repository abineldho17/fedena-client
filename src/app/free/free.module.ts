import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreePageRoutingModule } from './free-routing.module';

import { FreePage } from './free.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreePageRoutingModule
  ],
  declarations: [FreePage]
})
export class FreePageModule {}
