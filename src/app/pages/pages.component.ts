import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

import { DataSource } from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {

  pages: any;
  countries: any;
  country: 'mexico';
  displayedColumns = ['position', 'pageName', 'pageTotal'];
  dataSource = new PageDataSource(this.api);

  constructor(private api: ApiService) { }

  // Operations called on init page
  ngOnInit() {

    // Get pages for table
    this.api.getPages(this.country||'mexico')
      .subscribe(res => {
        console.log(res);
        this.pages = res;
      }, err => {
        console.log(err);
      });

    // Get countries for droplist
    this.api.getCountries()
    .subscribe(res=>{
      console.log(res);
      this.countries = res;
    },err=>{
      console.log(err);
    });
  }

  // Handle country select event "onChange"
  selectCountryHandler(event:any){
    this.country = event || 'united-states';
    this.api.getPages(this.country)
      .subscribe(res => {
        console.log(res);
        this.pages = res;
      }, err => {
        console.log(err);
      });
  }

}

export class PageDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getPages("mexico");
  }

  disconnect() {

  }
}