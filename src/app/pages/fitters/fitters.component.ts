import { AppModule } from './../../app.module';
import { Element } from './../customers/element';
import { AutoResizeColumnsDirective } from './../../components/mdtable/auto-resize-columns.directive';
import { Component, OnInit, Input, ViewChild, NgModule, Inject } from '@angular/core';
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
import { FormlyMaterialModule } from '@ngx-formly/material';
import { of } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AutocompleteTypeModule } from '../../components/formly-autocomplete/autocomplete-type.component';
import { FileTypeModule } from '../../components/formly-fileType/file-type.component';
import { DialogDeleteComponent } from '../../components/mdtable/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-fitters',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
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
    FileTypeModule,
  ],
  templateUrl: './fitters.component.html',
  styleUrl: './fitters.component.scss',
})
export class FittersComponent implements OnInit {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  constructor(
    public dialog: MatDialog,
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

  datashow = [
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
    'fitterWorkOnSaturday',
    'fitterWorkOnSunday',
    'fitterCommissionsPercentual',
    'fitterCommissionsFixedOn',
    'fitterMileageReimbursement',
    'fitterVATCode',
    'fitterTAXCode',
    'fitterVAT',
    'fitterIBAN',
  ];

  datacolumns = [
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
    'fitterWorkOnSaturday',
    'fitterWorkOnSunday',
    'fitterCommissionsPercentual',
    'fitterCommissionsFixedOn',
    'fitterMileageReimbursement',
    'fitterVATCode',
    'fitterTAXCode',
    'fitterVAT',
    'fitterIBAN',
  ];

  dataconfig = ['add', 'search', 'columns', 'reload'];
  localStorageMDTable: string = 'fitterTable';

  selectedObj: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};
  pending: boolean = false;
  expandedElement: any | null = null;
  elementToDelete: any;

  ////////////////////////////////////////////
  // Preset Formly
  ////////////////////////////////////////////
  public formEdit = new FormGroup({});
  public optionsEdit: FormlyFormOptions = {};

  public modelEdit: any = {
    companyId: 1,
    companyName: 'Cristallo srls',
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
    fitterCommissionsPercentual: 0,
    fitterCommissionsFixedOn: 0,
    fitterWorkOnSaturday: '0',
    fitterWorkOnSunday: '0',
    fitterMileageReimbursement: 0,
    fitterVATCode: '',
    fitterTAXCode: '',
    fitterVAT: 22,
    fitterIBAN: '',
    status: 'published',
  };

  public formNew = new FormGroup({});
  public optionsNew: FormlyFormOptions = {};
  public modelNew: any = {
    companyId: 1,
    companyName: 'Cristallo srls',
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
    fitterCommissionsPercentual: 0,
    fitterCommissionsFixedOn: 50,
    fitterWorkOnSaturday: '0',
    fitterWorkOnSunday: '0',
    fitterMileageReimbursement: 10,
    fitterVATCode: '',
    fitterTAXCode: '',
    fitterVAT: 22,
    fitterIBAN: '',
    status: 'published',
  };

