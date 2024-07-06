import { AppModule } from './../../app.module';
import { Element } from './../customers/element';
import { AutoResizeColumnsDirective } from './../../components/mdtable/auto-resize-columns.directive';
import { Component, OnInit, Input, ViewChild, NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyTailwindcssModule } from '@notiz/formly-tailwindcss';
import { of } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatFormFieldControl } from '@angular/material/form-field';

import { AutocompleteTypeModule } from '../../components/formly-autocomplete/autocomplete-type.component';
import { FileTypeModule } from '../../components/formly-fileType/file-type.component';

class NewFitter {
  status: string;
  companyId: number;
  companyName: string;
  fitterCode: string;
  fitterDescription: string;
  fitterAddress1: string;
  fitterCity: string;
  fitterCap: string;
  fitterProvince: string;
  fitterPhone: string;
  fitterEmail: string;
  fitterVehiclePlate: string;

  constructor() {
    // Initialize the properties with default values if needed
    this.status = 'published';
    this.companyId = 1;
    this.companyName = 'Cristallo Srls';
    this.fitterCode = '';
    this.fitterDescription = '';
    this.fitterAddress1 = '';
    this.fitterCity = '';
    this.fitterCap = '';
    this.fitterProvince = '';
    this.fitterPhone = '';
    this.fitterEmail = '';
    this.fitterVehiclePlate = '';
  }
}
@Component({
  selector: 'app-fitters',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormlyTailwindcssModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    FormlyMaterialModule,
    FormlyModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MDTableComponent,
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NgxTranslateModule,
    MatCheckboxModule,
    AutocompleteTypeModule,
    FileTypeModule
  ],
  templateUrl: './fitters.component.html',
  styleUrl: './fitters.component.scss',
})
export class FittersComponent implements OnInit {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  constructor(
    private router: Router,
    public globalService: GlobalService,
    private http: HttpClient,
    private translate: TranslateService
  ) {
    this.selectedObj = {};
  }

  datasource: any[] = [];
  data: any[] = [];
  dataFleet = new BehaviorSubject<any[]>([]);
  fullDataFleet: any[] = [];

  //Configure Fields on mdtable

  datacolumns = [
    'fitterCode',
    'fitterDescription',
    'fitterAddress1',
    'fitterCity',
    'fitterCap',
    'fitterProvince',
    'fitterPhone',
    'fitterEmail',
    'fitterVehiclePlate',
  ];

  dataconfig = ['add', 'search', 'columns', 'reload'];

  datashow = [
    'fitterCode',
    'fitterDescription',
    'fitterAddress1',
    'fitterCity',
    'fitterCap',
    'fitterProvince',
    'fitterPhone',
    'fitterEmail',
    'fitterVehiclePlate',
    'fitterAccidents',
    'fitterFinesSum',
    'fitterAmountFines',
    'fitterDrivingLicensePoints',
    'fitterIdentityDoc',
    'fitterStartEmployment',
  ];

  localStorageMDTable: string = 'fitterTable';

  // Configure Fields on Action in accounting
  addfieldsconfig = [
    'fitterCode',
    'fitterDescription',
    'fitterAddress1',
    'fitterCity',
    'fitterCap',
    'fitterProvince',
    'fitterPhone',
    'fitterEmail',
    'fitterVehiclePlate',
    'fitterAccidents',
    'fitterFinesSum',
    'fitterAmountFines',
    'fitterDrivingLicensePoints',
    'fitterIdentityDoc',
    'fitterStartEmployment',
  ];
  editfieldsconfig = [
    'fitterCode',
    'fitterDescription',
    'fitterAddress1',
    'fitterCity',
    'fitterCap',
    'fitterProvince',
    'fitterPhone',
    'fitterEmail',
    'fitterVehiclePlate',
    'fitterAccidents',
    'fitterFinesSum',
    'fitterAmountFines',
    'fitterDrivingLicensePoints',
    'fitterIdentityDoc',
    'fitterStartEmployment',
  ];

