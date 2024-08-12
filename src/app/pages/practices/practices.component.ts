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

  form = new FormGroup({});
  model: any;

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

  submit() {
    alert(JSON.stringify(this.model));
  }

  fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          props: { label: 'Documents' },
          fieldGroup: [
            {
              key: 'file',
              type: 'file-upload',
              templateOptions: {
                translate:true,
                multiple: true,
                label: 'Files upload',
                description: 'files managements',
                identifier: 'testaccio',
                //minLength: 3,
                //maxLength: 20,
                //autosize: true
                //defaultValue: '',
                //hideExpression: '',
                //pattern: /regex/
              },
              /*
              validation: {
                messages: {
                  pattern: "Ip address format invalid (xxx.xxx.xxx.xxx)"
                }
              },
              expressionProperties: {
                'templateOptions.placeholder': () => this.translate.instant('fitterAddress1_placeholder'),
                'templateOptions.description': () => this.translate.instant('fitterAddress1_description'),
                'templateOptions.label': () => this.translate.instant('fitterAddress1_insert_label'),
              },*/
            },
          ],
        },
        {
          props: { label: 'Accordions' },
          fieldGroup: [
            {
              key: 'accordion',
              type: 'accordion',
              fieldGroup: [
                {
                  key: 'panel1',
                  templateOptions: {
                    label: 'Primo accordion',
                  },
                  fieldGroup: [
                    {
                      key: 'surname',
                      type: 'input',
                      props: {
                        label: 'surname',
                        required: true,
                      },
                    },
                    {
                      key: 'botly',
                      type: 'input',
                      props: {
                        label: 'botly',
                        required: false,
                      },
                    },
                  ],
                },
                {
                  key: 'panel2',
                  templateOptions: {
                    label: 'secondo accordion',
                  },
                  fieldGroup: [
                    {
                      key: 'pippo',
                      type: 'input',
                      props: {
                        label: 'pippo',
                        required: false,
                      },
                    },
                    {
                      key: 'baudo',
                      type: 'input',
                      props: {
                        label: 'baudo',
                        required: false,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          props: { label: 'Personal data' },
          fieldGroup: [
            {
              key: 'firstname',
              type: 'input',
              props: {
                label: 'First name',
                required: false,
              },
            },
            {
              key: 'age',
              type: 'input',
              props: {
                type: 'number',
                label: 'Age',
                required: false,
              },
            },
          ],
        },

        {
          props: { label: 'State' },
          fieldGroup: [
            {
              key: 'state',
              type: 'input',
              props: {
                label: 'Province',
                required: false,
              },
            },

            {
              key: 'multicheckbox',
              type: 'multicheckbox',
              templateOptions: {
                label: 'multicheckbox',
                required: false,
                disabled: false,
                options: [
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' },
                ],
              },
            },
          ],
        },
        {
          props: { label: 'Student' },
          fieldGroup: [
            {
              key: 'whyNot',
              type: 'textarea',
              props: {
                label: 'Why Not?',
                placeholder: 'Type in here... I dare you',
                maxWordCount: 4,
                required: false,
                rows: 5,
              },
              validation: { show: true },
            },
            {
              key: 'Checkbox',
              type: 'checkbox',
              props: {
                label: 'Accept terms',
                description: 'In order to proceed, please accept terms',
                pattern: 'true',
                required: false,
              },
              validation: {
                messages: {
                  pattern: 'Please accept the terms',
                },
              },
            },
            {
              key: 'Radio',
              type: 'radio',
              props: {
                label: 'Radio',
                placeholder: 'Placeholder',
                description: 'Description',
                required: false,
                options: [
                  { value: 1, label: 'Option 1' },
                  { value: 2, label: 'Option 2' },
                  { value: 3, label: 'Option 3' },
                  { value: 4, label: 'Option 4', disabled: true },
                ],
              },
            },
            {
              key: 'Select',
              type: 'select',
              props: {
                label: 'Select',
                placeholder: 'Placeholder',
                description: 'Description',
                required: false,
                multiple: false,
                options: this.http.get<{ title: string; id: string }[]>('https://jsonplaceholder.typicode.com/todos'),
                valueProp: 'id',
                labelProp: 'title',
              },
            },
            {
              key: 'select_multi',
              type: 'select',
              props: {
                label: 'Select Multiple',
                placeholder: 'Placeholder',
                description: 'Description',
                required: false,
                multiple: true,
                selectAllOption: 'Select All',
                options: this.http.get<{ title: string; id: string }[]>('https://jsonplaceholder.typicode.com/todos'),
                valueProp: 'id',
                labelProp: 'title',
              },
            },
          ],
        },

        {
          props: { label: 'Employments' },
          fieldGroup: [
            {
              key: 'employments_number',
              type: 'input',
              props: {
                type: 'number',
                label: 'Number of employments',
                required: false,
              },
            },
          ],
        },
        
        {
          props: { label: 'Day of the trip' },
          fieldGroup: [
            {
              key: 'start_date',
              type: 'datepicker',
              modelOptions: {
                updateOn: 'blur',
              },
              props: {
                label: 'Datepicker',
                placeholder: 'Placeholder',
                description: 'Description',
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
              key: 'Toggle',
              type: 'toggle',
              props: {
                label: 'Toggle label',
                description: 'Toggle Description',
                required: false,
              },
            },
            {
              key: 'Autocomplete',
              type: 'autocomplete',
              templateOptions: {
                addonright: {
                  text: 'add',
                },
                label: 'Autocomplete',
                placeholder: 'Search...',
                filter: (input: any) => of(this.filteredData(input)),
              },
            },
          ],
        },
      ],
    },
  ];

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

  filteredData(input: string) {
    console.log(input);
    return this.states.filter((value: any) => value.includes(input));
  }

  dataconfig = ['add', 'search', 'columns', 'reload'];

  datacolumns = [
    "practiceCode",
    "practiceDescription",
    "practiceStatus",
    "practiceDate",
    "practiceType",
    "practiceOrigin",
    "practiceAlert",
  ];

  editfieldsconfig = [
    "practiceCode",
    "practiceDescription",
    "practiceStatus",
    "practiceDate",
    "practiceType",
    "practiceOrigin",
    "practiceAlert",
  ];
  
  datashow = [
    "practiceCode",
    "practiceDescription",
    "practiceStatus",
    "practiceDate",
    "practiceType",
    "practiceOrigin",
    "practiceAlert",
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
  }

  ngOnInit(): void {
    this.pending = true;
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang('it');
    this.getPractices();
    this.addPropertyToData();
    this.model = {}
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
      'pratiche',
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
      this.draweredit.toggle();
    }
    if (eventData.actionRequest == 'add') {
      //this.formData = new NewCustomer();
      this.draweradd.toggle();
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
