import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './components/main-home/main-home.component';


const routes: Routes = [
  { path: "", component: MainHomeComponent },
  {
    path: "customers",
    loadChildren: "../app/customers/customers.module#CustomersModule",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