  selectedObj: any;
  toaddObject: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};
  pending: boolean = false;

  expandedElement: any | null = null;

  ////////////////////////////////////////////

  ////////////////////// formly definition //////////////////////////
  states: any = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District Of Columbia',
    'Federated States Of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Islands',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  //define the functions using flat arrow, so you evit the "ugly" bind(this)
  filterStates = (name: string) => {
    if (!name) return this.states;
    return this.states.filter((state: any) => state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  };
  add = (value: string) => {
    this.states.push(value);
  };

  public form = new FormGroup({});
  public options: FormlyFormOptions = {};

  public model: any = {
    fitterCode: '',
    fitterDescription: '',
    fitterAddress1: '',
    fitterCap: '',
    fitterCity: '',
    fitterProvince: '',
    fitterPhone: '',
    fitterEmail: '',
    fitterDrivingLicensePoints: '',
    fitterAmountFines: '',
    fitterFinesSum: '',
    fitterAccidents: '',
    fitterIdentityDoc: '',
    fitterStartEmployment: '',
    fitterVehiclePlate: '',
  };

  // w-1/2 w-1/3 w-1/4 w-1/5 w-1/6 w-1/12 Columns
  public fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-wrap p2',
      fieldGroup: [
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterCode',
          type: 'input',
          templateOptions: {
            translate: true,
            label: 'Fitter Code',
            placeholder: 'Fitter description',
            required: true,
            description: 'Fitter Code',
            //minLength: 3,
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //pattern: /regex/
          },
          /*
          validation: {
            messages: {
              pattern: "Ip address format invalid (xxx.xxx.xxx.xxx)"
            }
          },*/
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCode_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCode_description'),
            'templateOptions.label': () => this.translate.instant('fitterCode_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterDescription',
          type: 'input',
          templateOptions: {
            translate: true,
            label: 'Fitter Description',
            placeholder: 'Fitter name and surname',
            required: true,
            description: 'Fitter Description',
            //minLength: 3,
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //pattern: /regex/
          },
          /*
          validation: {
            messages: {
              pattern: "Ip address format invalid (xxx.xxx.xxx.xxx)"
            }
          },*/
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterDescription_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterDescription_description'),
            'templateOptions.label': () => this.translate.instant('fitterDescription_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterAddress1',
          type: 'input',
          templateOptions: {
            label: 'Fitter Address',
            placeholder: 'Fitter address',
            required: true,
            type: 'text',
            description: 'Fitter Address',
            //minLength: 3,
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //pattern: /regex/
          },
          /*
          validation: {
            messages: {
              pattern: "Ip address format invalid (xxx.xxx.xxx.xxx)"
            }
          },*/
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterAddress1_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterAddress1_description'),
            'templateOptions.label': () => this.translate.instant('fitterAddress1_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterCity',
          type: 'input',
          templateOptions: {
            label: 'Fitter City',
            placeholder: 'Fitter City',
            required: true,
            type: 'text',
            minLength: 4,
            description: 'Fitter City',
            //minLength: 3,
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //pattern: /regex/
          },
          /*
          validation: {
            messages: {
              pattern: "Ip address format invalid (xxx.xxx.xxx.xxx)"
            }
          },*/
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCity_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCity_description'),
            'templateOptions.label': () => this.translate.instant('fitterCity_insert_label'),
          },
        },
        {
          className: '2xl:w-1/4 px-2 sm:w-full',
          key: 'fitterCap',
          type: 'input',
          templateOptions: {
            label: 'Fitter Cap',
            placeholder: 'Fitter cap',
            required: true,
            type: 'text',
            minLength: 5,
            description: 'Fitter Cap',
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            pattern: /^(?:\d{5})?$/,
          },
          validation: {
            messages: {
              pattern: 'Zip must be almost 5 digit',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCap_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCap_description'),
            'templateOptions.label': () => this.translate.instant('fitterCap_insert_label'),
          },
        },
        {
          className: '2xl:w-1/4 px-2 sm:w-full',
          key: 'fitterProvince',
          type: 'input',
          templateOptions: {
            label: 'Fitter Province',
            placeholder: 'Fitter Province',
            required: true,
            type: 'text',
            minLength: 2,
            maxLength: 4,
            description: 'Fitter Province',
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //pattern: /^(?:\d{5})?$/
          },
          /*
          validation: {
            messages: {
              pattern: "Zip must be 5 digit"
            }
          },*/
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterProvince_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterProvince_description'),
            'templateOptions.label': () => this.translate.instant('fitterProvince_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterPhone',
          type: 'input',
          templateOptions: {
            label: 'Fitter Phone',
            placeholder: 'Fitter Phone',
            required: true,
            type: 'text',
            minLength: 10,
            description: 'Fitter Phone',
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //pattern: /^(?:\d{5})?$/
          },
          /*
          validation: {
            messages: {
              pattern: "Zip must be 5 digit"
            }
          },*/
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterPhone_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterPhone_description'),
            'templateOptions.label': () => this.translate.instant('fitterPhone_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterEmail',
          type: 'input',
          templateOptions: {
            label: 'Fitter Email',
            placeholder: 'Fitter Email',
            required: true,
            type: 'text',
            minLength: 10,
            description: 'Fitter Email',
            //maxLength: 20,
            //autosize: true
            //type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          },
          validation: {
            messages: {
              pattern: 'Invalid email address format',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterEmail_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterEmail_description'),
            'templateOptions.label': () => this.translate.instant('fitterEmail_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterVehiclePlate',
          type: 'select',
          templateOptions: {
            translate: true,
            label: 'Fitter Vehicle Plate',
            placeholder: 'Fitter Vehicle Plate',
            description: 'Fitter Vehicle Plate',
            //required: true,
            options: this.dataFleet,
            /*options: [
              { value: 1, label: 'Option 1' },
              { value: 2, label: 'Option 2' },
              { value: 3, label: 'Option 3' },
              { value: 4, label: 'Option 4', disabled: true },
            ],*/
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterVPlate_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterVPlate_description'),
            'templateOptions.label': () => this.translate.instant('fitterVPlate_insert_label'),
          },
        },
        {
          className: '2xl:w-1/4 px-2 sm:w-1/2',
          key: 'fitterAccidents',
          type: 'input',
          templateOptions: {
            translate: true,
            description: 'Fitter Accidents',
            placeholder: 'Fitter Accidents',
            label: 'Fitter Accidents',
            required: false,
            type: 'number',
            //defaultValue: '',
            //hideExpression: '',
            //minLength: 3,
            maxLength: 2,
            //pattern: /^(?:\d{2})?$/,
          },
          validation: {
            messages: {
              pattern: 'Number of Accidents must be numeric',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterAccidents_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterAccidents_description'),
            'templateOptions.label': () => this.translate.instant('fitterAccidents_insert_label'),
          },
        },
        {
          className: '2xl:w-1/4 px-2 sm:w-1/2',
          key: 'fitterFinesSum',
          type: 'input',
          templateOptions: {
            translate: true,
            description: 'Fitter Fines Sum',
            placeholder: 'Fitter Fines Sum',
            label: 'Fitter Fines Sum',
            required: false,
            type: 'number',
            //defaultValue: '',
            //hideExpression: '',
            //minLength: 3,
            //maxLength: 2,
            //pattern: /^(?:\d{2})?$/,
          },
          validation: {
            messages: {
              pattern: 'Number of Total Fines',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterTotalFines_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterTotalFines_description'),
            'templateOptions.label': () => this.translate.instant('fitterTotalFines_insert_label'),
          },
        },
        {
          className: '2xl:w-1/4 px-2 sm:w-1/2',
          key: 'fitterAmountFines',
          type: 'input',
          templateOptions: {
            translate: true,
            description: 'Fitter Amount Fines',
            placeholder: 'Fitter Amount Fines',
            label: 'Fitter Amount Fines',
            required: false,
            type: 'number',
            //defaultValue: '',
            //hideExpression: '',
            //minLength: 3,
            //maxLength: 5,
            //pattern: /^(?:\d{5})?$/,
          },
          validation: {
            messages: {
              pattern: 'Amount of Fines in euro',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterAmountFines_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterAmountFines_description'),
            'templateOptions.label': () => this.translate.instant('fitterAmountFines_insert_label'),
          },
        },
        {
          className: '2xl:w-1/4 px-2 sm:w-1/2',
          key: 'fitterDrivingLicensePoints',
          type: 'input',
          templateOptions: {
            translate: true,
            description: 'Fitter Driving licence points',
            placeholder: 'Fitter Driving licence points',
            label: 'Fitter Driving licence points',
            required: false,
            type: 'number',
            //defaultValue: '',
            //hideExpression: '',
            //minLength: 3,
            maxLength: 2,
            pattern: /^[1-9]|0[1-9]|1[0-9]|2[0]$/,
          },
          validation: {
            messages: {
              pattern: 'Number points on Driving Licence (1-20)',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterTotalPoints_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterTotalPoints_description'),
            'templateOptions.label': () => this.translate.instant('fitterTotalPoints_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2  sm:w-1/2',
          key: 'fitterIdentityDoc',
          type: 'input',
          templateOptions: {
            translate: true,
            description: 'Fitter Identity Doc',
            placeholder: 'Fitter Identity Doc',
            label: 'Fitter Identity Doc',
            required: false,
            type: 'text',
            //defaultValue: '',
            //hideExpression: '',
            //minLength: 3,
            //maxLength: 2,
            //pattern: /^[1-9]|0[1-9]|1[0-9]|2[0]$/,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterIdentityDoc_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterIdentityDoc_description'),
            'templateOptions.label': () => this.translate.instant('fitterIdentityDoc_insert_label'),
          },
        },
        {
          className: '2xl:w-1/2 px-2  sm:w-1/2',
          key: 'fitterStartEmployment',
          type: 'datepicker',
          templateOptions: {
            required: false,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterStartEmployment_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterStartEmployment_description'),
            'templateOptions.label': () => this.translate.instant('fitterStartEmployment_insert_label'),
          },
        },
        {
          template: '<br><br><div class="mx-3"><strong>Esempio : tipologie altri campi possibili:</strong></div>',
        },
        {
          className: '2xl:w-full px-2 sm:w-full',
          key: 'motivation',
          type: 'textarea',
          defaultValue: 'Share experience',
          //hideExpression: '!model.name',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
            label: 'What is your motivation for writing?',
            placeholder: 'Type your answer',
            description: 'Description',
            autosize: true,
          },
        },
        {
          className: '2xl:w-full px-2 sm:w-full',
          key: 'state',
          type: 'autocomplete',
          wrappers: [],
          props: {
            required: true,
            label: 'Autocomplete test',
            placeholder: 'Placeholder',
            description: 'Description',
            add: this.add,
            filterStates: this.filterStates,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('states_placeholder'),
            'templateOptions.description': () => this.translate.instant('states_description'),
            'templateOptions.label': () => this.translate.instant('states_insert_label'),
          },
        },
        {
          className: '2xl:w-full px-2 sm:w-full',
          key: 'images',
          type: 'input',
          props: {
            translate: true,
            label: 'zz',
            placeholder: 'zz',
            required: true,
            description: 'zz',
          },
          /*expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('states_placeholder'),
            'templateOptions.description': () => this.translate.instant('states_description'),
            'templateOptions.label': () => this.translate.instant('states_insert_label'),
          },*/
        },
        {
          className: '2xl:w-full px-2 sm:w-full',
          key: 'content',
          type: 'radio',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
            label: 'What type of articles would you prefer to write?',
            placeholder: 'Fill the type of content',
            required: true,
            description: 'Description',
            options: [
              { value: 1, label: 'Tutorial' },
              { value: 2, label: 'Deep-dive' },
              { value: 3, label: 'News' },
              { value: 4, label: 'Reference' },
            ],
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'select_multi',
          type: 'select',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
            label: 'Select Multiple',
            placeholder: 'Placeholder',
            description: 'Description',
            required: true,
            multiple: true,
            //source: this.chipsCollection(),
            selectAllOption: 'Select All',
            options: [
              { value: 1, label: 'Option 1' },
              { value: 2, label: 'Option 2' },
              { value: 3, label: 'Option 3' },
              { value: 4, label: 'Option 4', disabled: true },
            ],
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'technology',
          type: 'select',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
            label: 'Select your main technology',
            description: 'Description',
            options: [
              { label: 'Javascript', value: '1' },
              { label: 'Angular', value: '2' },
              { label: 'React', value: '3' },
              { label: 'Vue', value: '4' },
              { label: 'Other', value: '5' },
            ],
          },
        },
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'policy',
          type: 'checkbox',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
            description: 'Description',
            label: "I don't mind receiving The Deep Dive newsletter",
          },
        },
        {
          className: '2xl:w-full px-2 sm:w-full',
          key: 'Textarea',
          type: 'textarea',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
            label: 'Textarea',
            placeholder: 'Placeholder',
            description: 'Description',
            autosize: true,
            required: true,
          },
        },
      ],
    },
  ];

  ////////////states=states////////// end formly definition //////////////////////////

  ngOnInit(): void {
    this.pending = true;
    this.getFromRestapi(
      'fitters',
      undefined, // id
      ['*.*'], // fields es. ["companyName"] or ["*.*"]
      undefined, // filter
      undefined, // order by field  - = inverse es. ["-companyName"]
      -1, // limit
      undefined, // page
      undefined, // offset
      undefined // search search in all fields and all records
    );
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang('it');
  }

  public onSubmitEdit() {
    if (this.form.valid) {
      // List the properties that you want to include in the submitted data
      const keysToInclude = [
        'id',
        'fitterCode',
        'fitterDescription',
        'fitterAddress1',
        'fitterCity',
        'fitterCap',
        'fitterProvince',
        'fitterPhone',
        'fitterEmail',
        'fitterVehiclePlate',
        'fitterAccidents',
        'fitterAmountFines',
        'fitterFinesSum',
        'fitterDrivingLicensePoints',
        'fitterIdentityDoc',
        'fitterStartEmployment',
      ];
      console.log(this.form);
      // Build an object with only the selected keys
      let submittedData: any = {};
      keysToInclude.forEach(key => {
        if (this.formData.hasOwnProperty(key)) {
          submittedData[key] = this.formData[key];
        }
      });
      console.log(JSON.stringify(submittedData)); // model data to update
      this.updateRestapi('fitters', submittedData.id, submittedData);
      this.draweredit.toggle();
    }
  }

  onSubmitAdd() {
    console.log('====== Inserisco ======');
    this.data.push(this.formData);
    this.addPropertyToDataOnInsert();
    console.log(this.data);
    this.addRestapi('fitters', this.formData);
    this.draweradd.toggle();
  }

  getOptions(): Observable<any[]> {
    return this.dataFleet.asObservable();
  }

  // Actions returned from MdTable
  fromMdtableChild(eventData: any) {
    console.log('Received from Mdtable:', eventData);
    if (eventData.actionRequest == 'open') {
      this.selectedObj = eventData.element;
      this.formData = eventData.element;
      //this.model = eventData.element;
      this.getFromRestapiFleet(
        'flotta',
        undefined, // id
        ['*.*'], // fields es. ["companyName"] or ["*.*"]
        undefined, // filter
        undefined, // order by field  - = inverse es. ["-companyName"]
        -1, // limit
        undefined, // page
        undefined, // offset
        undefined // search search in all fields and all records
      );
      this.draweredit.toggle();
    }
    if (eventData.actionRequest == 'add') {
      this.formData = new NewFitter();
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

  // Reload Table from RestAPI
  refreshMdTable() {
    this.pending = true;
    this.datasource = [];
    this.data = [];
    this.getFromRestapi(
      'fitters',
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

  // Update Fitter
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

  // Add Fitter
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
      .subscribe((Fitters: any) => {
        console.log('fitter data: ', Fitters['data']);
        console.log('fitter length: ', Fitters['data'].length);
        this.data = Fitters['data'];
        this.addPropertyToDataOnInsert();
      });
  }

  getFromRestapiFleet(
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
      .subscribe((Fleets: any) => {
        console.log('fleet data: ', Fleets['data']);
        console.log('fleet length: ', Fleets['data'].length);
        this.fullDataFleet = Fleets['data'];
        let options = Fleets['data'].map((item: { id: any; carFleetCarPlate: any; carFleetDescription: any }) => ({
          value: item.carFleetCarPlate,
          label: item.carFleetCarPlate + ' | ' + item.carFleetDescription,
        }));
        console.log(this.fullDataFleet);
        console.log(this.dataFleet);
        this.dataFleet.next(options);
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
