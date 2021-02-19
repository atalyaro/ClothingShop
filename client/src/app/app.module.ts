import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageBeforeLoginComponent } from './components/home-page-before-login/home-page-before-login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { HomePageAfterLoginComponent } from './components/home-page-after-login/home-page-after-login.component';
import { ProductsAreaComponent } from './components/products-area/products-area.component';
import { ProductCardComponent } from './components/product-card/product-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageBeforeLoginComponent,
    MainComponent,
    RegisterPageComponent,
    HomePageAfterLoginComponent,
    ProductsAreaComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
