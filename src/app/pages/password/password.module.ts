import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordPageRoutingModule } from './password-routing.module';

import { PasswordPage } from './password.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordPageRoutingModule
  ],
  declarations: [PasswordPage]
})
export class PasswordPageModule {}
