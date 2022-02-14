import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [ NgxDatatableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule
  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
