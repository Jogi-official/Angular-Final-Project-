import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MainpageComponent } from '../mainpage/mainpage.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LogoutComponent } from '../mainpage/logout/logout.component';
import { MainpageGaurd } from './gaurd.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'mainpage',
    component: MainpageComponent,
    canDeactivate: [MainpageGaurd],
    canActivate: [MainpageGaurd],
  },
  {
    path: 'mainpage/logout',
    component: LogoutComponent,
    canActivate: [MainpageGaurd],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
