import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainpageGaurd } from 'src/app/shared/gaurd.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private router: Router, private gaurd: MainpageGaurd) {}

  signIn() {
    this.gaurd.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
