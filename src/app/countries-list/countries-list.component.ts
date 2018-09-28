import { Component, OnInit } from '@angular/core';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})

export class CountriesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class SelectCountries {

  ngOnInit(){
    
  }

  // Allowed countries México, España, Estados Unidos
  countries: Country[] = [
    {value: 'mexico', viewValue: 'Mexico'},
    {value: 'spain', viewValue: 'Spain'},
    {value: 'united-states', viewValue: 'United States'}
  ];

  getCountries(){
    return this.countries;
  }
}
