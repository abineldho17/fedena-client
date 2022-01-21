import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendancePageRoutingModule } from './attendance-routing.module';

import { AttendancePage } from './attendance.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AttendancePageRoutingModule
  ],
  declarations: [AttendancePage]
})
export class AttendancePageModule {}
