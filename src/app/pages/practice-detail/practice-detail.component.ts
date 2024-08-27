import { VehiclesComponent } from './../vehicles/vehicles.component';
import { Observable } from 'rxjs';
import { AccordionTypeComponent } from './../../accordions.type';
import { state, transition } from '@angular/animations';
import { OnInit, VERSION, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
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
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';
import { of } from 'rxjs';
import { map } from 'rxjs';
import { filter } from 'rxjs/operators';
import { response } from 'express';

import { MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface DialogData {
  alert: string;
}

@Component({
  selector: 'app-practice-detail',
  standalone: true,
  imports: [CommonModule, AppModule, NgxTranslateModule, MatDialogTitle, MatDialogContent],
  templateUrl: './practice-detail.component.html',
  styleUrl: './practice-detail.component.scss',
})
export class PracticeDetailComponent {
  @ViewChild('draweredit') draweredit!: MatDrawer;
  @ViewChild('draweradd') draweradd!: MatDrawer;

  form = new FormGroup({});
  model: any;
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

  showAlertDialog = false;
  alertMessage = '';

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
                    });
                  });
                },
              },
            },
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
                  const typeControl = this.form.get('vehicleType'); //async
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
                    
                    //if (vehicleBrandField) {
                      //vehicleBrandField.patchValue(null);
                      this.http.get<any>('api/items/vehicleBrands').subscribe(response => {
                        console.log(response.data);
                        let x = response.data;
                        console.log(vehicleTypeId,)
                        const filteredData = x.filter((item: any) => item.vehicleType === vehicleTypeId);
                        console.log(filteredData);
                        const xoptions = filteredData.map((item: any) => ({ label: item.vehicleBrand, value: item.id }));
                        console.log(xoptions);
                        field.props!.options = [...xoptions];
                      });
                    //}
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
              },
              expressionProperties: {
                'templateOptions.disabled': '!model.vehicleType',
              },
              hooks: {
                onInit: field => {
                  const brandControl = this.form.get('vehicleBrand'); //async
                  brandControl?.valueChanges.subscribe((changedValues: string) => {
                    
                    const control = field.formControl;

                    const vehicleTypeField = field.form?.get('vehicleType');
                    const vehicleTypeId = vehicleTypeField?.value;
                    console.log(vehicleTypeId);

                    const vehicleCarBrandField = field.form?.get('vehicleBrand');
                    const vehicleBrandId = vehicleCarBrandField?.value;
                    console.log(vehicleBrandId);
                    const vehicleModelField = field.form?.get('vehicleModel');
                    const vehicleModelFieldId = vehicleModelField?.value;
                    console.log(vehicleModelFieldId);

                    //if (vehicleModelField) {
                      //vehicleModelField.patchValue(null);
                      this.http.get<any>('api/items/vehicleModels').subscribe(response => {
                        console.log(response.data);
                        let x = response.data;
                        const filteredData = x.filter((item: any) => item.vehicleModelBrand === vehicleBrandId && item.vehicleModelType === vehicleTypeId);
                        console.log(filteredData);
                        const xoptions = filteredData.map((item: any) => ({ label: item.vehicleModel, value: item.id }));
                        console.log(xoptions);
                        field.props!.options = [...xoptions];
                      });
                      
                    //}
                  });
                },
              },
            },
            {
              className: '2xl:w-1/3 xl:w-1/3 lg:w-1/3 xs:w-full sm:w-full  px-2 ',
              key: 'vehicleRegistrationDate',
              type: 'datepicker',
              props: {
                disabled:false,
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
              className: 'w-full  px-2 ',
              key: 'selectedCustomer',
              type: 'headtype',
              props: {
                translate: true,
                description: 'Digita il cliente da cercare',
                label: ' ',
                /*options: [
                  { id: 'private', label: 'Privato',info:'Hey' },
                  { id: 'company', label: 'Azienda',info:'Hello' },
                  { id: 'public', label: 'Pubblica Amministrazione',info:'Urrà' },
                  { id: 'association', label: 'Associazione no-profit',info:'E vai' },
                  { id: 'individual', label: 'Ditta individuale',info:'Ganzo' },
                  { id: 'workshop', label: 'Officina/PuntoVendita',info:'Top' },
                ],*/
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
                ].map(option => ({ ...option, label: this.translate.instant(option.label) })),
              },
            },
          
            /*{
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
            },*/
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

        /*
        # practiceType
        { value: 'insurance', label: 'p_practiceType_Insurance' },
        { value: 'point', label: 'p_practiceType_Point' },
        { value: 'laboronly', label: 'p_practiceType_Laboronly' },
        { value: 'preventive', label: 'p_practiceType_preventive' },
        { value: 'sale', label: 'p_practiceType_Sale' },
        { value: 'darkening', label: 'p_practiceType_Darkening' },
        */

        {
          props: {
            translate: true,
            label: 't_insurance',
            hide:true,
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

  valuesFromObservable(httprequest: any) {
    this.http.get<[]>(httprequest).subscribe((data: any[]) => {
      let x: any = data; // Assign the array received from the API to this.Options
      let result = x['data'];
      return result;
    });
  }

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

    await this.getPractices();
  }

  AfterViewInit() {
    this.model = {};
  }

  filteredCustomers(input: string) {
    return this.allCustomers.filter((value: any) => value.toLowerCase().includes(input.toLowerCase()));
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
    //console.log($event);
    //console.log(this.form);
    console.log(this.form.value);
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
  async getPractices() {
    this.getPraticesFromRestapi(
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
      .subscribe((Practices: any) => {
        this.data = Practices['data'];
        console.log(Practices['data']);
        return Practices['data'];
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

  /*getDonnee(): Observable<any[]> {
  this.http.get('http://localhost:8080/groupes').toPromise().then(any => {
    this.groupes= any['content'];
  });
  return of(this.groupes);
}*/

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
