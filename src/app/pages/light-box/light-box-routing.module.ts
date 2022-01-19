import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightBoxPage } from './light-box.page';

const routes: Routes = [
  {
    path: '',
    component: LightBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightBoxPageRoutingModule {}
