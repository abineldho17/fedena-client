import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterReportsPageRoutingModule } from './filter-reports-routing.module';

import { FilterReportsPage } from './filter-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterReportsPageRoutingModule
  ],
  declarations: [FilterReportsPage]
})
export class FilterReportsPageModule {}
