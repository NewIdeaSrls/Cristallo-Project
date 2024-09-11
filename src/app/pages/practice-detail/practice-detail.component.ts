import { tap } from 'rxjs/operators';
import { VehiclesComponent } from './../vehicles/vehicles.component';
import { Observable } from 'rxjs';
import { AccordionTypeComponent } from './../../accordions.type';
import { state, transition } from '@angular/animations';
import { OnInit, VERSION, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDTableComponent } from '../../components/mdtable/mdtable.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { AppModule } from '../../app.module';
import { GlobalService } from './../../services/globals.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../translation.module';
import { FormlyFormOptions, FormlyFieldConfig, FormlyExtension } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormlyFormBuilder } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';
import { of } from 'rxjs';
import { map } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { response } from 'express';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSidenavModule, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material/sidenav';
import { MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { Field } from '@bryntum/schedulerpro';
import { ElementRef } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { log } from 'console';
import { threadId } from 'worker_threads';
import { SharedDataService } from '../../services/shared-data.service';
import { CommandService } from '../../services/command-service.service';

export interface DialogData {
  alertMessage: string;
}

interface CounterData {
  practiceCounter: string; // Adjust the type based on the actual data type
}

@Component({
  selector: 'app-practice-detail',
  standalone: true,
  imports: [CommonModule, AppModule, NgxTranslateModule, MatDialogTitle, MatDialogContent, NgxMaskDirective, MatSidenavModule],
  templateUrl: './practice-detail.component.html',
  styleUrl: './practice-detail.component.scss',
  providers: [provideNgxMask()],
})
export class PracticeDetailComponent {
  @ViewChild('drawerright') drawerright!: MatDrawer;
  @ViewChild('drawerleft') drawerleft!: MatDrawer;

  dialog = inject(MatDialog);

  form = new FormGroup({});
  myform = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  model: any = {};
  oprions: any;
  data: any[] = [];

  selectedObj: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};
  practiceNumber: any;

  allCustomers: string[] = [];
  tempResult: any[] = [];

  dialogIsOpen = false;
  alertMessage = '';

  time = new Date();
  intervalId: any;

  selectedPoint: any;
  selectedVehicleModel: any;
  selectedVehicleModelInfo: any;
  selectedVehicle: any;
  selectedAgent: any;
  selectedBroker: any;
  selectedSupplier: any;
  selectedCustomer: any;
  selectedInsurance: any;
  selectedInsuranceOffice: any;
  selectedinsuranceLimitsAndDeductible: any;
  selectedPointWorkPlace: any;
  selectedFitter1: any;
  selectedFitter2: any;
  selectedFitter3: any;
  selectedFitter4: any;

  optionsArray: any[] = [];

  counter: any = null;
  isLoading = true;

  today = new Date();
  todayAsStr = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;
  formlyBuilder: any;

  brokers: Observable<any>[] = [];
  costs:any

  constructor(
    private http: HttpClient,
    private router: Router,
    public globalService: GlobalService,
    private translationService: TranslateService,
    private route: ActivatedRoute,
    private fbuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sharedDataService: SharedDataService,
    private commandService:CommandService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.translationService.addLangs(['en', 'it']);
    this.translationService.setDefaultLang('it');

    this.route.queryParams.subscribe(params => {
      console.log(params['practice']);
      this.practiceNumber = params['practice'];
    });

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    await this.getPractice(this.practiceNumber);

    /*this.http.get<any[]>('api/items/generalCounters').subscribe((counter: any) => {
      console.log((counter as { data: CounterData }).data.practiceCounter);
      this.counter = (counter as { data: CounterData }).data.practiceCounter;
      //const valueToPatch: never = undefined; // Specify the type of 'valueToPatch' as string
      // this.form?.get('praticeCode')?.patchValue(valueToPatch);
      //this.form?.get('vehicleType')?.patchValue(this.counter);
    })*/

    //const translations = this.generateTranslationKeys(this.fields);
    //console.log('JSON TRADUZIONE', translations);

    this.translationService.reloadLang('it').subscribe(() => {
      this.loadFormlyFields();
      this.isLoading = false;
    });

      this.sharedDataService.setFeasibilityInfo("Benvenuto Carlo");
    
      let isPrimaryColor = true;

      // Function to toggle the color and set it using sharedDataService
      const toggleCommandColor = () => {
          const colorToSet = isPrimaryColor ? 'primary' : 'warn';
          this.sharedDataService.setfeasibilityCommandColor(colorToSet);
          isPrimaryColor = !isPrimaryColor; // Toggle the color for the next iteration
      };

      setInterval(() => {
        toggleCommandColor();
      }, 4000); 
    

    this.commandService.command$.subscribe(() => {
      this.openFeasibilityDrawer();
    });
  }

  openFeasibilityDrawer() {
    this.costs = [
      {
        from: 'Point',
        cost: 60
      },
      {
        from: 'Broker',
        cost: 20
      },
      {
        from: 'Agent',
        subject: 'Message Subject 2',
        cost: 10
      },
      {
        from: 'Fitters',
        cost: 50
      },
      {
        from: 'Materials',
        cost: 100
      },
    ]
    this.drawerright.toggle()

  }

  showAlerts($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.drawerleft.toggle()
  }

  AfterViewInit() {
    this.model = {};
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  handleButtonClick(): void {
    console.log('Funzione eseguita nel componente genitore');
  }

  findFieldByKey(fields: FormlyFieldConfig[], key: string): FormlyFieldConfig | undefined {
    for (const field of fields) {
      if (field.key === key) {
        return field;
      }

      if (field.fieldGroup) {
        const result = this.findFieldByKey(field.fieldGroup, key);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }

  getOptionsBasedOnPracticeType(practiceType: string) {
    let options = [];
    switch (practiceType) {
      case 'insurance':
        options = [
          { label: 'p_practiceStatus_New', value: 'OP' },
          { label: 'p_practiceStatus_Call', value: 'CA' },
          { label: 'p_practiceStatus_Ordered', value: 'OR' },
          { label: 'p_practiceStatus_ToOrder', value: 'DO' },
        ];
        break;
      case 'point':
        options = [
          { label: 'p_practiceStatus_New', value: 'OP' },
          { label: 'p_practiceStatus_Await', value: 'AT' },
          { label: 'p_practiceStatus_awaitPoint', value: 'AP' },
          { label: 'p_practiceStatus_ToOrder', value: 'DO' },
          { label: 'p_practiceStatus_Ordered', value: 'OR' },
        ];
        break;
      case 'laboronly':
        options = [
          { label: 'p_practiceStatus_New', value: 'OP' },
          { label: 'p_practiceStatus_LaborOnly', value: 'MA' },
          { label: 'p_practiceStatus_PreventiveToSend', value: 'PD' },
        ];
        break;
      // Other cases
      default:
        options = [{ label: 'p_practiceStatus_New', value: 'OP' }];
    }
    // Translate options
    return options.map(option => ({
      label: this.translationService.instant(option.label),
      value: option.value,
    }));
  }

  resetPracticeType($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.model) {
      console.log(this.model.practiceType);
      this.model.practiceType = '-';
      console.log(this.form);
      const typeval = this.form?.get('practiceType') as any;
      if (typeval) {
        console.log(typeval.value);
        typeval.setValue('-');
      }
    }
  }

  submitdata($event?: Event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      if (this.selectedPoint) console.log(this.selectedPoint);
      if (this.selectedCustomer) console.log(this.selectedCustomer);
      if (this.selectedAgent) console.log(this.selectedAgent);
      if (this.selectedInsurance) console.log(this.selectedInsurance);
      if (this.selectedFitter1) console.log(this.selectedFitter1);
      if (this.selectedFitter2) console.log(this.selectedFitter2);
      if (this.selectedFitter3) console.log(this.selectedFitter3);
      if (this.selectedFitter4) console.log(this.selectedFitter4);
      if (this.selectedSupplier) console.log(this.selectedSupplier);
      if (this.selectedInsuranceOffice) console.log(this.selectedInsuranceOffice);
      if (this.selectedVehicle) console.log(this.selectedVehicle);
      if (this.selectedVehicleModelInfo) console.log(this.selectedVehicleModelInfo);
      if (this.selectedVehicleModel) console.log(this.selectedVehicleModel);
      if (this.selectedPointWorkPlace) console.log(this.selectedPointWorkPlace);
      console.log(this.model);

      this.sharedDataService.setFeasibilityInfo("Tutto Salvato");

    }
  }

  /*****************************************************************************/
  async getPractice(id: number) {
    this.getPraticesFromRestapi(
      'practices',
      id, // id
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
  getPraticesFromRestapi(
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
      .subscribe((Practice: any) => {
        this.data = Practice['data'];
        console.log(Practice['data']);
        this.model = {
          practiceId: Practice['data']['id'],
          practiceStatus: Practice['data']['practiceStatus'],
          practiceType: Practice['data']['practiceType'],
          practiceOrigin: Practice['data']['practiceOrigin'],
          practiceEmailOrigin: Practice['data']['practiceEmailOrigin'],
          practiceWhatsappNumberOrigin: Practice['data']['practiceWhatsappNumberOrigin'],
          practiceDate: Practice['data']['practiceDate'],
          practiceLastUpdate: Practice['data']['practiceLastUpdate'],
          practiceCode: Practice['data']['practiceCode'],
          practiceNote: Practice['data']['practiceNote'],
          practiceAdministrationNote: Practice['data']['practiceAdministrationNote'],
          practiceAlert: Practice['data']['practiceAlert'],
        };
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

  // ##################################################################
  // Functions Utility
  // ##################################################################

  // Remove all hidden fields from the field configuration temporarily
  removeHiddenFields(fields: FormlyFieldConfig[]): FormlyFieldConfig[] {
    return fields.filter(field => !field.hide);
  }

  public feasability() {
    this.drawerright.toggle();
  }

  generateTranslationKeys(fields: FormlyFieldConfig[]) {
    const translations: { [key: string]: string } = {};

    fields.forEach(field => {
      if (field.props) {
        const { label, description, placeholder } = field.props;
        const fieldKey = field.key;

        if (label) {
          translations[label] = `${fieldKey}.label`;
        }

        if (description) {
          translations[description] = `${fieldKey}.description`;
        }

        if (placeholder) {
          translations[placeholder] = `${fieldKey}.placeholder`;
        }
      }

      // Gestione ricorsiva dei gruppi di campi
      if (field.fieldGroup) {
        const nestedTranslations = this.generateTranslationKeys(field.fieldGroup);
        Object.keys(nestedTranslations).forEach(key => {
          translations[key] = nestedTranslations[key];
        });
      }
    });

    return translations;
  }

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

  valuesFromObservable(httprequest: any) {
    this.http.get<[]>(httprequest).subscribe((data: any[]) => {
      let x: any = data; // Assign the array received from the API to this.Options
      let result = x['data'];
      return result;
    });
  }

  loadFormlyFields() {
    this.fields = [
      {
        type: 'tabs',
        fieldGroup: [
          {
            props: {
              translate: true,
              label: 'practice',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('practice'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
                key: 'practiceType',
                type: 'radio',
                props: {
                  label: '',
                  description: '',

                  options: [
                    { value: 'insurance', label: 'p_practiceType_Insurance' },
                    { value: 'point', label: 'p_practiceType_Point' },
                    { value: 'laboronly', label: 'p_practiceType_Laboronly' },
                    { value: 'preventive', label: 'p_practiceType_Preventive' },
                    { value: 'sale', label: 'p_practiceType_Sale' },
                    { value: 'darkering', label: 'p_practiceType_Darkering' },
                  ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
                },
                expressionProperties: {
                  //'props.label': () => this.translationService.instant('p_practiceType'),
                  'props.description': () => this.translationService.instant('p_practiceType_Description'),
                },
                expressions: {
                  'props.disabled': (field: FormlyFieldConfig) => {
                    if (field.model.practiceType == '-') {
                      return false;
                    } else {
                      return true;
                    }
                  },
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 radioField',
                key: 'practiceStatus',
                type: 'select',
                defaultValue: 'CA',
                props: {
                  label: '',
                  description: '',
                  required: false,
                  disabled: false,
                  options: [
                    {
                      label: 'p_practiceStatus_New',
                      value: 'OP',
                    },
                  ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceStatus'),
                  'props.description': () => this.translationService.instant('p_practiceStatusDescription'),
                },
                hooks: {
                  onInit: field => {
                    // Show eventual Alert on Load practice
                    const control = field?.form?.get('practiceAlert');
                    if (control) {
                      if (control.value !== '' && control.value !== null && control.value !== undefined) {
                        if (!this.dialogIsOpen) {
                          this.dialogIsOpen = true;
                          this.dialog
                            .open(DialogDataDialog, {
                              data: {
                                alertMessage: control.value,
                              },
                            })
                            .afterClosed()
                            .subscribe(() => {
                              this.dialogIsOpen = false;
                            });
                        }
                      }
                    }

                    // Load Initial option for practiceType loaded into the model
                    const formControl = field?.form?.get('practiceType');
                    if (formControl) {
                      console.log('Carico impostazioni iniziali tipo pratica');
                      const options = this.getOptionsBasedOnPracticeType(formControl.value);
                      console.log('Popolo Options su tipo Pratica ');
                      if (field.props) {
                        field.props.options = options;
                      } else {
                        field.props = { options };
                      }
                    }

                    // Subscrbe on valuechanges reload new Options
                    formControl?.valueChanges.subscribe(async (selectedValue: string) => {
                      console.log('Cambio tipo pratica');
                      if (formControl) {
                        const options = this.getOptionsBasedOnPracticeType(formControl.value);
                        console.log('Popolo Options su tipo Pratica ');
                        if (field.props) {
                          field.props.options = options;
                        } else {
                          field.props = { options };
                        }
                      }
                    });
                  },
                  onChanges: field => {},
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 radioField',
                key: 'practiceCode',
                type: 'input',
                defaultValue: this.translationService.instant('newPractice'),
                props: {
                  type: 'text',
                  label: 'p_practiceCode',
                  required: false,
                  disabled: true,
                  description: 'p_practiceCode_Description',
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceCode'),
                  'props.description': () => this.translationService.instant('p_practiceCode_Description'),
                },
                expressions: {
                  'props.disabled': (field: FormlyFieldConfig) => {
                    if (this.model.practiceCode == '') {
                      field.form?.get('practiceCode')?.patchValue(this.translationService.instant('p_newPractice'));
                    }
                    return true;
                  },
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'practiceDate',
                type: 'datepicker',
                props: {
                  label: 'p_practiceDate',
                  description: 'p_practiceDate_Description',
                  datepickerOptions: {
                    format: 'DD-MM-YYYY', //
                  },
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
                  updateOn: 'change',
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceDate'),
                  'props.description': () => this.translationService.instant('p_practiceDate_Description'),
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 radioField',
                key: 'practiceLastUpdate',
                type: 'datepicker',
                defaultValue : new Date(),
                props: {
                  label: 'p_practiceLastUpdate',
                  description: 'p_practiceLastUpdate_Description',
                  datepickerOptions: {
                    format: 'DD-MM-YYYY', //
                  },
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
                  updateOn: 'change',
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceLastUpdate'),
                  'props.description': () => this.translationService.instant('p_practiceLastUpdate_Description'),
                },
              },
              {
                className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
                key: 'practiceOrigin',
                type: 'radio',
                props: {
                  label: '',
                  description: '',
                  required: false,
                  disabled: false,
                  options: [
                    { value: 'email', label: 'p_practiceOrigin_Email' },
                    { value: 'whatsapp', label: 'p_practiceOrigin_Whatsapp' },
                  ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
                },
                expressionProperties: {
                  //'props.label': () => this.translationService.instant('p_practiceOrigin'),
                  'props.description': () => this.translationService.instant('p_practiceOrigin_Description'),
                },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
                key: 'practiceWhatsappNumberOrigin',
                type: 'input',
                props: {
                  label: 'p_practiceWhatsappNumberOrigin',
                  required: true,
                  disabled: false,
                  description: 'p_practiceWhatsappNumberOrigin_Description',
                  maskConfig: {
                    //mask: '000 000000000||+00 000 000000000',
                  },
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_praticeWhatsappOriginNumbern'),
                  'props.description': () => this.translationService.instant('p_praticeWhatsappOriginNumber_Description'),
                },
                expressions: { hide: 'model.practiceOrigin !== "whatsapp"' },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
                key: 'practiceEmailOrigin',
                type: 'input',
                props: {
                  type: 'text',
                  label: 'p_practiceEmailOrigin',
                  required: true,
                  disabled: false,
                  description: 'p_practiceEmailOrigin_Description',
                  maskConfig: {
                    //mask: "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                    //validation:true
                  },
                  //patterns: '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceEmailOrigin'),
                  'props.description': () => this.translationService.instant('p_practiceEmailOrigin_Description'),
                },
                expressions: { hide: 'model.practiceOrigin !== "email"' },
              },
              {
                className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
                key: 'practiceNote',
                type: 'textarea',
                props: {
                  label: 'p_practiceNote',
                  description: 'p_practiceNote_Description',
                  required: false,
                  rows: 3,
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceNote'),
                  'props.description': () => this.translationService.instant('p_practiceNote_Description'),
                },
                validation: { show: true },
              },
              {
                className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
                key: 'practiceAdministrationNote',
                type: 'textarea',
                props: {
                  label: '',
                  description: '',
                  required: false,
                  rows: 3,
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceAdministrationNote'),
                  'props.description': () => this.translationService.instant('p_practiceAdministrationNote_Description'),
                },
              },
              {
                className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
                key: 'practiceAlert',
                type: 'textarea',
                props: {
                  label: '',
                  description: '',
                  required: false,
                  rows: 1,
                },
                expressionProperties: {
                  'props.label': () => this.translationService.instant('p_practiceAlert'),
                  'props.description': () => this.translationService.instant('p_practiceAlert_Description'),
                },
              },
            ],
          },
          {
            props: {
              translate: true,
              label: 'customer',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('customer'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
                key: 'selectedCustomer',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'Digita il cliente da cercare',
                  label: ' ',
                  options: this.http.get<[]>('api/items/customers'),
                  labelToShow: ['customerDescription', 'customerTown', 'customerProvince'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selectedCustomer');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('customerType')?.patchValue(null);
                        field.form?.get('customerDescription')?.patchValue(null);
                        field.form?.get('customerAddress')?.patchValue(null);
                        field.form?.get('customerTown')?.patchValue(null);
                        field.form?.get('customerZip')?.patchValue(null);
                        field.form?.get('customerProvince')?.patchValue(null);
                        field.form?.get('customerEmail')?.patchValue(null);
                        field.form?.get('customerPec')?.patchValue(null);
                        field.form?.get('customerVatcode')?.patchValue(null);
                        field.form?.get('customerSDI')?.patchValue(null);
                        field.form?.get('customerCIG')?.patchValue(null);
                        field.form?.get('customerPACode')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/customers/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let customers = x['data'];
                          let row = customers;
                          console.log(row);
                          field.form?.get('customerType')?.patchValue(row.customerType);
                          field.form?.get('customerDescription')?.patchValue(row.customerDescription);
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
                          this.selectedCustomer = row;
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
                key: 'customerType',
                type: 'radio',
                props: {
                  label: '',
                  description: 'p_customerType_Description',
                  required: true,
                  disabled: false,
                  options: [
                    { value: 'private', label: 'p_customerType_Private' },
                    { value: 'company', label: 'p_customerType_Company' },
                    { value: 'public', label: 'p_customerType_Public' },
                    { value: 'association', label: 'p_customerType_association' },
                    { value: 'individual', label: 'p_customerType_Individual' },
                    { value: 'workshop', label: 'p_customerType_Workshop' },
                  ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
                },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
                key: 'customerDescription',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_customerDescription',
                  required: false,
                  disabled: false,
                  description: 'p_customerDescription_Description',
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
                expressions: {
                  hide: "model?.customerType === 'private'",
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
                expressions: {
                  hide: "model?.customerType === 'private' ",
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
                expressions: {
                  hide: "model?.customerType === 'private'",
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
                expressions: {
                  hide: "model?.customerType !== 'public'",
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
                expressions: {
                  hide: "model?.customerType !== 'public'",
                },
              },
            ],
          },
          {
            props: {
              translate: true,
              label: 'vehicle',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('vehicle'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'selectedVehicle',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'Digita il veicolo da cercare',
                  label: ' ',
                  options: this.http.get<[]>('api/items/vehicles'),
                  labelToShow: ['vehiclePlate', 'vehicleType'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selectedVehicle');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('vehicleType')?.patchValue(null);
                        field.form?.get('vehicleBrand')?.patchValue(null);
                        field.form?.get('vehicleModel')?.patchValue(null);
                        field.form?.get('vehiclePlate')?.patchValue(null);
                        field.form?.get('vehicleDischarge')?.patchValue(null);
                        field.form?.get('vehicleImported')?.patchValue(null);
                        field.form?.get('vehicleRegistrationDate')?.patchValue(null);
                        field.form?.get('vehicleModelAlert')?.patchValue(null);
                        field.form?.get('vehicleModelLogisticNote')?.patchValue(null);
                        field.form?.get('vehicleModelOrderNote')?.patchValue(null);
                        field.form?.get('vehicleModelTechnicalNote')?.patchValue(null);
                        field.form?.get('vehicleModeNeedBigVehicle')?.patchValue(null);
                        field.form?.get('vehicleModelNumberOfFitters')?.patchValue(null);
                        field.form?.get('vehicleModelProcessingTimeMins')?.patchValue(null);
                        field.form?.get('ehicleModelOnlyOriginalParts')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/vehicles/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let vehicle = x['data'];
                          let row = vehicle;
                          console.log(row);
                          field.form?.get('vehicleType')?.patchValue(row.vehicleType);
                          field.form?.get('vehicleBrand')?.patchValue(row.vehicleBrand);
                          field.form?.get('vehicleModel')?.patchValue(row.vehicleModel);
                          field.form?.get('vehiclePlate')?.patchValue(row.vehiclePlate);
                          field.form?.get('vehicleDischarge')?.patchValue(row.vehicleDischarge);
                          field.form?.get('vehicleImported')?.patchValue(row.vehicleImported);
                          field.form?.get('vehicleRegistrationDate')?.patchValue(row.vehicleRegistrationDate);
                          this.selectedVehicle = row;
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-2/3 xl:w-2/3 lg:w-2/3 xs:w-full sm:w-full  px-2 ',
                key: 'vehicleType',
                type: 'radio',
                props: {
                  description: 'p_vehicleType_Description',
                  required: false,
                  disabled: false,
                  options: [
                    { value: 'car', label: 'p_vehicleType_Car' },
                    { value: 'truck', label: 'p_vehicleType_Truck' },
                    { value: 'van', label: 'p_vehicleType_Van' },
                    { value: 'motorhomes', label: 'p_vehicleType_Motorhomes' },
                    { value: 'microcar', label: 'p_vehicleType_Microcar' },
                  ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-1/3 sm:w-full  px-2 ',
                key: 'vehiclePlate',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_vehiclePlate',
                  required: false,
                  disabled: false,
                  description: 'p_vehiclePlate_Description',
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'vehicleBrand',
                type: 'select',
                props: {
                  translate: true,
                  label: 'p_vehicleCarBrand',
                  description: 'p_vehicleCarBrand_Description',
                  required: false,
                  value: 3,
                  disabled: false,
                  options: this.http.get<any>('api/items/vehicleBrands').pipe(map(response => response.data)),
                },
                expressionProperties: {
                  'templateOptions.disabled': '!model.vehicleType',
                },
                hooks: {
                  onInit: field => {
                    const typeControl = this.form.get('vehicleType');
                    typeControl?.valueChanges.subscribe((changedValues: string) => {
                      const vehicleTypeField = field.form?.get('vehicleType');
                      const vehicleTypeId = vehicleTypeField?.value;
                      console.log(vehicleTypeId);

                      const vehicleBrandField = field.form?.get('vehicleBrand');
                      const vehicleBrandId = vehicleBrandField?.value;
                      console.log(vehicleBrandId);

                      const vehicleModelField = field.form?.get('vehicleModel');
                      const vehicleModelFieldId = vehicleModelField?.value;
                      console.log(vehicleModelFieldId);

                      // On typeVehicle clean brand and model
                      vehicleBrandField?.patchValue(null);
                      vehicleModelField?.patchValue(null);

                      this.http.get<any>('api/items/vehicleBrands').subscribe(response => {
                        console.log(response.data);
                        let x = response.data;
                        console.log(vehicleTypeId);
                        const filteredData = x.filter((item: any) => item.vehicleType === vehicleTypeId);
                        console.log(filteredData);
                        const xoptions = filteredData.map((item: any) => ({ label: item.vehicleBrand, value: item.id }));
                        console.log(xoptions);
                        field.props!.options = [...xoptions];
                      });
                    });
                  },
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
                  options: this.http.get<any>('api/items/vehicleModels').pipe(map(response => response.data)),

                  change: async (field: FormlyFieldConfig, event: {}) => {
                    //######## Intercept changes on Selection and Show eventual Alert
                    const options = Array.isArray(field.props?.options)
                      ? field.props?.options
                      : await field.props?.options?.pipe(toArray()).toPromise();
                    console.log(options);
                    let vehicleModelValue = field?.form?.value['vehicleModel'];
                    if (options) {
                      const filteredOptions = options.filter((option: { value: any }) => option.value === vehicleModelValue);
                      console.log(filteredOptions);
                      this.selectedVehicleModel = filteredOptions;

                      if (
                        !this.dialogIsOpen &&
                        filteredOptions.length > 0 &&
                        filteredOptions[0].alert !== null &&
                        filteredOptions[0].alert !== undefined
                      ) {
                        this.dialogIsOpen = true;
                        this.dialog
                          .open(DialogDataDialog, {
                            data: {
                              alertMessage: filteredOptions[0].alert,
                            },
                          })
                          .afterClosed()
                          .subscribe(() => {
                            this.dialogIsOpen = false;
                          });
                      }
                    }
                  },
                },
                expressions: {
                  'templateOptions.disabled': '!model.vehicleType',
                },
                hooks: {
                  onInit: field => {
                    //############### Load Options on vehicleBrand availability and Alert #####################
                    let controlBrand = this.form.get('vehicleBrand');
                    controlBrand?.valueChanges.subscribe((changedValues: string) => {
                      const vehicleTypeField = field.form?.get('vehicleType');
                      const vehicleTypeId = vehicleTypeField?.value;
                      console.log(vehicleTypeId);

                      const vehicleCarBrandField = field.form?.get('vehicleBrand');
                      const vehicleBrandId = vehicleCarBrandField?.value;
                      console.log(vehicleBrandId);

                      const vehicleModelField = field.form?.get('vehicleModel');
                      const vehicleModelFieldId = vehicleModelField?.value;
                      console.log(vehicleModelFieldId);

                      this.http.get<any>('api/items/vehicleModels').subscribe(response => {
                        console.log(response.data);
                        let x = response.data;
                        const filteredData = x.filter(
                          (item: any) => item.vehicleModelBrand === vehicleBrandId && item.vehicleModelType === vehicleTypeId
                        );
                        console.log(filteredData);
                        const xoptions = filteredData.map((item: any) => ({
                          label: item.vehicleModel,
                          value: item.id,
                          alert: item.vehicleModelAlert,
                        }));
                        console.log(xoptions);
                        field.props!.options = [...xoptions];
                      });
                    });


                    let controlModel = this.form.get('vehicleModel');
                    controlModel?.valueChanges.subscribe((changedValues: string) => {
                      let idToSearch = '';
                      if (changedValues !== null) {
                        idToSearch = changedValues;
                      } else {
                        idToSearch = this.model.vehicleModel
                      }
                      if(idToSearch !== null) {
                      this.http.get<[]>('api/items/vehicleModels/' + idToSearch).subscribe((data: any[]) => {
                        let x: any = data; // Assign the array received from the API to this.Options
                        let vehicle = x['data'];
                        let row = vehicle;
                        console.log(row);

                        field.form?.get('vehicleModelAlert')?.patchValue(row.vehicleModelAlert);
                        field.form?.get('vehicleModelLogisticNote')?.patchValue(row.vehicleModelLogisticNote);
                        field.form?.get('vehicleModelOrderNote')?.patchValue(row.vehicleModelOrderNote);
                        field.form?.get('vehicleModelTechnicalNote')?.patchValue(row.vehicleModelTechnicalNote);
                        field.form?.get('vehicleModelNeedBigVehicle')?.patchValue(row.vehicleModeNeedBigVehicle);
                        field.form?.get('vehicleModelNumberOfFitters')?.patchValue(row.vehicleModelNumberOfFitters);
                        field.form?.get('vehicleModelProcessingTimeMins')?.patchValue(row.vehicleModelProcessingTimeMins);
                        field.form?.get('ehicleModelOnlyOriginalParts')?.patchValue(row.ehicleModelOnlyOriginalParts);

                        this.selectedVehicleModelInfo = row;
                      });
                    }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'vehicleRegistrationDate',
                type: 'datepicker',
                props: {
                  disabled: false,
                  label: 'p_vehicleRegistrationDate',
                  description: 'p_vehicleRegistrationDate_Description',
                  dateFormat: 'yy/mm/dd',
                  hourFormat: '24',
                  numberOfMonths: 2,
                  selectionMode: 'single',
                  required: true,
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
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'vehicleDischarge',
                type: 'input',
                props: {
                  translate: true,
                  className: 'pt-0 pb-0 ',
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
                className: 'w-full h-6', // Classe per far sì che l'HR occupi tutta la larghezza del form
                template: '<hr>',
              },

              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-1/2 sm:w-full  px-2 ',
                key: 'vehicleAlert',
                type: 'textarea',
                props: {
                  translate: true,
                  label: 'p_vehicleAlert',
                  required: false,
                  disabled: false,
                  rows: 1,
                  description: 'p_vehicleAlert_Description',
                },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-1/2 sm:w-full  px-2 ',
                key: 'vehicleModelLogisticNote',
                type: 'textarea',
                props: {
                  translate: true,
                  label: 'p_vehicleModelLogisticNote',
                  required: false,
                  disabled: false,
                  rows: 1,
                  description: 'p_vehicleModelLogisticNote_Description',
                },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-1/2 sm:w-full  px-2 ',
                key: 'vehicleModelOrderNote',
                type: 'textarea',
                props: {
                  translate: true,
                  label: 'p_vehicleModelOrderNote',
                  required: false,
                  disabled: false,
                  rows: 1,
                  description: 'p_vehicleModelOrderNote_Description',
                },
              },
              {
                className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-1/2 sm:w-full  px-2 ',
                key: 'vehicleModelTechnicalNote',
                type: 'textarea',
                props: {
                  translate: true,
                  label: 'p_vehicleModelTechnicalNote',
                  required: false,
                  disabled: false,
                  rows: 1,
                  description: 'p_vehicleModelTechnicalNote_Description',
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-1/4 sm:w-full  px-2 ',
                key: 'vehicleModelNeedBigVehicle',
                type: 'checkbox',
                props: {
                  translate: true,
                  required: false,
                  label: 'p_vehicleModeNeedBigVehicle',
                  disabled: true,
                  description: 'p_vehicleModelNeedBigVehicle_Description',
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-1/4 sm:w-full  px-2 ',
                key: 'vehicleModelOnlyOriginalParts',
                type: 'checkbox',
                props: {
                  translate: true,
                  label: 'p_vehicleModelOnlyOriginalParts',
                  required: false,
                  disabled: true,
                  rows: 1,
                  description: 'p_vehicleModelOnlyOriginalParts_Description',
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-1/4 sm:w-full  px-2 ',
                key: 'vehicleModelNumberOfFitters',
                type: 'input',
                props: {
                  translate: true,
                  type: 'number',
                  label: 'p_vehicleModelNumberOfFitters',
                  required: false,
                  disabled: true,
                  description: 'p_vehicleModelNumberOfFitters_Description',
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-1/4 sm:w-full  px-2 ',
                key: 'vehicleModelProcessingTimeMins',
                type: 'input',
                props: {
                  translate: true,
                  type: 'number',
                  label: 'p_vehicleModelProcessingTimeMins',
                  required: false,
                  disabled: true,
                  description: 'p_vehicleModelProcessingTimeMins_Description',
                },
              },
            ],
          },

          {
            props: {
              translate: true,
              label: 'insurance',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('insurance'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selectedInsurance',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedInsurance_Description',
                  label: ' ',
                  options: this.http.get<[]>('api/items/insurances'),
                  labelToShow: ['insuranceDescription'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selectedInsurance');

                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('insuranceDescription')?.patchValue(null);
                        field.form?.get('insuranceTypeOpenAccident')?.patchValue(null);
                        field.form?.get('insurancePhone')?.patchValue(null);
                        field.form?.get('insuranceMail')?.patchValue(null);
                        field.form?.get('insurancePec')?.patchValue(null);
                        field.form?.get('insuranceGreenPhone')?.patchValue(null);
                        field.form?.get('insuranceOpenAccidentPhone')?.patchValue(null);
                        field.form?.get('insuranceUseAgency')?.patchValue(null);

                        field.form?.get('selectedInsuranceOffice')?.patchValue(null);
                        field.form?.get('insuranceOfficeDescription')?.patchValue(null);
                        field.form?.get('insuranceOfficeAddress')?.patchValue(null);
                        field.form?.get('insuranceOfficeTown')?.patchValue(null);
                        field.form?.get('insuranceOfficeZip')?.patchValue(null);
                        field.form?.get('insuranceOfficeProvince')?.patchValue(null);
                        field.form?.get('insuranceOfficePhone')?.patchValue(null);
                        field.form?.get('insuranceOfficeEmail')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/insurances/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let insurances = x['data'];
                          let row = insurances;
                          console.log(row);
                          field.form?.get('insuranceDescription')?.patchValue(row.insuranceDescription);
                          field.form?.get('insuranceTypeOpenAccident')?.patchValue(row.insuranceTypeOpenAccident);
                          field.form?.get('insurancePhone')?.patchValue(row.insurancePhone);
                          field.form?.get('insuranceMail')?.patchValue(row.insuranceMail);
                          field.form?.get('insurancePec')?.patchValue(row.insurancePec);
                          field.form?.get('insuranceGreenPhone')?.patchValue(row.insuranceGreenPhone);
                          field.form?.get('insuranceOpenAccidentPhone')?.patchValue(row.insuranceOpenAccidentPhone);
                          field.form?.get('insuranceUseAgency')?.patchValue(row.insuranceUseAgency);
                          this.selectedInsurance = row;
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceDescription',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceDescription',
                  description: 'p_insuranceDescription_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceTypeOpenAccident',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceTypeOpenAccident',
                  description: 'p_insuranceTypeOpenAccident_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOpenAccidentPhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOpenAccidentPhone',
                  description: 'p_insuranceOpenAccidentPhone_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceGreenPhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceGreenPhone',
                  description: 'p_insuranceGreenPhone_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insurancePhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insurancePhone',
                  description: 'p_insurancePhone_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceMail',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceMail',
                  description: 'p_insuranceMail_Description',
                  required: false,
                  disabled: true,
                },
              },
              /*{
                wrappers: ['newline'],
              },*/
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceUseAgency',
                type: 'input',

                props: {
                  translate: true,
                  label: 'p_insuranceUseAgency',
                  description: 'p_insuranceUseAgency',
                  required: false,
                  disabled: true,
                },
              },
              /*
             {
                wrappers: ['newline'],
              },
              */
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selectedinsuranceLimitsAndDeductible',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedinsuranceLimitsAndDeductible_Description',
                  label: ' ',
                  options: [],
                  labelToShow: ['insuranceLimitsAndDeductibleType', 'insuranceLimitsAndDeductibleDescription'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selectedinsuranceLimitsAndDeductible');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('insuranceLimitsAndDeductibleDescription')?.patchValue(null);
                        field.form?.get('insuranceLimitsAndDeductibleType')?.patchValue(null);
                        field.form?.get('insuranceLimitsAndDeductibleTypeYearly')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/insuranceLimitsAndDeductible/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let limitsAndDeductible = x['data'];
                          let row = limitsAndDeductible;
                          field.form?.get('insuranceLimitsAndDeductibleDescription')?.patchValue(row.insuranceLimitsAndDeductibleDescription);
                          field.form?.get('insuranceLimitsAndDeductibleType')?.patchValue(row.insuranceLimitsAndDeductibleType);
                          field.form?.get('insuranceLimitsAndDeductibleTypeYearly')?.patchValue(row.insuranceLimitsAndDeductibleTypeYearly);
                          this.selectedinsuranceLimitsAndDeductible = row;
                        });
                      }
                    });

                    const controInsurance = this.form.get('selectedInsurance');
                    controInsurance?.valueChanges.subscribe(async (selectedValue: string) => {
                      const insurance = this.form.get('selectedInsurance');
                      const insuranceId = insurance?.value;
                      if (insuranceId) {
                        this.http.get<any>('api/items/insuranceLimitsAndDeductible').subscribe(response => {
                          let x = response.data;
                          const insurance = this.form.get('selectedInsurance');
                          const insuranceId = insurance?.value;
                          console.log(insuranceId);
                          console.log(x);
                          const filteredData = x.filter((item: any) => item.insuranceLimitsAndDeductibleAssosiationTo === insuranceId);
                          console.log(filteredData);

                          if (field && field.props?.options) {
                            field.props.options = filteredData;
                          }
                        });
                      } else {
                        if (field && field.props?.options) {
                          field.props.options = [];
                        }
                      }
                    });
                  },
                  afterViewInit: field => {},
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceLimitsAndDeductibleDescription',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceLimitsAndDeductibleDescription',
                  description: 'p_insuranceLimitsAndDeductibleDescription_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceLimitsAndDeductibleType',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceLimitsAndDeductibleType',
                  description: 'p_insuranceLimitsAndDeductibleType_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceLimitsAndDeductibleTypeYearly',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceLimitsAndDeductibleTypeYearly',
                  description: 'p_insuranceLimitsAndDeductibleTypeYearly_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: 'w-full h-6', // Classe per far sì che l'HR occupi tutta la larghezza del form
                template: '<hr>',
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceCode',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceCode',
                  description: 'p_insuranceCode_Description',
                  required: false,
                  disabled: false,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceExpiration',
                type: 'datepicker',
                props: {
                  translate: true,
                  label: 'p_insuranceExpiration',
                  description: 'p_insuranceExpiration_Description',
                  required: false,
                  disabled: false,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceSendAfterDate',
                type: 'datepicker',
                props: {
                  translate: true,
                  label: 'p_insuranceSendAfterDate',
                  description: 'p_insuranceSendAfterDate_Description',
                  required: false,
                  disabled: false,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceAccidenNumber',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceAccidentNumber',
                  description: 'p_insuranceAccidentNumber_Description',
                  required: false,
                  disabled: false,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceAccidentDate',
                type: 'datepicker',
                props: {
                  translate: true,
                  label: 'p_insuranceAccidentDate',
                  description: 'p_insuranceAccidentDate_Description',
                  required: false,
                  disabled: false,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceAccidentPlace',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceAccidentPlace',
                  description: 'p_insuranceAccidentPlace_Description',
                  required: false,
                  disabled: false,
                },
              },
              {
                className: 'w-full h-6', // Classe per far sì che l'HR occupi tutta la larghezza del form
                template: '<hr>',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selectedInsuranceOffice',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedAgency_Description',
                  label: ' ',
                  options: [],
                  labelToShow: ['insuranceOfficeDescription', 'insuranceOfficeTown'],
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selectedInsuranceOffice');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('insuranceOfficeDescription')?.patchValue(null);
                        field.form?.get('insuranceOfficeAddress')?.patchValue(null);
                        field.form?.get('insuranceOfficeTown')?.patchValue(null);
                        field.form?.get('insuranceOfficeZip')?.patchValue(null);
                        field.form?.get('insuranceOfficeProvince')?.patchValue(null);
                        field.form?.get('insuranceOfficePhone')?.patchValue(null);
                        field.form?.get('insuranceOfficeEmail')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/insurancesOffices/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let agency = x['data'];
                          let row = agency;
                          field.form?.get('insuranceOfficeDescription')?.patchValue(row.insuranceOfficeDescription);
                          field.form?.get('insuranceOfficeAddress')?.patchValue(row.insuranceOfficeAddress);
                          field.form?.get('insuranceOfficeTown')?.patchValue(row.insuranceOfficeTown);
                          field.form?.get('insuranceOfficeZip')?.patchValue(row.insuranceOfficeZip);
                          field.form?.get('insuranceOfficeProvince')?.patchValue(row.insuranceOfficeProvince);
                          field.form?.get('insuranceOfficePhone')?.patchValue(row.insuranceOfficePhone);
                          field.form?.get('insuranceOfficeEmail')?.patchValue(row.insuranceOfficeEmail);
                          this.selectedInsuranceOffice = row;
                        });
                      }
                    });

                    const controInsurance = this.form.get('selectedInsurance');
                    controInsurance?.valueChanges.subscribe(async (selectedValue: string) => {
                      const insurance = this.form.get('selectedInsurance');
                      const insuranceId = insurance?.value;
                      if (insuranceId) {
                        this.http.get<any>('api/items/insurancesOffices').subscribe(response => {
                          let x = response.data;
                          const insurance = this.form.get('selectedInsurance');
                          const insuranceId = insurance?.value;
                          console.log(insuranceId);
                          console.log(x);
                          const filteredData = x.filter((item: any) => item.insuranceOfficeAssociatedTo === insuranceId);
                          console.log(filteredData);

                          if (field && field.props?.options) {
                            field.props.options = filteredData;
                          }
                        });
                      } else {
                        if (field && field.props?.options) {
                          field.props.options = [];
                        }
                      }
                    });
                  },
                  afterViewInit: field => {},
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficeDescription',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOfficeyDescription',
                  description: 'p_insuranceOfficeDescription_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficeAddress',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOfficeAddress',
                  description: 'p_insuranceOfficeAddress_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficeTown',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agencyTown',
                  description: 'p_insuranceOfficeTown_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficeZip',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOfficeZip',
                  description: 'p_insuranceOfficeZip_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficeProvince',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOfficeProvince',
                  description: 'p_insuranceOfficeProvince_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficePhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOfficePhone',
                  description: 'p_insuranceOfficePhone_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'insuranceOfficeEmail',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_insuranceOfficeEmail',
                  description: 'p_agencyEmail_Description',
                  required: false,
                  disabled: true,
                },
                hideExpression: 'model.insuranceUseAgency == "false"',
              },
            ],
          },
          {
            props: {
              translate: true,
              label: 'point',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('point'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'selectedPoint',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedPoint_Description',
                  label: ' ',
                  options: this.http.get<[]>('api/items/points'),
                  labelToShow: ['pointDescription', 'pointTown', 'pointInternalCodification'],
                },
                hooks: {
                  onInit: field => {
                    //const insuranceControl = this.form.get('selectedInsurance');
                    const control = this.form.get('selectedPoint');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('pointType')?.patchValue(null);
                        field.form?.get('pointInternalCodification')?.patchValue(null);
                        field.form?.get('pointDescription')?.patchValue(null);
                        field.form?.get('pointAddress')?.patchValue(null);
                        field.form?.get('pointTown')?.patchValue(null);
                        field.form?.get('pointZip')?.patchValue(null);
                        field.form?.get('pointProvince')?.patchValue(null);
                        field.form?.get('pointPhone')?.patchValue(null);
                        field.form?.get('pointRefererName')?.patchValue(null);
                        field.form?.get('pointRefererPhone')?.patchValue(null);
                        field.form?.get('pointCommercialRefererName')?.patchValue(null);
                        field.form?.get('selectedAgent')?.patchValue(null);
                        field.form?.get('agentType')?.patchValue(null);
                        field.form?.get('agentDescription')?.patchValue(null);
                        field.form?.get('agentAddress')?.patchValue(null);
                        field.form?.get('agentTown')?.patchValue(null);
                        field.form?.get('agentZip')?.patchValue(null);
                        field.form?.get('agentProvince')?.patchValue(null);
                        field.form?.get('agentPhone')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/points/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let points = x['data'];
                          let row = points;
                          console.log(row);
                          field.form?.get('pointType')?.patchValue(row.pointType);
                          field.form?.get('pointInternalCodification')?.patchValue(row.pointInternalCodification);
                          field.form?.get('pointDescription')?.patchValue(row.pointDescription);
                          field.form?.get('pointAddress')?.patchValue(row.pointAddress);
                          field.form?.get('pointTown')?.patchValue(row.pointTown);
                          field.form?.get('pointZip')?.patchValue(row.pointZip);
                          field.form?.get('pointProvince')?.patchValue(row.pointProvince);
                          field.form?.get('pointPhone')?.patchValue(row.pointPhone);
                          field.form?.get('pointRefererName')?.patchValue(row.pointRefererName);
                          field.form?.get('pointRefererPhone')?.patchValue(row.pointRefererPhone);
                          field.form?.get('pointCommercialRefererName')?.patchValue(row.pointCommercialRefererName);
                          field.form?.get('selectedAgent')?.patchValue(null);
                          field.form?.get('agentType')?.patchValue(null);
                          field.form?.get('agentDescription')?.patchValue(null);
                          field.form?.get('agentAddress')?.patchValue(null);
                          field.form?.get('agentTown')?.patchValue(null);
                          field.form?.get('agentZip')?.patchValue(null);
                          field.form?.get('agentProvince')?.patchValue(null);
                          field.form?.get('agentPhone')?.patchValue(null);
                          this.selectedPoint = row;
                        });
                      }
                    });
                  },
                },
              },
              /*{
                wrappers: ['newline'],
              },*/
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointDescription',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointDescription',
                  description: 'p_pointDescription_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointType',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointType',
                  description: 'p_pointType_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointInternalCodification',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointInternalCodification',
                  description: 'p_pointInternalCodification_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointAddress',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointAddress',
                  description: 'p_pointAddress_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointTown',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointTown',
                  description: 'p_pointTown_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointZip',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointZip',
                  description: 'p_pointZip_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointPhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointPhone',
                  description: 'p_pointPhone_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointRefererName',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointRefererName',
                  description: 'p_pointRefererName_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointRefererPhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointRefererPhone',
                  description: 'p_pointRefererPhone_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointCommercialRefererName',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointCommercialRefererName',
                  description: 'p_pointCommercialRefererName_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'pointCommercialRefererPhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_pointCommercialRefererPhone',
                  description: 'p_pointCommercialRefererPhone_Description',
                  required: false,
                  disabled: true,
                },
              },
            ],
          },
          {
            props: {
              translate: true,
              label: 'agent',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('agent'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'selectedAgent',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedAgent_Description',
                  label: ' ',
                  options: this.brokers,
                  labelToShow: ['agentType', 'agentDescription', 'agentTown'],
                },
                hooks: {
                  onInit: field => {
                    this.http.get<any[]>('api/items/agents').subscribe((data: any[]) => {
                      let x: any = data; // Assign the array received from the API to this.Options
                      let result = x['data'];
                      let brokers = result.filter((agent: { agentType: string }) => agent.agentType === 'Broker');
                      if (field && field.props?.options) {
                        field.props.options = brokers;
                        console.log('BROKERS TESTA', brokers);
                      }
                    });

                    const control = this.form.get('selectedAgent');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        //field.form?.get('id')?.patchValue(null);
                        field.form?.get('agentType')?.patchValue(null);
                        field.form?.get('agentDescription')?.patchValue(null);
                        field.form?.get('agentAddress')?.patchValue(null);
                        field.form?.get('agentTown')?.patchValue(null);
                        field.form?.get('agentZip')?.patchValue(null);
                        field.form?.get('agentProvince')?.patchValue(null);
                        field.form?.get('agentPhone')?.patchValue(null);

                      } else {
                        this.http.get<[]>('api/items/agents/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let agents = x['data'];
                          let row = agents;
                          console.log(row);
                          //field.form?.get('id')?.patchValue(row.id);
                          field.form?.get('agentType')?.patchValue(row.agentType);
                          field.form?.get('agentDescription')?.patchValue(row.agentDescription);
                          field.form?.get('agentAddress')?.patchValue(row.agentAddress);
                          field.form?.get('agentTown')?.patchValue(row.agentTown);
                          field.form?.get('agentZip')?.patchValue(row.agentZip);
                          field.form?.get('agentProvince')?.patchValue(row.agentProvince);
                          field.form?.get('agentPhone')?.patchValue(row.agentPhone);
                          this.selectedAgent = row;
                        });
                      }
                    });

                    const controInsurance = this.form.get('selectedPoint');
                    controInsurance?.valueChanges.subscribe(async (selectedValue: string) => {
                      const point = this.form.get('selectedPoint');
                      const pointId = point?.value;
                      if (pointId) {
                        this.http.get<any>('api/items/agents').subscribe(response => {
                          let x = response.data;
                          const point = this.form.get('selectedPoint');
                          const pointId = point?.value;
                          console.log(pointId);
                          console.log(x);
                          const filteredData = x.filter((item: any) => item.agentAssociatedTo === pointId);
                          console.log(filteredData);

                          if (field && field.props?.options) {
                            field.props.options = filteredData;
                          }
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'agentType',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agentType',
                  description: 'p_agentType_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'agentDescription',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agentDescription',
                  description: 'p_agentDescriptionn_Description',
                  required: true,
                  disabled: true,
                },
              },

              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'agentAddress',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agentAddress',
                  description: 'p_agentAddress_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'agentTown',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agentTown',
                  description: 'p_agentTown_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'agentZip',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agentZip',
                  description: 'p_agentZip_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
                key: 'agentPhone',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_agentPhone',
                  description: 'p_agentPhone_Description',
                  required: false,
                  disabled: true,
                },
              },
            ],
          },
          {
            props: {
              translate: true,
              label: 'inquiringSupplier',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('inquiringSupplier'),
            },
          },
          {
            props: {
              translate: true,
              label: 'supplier',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('supplier'),
            },
          },
          {
            props: {
              translate: true,
              label: 'fitter',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('fitter'),
            },
            fieldGroupClassName: 'flex flex-wrap p2',
            fieldGroup: [
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selecteFitter1',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedFitter1_Description',
                  label: ' ',
                  options: this.http.get<[]>('api/items/fitters'),
                  labelToShow: ['fitterDescription', 'fitterTown'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selecteFitter1');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('fitterDescription1')?.patchValue(null);
                        field.form?.get('fitterTown1')?.patchValue(null);
                        field.form?.get('fitterPhone1')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/fitters/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let fitters = x['data'];
                          let row = fitters;
                          console.log(row);
                          field.form?.get('fitterDescription1')?.patchValue(row.fitterDescription);
                          field.form?.get('fitterTown1')?.patchValue(row.fitterTown);
                          field.form?.get('fitterPhone1')?.patchValue(row.fitterPhone);
                          this.selectedFitter1 = row;
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterDescription1',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterDescription1',
                  description: 'p_fitterDescription1_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterTown1',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterTown1',
                  description: 'p_fitterTown1_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterPhone1',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterPhone1',
                  description: 'p_fitterPhone_Description1',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selecteFitter2',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedFitter2_Description',
                  label: ' ',
                  options: this.http.get<[]>('api/items/fitters'),
                  labelToShow: ['fitterDescription', 'fitterTown'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selecteFitter2');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('fitterDescription2')?.patchValue(null);
                        field.form?.get('fitterTown2')?.patchValue(null);
                        field.form?.get('fitterPhone2')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/fitters/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let fitters = x['data'];
                          let row = fitters;
                          console.log(row);
                          field.form?.get('fitterDescription2')?.patchValue(row.fitterDescription);
                          field.form?.get('fitterTown2')?.patchValue(row.fitterTown);
                          field.form?.get('fitterPhone2')?.patchValue(row.fitterPhone);
                          this.selectedFitter2 = row;
                        });
                      }
                    });
                  },
                },
              },

              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterDescription2',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterDescription2',
                  description: 'p_fitterDescription2_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterTown2',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterTown2',
                  description: 'p_fitterTown2_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterPhone2',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterPhone2',
                  description: 'p_fitterPhone2_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selecteFitter3',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedFitter3_Description',
                  label: ' ',
                  options: this.http.get<[]>('api/items/fitters'),
                  labelToShow: ['fitterDescription', 'fitterTown'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selecteFitter3');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('fitterDescription3')?.patchValue(null);
                        field.form?.get('fitterTown3')?.patchValue(null);
                        field.form?.get('fitterPhone3')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/fitters/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let fitters = x['data'];
                          let row = fitters;
                          console.log(row);
                          field.form?.get('fitterDescription3')?.patchValue(row.fitterDescription);
                          field.form?.get('fitterTown3')?.patchValue(row.fitterTown);
                          field.form?.get('fitterPhone3')?.patchValue(row.fitterPhone);
                          this.selectedFitter3 = row;
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterDescription3',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterDescription3',
                  description: 'p_fitterDescriptionn3_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterTown3',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterTown3',
                  description: 'p_fitterTown3_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterPhone3',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterPhone3',
                  description: 'p_fitterPhone3_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'selecteFitter4',
                type: 'headtype',
                props: {
                  translate: true,
                  description: 'p_selectedFitter4_Description',
                  label: ' ',
                  options: this.http.get<[]>('api/items/fitters'),
                  labelToShow: ['fitterDescription', 'fitterTown'],
                },
                hooks: {
                  onInit: field => {
                    const control = this.form.get('selecteFitter4');
                    control?.valueChanges.subscribe(async (selectedValue: string) => {
                      if (selectedValue == undefined) {
                        field.form?.get('fitterDescription3')?.patchValue(null);
                        field.form?.get('fitterTown3')?.patchValue(null);
                        field.form?.get('fitterPhone3')?.patchValue(null);
                      } else {
                        this.http.get<[]>('api/items/fitters/' + selectedValue).subscribe((data: any[]) => {
                          let x: any = data; // Assign the array received from the API to this.Options
                          let fitters = x['data'];
                          let row = fitters;
                          console.log(row);
                          field.form?.get('fitterDescription4')?.patchValue(row.fitterDescription);
                          field.form?.get('fitterTown4')?.patchValue(row.fitterTown);
                          field.form?.get('fitterPhone4')?.patchValue(row.fitterPhone);
                          this.selectedFitter4 = row;
                        });
                      }
                    });
                  },
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterDescription4',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterDescription4',
                  description: 'p_fitterDescription4_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterTown4',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterTown4',
                  description: 'p_fitterTown4_Description',
                  required: false,
                  disabled: true,
                },
              },
              {
                className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
                key: 'fitterPhone4',
                type: 'input',
                props: {
                  translate: true,
                  label: 'p_fitterPhone4',
                  description: 'p_fitterPhone_Description4',
                  required: false,
                  disabled: true,
                },
              },
            ],
          },
          {
            props: {
              translate: true,
              label: 'activityPlanning',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('activityPlanning'),
            },
          },
          {
            props: {
              translate: true,
              label: 'darkering',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('darkering'),
            },
          },
          {
            props: {
              translate: true,
              label: 'documents',
            },
            expressionProperties: {
              'props.label': () => this.translationService.instant('documents'),
            },
            fieldGroup: [
              {
                key: 'file',
                type: 'file-upload',
                props: {
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
  }
}

// ##################################################################

@Component({
  selector: 'dialog-data-dialog',
  templateUrl: 'matDialogAlert.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class DialogDataDialog {
  data = inject(MAT_DIALOG_DATA);
}
