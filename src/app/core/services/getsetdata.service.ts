import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class GetSetDataService {
  data: any = {};

  // Common option accross the globe
  viewContactsString: string = 'viewContactsString';
  userDataString: string = 'userDataString';
  emailAvailableDataString: string = 'emailAvailableDataString';
  taskPaginatorDataString: string = 'taskPaginatorDataString';
  adminTemplatePaginatorDataString: string = 'adminTemplatePaginatorDataString';

  constructor() {}

  setOption(option: string, value: any): void {
    this.data[option] = value;
  }

  getOption(option: string): any {
    return this.data[option];
  }

  removeOption(option: string): any {
    delete this.data[option];
  }

  removeAllOption(): any {
    this.data = {};
  }
}
