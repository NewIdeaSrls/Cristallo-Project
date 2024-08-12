import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { GlobalService } from './../../services/globals.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../translation.module';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import {  OnInit, VERSION,AfterViewInit, ChangeDetectionStrategy, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-and-models',
  standalone: true,
  imports: [CommonModule,AppModule,NgxTranslateModule],
  templateUrl: './brands-and-models.component.html',
  styleUrl: './brands-and-models.component.scss',
})

export class BrandsAndModelsComponent implements OnInit {
  form = new FormGroup({});
  model: any

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    public globalService: GlobalService,
    private translate: TranslateService
      ) {}

  filteredData(input: string) {
    console.log(input);
    console.log(this.data);
    return this.data.filter((value: any) => value.includes(input));
  }

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

  data = [
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

  ngOnInit(): void {
  this.model = {}
  }

}
