import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/globals.service';
import { MdchipComponent } from "../../components/mdchip/mdchip.component";
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MdchipComponent],
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
