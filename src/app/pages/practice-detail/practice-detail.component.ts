import { tap } from 'rxjs/operators';
import { VehiclesComponent } from './../vehicles/vehicles.component';
import { Observable } from 'rxjs';
import { AccordionTypeComponent } from './../../accordions.type';
import { state, transition } from '@angular/animations';
import { OnInit, VERSION, AfterViewInit, ChangeDetectionStrategy,ChangeDetectorRef, OnChanges } from '@angular/core';
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
  model: any = {
    practiceStatus: '',
    practiceType: '-',
    practiceOrigin: '',
    practiceEmailOrigin: '',
    practiceWhatsappNumberOrigin: '',
    practiceCode: '',
    practiceDate: '',
    practiceDescription: '',
    practiceNote: '',
    practiceAdministrationNote: '',
  };

  oprions: any;

  data: any[] = [];

  selectedObj: any;
  backgroundColor = '';
  foregroundColor = '';
  brightness = 0;
  formData: any = {};
  pending: boolean = false;
  practiceNumber: any;

  allCustomers: string[] = [];
  tempResult: any[] = [];

  dialogIsOpen = false;
  alertMessage = '';

  time = new Date();
  intervalId: any;

  selectedPoint: any;
  selectedVehicleModel: any;
  selectedVehicle: any;
  selectedAgent: any;
  selectedBroker: any;
  selectedSupplier: any;
  selectedCustomer: any;
  selectedInsurance: any;
  selectedInsuranceOffice: any;
  selectedPointWorkPlace: any;
  selectedFitter1: any;
  selectedFitter2: any;
  selectedFitter3: any;
  selectedFitter4: any;
  selectedFitter5: any;

  counter: any = null;
  firstload = true;

  today = new Date();
  todayAsStr = `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`;

  fields: FormlyFieldConfig[] = [
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
                'props.label': () => this.translationService.instant('p_practiceType'),
                'props.description': () => this.translationService.instant('p_practiceTypeDescription'),
              },
              expressions: {
                'props.disabled': (field: FormlyFieldConfig) => {
                    if (field.model.practiceType == '-') {
                      return false;
                    } else {
                      return true;
                    } 
                  }
                }
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
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
                  {
                    label: 'p_practiceStatus_Call',
                    value: 'CA',
                  },
                  {
                    label: 'p_practiceStatus_awaitPoint',
                    value: 'AP',
                  },
                  {
                    label: 'p_practiceStatus_Await',
                    value: 'AT',
                  },
                  {
                    label: 'p_practiceStatus_ToOrder',
                    value: 'DO',
                  },
                  {
                    label: 'p_practiceStatus_Ordered',
                    value: 'OR',
                  },
                  {
                    label: 'p_practiceStatus_MissingDocuments',
                    value: 'MD',
                  },
                  {
                    label: 'p_practiceStatus_LaborOnly',
                    value: 'MA',
                  },
                  {
                    label: 'p_practiceStatus_PreventiveToSend',
                    value: 'PD',
                  },
                  {
                    label: 'p_practiceStatus_NotForward',
                    value: 'NP',
                  },
                ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
              },
              expressionProperties: {
                'props.label': () => this.translationService.instant('p_practiceStatus'),
                'props.description': () => this.translationService.instant('p_practiceStatusDescription'),
              },
              hooks: {
                onInit: field => {
                  
                  if(field) {
                    const formControl = field?.form?.get('practiceType');
                    if (formControl) {
                      const options = this.getOptionsBasedOnPracticeType(formControl.value);
                      if (field.props) {
                          field.props.options = options;
                      } else {
                          field.props = { options };
                      }
                  }
                  }
                },
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'practiceCode',
              type: 'input',
              defaultValue: this.translationService.instant('newPractice'),
              props: {
                type: 'text',
                label: '',
                required: false,
                disabled: true,
                description: '',
              },
              expressionProperties: {
                'props.label': () => this.translationService.instant('p_practiceCode'),
                'props.description': () => this.translationService.instant('p_practiceCodeDescription'),
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
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'practiceDate',
              type: 'datepicker',
              props: {
                label: 'p_practiceDate',
                description: 'p_practiceDateDescription',
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
                'props.description': () => this.translationService.instant('p_practiceDateDescription'),
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
                'props.label': () => this.translationService.instant('p_practiceOrigin'),
                'props.description': () => this.translationService.instant('p_practiceOriginDescription'),
              },
            },
            {
              className: '2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full sm:w-full  px-2 ',
              key: 'practiceWhatsappNumberOrigin',
              type: 'input',
              props: {
                label: '',
                required: true,
                disabled: false,
                description: '',
                maskConfig: {
                  //mask: '000 000000000||+00 000 000000000',
                },
              },
              expressionProperties: {
                'props.label': () => this.translationService.instant('p_praticeWhatsappOriginNumbern'),
                'props.description': () => this.translationService.instant('p_praticeWhatsappOriginNumberDescription'),
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
                description: 'p_practiceEmailOriginDescription',
                maskConfig: {
                  //mask: "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                  //validation:true
                },
                //patterns: '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'
              },
              expressionProperties: {
                'props.label': () => this.translationService.instant('p_practiceEmailOrigin'),
                'props.description': () => this.translationService.instant('p_practiceEmailOriginDescription'),
              },
              expressions: { hide: 'model.practiceOrigin !== "email"' },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'practiceNote',
              type: 'textarea',
              props: {
                label: '',
                description: '',
                required: false,
                rows: 3,
              },
              expressionProperties: {
                'props.label': () => this.translationService.instant('p_practiceNote'),
                'props.description': () => this.translationService.instant('p_practiceNoteDescription'),
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
                'props.description': () => this.translationService.instant('p_practiceAdministrationNoteDescription'),
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
                'props.description': () => this.translationService.instant('p_practiceAlert'),
              },
            },
            { template: '<br>' },
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
              className: 'w-full  px-2 ',
              key: 'selectedAgent',
              type: 'headtype',
              props: {
                translate: true,
                description: 'p_selectedAgent_Description',
                label: ' ',
                options: this.http.get<[]>('api/items/agents'),
                labelToShow: ['agentType', 'agentDescription', 'agentTown'],
              },
              hooks: {
                onInit: field => {
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
                    this.http.get<[]>('api/items/agents/' + selectedValue).subscribe((data: any[]) => {
                      let x: any = data; // Assign the array received from the API to this.Options
                      let agents = x['data'];
                      let row = agents;
                      console.log(row);
                      field.form?.get('agentType')?.patchValue(row.agentType);
                      field.form?.get('agentDescription')?.patchValue(row.agentDescription);
                      field.form?.get('agentAddress')?.patchValue(row.agentAddress);
                      field.form?.get('agentTown')?.patchValue(row.agentTown);
                      field.form?.get('agentZip')?.patchValue(row.agentZip);
                      field.form?.get('agentProvince')?.patchValue(row.agentProvince);
                      field.form?.get('agentPhone')?.patchValue(row.agentPhone);
                      this.selectedAgent = row;
                    });
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
            label: 'vehicle',
          },
          expressionProperties: {
            'props.label': () => this.translationService.instant('vehicle'),
          },
          fieldGroupClassName: 'flex flex-wrap p2',
          fieldGroup: [
            {
              className: 'w-full  px-2 ',
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
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                  });
                },
              },
            },
            {
              className: '2xl:w-2/3 xl:w-2/3 lg:w-2/3 xs:w-full sm:w-full  px-2 ',
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
                ].map(option => ({ ...option, label: this.translationService.instant(option.label) })),
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
                    const control = field.formControl;

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
                  //############### Carica Options on vehicleBrand availability and Alert #####################
                  let brandControl = this.form.get('vehicleBrand'); //async
                  brandControl?.valueChanges.subscribe((changedValues: string) => {
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
                      const xoptions = filteredData.map((item: any) => ({ label: item.vehicleModel, value: item.id, alert: item.vehicleModelAlert }));
                      console.log(xoptions);
                      field.props!.options = [...xoptions];
                    });
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
            { template: '<br>' },
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
              className: 'w-full  px-2 ',
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
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                  });
                },
              },
            },
            {
              className: '2xl:full xl:w-full lg:w-full xs:w-full sm:w-full  px-2 ',
              key: 'customerType',
              type: 'radio',
              props: {
                translate: true,
                label: 'p_customerType',
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
            label: 'insurance',
          },
          expressionProperties: {
            'props.label': () => this.translationService.instant('insurance'),
          },
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
              className: 'w-full  px-2 ',
              key: 'selectedPoint',
              type: 'headtype',
              props: {
                translate: true,
                description: 'p_selectedPoint_Description',
                label: ' ',
                options: this.http.get<[]>('api/items/points'),
                labelToShow: ['pointDescription', 'pointInternalCodification', 'pointTown'],
              },
              hooks: {
                onInit: field => {
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                      field.form?.get('pointCommercialRefererPhone')?.patchValue(row.pointCommercialRefererPhone);
                      this.selectedPoint = row;
                    });
                  });
                },
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'pointDescription',
              type: 'input',
              props: {
                translate: true,
                label: 'p_pointDescription',
                description: 'p_pointDescription_Description',
                required: true,
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
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                required: true,
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
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                required: true,
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
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                required: true,
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
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
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
                required: true,
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
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'selecteFitter5',
              type: 'headtype',
              props: {
                translate: true,
                description: 'p_selectedFitter5_Description',
                label: ' ',
                options: this.http.get<[]>('api/items/fitters'),
                labelToShow: ['fitterDescription', 'fitterTown'],
              },
              hooks: {
                onInit: field => {
                  const control = field.formControl;
                  control?.valueChanges.subscribe(async (selectedValue: string) => {
                    this.http.get<[]>('api/items/fitters/' + selectedValue).subscribe((data: any[]) => {
                      let x: any = data; // Assign the array received from the API to this.Options
                      let fitters = x['data'];
                      let row = fitters;
                      console.log(row);
                      field.form?.get('fitterDescription5')?.patchValue(row.fitterDescription);
                      field.form?.get('fitterTown5')?.patchValue(row.fitterTown);
                      field.form?.get('fitterPhone5')?.patchValue(row.fitterPhone);
                      this.selectedFitter5 = row;
                    });
                  });
                },
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'fitterDescription5',
              type: 'input',
              props: {
                translate: true,
                label: 'p_fitterDescription',
                description: 'p_fitterDescriptionn_Description',
                required: true,
                disabled: true,
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'fitterTown5',
              type: 'input',
              props: {
                translate: true,
                label: 'p_fitterTown5',
                description: 'p_fitterTown5_Description',
                required: false,
                disabled: true,
              },
            },
            {
              className: '2xl:w-1/4 xl:w-1/4 lg:w-1/4 xs:w-full sm:w-full  px-2 ',
              key: 'fitterPhone5',
              type: 'input',
              props: {
                translate: true,
                label: 'p_fitterPhone5',
                description: 'p_fitterPhone5_Description',
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


  constructor(
    private http: HttpClient,
    private router: Router,
    public globalService: GlobalService,
    private translationService: TranslateService,
    private route: ActivatedRoute,
    private fbuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.pending = true;
    this.route.queryParams.subscribe(params => {
      console.log(params['practice']);
      this.practiceNumber = params['practice'];
    });

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    await this.getPractice(this.practiceNumber);

    this.subscribeGlobalsChanges();

    this.translationService.addLangs(['en', 'it']);
    this.translationService.setDefaultLang('it');

    /*this.http.get<any[]>('api/items/generalCounters').subscribe((counter: any) => {
      console.log((counter as { data: CounterData }).data.practiceCounter);
      this.counter = (counter as { data: CounterData }).data.practiceCounter;
      //const valueToPatch: never = undefined; // Specify the type of 'valueToPatch' as string
      // this.form?.get('praticeCode')?.patchValue(valueToPatch);
      //this.form?.get('vehicleType')?.patchValue(this.counter);
    })*/

    //const translations = this.generateTranslationKeys(this.fields);
    //console.log('JSON TRADUZIONE', translations);
  }

  AfterViewInit() {
    this.model = {};
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getOptionsBasedOnPracticeType(practiceType: string) {

    console.log("TIPO DI PRATICA -->",practiceType)
    
    let options = [];
    //let m = this.model.p_practiceType
    //console.log("TIPO DI PRATICA DA MODELLO-->",m)

    switch (practiceType) {
      case 'insurance':
        options = [
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
        ];
        break;
      case 'laboronly':
        options = [
          { label: 'p_practiceStatus_LaborOnly', value: 'MA' },
          { label: 'p_practiceStatus_PreventiveToSend', value: 'PD' },
        ];
        break;
      // Other cases
      default:
        options = [
          { label: 'p_practiceStatus_New', value: 'OP' },
        ];
    }
    // Traduci le etichette delle opzioni
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
      console.log(this.form)
      const typeval = this.form?.get('practiceType') as any;
      if (typeval) {
        console.log(typeval.value);
        typeval.setValue('-');
    }
      }
  }


  /*const field = this.form.getField('firstName');
      if (field && field.formControl) {
      field.formControl.setValue('John');
        }*/
  subscribeGlobalsChanges() {
    //################### check changes on vehicleModel ############################
    const vehicleModelControl = this.form.get('vehicleModel');
    if (vehicleModelControl) {
      vehicleModelControl.valueChanges.subscribe(formValue => {
        console.log(formValue);

        if (formValue && this.form.get('vehicleModel')) {
          console.log(this.form.get('vehicleModel'));

          const vehicleModelControl = this.form.get('vehicleModel');

          if (vehicleModelControl instanceof FormControl) {
            this.http.get<any>('api/items/vehicleModels').subscribe(response => {
              console.log(response.data);
              let x = response.data;
              const xoptions = x.map((item: any) => ({ label: item.vehicleModel, value: item.id, alert: item.vehicleModelAlert }));
              console.log(xoptions);

              const vehicleModelValue = vehicleModelControl.value;
              console.log('Vehicle Model changed:', vehicleModelValue);

              if (xoptions) {
                console.log(xoptions);
                console.log(vehicleModelValue);
                const filteredOptions = xoptions.filter((option: { value: any }) => option.value === vehicleModelValue);
                console.log(filteredOptions);
                if (!this.dialogIsOpen && filteredOptions.length > 0 && filteredOptions[0].alert !== null && filteredOptions[0].alert !== undefined) {
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
            });
          }
        }
      });
    }
    /*const practiceControl = this.form.get('practiceType');
    if (practiceControl) {
      practiceControl.valueChanges.subscribe(formValue => {
        console.log(formValue);
        console.log('Cambiato tipo pratica');
        if (this.firstload == false) {
        }
        this.firstload = false;
      });
    }*/
    //######################## End chack changes on vehicleModel ############################
  }

  filteredCustomers(input: string) {
    return this.allCustomers.filter((value: any) => value.toLowerCase().includes(input.toLowerCase()));
  }

  public feasability() {
    this.drawerright.toggle();
  }

  // ########################################################################
  // Remove all hidden fields from the field configuration temporarily
  removeHiddenFields(fields: FormlyFieldConfig[]): FormlyFieldConfig[] {
    return fields.filter(field => !field.hide);
  }
  // ########################################################################

  submit() {
    alert(JSON.stringify(this.model));
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
      if (this.selectedFitter5) console.log(this.selectedFitter5);
      if (this.selectedSupplier) console.log(this.selectedSupplier);
      if (this.selectedInsuranceOffice) console.log(this.selectedInsuranceOffice);
      if (this.selectedVehicle) console.log(this.selectedVehicle);
      if (this.selectedVehicleModel) console.log(this.selectedVehicleModel);
      if (this.selectedPointWorkPlace) console.log(this.selectedPointWorkPlace);
      console.log(this.model);
    }
  }

  openDialogCustom($event: Event) {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
    let minutes = now.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
    let timeString = `${hours}:${minutes}`;
    this.dialog.open(DialogDataDialog, {
      data: {
        alertMessage: timeString,
      },
    });
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
        //console.log(Practice['data']);
        this.model = {
          id: Practice['data']['id'],
          practiceStatus: Practice['data']['practiceStatus'],
          practiceType: Practice['data']['practiceType'],
          practiceOrigin: Practice['data']['practiceOrigin'],
          practiceEmailOrigin: Practice['data']['practiceEmailOrigin'],
          practiceWhatsappNumberOrigin: Practice['data']['practiceWhatsappNumberOrigin'],
          practiceDate: Practice['data']['practiceDate'],
          practiceCode: Practice['data']['practiceCode'],
          practiceNote: Practice['data']['practiceNote'],
          practiceAdministrationNote: Practice['data']['practiceAdministrationNote'],
          practiceAlert: Practice['data']['practiceAlert'],
        };
        if (Practice['data']['practiceAlert'] !== '') {

          if(!this.dialogIsOpen) {
            this.dialogIsOpen = true;
            this.dialog
              .open(DialogDataDialog, {
                data: {
                  alertMessage: Practice['data']['practiceAlert']
                },
              })
              .afterClosed()
              .subscribe(() => {
                this.dialogIsOpen = false;
              });
           }
           
          }

      });
  }

  ////////////////////////////////////////////////////////////////
  getCustomers(): Observable<any[]> {
    return this.http.get('api/items/customers').pipe(
      map((response: any) => {
        this.allCustomers = response['data'];
        return this.allCustomers;
      })
    );
  }
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
  // ##################################################################

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

}

@Component({
  selector: 'dialog-data-dialog',
  templateUrl: 'matDialogAlert.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class DialogDataDialog {
  data = inject(MAT_DIALOG_DATA);
}
