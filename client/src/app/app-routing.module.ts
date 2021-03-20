import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageAfterLoginComponent } from './components/home-page-after-login/home-page-after-login.component';
import { HomePageBeforeLoginComponent } from './components/home-page-before-login/home-page-before-login.component';
import { MainComponent } from './components/main/main.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { ProductsAreaComponent } from './components/products-area/products-area.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: "homepagebeforelogin", component: HomePageBeforeLoginComponent,
    children: [
      { path: "main", component: MainComponent },
      { path: "registerpage", component: RegisterPageComponent },
      { path: "**", redirectTo: "main" },
    ]
  },
  {
    path: "homepageafterlogin", component: HomePageAfterLoginComponent, canActivate: [LoggedGuard],
    children: [
      { path: "productsarea", component: ProductsAreaComponent },
      { path: "**", redirectTo: "productsarea" },
    ]
  },
  {
    path: "orderpage", component: OrderPageComponent, canActivate: [LoggedGuard]
  },
  { path: "", pathMatch: "full", redirectTo: "homepagebeforelogin" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
