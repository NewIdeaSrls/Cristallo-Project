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

class NewInsurance {
  insuranceCode :string;
  insuranceDescription:string;
  insuranceTypeOpenAccident:string;
  insurancePhone:string;
  insuranceMail:string;
  insurancePec:string;
  insuranceMailComplaint:string;
  insuranceMailComplaintPec:string;
  insuranceFax:string;

  constructor() {
    // Initialize the properties with default values if needed
    this.insuranceCode = '';
    this.insuranceDescription = '';
    this.insuranceTypeOpenAccident = '';
    this.insurancePhone = '';
    this.insuranceMail = '';
    this.insurancePec = '';
    this.insuranceMailComplaint = '';
    this.insuranceMailComplaintPec = '';
    this.insuranceFax = '';
  }
}
@Component({
  selector: 'app-insurances',
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
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.scss',
})
export class InsurancesComponent implements OnInit {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  constructor(
    private router: Router,
    public globalService: GlobalService,
    private http: HttpClient
  ) {
    this.selectedObj = {};
  }

  datasource: any[] = [];
  data: any[] = [];

  //Configure Fields on mdtable

  datacolumns = [
    'insuranceCode',
    'insuranceDescription',
    'insuranceTypeOpenAccident',
    'insurancePhone',
    'insuranceMail',
    'insurancePec',
    'insuranceMailComplaint',
    'insuranceMailComplaintPec',
    'insuranceFax',
  ];

  dataconfig = ['add', 'search', 'columns', 'reload'];

  datashow = [
    'insuranceCode',
    'insuranceDescription',
    'insuranceTypeOpenAccident',
    'insurancePhone',
    'insuranceMail',
    'insurancePec',
    'insuranceMailComplaint',
    'insuranceMailComplaintPec',
    'insuranceFax',
  ];

  localStorageMDTable: string = 'insuranceTable';
  // Configure Fields on Action in accounting
  addfieldsconfig = [
    'insuranceCode',
    'insuranceDescription',
    'insuranceTypeOpenAccident',
    'insurancePhone',
    'insuranceMail',
    'insurancePec',
    'insuranceMailComplaint',
    'insuranceMailComplaintPec',
    'insuranceFax',
  ];
  editfieldsconfig = [
    'insuranceCode',
    'insuranceDescription',
    'insuranceTypeOpenAccident',
    'insurancePhone',
    'insuranceMail',
    'insurancePec',
    'insuranceMailComplaint',
    'insuranceMailComplaintPec',
    'insuranceFax',
  ];

  selectedObj: any;
  toaddObject: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};
  pending: boolean = false;

  expandedElement: any | null = null;

  ngOnInit(): void {
    this.pending = true;
    this.getFromRestapi(
      'assicurazioni',
      undefined, // id
      ['*.*'], // fields es. ["companyName"] or ["*.*"]
      undefined, // filter
      undefined, // order by field  - = inverse es. ["-companyName"]
      -1, // limit
      undefined, // page
      undefined, // offset
      undefined // search search in all fields and all records
    );
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
      this.formData = new NewInsurance();
      this.draweradd.toggle();
    }
    if (eventData.actionRequest == 'delete') {
      this.selectedObj = eventData.element;
      const idToDelete = this.selectedObj.id;
      this.data = this.data.filter(obj => obj.id !== idToDelete);
    }
    if (eventData.actionRequest == 'paginator') {
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
    this.pending = true;
    this.getFromRestapi(
      'assicurazioni',
      undefined, // id
      ['*.*'], // fields es. ["companyName"] or ["*.*"]
      undefined, // filter
      undefined, // order by field  - = inverse es. ["-companyName"]
      -1, // limit
      undefined, // page
      undefined, // offset
      undefined // search search in all fields and all records
    );
  }

  // Get From Veicoli
  getFromRestapi(
    collection: string,
    id?: number,
    fields?: string[],
    filter?: object,
    order?: string[],
    limit?: number,
    page?: number,
    offset?: number,
    search?: string
  ) {
    this.globalService
      .getRecord(
        collection, //collection
        id, // id
        fields, // fields es. ["companyName"] or ["*.*"]
        filter, //filter
        order, // order by field  - = inverse es. ["-companyName"]
        limit, // limit
        page, // page
        offset, // offset
        search // search search in all fields and all records
      )
      .subscribe((Insurances: any) => {
        console.log('insurance data: ', Insurances['data']);
        console.log('insurance length: ', Insurances['data'].length);
        this.data = Insurances['data'];
        this.addPropertyToDataOnInsert();
      });
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
