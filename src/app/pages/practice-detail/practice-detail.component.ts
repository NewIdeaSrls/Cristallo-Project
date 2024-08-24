import { Observable } from 'rxjs';
import { AccordionTypeComponent } from './../../accordions.type';
import { state, transition } from '@angular/animations';
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
import { FormlyFormOptions, FormlyFieldConfig, FormlyExtension } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-practice-detail',
  standalone: true,
  imports: [CommonModule, AppModule, NgxTranslateModule],
  templateUrl: './practice-detail.component.html',
  styleUrl: './practice-detail.component.scss',
})
export class PracticeDetailComponent {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  form = new FormGroup({});
  model: any;
  oprions: any;

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
  practiceNumber: any;

  allCustomers: string[] = [];
  tempResult: any[] = [];

  fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',

      fieldGroup: [
        {
          props: {
            translate: true,
            label: 't_practice',
          },
          fieldGroupClassName: 'flex flex-wrap p2',
          fieldGroup: [
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'practiceStatus',
              type: 'select',
              props: {
                translate: true,
                label: 'p_practiceStatus',
                description: 'p_practiceStatus_Description',
                required: false,
                disabled: false,
                options: [
                  {
                    label: 'Chiamare Agenzia',
                    value: 'CA',
                  },
                  {
                    label: 'Attesa Point',
                    value: 'AP',
                  },
                  {
                    label: 'Attesa',
                    value: 'AT',
                  },
                  {
                    label: 'Da Ordinare',
                    value: 'DO',
                  },
                  {
                    label: 'Ordinato',
                    value: 'OR',
                  },
                  {
                    label: 'Manca Documento',
                    value: 'MD',
                  },
                  {
                    label: 'Manodopera',
                    value: 'MA',
                  },
                  {
                    label: 'Preventivo da Inviare',
                    value: 'PD',
                  },
                  {
                    label: 'Non Prosegue ',
                    value: 'NP',
                  },
                ],
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'praticeCode',
              type: 'input',
              props: {
                translate: true,
                label: 'p_praticeCode',
                required: false,
                disabled: false,
                description: 'p_praticeCode_Description',
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'practiceDate',
              type: 'datepicker',
              props: {
                label: 'p_practiceDate',
                description: 'p_practiceDate_Description',
                dateFormat: 'yy/mm/dd',
                hourFormat: '24',
                numberOfMonths: 2,
                selectionMode: 'single',
                required: false,
                readonlyInput: false,
                showTime: true,
                showButtonBar: true,
                showIcon: false,
                showOtherMonths: true,
                selectOtherMonths: true,
                monthNavigator: true,
                yearNavigator: true,
                yearRange: '2020:2030',
                inline: false,
              },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'practiceType',
              type: 'radio',
              props: {
                translate: true,
                label: 'p_practiceType',
                description: 'p_practiceType_Description',
                required: false,
                disabled: false,
                options: [
                  { value: 'insurance', label: 'p_practiceType_Insurance' },
                  { value: 'point', label: 'p_practiceType_Point' },
                  { value: 'laboronly', label: 'p_practiceType_Laboronly' },
                  { value: 'preventive', label: 'p_practiceType_preventive' },
                  { value: 'sale', label: 'p_practiceType_Sale' },
                  { value: 'darkening', label: 'p_practiceType_Darkening' },
                ].map(option => ({ ...option, label: this.translate.instant(option.label) })),
              },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'practiceOrigin',
              type: 'radio',
              props: {
                translate: true,
                label: 'p_practiceOrigin',
                description: 'p_practiceOrigin_Description',
                required: false,
                disabled: false,
                options: [
                  { value: 'email', label: 'p_practiceOrigin_Email' },
                  { value: 'whatsapp', label: 'p_practiceOrigin_Whatsapp' },
                  { value: 'other', label: 'p_practiceOrigin_Other' },
                ].map(option => ({ ...option, label: this.translate.instant(option.label) })),
              },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'praticeDescription',
              type: 'input',
              props: {
                translate: true,
                label: 'p_praticeDescription',
                required: false,
                disabled: false,
                description: 'p_praticeDescription_Description',
              },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'praticeNote',
              type: 'textarea',
              props: {
                label: 'p_practiceNote',
                description: 'p_practiceNote_Description',
                required: false,
                rows: 3,
              },
            },
          ],
        },
        {
          props: {
            translate: true,
            label: 't_vehicle',
          },
          fieldGroupClassName: 'flex flex-wrap p2',
          fieldGroup: [
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'vehicleType',
              type: 'radio',
              props: {
                translate: true,
                label: 'p_vehicleType',
                description: 'p_vehicleType_Description',
                required: false,
                disabled: false,
                options: [
                  { value: 'car', label: 'p_vehicleType_Car' },
                  { value: 'truck', label: 'p_vehicleType_Truck' },
                  { value: 'van', label: 'p_vehicleType_Van' },
                  { value: 'motorhomes', label: 'p_vehicleType_Motorhomes' },
                  { value: 'microcar', label: 'p_vehicleType_Microcar' },
                ].map(option => ({ ...option, label: this.translate.instant(option.label) })),
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-1/3 sm:w-full  px-2 ',
              key: 'vehicleCarPlate',
              type: 'input',
              props: {
                translate: true,
                label: 'p_vehicleCarPlate',
                required: false,
                disabled: false,
                description: 'p_vehicleCarPlate_Description',
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'vehicleCarBrand',
              type: 'select',
              props: {
                translate: true,
                label: 'p_vehicleCarBrand',
                description: 'p_vehicleCarBrand_Description',
                required: false,
                disabled: false,
                options: this.http.get<{ title: string; id: string }[]>('https://jsonplaceholder.typicode.com/todos'),
                valueProp: 'id',
                labelProp: 'title',
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'vehicleModel',
              type: 'select',
              props: {
                translate: true,
                label: 'p_vehicleModel',
                description: 'p_vehicleModel_Description',
                required: false,
                disabled: false,
                options: this.http.get<{ title: string; id: string }[]>('https://jsonplaceholder.typicode.com/todos'),
                valueProp: 'id',
                labelProp: 'title',
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'vehicleRegistrationDate',
              type: 'datepicker',
              props: {
                label: 'p_vehicleRegistrationDate',
                description: 'p_vehicleRegistrationDate_Description',
                dateFormat: 'yy/mm/dd',
                hourFormat: '24',
                numberOfMonths: 2,
                selectionMode: 'single',
                required: false,
                readonlyInput: false,
                showTime: true,
                showButtonBar: true,
                showIcon: false,
                showOtherMonths: true,
                selectOtherMonths: true,
                monthNavigator: true,
                yearNavigator: true,
                yearRange: '2020:2030',
                inline: false,
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'vehicleDischarge',
              type: 'input',
              props: {
                translate: true,
                type: 'number',
                label: 'p_vehicleDischarge',
                addonLeft: {
                  text: '%',
                },
                description: 'p_vehicleDischarge_Description',
                required: false,
                disabled: false,
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'vehicleImported',
              type: 'checkbox',
              props: {
                translate: true,
                label: 'p_vehicleImported',
                description: 'p_vehicleImported_Description',
                required: false,
                disabled: false,
              },
            },
          ],
        },
        {
          props: {
            translate: true,
            label: 't_customer',
          },
          fieldGroupClassName: 'flex flex-wrap p2',
          fieldGroup: [
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'customerType',
              type: 'radio',
              props: {
                translate: true,
                label: 'p_customerType',
                description: 'p_customerType_Description',
                required: false,
                disabled: false,
                options: [
                  { value: 'private', label: 'p_customerType_Private' },
                  { value: 'company', label: 'p_customerType_Company' },
                  { value: 'public', label: 'p_customerType_Public' },
                  { value: 'association', label: 'p_customerType_association' },
                  { value: 'individual', label: 'p_customerType_Individual' },
                  { value: 'workshop', label: 'p_customerType_Workshop' },
                ].map(option => ({ ...option, label: this.translate.instant(option.label) })),
              },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full px-2 ',
              key: 'selectField',
              type: 'typehead-select',
              props: {
                translate: true,
                placeholder: 'Type to search...',
                description: 'p_customerDescription_Description',
                label: 'ricerca',
                options: [
                  { value: 'private', label: 'p_customerType_Private' },
                  { value: 'company', label: 'p_customerType_Company' },
                  { value: 'public', label: 'p_customerType_Public' },
                  { value: 'association', label: 'p_customerType_association' },
                  { value: 'individual', label: 'p_customerType_Individual' },
                  { value: 'workshop', label: 'p_customerType_Workshop' },
                ]
              },
              hooks: {
                onInit: field => {
                  let optionslist: any[] = [];
                  this.asyncgenericGetFromRestapi('customers', undefined, ['*.*'], undefined, undefined, -1, undefined, undefined, undefined).then(result => {
                    console.log("DATI CUSTOMERS:",this.tempResult); // Make sure the data is retrieved successfully
                    if (field && field.props) {
                      //field.props?.options? = result;
                    }
                    //field.props?.options? = optionslist;
                  });
                },
              },
            },
            {
              className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
              key: 'customerDescription',
              type: 'autocompletebutton',

              props: {
                translate: true,
                required: false,
                minLength: 4,
                label: 'p_customerDescription',
                placeholder: 'p_customerDescription_PlaceHolder',
                description: 'p_customerDescription_Description',
                filter: (input: any) => of(this.filteredCustomers(input)),
                actionLabel: 'Ins/Agg',
                onButtonClick: ($event: Event) => {
                  $event.preventDefault();
                  $event.stopPropagation();
                  console.log('ACTION PASSED');
                  if (this.form.value !== null && this.form.value !== undefined) {
                    const chiaviFiltrate = Object.fromEntries(Object.entries(this.form.value).filter(([key, value]) => key.startsWith('customer')));
                    console.log(chiaviFiltrate);
                  } else {
                    console.log('Error inizialize.');
                  }
                },
              },

              hooks: {
                onInit: field => {
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
                    //////////////////// Call RestApi ////////////////////
                    if (selectedValue === '' || selectedValue.length < 4) {
                      field.form?.get('customerAddress')?.patchValue('');
                      field.form?.get('customerTown')?.patchValue('');
                      field.form?.get('customerZip')?.patchValue('');
                      field.form?.get('customerProvince')?.patchValue('');
                      field.form?.get('customerEmail')?.patchValue('');
                      field.form?.get('customerPec')?.patchValue('');
                      field.form?.get('customerVatcode')?.patchValue('');
                      field.form?.get('customerSDI')?.patchValue('');
                      field.form?.get('customerCIG')?.patchValue('');
                      field.form?.get('customerPACode')?.patchValue('');
                      this.tempResult = [];
                    } else {
                      const filter = {
                        customerDescription: {
                          _eq: selectedValue,
                        },
                      };
                      await this.asyncgenericGetFromRestapi('customers', undefined, ['*.*'], filter, undefined, -1, undefined, undefined, undefined);
                      //////////////////// popolate /////////////////
                      if (this.tempResult && this.tempResult.length > 0) {
                        let row = this.tempResult[0];
                        field.form?.get('customerAddress')?.patchValue(row.customerAddress);
                        field.form?.get('customerTown')?.patchValue(row.customerTown);
                        field.form?.get('customerZip')?.patchValue(row.customerZip);
                        field.form?.get('customerProvince')?.patchValue(row.customerProvince);
                        field.form?.get('customerEmail')?.patchValue(row.customerEmail);
                        field.form?.get('customerPec')?.patchValue(row.customerPec);
                        field.form?.get('customerVatcode')?.patchValue(row.customerVatcode);
                        field.form?.get('customerSDI')?.patchValue(row.customerSDI);
                        field.form?.get('customerCIG')?.patchValue(row.customerCIG);
                        field.form?.get('customerPACode')?.patchValue(row.customerPACode);
                      }
                    }
                  });
                },
              },
            },
            {
              className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
              key: 'customerAddress',
              type: 'input',

              props: {
                translate: true,
                label: 'p_customerAddress',
                required: false,
                disabled: false,
                description: 'p_customerAddress_Description',
              },
            },
            {
              className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
              key: 'customerTown',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerTown',
                required: false,
                disabled: false,
                description: 'p_customerTown_Description',
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'customerZip',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerZip',
                required: false,
                disabled: false,
                description: 'p_customerZip_Description',
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'customerProvince',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerProvince',
                required: false,
                disabled: false,
                description: 'p_customerProvince_Description',
              },
            },
            {
              className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
              key: 'customerEmail',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerEmail',
                required: false,
                disabled: false,
                description: 'p_customerEmail_Description',
              },
            },

            {
              className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
              key: 'customerPec',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerPec',
                required: false,
                disabled: false,
                description: 'p_customerPec_Description',
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'customerVatcode',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerVatcode',
                required: false,
                disabled: false,
                description: 'p_customerVatcode_Description',
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'customerSDI',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerSDI',
                required: false,
                disabled: false,
                description: 'p_customerSDI_Description',
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'customerCIG',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerCIG',
                required: false,
                disabled: false,
                description: 'p_customerCIG_Description',
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'customerPACode',
              type: 'input',
              props: {
                translate: true,
                label: 'p_customerPACode',
                required: false,
                disabled: false,
                description: 'p_customerPACode_Description',
              },
            },
          ],
        },
        {
          props: {
            translate: true,
            label: 't_insurance',
          },
        },
        {
          props: {
            translate: true,
            label: 't_inquiringSupplier',
          },
        },
        {
          props: {
            translate: true,
            label: 't_activityPlanning',
          },
        },
        {
          props: {
            translate: true,
            label: 't_appointment',
          },
        },
        {
          props: {
            translate: true,
            label: 't_feasibility',
          },
        },
        {
          props: {
            translate: true,
            label: 't_intermediary',
          },
        },
        {
          props: {
            translate: true,
            label: 't_documents',
          },
          fieldGroup: [
            {
              key: 'file',
              type: 'file-upload',
              templateOptions: {
                translate: true,
                multiple: true,
                label: 'Files upload',
                description: 'files managements',
                identifier: 'TEST',
              },
            },
          ],
        },
      ],
    },
  ];

  extractKeyProperties = (obj: any) => {
    for (let key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        this.extractKeyProperties(obj[key]); // Chiamata ricorsiva per gli oggetti nidificati
      }
      if (obj.hasOwnProperty('type')) {
        console.log('Value with "type" property:', obj['type']); // Stampa il valore se la chiave è 'key'
      }
    }
  };

  options: FormlyFormOptions = {
    formState: {
      selectOptionsData: {
        teams: [
          { id: '1', name: 'Bayern Munich', sportId: '1' },
          { id: '2', name: 'Real Madrid', sportId: '1' },
          { id: '3', name: 'Cleveland', sportId: '2' },
          { id: '4', name: 'Miami', sportId: '2' },
        ],
        players: [
          { id: '1', name: 'Bayern Munich (Player 1)', teamId: '1' },
          { id: '2', name: 'Bayern Munich (Player 2)', teamId: '1' },
          { id: '3', name: 'Real Madrid (Player 1)', teamId: '2' },
          { id: '4', name: 'Real Madrid (Player 2)', teamId: '2' },
          { id: '5', name: 'Cleveland (Player 1)', teamId: '3' },
          { id: '6', name: 'Cleveland (Player 2)', teamId: '3' },
          { id: '7', name: 'Miami (Player 1)', teamId: '4' },
          { id: '8', name: 'Miami (Player 2)', teamId: '4' },
        ],
      },
    },
  };

  states = [
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
    'CASTELLANI LUCA',
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
    'ELENA RODKINA',
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

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    public globalService: GlobalService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang('it');
  }

  async ngOnInit(): Promise<void> {
    this.pending = true;
    this.route.queryParams.subscribe(params => {
      console.log(params['practice']);
      this.practiceNumber = params['practice'];
    });

    //// Retrieve all Customers ////
    await this.fetchAllCustomers();
  }

  AfterViewInit() {
    this.model = {};
  }

  // ########################################################################
  // Remove all hidden fields from the field configuration temporarily
  removeHiddenFields(fields: FormlyFieldConfig[]): FormlyFieldConfig[] {
  return fields.filter(field => !field.hide);
  }
  // ########################################################################

  async fetchAllCustomers() {
    try {
      // Execute the API call asynchronously using async/await
      await this.getAllCustomersFromRestapi('customers', undefined, ['*.*'], undefined, undefined, -1, undefined, undefined, undefined);
    } catch (error) {
      console.error('An error occurred while fetching customers:', error);
      // Handle errors as needed
    }
  }

  filteredCustomers(input: string) {
    return this.allCustomers.filter((value: any) => value.toLowerCase().includes(input.toLowerCase()));
  }

  submit() {
    alert(JSON.stringify(this.model));
  }

  submitdata($event: Event) {
    console.log($event);
    console.log(this.form);
    console.log(this.form.value);
    //this.form.value as { file?: []};
    //const flattenedArray = this.flattenNestedArrays(this.form.value);
    //console.log(flattenedArray);
  }

  flattenNestedArrays(formValue: any): { key: string; value: any }[] {
    const flattenedArray: { key: string; value: any }[] = [];

    const flattenRecursive = (obj: any, propName?: string) => {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          flattenRecursive(item, `${propName}[${index}]`);
        });
      } else if (typeof obj === 'object' && !(obj instanceof Date)) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            flattenRecursive(obj[key], propName ? `${propName}.${key}` : key);
          }
        }
      } else {
        if (!(obj instanceof Date)) {
          // Check if value is not a Date object
          if (propName) {
            flattenedArray.push({ key: propName, value: obj });
          } else {
            flattenedArray.push({ key: 'root', value: obj });
          }
        }
      }
    };

    flattenRecursive(formValue);
    return flattenedArray;
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
        //console.log('Practices data: ', Practices['data']);
        //console.log('Practices length: ', Practices['data'].length);
        this.data = Practices['data'];
        this.datasource = Practices['data'];
      });
  }
  ////////////////////////////////////////////////////////////////
  async asyncgenericGetFromRestapi(
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
      .subscribe((data: any) => {
        this.tempResult = data['data'];
        return  data['data'];
      });
  }
  async getAllCustomersFromRestapi(
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
      .subscribe((data: any) => {
        this.allCustomers = data['data'];
        if (this.allCustomers) {
          //console.log('CUSTOMERS:', this.allCustomers);
          this.allCustomers = this.allCustomers.map((item: any) => {
            return `${item.customerDescription}`;
            //return `${item.customerDescription} - ${item.customerTown} - ${item.customerProvince}`;
          });
          //console.log("CUSTOMERS ARRAY",this.allCustomers)
        }
      });
  }
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

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
}
