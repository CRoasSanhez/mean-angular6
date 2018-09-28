import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule } from "@angular/material";

  import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

  // Routes for the frontend actions
const appRoutes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    data: { title: 'Pages List' }
  },
  { path: '',
    redirectTo: '/pages',
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    //CountriesListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