  //////////////////////////////////////////////////////
  // Definition Form Formly
  //////////////////////////////////////////////////////
  // w-1/2 w-1/3 w-1/4 w-1/5 w-1/6 w-1/12 Columns
  public fieldsEdit: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-wrap p2',
      fieldGroup: [
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterDescription',
          type: 'input',
          templateOptions: {
            translate: true,
            label: '',
            placeholder: '',
            required: false,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 4,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 5,
            maxLenght: 5,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 2,
            maxLength: 4,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 10,
            description: '',
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
            label: '',
            placeholder: '',
            description: '',
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
            description: '',
            placeholder: '',
            label: '',
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
            description: '',
            placeholder: '',
            label: '',
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
            description: '',
            placeholder: '',
            label: '',
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
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterMileageReimbursement',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 2,
          },
          validation: {
            messages: {
              pattern: 'Amount of Reimbursement KM',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterMileageReimbursement_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterMileageReimbursement_description'),
            'templateOptions.label': () => this.translate.instant('fitterMileageReimbursement_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2  sm:w-1/2',
          key: 'fitterWorkOnSaturday',
          type: 'checkbox',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterWorkOnSaturday_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterWorkOnSaturday_description'),
            'templateOptions.label': () => this.translate.instant('fitterWorkOnSaturday_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2  sm:w-1/2',
          key: 'fitterWorkOnSunday',
          type: 'checkbox',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterWorkOnSunday_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterWorkOnSunday_description'),
            'templateOptions.label': () => this.translate.instant('fitterWorkOnSunday_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterCommissionsPercentual',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 2,
          },
          validation: {
            messages: {
              pattern: 'Amount Commission %',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCommissionsPercentual_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCommissionsPercentual_description'),
            'templateOptions.label': () => this.translate.instant('fitterCommissionsPercentual_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterCommissionsFixedOn',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 3,
          },
          validation: {
            messages: {
              pattern: 'Amount Commission fitterCommissionsFixedOn',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCommissionsFixedOn_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCommissionsFixedOn_description'),
            'templateOptions.label': () => this.translate.instant('fitterCommissionsFixedOn_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitteVATCode',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'text',
            maxLength: 11,
          },
          validation: {
            messages: {
              pattern: 'Fitter VatCode',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterVatCode_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterVatCode_description'),
            'templateOptions.label': () => this.translate.instant('fitterVatCode_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterTAXCode',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'text',
            maxLength: 16,
          },
          validation: {
            messages: {
              pattern: 'Fitter TaxCode',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterTaxCode_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterTaxCode_description'),
            'templateOptions.label': () => this.translate.instant('fitterTaxCode_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterVAT',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 2,
          },
          validation: {
            messages: {
              pattern: 'Fitter Vat',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterVat_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterVat_description'),
            'templateOptions.label': () => this.translate.instant('fitterVat_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterIBAN',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'text',
            maxLength: 27,
          },
          validation: {
            messages: {
              pattern: 'Fitter IBAN',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterIban_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterIban_description'),
            'templateOptions.label': () => this.translate.instant('fitterIban_insert_label'),
          },
        },
      ],
    },
  ];

  public fieldsNew: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'flex flex-wrap p2',
      fieldGroup: [
        {
          className: '2xl:w-1/2 px-2 sm:w-full',
          key: 'fitterDescription',
          type: 'input',
          templateOptions: {
            translate: true,
            label: '',
            placeholder: '',
            required: false,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 4,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 5,
            description: '',
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
            label: '',
            placeholder: '',
            required: false,
            type: 'text',
            minLength: 2,
            maxLength: 4,
            description: '',
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
            label: '',
            placeholder: '',
            required: true,
            type: 'text',
            minLength: 10,
            description: '',
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
            label: '',
            placeholder: '',
            description: '',
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
            description: '',
            placeholder: '',
            label: '',
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
            description: '',
            placeholder: '',
            label: '',
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
            description: '',
            placeholder: '',
            label: '',
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
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterMileageReimbursement',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 2,
          },
          validation: {
            messages: {
              pattern: 'Amount of Reimbursement KM',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterMileageReimbursement_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterMileageReimbursement_description'),
            'templateOptions.label': () => this.translate.instant('fitterMileageReimbursement_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2  sm:w-1/2',
          key: 'fitterWorkOnSaturday',
          type: 'checkbox',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterWorkOnSaturday_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterWorkOnSaturday_description'),
            'templateOptions.label': () => this.translate.instant('fitterWorkOnSaturday_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2  sm:w-1/2',
          key: 'fitterWorkOnSunday',
          type: 'checkbox',
          templateOptions: {
            //appearance: 'outline',
            translate: true,
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterWorkOnSunday_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterWorkOnSunday_description'),
            'templateOptions.label': () => this.translate.instant('fitterWorkOnSunday_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterCommissionsPercentual',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 2,
          },
          validation: {
            messages: {
              pattern: 'Amount Commission %',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCommissionsPercentual_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCommissionsPercentual_description'),
            'templateOptions.label': () => this.translate.instant('fitterCommissionsPercentual_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterCommissionsFixedOn',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 3,
          },
          validation: {
            messages: {
              pattern: 'Amount Commission fitterCommissionsFixedOn',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterCommissionsFixedOn_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterCommissionsFixedOn_description'),
            'templateOptions.label': () => this.translate.instant('fitterCommissionsFixedOn_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitteVATCode',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'text',
            maxLength: 11,
          },
          validation: {
            messages: {
              pattern: 'Fitter VatCode',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterVatCode_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterVatCode_description'),
            'templateOptions.label': () => this.translate.instant('fitterVatCode_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterTAXCode',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'text',
            maxLength: 16,
          },
          validation: {
            messages: {
              pattern: 'Fitter TaxCode',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterTaxCode_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterTaxCode_description'),
            'templateOptions.label': () => this.translate.instant('fitterTaxCode_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterVAT',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'number',
            maxLength: 2,
          },
          validation: {
            messages: {
              pattern: 'Fitter Vat',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterVat_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterVat_description'),
            'templateOptions.label': () => this.translate.instant('fitterVat_insert_label'),
          },
        },

        {
          className: '2xl:w-1/2 px-2 sm:w-1/2',
          key: 'fitterIBAN',
          type: 'input',
          templateOptions: {
            translate: true,
            description: '',
            placeholder: '',
            label: '',
            required: false,
            type: 'text',
            maxLength: 27,
          },
          validation: {
            messages: {
              pattern: 'Fitter IBAN',
            },
          },
          expressionProperties: {
            'templateOptions.placeholder': () => this.translate.instant('fitterIban_placeholder'),
            'templateOptions.description': () => this.translate.instant('fitterIban_description'),
            'templateOptions.label': () => this.translate.instant('fitterIban_insert_label'),
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
    console.log('====== Aggiorno ======');
    if (this.formEdit.valid) {
      // List the properties that you want to include in the submitted data
      const keysToInclude = [
        'id',
        'companyId',
        'companyName',
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
        'fitterWorkOnSaturday',
        'fitterWorkOnSunday',
        'fitterCommissionsPercentual',
        'fitterCommissionsFixedOn',
        'fitterMileageReimbursement',
        'fitterVATCode',
        'fitterTAXCode',
        'fitterVAT',
        'fitterIBAN',
        'status',
      ];
      console.log(this.formEdit);
      // Build an object with only the selected keys
      let submittedData: any = {};
      keysToInclude.forEach(key => {
        if (this.modelEdit.hasOwnProperty(key)) {
          submittedData[key] = this.modelEdit[key];
        }
      });
      console.log('AGGIORNO');
      console.log(JSON.stringify(submittedData)); // model data to update
      console.log(submittedData.id);
      this.updateRestapi('fitters', submittedData.id, submittedData);
      this.draweredit.toggle();
      this.refreshMdTable();
    }
  }

  onSubmitAdd() {
    console.log('====== Inserisco ======');
    if (this.formNew.valid) {
      // List the properties that you want to include in the submitted data
      const keysToInclude = [
        'companyId',
        'companyName',
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
        'fitterWorkOnSaturday',
        'fitterWorkOnSunday',
        'fitterCommissionsPercentual',
        'fitterCommissionsFixedOn',
        'fitterMileageReimbursement',
        'fitterVATCode',
        'fitterTAXCode',
        'fitterVAT',
        'fitterIBAN',
        'status',
      ];
      console.log(this.formNew);
      // Build an object with only the selected keys
      let submittedData: any = {};
      keysToInclude.forEach(key => {
        if (this.modelNew.hasOwnProperty(key)) {
          submittedData[key] = this.modelNew[key];
        }
      });
      console.log('INSERISCO');
      this.addPropertyToDataOnInsert();
      console.log(JSON.stringify(submittedData)); // model data to insert
      this.addRestapi('fitters', submittedData);
      this.draweradd.toggle();
      this.refreshMdTable();
    }
  }

  getOptions(): Observable<any[]> {
    return this.dataFleet.asObservable();
  }

  // Actions returned from MdTable
  fromMdtableChild(eventData: any) {
    console.log('Received from Mdtable:', eventData);

    if (eventData.actionRequest == 'open') {
      //// Leggi Dati Flotta /////
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
      this.modelEdit = eventData.element;
      this.selectedObj = eventData.element;
      this.draweredit.toggle();
    }

    if (eventData.actionRequest == 'add') {
      //// Leggi Dati Flotta /////
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
      this.draweradd.toggle();
      this.modelEdit = this.selectedObj;
    }

    if (eventData.actionRequest == 'delete') {
      this.elementToDelete = eventData.element;
      console.log('Arrivata richiesta di cancellazione apro dialog per :', eventData.element);
      this.openDeleteDialog();
    }

    if (eventData.actionRequest == 'paginator') {
      console.log('Cambio Pagina');
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.componentInstance.deleteEvent.subscribe(() => {
      console.log('Confermata cancellazione');
      this.deleteRestapi('fitters', this.elementToDelete.id);
      console.log('Cancellazione Effettuata');
      this.refreshMdTable();
    });
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
  /*
  getValueFromSelected(variable: string) {
    let propertyName = variable;
    if (propertyName in this.selectedObj) {
      let propertyValue = this.selectedObj[propertyName];
      return propertyValue;
    }
  }*/

  
  // Asynchronous function to await mseconds
  async waitSeconds(mseconds:number) {
    console.log('Start'); // Log a message before waiting
    await this.delay(mseconds); // Wait for 2000 milliseconds (2 seconds)
    console.log('End'); // Log a message after the 2-second delay
  }
  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Reload Table from RestAPI
  refreshMdTable() {

    this.waitSeconds(4000)

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

  // Delete Fitter
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
        this.datasource = Fitters['data'];
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
        console.log(this.fullDataFleet);
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
