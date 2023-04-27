import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../shared/MainService.service';
import { APIService } from '../shared/api.service';
import { tap } from 'rxjs';
import { MainpageGaurd } from '../shared/gaurd.service';
import { UserData } from '../shared/interfaces.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  apiData: UserData;
  errorMessage: boolean = false;

  constructor(
    private router: Router,
    private mainService: MainService,
    private apiService: APIService,
    private gaurd: MainpageGaurd
  ) {}

  onSubmit(loginForm) {
    this.apiService
      .getloginToken('/auth/login', this.username, this.password, '')
      .pipe(
        tap(
          (response) => {
            this.apiData = response;
            this.mainService.setData(this.apiData);
            console.log(this.apiData);
            if (this.apiData) {
              this.errorMessage = false;
              this.gaurd.isAuthenticated = true;
              this.router.navigate(['mainpage']);
            }
          },
          (error) => {
            this.errorMessage = true;
            setTimeout(() => {
              this.errorMessage = false;
            }, 3000);
            loginForm.reset();
            this.password = '';
          }
        )
      )
      .subscribe();
  }
}
