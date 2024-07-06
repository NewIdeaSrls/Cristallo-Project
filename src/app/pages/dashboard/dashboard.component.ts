
import { Element } from './../customers/element';
import { AutoResizeColumnsDirective } from './../../components/mdtable/auto-resize-columns.directive';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';
import { MDTableComponent } from '../../components/mdtable/mdtable.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../translation.module';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { MatSidenavModule, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MDTableComponent,
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    NgxTranslateModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements OnInit{

  chipElenco  : string[] = [];
  widhtlist = "50%"
  
  constructor( 
    private router: Router,
    public globalService: GlobalService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.getRestCategories()
  }

  chipResultHandler($event:any) {
    console.log($event)
  }

  // Load from RestAPI
  async getRestCategories(): Promise<void> {
    try {
      const restCats: any = await this.restCategoriesService().toPromise();
      this.chipElenco = restCats;
    } catch (error) {
      // Handle error here
      console.error('An error occurred:', error);
    };
  }

  // Rest Items Service: Read all REST Items  https://dummyjson.com/products/categories
  restCategoriesService() {
    let url = ' https://dummyjson.com/products/categories';
    return this.http.get<any[]>(url)
  }
}
