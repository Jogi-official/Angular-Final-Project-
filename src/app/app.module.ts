import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule } from '@angular/material/icon';


import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LogoutComponent } from './mainpage/logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainService } from './shared/MainService.service';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainpageComponent,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule
],
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule { }
