fields: FormlyFieldConfig[] = [
  {
    type: 'tabs',
    fieldGroup: [
      {
        props: {
          translate: true,
          label: 'practice',
        },
      },
      {
        props: {
          translate: true,
          label: 'vehicle',
        },
      },
      {
        props: {
          translate: true,
          label: 'insurnce',
        },
      },
      {
        props: {
          translate: true,
          label: 'intermediary',
        },
      },
      {
        props: {
          translate: true,
          label: 'activityPlanning',
        },
      },
      {
        props: {
          translate: true,
          label: 'material',
        },
      },
      {
        props: {
          translate: true,
          label: 'appointment',
        },
      },

      {
        props: {
          translate: true,
          label: 'feasibility',
        },
      },{
        props: {
          translate: true,
          label: 'documents',
        },
      },
    ],
  },
];

//#### Fields Definitions ###

fields: FormlyFieldConfig[] = [
    {
      type: 'tabs',
      fieldGroup: [
        {
          props: {
            translate: true,
            label: 'Documents',
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
                    translate: true,
                    label: 'FIRST_ACCORDION',
                   
                  },
                  fieldGroup: [
                    {
                      key: 'surname',
                      type: 'input',
                      props: {
                        translate: true,
                        label: 'surname',
                        required: false,
                      },
                    },
                    {
                      key: 'name',
                      type: 'input',
                      props: {
                        translate: true,
                        label: 'name',
                        required: false,
                      },
                    },
                  ],
                },
                {
                  key: 'panel2',
                  templateOptions: {
                    translate: true,
                    label: 'SECOND_ACCORDION',
      
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
          ]
        },
        props: { label: 'Personal data' },       {
   
          
          fieldGroup: [
            {
              key: 'firstname',
              type: 'input',
              props: {
                label: 'First name',
                required: true,
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
              expressions: {
                'hide': (field: FormlyFieldConfig) => {
                  console.log(field)
                  return !field.model.firstname;
                },
              }
            },
          ]
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
                translate: true,
                label: 'multicheckbox',
                required: false,
                disabled: false,
                options: [
                  { label: 'Option_1', value: '1' },
                  { label: 'Option_2', value: '2' },
                  { label: 'Option_3', value: '3' },
                ].map(option => ({ ...option, label: this.translate.instant(option.label) })),
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
              }
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
          props: {
            label: 'Day of the trip',
            hide: true
          },
          
          key: 'GRUPPO1',
          wrappers: ['card'],
          fieldGroup: [
            {
              key: 'startdate',
              type: 'datepicker',
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
              }
            },
            { template: '<p>< ATTENZIONE TEMPLAT£S INJECTION></p>' },
            {
              key: 'toggle',
              type: 'toggle',
              props: {
                label: 'Toggle label',
                description: 'Toggle Description',
                required: false,
              },
              expressions: {
                'hide': (field: FormlyFieldConfig) => {
                  //console.log(field.model)
                  if (field.model == undefined) {
                    return true
                  } else {
                  return !field.model.startdate
                  }
                },
              }
            },
            {
              key: 'Autocomplete',
              type: 'autocomplete',
              hide: true,
              templateOptions: {
                addonright: {
                  text: 'add',
                },
                description: 'Digita',
                label: 'Autocomplete',
                placeholder: 'Search...',
                filter: (input: any) => of(this.filteredData(input)),
              },
              expressions: {
                'hide': (field: FormlyFieldConfig) => {
                  //console.log(field.model)
                  if (field.model == undefined) {
                    return true
                  } else {
                  return !field.model.toggle
                  }
                },
              }
            },
          ],
        },
      ]
    },
  ];
