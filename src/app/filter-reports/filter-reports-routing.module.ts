import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterReportsPage } from './filter-reports.page';

const routes: Routes = [
  {
    path: '',
    component: FilterReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterReportsPageRoutingModule {}
