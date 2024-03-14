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

class NewObject {
  title: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  stock: number;

  constructor() {
    // Initialize the properties with default values if needed
    this.title = '';
    this.description = '';
    this.brand = '';
    this.category = '';
    this.price = 0;
    this.rating = 0;
    this.stock = 0;
  }
}

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [
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
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.scss',
})
export class AccountingComponent implements OnInit {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  constructor(
    private router: Router,
    public globalService: GlobalService,
    private http: HttpClient
  ) {
    this.selectedObj = {};
  }

  datasource :any [] = []
  data: any[] = [];
  
  //Configure Fields on mdtable
  datacolumns = ['title', 'description', 'brand', 'category', 'price', 'rating', 'stock','thumbnail'];
  dataconfig = ['add', 'search', 'columns', 'reload'];
  datashow = ['title', 'description', 'brand', 'category', 'price', 'rating', 'stock'];
  localStorageMDTable: string = 'accountingTable';
  // Configure Fields on Action in accounting
  addfieldsconfig = ['title', 'description', 'brand', 'category', 'price', 'rating', 'stock'];
  editfieldsconfig = ['title', 'description', 'brand', 'category', 'price'];

  selectedObj: any;
  toaddObject: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};

  expandedElement: any | null = null;

  ngOnInit(): void {
    this.getRestItems();
  }

  // Actions returned from MdTable
  fromMdtableChild(eventData: any) {
    console.log('Received from Mdtable:', eventData);
    if (eventData.actionRequest == 'open') {
      this.selectedObj = eventData.element;
      this.formData = eventData.element;
      this.draweredit.toggle();
    }
    if (eventData.actionRequest == 'add') {
      this.formData = new NewObject();
      this.draweradd.toggle();
    }
    if (eventData.actionRequest == 'delete') {
      this.selectedObj = eventData.element;
      const idToDelete = this.selectedObj.id;
      this.data = this.data.filter(obj => obj.id !== idToDelete);
    }
    if (eventData.actionRequest == 'reload') {
      this.refreshMdTable();
    }
  }

  // Add property 'Action' to array
  addProperty() {
    this.data = this.datasource.map(object => {
      return { ...object, Action: 'delete,menu' };
    });
  }

   // Add property 'Action' to array on Insert
  addPropertyToDataOnInsert() {
    this.data = this.data.map(object => {
      return { ...object, Action: 'delete,menu' };
    });
  }

  getValueFromSelected(variable: string) {
    let propertyName = variable;
    if (propertyName in this.selectedObj) {
      let propertyValue = this.selectedObj[propertyName];
      return propertyValue;
    }
  }

  updateOnConfirm() {
    console.log('Aggiorno');
    console.log(this.selectedObj);
    this.draweredit.toggle();
  }

  addOnConfirm() {
    console.log('Inserisco');
    console.log(this.formData);
    this.data.push(this.formData);
    this.addPropertyToDataOnInsert();
    console.log(this.data);
    this.draweradd.toggle();
  }

  // Reload Table from RestAPI
  refreshMdTable() {
    this.getRestItems();
  }

  // Load from RestAPI
  async getRestItems(): Promise<void> {
    try {
      const restItems: any = await this.restItemsService().toPromise();
      this.data = restItems.products;
    } catch (error) {
      // Handle error here
      console.error('An error occurred:', error);
    };
  }

  // Rest Items Service: Read all REST Items  https://dummyjson.com/products
  restItemsService() {
    let color = 'white';
    let url = 'https://dummyjson.com/products?limit=100';
    return this.http.get<any[]>(url).pipe(
      map((data: any) => ({
        ...data,
        products: data.products.map((product: any) => ({
          ...product,
          Action: 'menu,delete', // Set the Action property here
          //Action: 'menu,delete',BGColor: this.getRandomBackgrounfColor(),FGColor: this.foregroundColor
        })),
      }))
    );
  }

  // UI Changes on Fly
  // Generate Background Color e Set Foreground Color variable compatibly with Background Color
  // Only for Fun

  getRandomBackgrounfColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.brightness = this.getBrightness(color);
    this.foregroundColor = this.brightness < 128 ? '#FFFFFF' : '#000000';
    return color;
  }

  // Calculate the perceived brightness of the background color using the formula:
  // Brightness = sqrt(0.299*R^2 + 0.587*G^2 + 0.114*B^2)
  getBrightness(bgcolor: string): number {
    const r = parseInt(bgcolor.substr(1, 2), 16);
    const g = parseInt(bgcolor.substr(3, 2), 16);
    const b = parseInt(bgcolor.substr(5, 2), 16);
    return Math.sqrt(0.299 * Math.pow(r, 2) + 0.587 * Math.pow(g, 2) + 0.114 * Math.pow(b, 2));
  }
}
