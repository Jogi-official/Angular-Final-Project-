import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/MainService.service';
import { Router } from '@angular/router';
import { APIService } from '../shared/api.service';
import { tap } from 'rxjs';
import { Location } from '@angular/common';
import { UserData } from '../shared/interfaces.type';
import { Product } from '../shared/interfaces.type';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  currPage: number = 1;
  descriptionLimit: number = 40;
  showMore: boolean[] = [];
  userData: UserData;
  dialogBox: boolean = false;
  queryData: string = '';
  productsInfo: Product[];
  noData: boolean = false;
  isLoggedIn: boolean = true;
  showLogin: boolean = false;
  showLoader: boolean = true;
  isLoading: boolean = true;

  constructor(
    private mainService: MainService,
    private router: Router,
    private apiService: APIService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //Replace the current state in the browser history
    this.location.replaceState('mainpage');

    // Get the User Data
    try {
      this.mainService.dataChanged.subscribe((data : UserData) => {
        this.userData = data;
      });

      this.userData = this.mainService.getData();

      //Get ALL Products
      if (this.userData.id) {
        this.showLoader = true;
        this.apiService
          .getProducts('/products')
          .pipe(
            tap((response) => {
              this.productsInfo = response.products;
            })
          )
          .subscribe();

        setTimeout(() => {
          this.showLoader = false;
        }, 2000);
      }

      if (!this.isLoggedIn) {
        console.warn('Please Log In Again !');
      }
    } catch (error) {
      this.isLoggedIn = true;
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  //for opening and closing the dialog box with user information
  openDialog() {
    this.dialogBox = !this.dialogBox;
  }

  logout() {
    this.router.navigate(['mainpage/logout']);
  }

  onSubmit(queryForm) {
    this.noData = false;
    this.apiService
      .getProductByParams('/products/search?q=', this.queryData)
      .pipe(
        tap((response) => {
          this.productsInfo = response.products;
          if (!this.productsInfo[0]) {
            this.noData = true;
          }
        })
      )
      .subscribe();
    console.log(this.queryData);
    queryForm.reset();
  }

  getAllProducts() {
    this.noData = false;
    this.apiService
      .getProducts('/products')
      .pipe(
        tap((response) => {
          this.productsInfo = response.products;
          console.log(typeof this.productsInfo);
        })
      )
      .subscribe();
  }

  //Getting products using buttons available on the nav bar
  getProductButton(product: string) {
    this.noData = false;
    this.apiService
      .getProductCategory('/products/category/', product)
      .pipe(
        tap((response) => {
          this.productsInfo = response.products;
        })
      )
      .subscribe();
  }

  toggleDescription(event: MouseEvent, productId: number) {
    event.preventDefault();
    this.showMore[productId] = !this.showMore[productId];
  }

  onImageLoad() {
    this.isLoading = false;
  }
}
