import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwoWayComponent } from './two-way/two-way.component';

const routes: Routes = [
  {path:'two-way' , component: TwoWayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
