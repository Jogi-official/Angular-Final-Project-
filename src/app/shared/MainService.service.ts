//Service used for sharing the user information from one component to another
import { EventEmitter } from '@angular/core';
import { UserData } from './interfaces.type';


export class MainService {
  dataChanged = new EventEmitter<object>();
  userData: UserData;

  setData(data : UserData) {
    this.userData = data;
    this.dataChanged.emit(this.userData);
  }

  getData() {
    return this.userData;
  }
}
