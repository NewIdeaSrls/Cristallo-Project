import { OnInit, VERSION, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDTableComponent } from '../../components/mdtable/mdtable.component';
import { of } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { AppModule } from '../../app.module';
import { GlobalService } from './../../services/globals.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../translation.module';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-practices',
  standalone: true,
  imports: [CommonModule, AppModule, NgxTranslateModule, MDTableComponent],
  templateUrl: './practices.component.html',
  styleUrl: './practices.component.scss',
})
export class PracticesComponent implements OnInit {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  datasource: any[] = [];
  dataPractice = new BehaviorSubject<any[]>([]);
  data: any[] = [];
  fullDataFleet: any[] = [];
  selectedObj: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};
  pending: boolean = false;
  expandedElement: any | null = null;
  elementToDelete: any;


  dataconfig = ['add', 'search', 'columns', 'reload'];

  datacolumns = [
    "practiceCode",
    "practiceType",
    "practiceStatus",
    "practiceDate",
    "practiceType",
    "practiceOrigin",
    "practiceNote",
  ];
  
  datashow = [
    "practiceCode",
    "practiceType",
    "practiceStatus",
    "practiceDate",
    "practiceType",
    "practiceOrigin",
    "practiceNote",
  ];

  localStorageMDTable: string = 'practiceTable';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    public globalService: GlobalService,
    private translate: TranslateService
  ) {
    this.selectedObj = {};
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang('it');
  }

  ngOnInit(): void {
    this.pending = true;
    this.getPractices();
    this.addPropertyToData();
  }

   // Add property 'Action' to array on Insert
   addPropertyToData() {
    this.data = this.data.map(object => {
      return { ...object, Action: 'delete,menu' };
    });
  }

/*****************************************************************************/
  getPractices() {
    this.getFromRestapi(
      'practices',
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

  /********************** From MdTable Custom Component **********************/
  fromMdtableChild(eventData: any) {
    console.log('Received from Mdtable:', eventData);
    if (eventData.actionRequest == 'open') {
      this.selectedObj = eventData.element;
      this.formData = eventData.element;
      this.router.navigate(['home/practice-detail'], { queryParams: { practice : this.selectedObj.id } });
      //this.draweredit.toggle();
    }
    if (eventData.actionRequest == 'add') {
      //this.formData = new NewCustomer();
      //this.draweradd.toggle();
    }
    if (eventData.actionRequest == 'delete') {
      this.selectedObj = eventData.element;
      const idToDelete = this.selectedObj.id;
      this.data = this.data.filter(obj => obj.id !== idToDelete);
    }
    if (eventData.actionRequest == 'paginator') {
    }
    if (eventData.actionRequest == 'reload') {
      this.getPractices() 
    }
  }
  /*************************  Functions <--> Backend **************************/
  // GET Data
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
      .subscribe((Practices: any) => {
        console.log('Practices data: ', Practices['data']);
        console.log('Practices length: ', Practices['data'].length);
        this.data = Practices['data'];
        this.datasource = Practices['data'];
        this.addPropertyToData()
      });
  }

  // UPDATE Data
  updateRestapi(collection: string, id: number, data: any) {
    this.globalService
      .updateRecord(
        collection, //collection
        id, // id
        data // data
      )
      .subscribe((FittersUpdate: any) => {
        console.log(FittersUpdate);
      });
  }

  // DELETE data
  deleteRestapi(collection: string, id: number) {
    this.globalService
      .deleteRecord(
        collection, //collection
        id // id
      )
      .subscribe((FittersDelete: any) => {
        console.log(FittersDelete);
      });
  }

  // POST data
  addRestapi(collection: string, data: any) {
    this.globalService
      .addRecord(
        collection, //collection
        data // data
      )
      .subscribe((FittersAdd: any) => {
        console.log(FittersAdd);
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
