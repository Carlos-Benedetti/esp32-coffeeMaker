import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeemakerPage } from './coffeemaker.page';

const routes: Routes = [
  {
    path: '',
    component: CoffeemakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffeemakerPageRoutingModule {}
