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

  ,
  {
    template: '<br><br><div class="mx-3"><strong>Esempio : tipologie altri campi possibili:</strong></div>',
  },


  //define the functions using flat arrow, so you evit the "ugly" bind(this)
  filterStates = (name: string) => {
    if (!name) return this.states;
    return this.states.filter((state: any) => state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  };
  add = (value: string) => {
    this.states.push(value);
  };