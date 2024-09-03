import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group>
      <ng-container *ngFor="let tab of field?.fieldGroup; let i = index">
        <ng-container *ngIf="enableTabsOn(tab)">
          <mat-tab>
            <ng-template mat-tab-label>
              <span>{{ tab?.props?.label || 'Label Not Available' | translate }}</span>
            </ng-template>
            <formly-field [field]="tab"></formly-field>
          </mat-tab>
        </ng-container>
      </ng-container>
    </mat-tab-group>
    <!-- {{ model | json }} -->
    
    <div class="relative">
        <button class="flex ml-2 mr-2"  mat-raised-button color="primary">{{feasibility_panel}}</button>
        <div class="absolute right-0 top-0 mt-2 mr-2">{{feasibility_info}}</div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-tab-body.mat-mdc-tab-body-active {
          position: relative;
          overflow-x: hidden;
          overflow-y: scroll;
          z-index: 1;
          flex-grow: 1;
          margin-bottom: 10px;
          top: 0;
          height: calc(100vh - 220px) !important;
        }

        .mat-mdc-tab-body {
          top: 0;
          left: 0;
          right: 0;
          position: absolute;
          display: block;
          overflow-x: hidden;
          overflow-y: scroll;
          flex-basis: 100%;
          height: calc(100vh - 220px) !important;
        }

        .mat-form-field > .mat-form-field-wrapper {
          flex-direction: column !important;
        }
      }
    `,
  ],
})
export class FormlyFieldTabs extends FieldType {

  constructor(
    private translationService: TranslateService,
  ) {
    super();
  }

  isValid(field: FormlyFieldConfig): boolean {
    if (field && field.key) {
      return field.formControl ? field.formControl.valid : false;
    }

    return field && field.fieldGroup ? field.fieldGroup.every(f => this.isValid(f)) : true;
  }

  today = new Date();
  feasibility_panel = this.translationService.instant('feasibility_panel');
  feasibility_info = this.translationService.instant('feasibility_info');
  statusPractice: string = '';
  statusPracticeList: any = [
    {
      labelProp: 'Chiamare Agenzia',
      valueProp: 'CA',
    },
    {
      labelProp: 'Attesa Point',
      valueProp: 'AP',
    },
    {
      labelProp: 'Attesa',
      valueProp: 'AT',
    },
    {
      labelProp: 'Da Ordinare',
      valueProp: 'DO',
    },
    {
      labelProp: 'Ordinato',
      valueProp: 'OR',
    },
    {
      labelProp: 'Manca Documento',
      valueProp: 'MD',
    },
    {
      labelProp: 'Manodopera',
      valueProp: 'MA',
    },
    {
      labelProp: 'Preventivo da Inviare',
      valueProp: 'PD',
    },
    {
      labelProp: 'Morta',
      valueProp: 'MO',
    },
  ];

  enableTabsOn(typeTab: any) {

    //console.log(this.model.practiceType)
    //console.log(typeTab.props.label)

    switch (this.model.practiceType) {
       case 'point':  
        //console.log(this.model.practiceType,typeTab.props.label)
        if ( typeTab.props.label == this.translationService.instant('practice')) return true;
        if ( typeTab.props.label == this.translationService.instant('point')) return true;
        if ( typeTab.props.label == this.translationService.instant('inquiringSupplier')) return true;
        if ( typeTab.props.label == this.translationService.instant('agent')) return true;
        if ( typeTab.props.label == this.translationService.instant('supplier')) return true;
        if ( typeTab.props.label == this.translationService.instant('documents')) return true;
        break;
      case 'laboronly':
        //console.log(this.model.practiceType,typeTab.props.label)
        if ( typeTab.props.label == this.translationService.instant('practice')) return true;
        if ( typeTab.props.label == this.translationService.instant('activityPlanning')) return true;
        if ( typeTab.props.label == this.translationService.instant('point')) return true;
        if ( typeTab.props.label == this.translationService.instant('fitter')) return true;
        if ( typeTab.props.label == this.translationService.instant('documents')) return true;
        break;
      case 'preventive':
        //console.log(this.model.practiceType,typeTab.props.label)
        if ( typeTab.props.label == this.translationService.instant('practice')) return true;
        if ( typeTab.props.label == this.translationService.instant('vehicle')) return true;
        if ( typeTab.props.label == this.translationService.instant('agent')) return true;
        if ( typeTab.props.label == this.translationService.instant('activityPlanning')) return true;
        if ( typeTab.props.label == this.translationService.instant('inquiringSupplier')) return true;
        if ( typeTab.props.label == this.translationService.instant('supplier')) return true;
        if ( typeTab.props.label == this.translationService.instant('customer')) return true;
        if ( typeTab.props.label == this.translationService.instant('documents')) return true;
        break;
      case 'sale':
        //console.log(this.model.practiceType,typeTab.props.label)
        if ( typeTab.props.label == this.translationService.instant('practice')) return true;
        if ( typeTab.props.label == this.translationService.instant('agent')) return true;
        if ( typeTab.props.label == this.translationService.instant('inquiringSupplier')) return true
        if ( typeTab.props.label == this.translationService.instant('supplier')) return true;
        if ( typeTab.props.label == this.translationService.instant('documents')) return true;
        if ( typeTab.props.label == this.translationService.instant('point')) return true;
        break;
      case 'darkering':
        //console.log(this.model.practiceType,typeTab.props.label)
        if ( typeTab.props.label == this.translationService.instant('practice')) return true;
        if ( typeTab.props.label == this.translationService.instant('activityPlanning')) return true;
        if ( typeTab.props.label == this.translationService.instant('agent')) return true;
        if ( typeTab.props.label == this.translationService.instant('inquiringSupplier')) return true
        if ( typeTab.props.label == this.translationService.instant('supplier')) return true;
        if ( typeTab.props.label == this.translationService.instant('customer')) return true;
        if ( typeTab.props.label == this.translationService.instant('documents')) return true;
        break;
      case 'insurance':
          //console.log(this.model.practiceType,typeTab.props.label)
          if ( typeTab.props.label == this.translationService.instant('practice')) return true;
          if ( typeTab.props.label == this.translationService.instant('documents')) return true;
          if ( typeTab.props.label == this.translationService.instant('customer')) return true;
          if ( typeTab.props.label == this.translationService.instant('vehicle')) return true;
          if ( typeTab.props.label == this.translationService.instant('supplier')) return true;
          if ( typeTab.props.label == this.translationService.instant('point')) return true;
          if ( typeTab.props.label == this.translationService.instant('fitter')) return true;
          if ( typeTab.props.label == this.translationService.instant('activityPlanning')) return true;
          if ( typeTab.props.label == this.translationService.instant('inquiringSupplier')) return true
          break;
    }

    

    return false;
  }

  submitdata($event: Event, form: any) {
    $event.preventDefault();
    $event.stopPropagation();
    const formValues = form.value;
    const moreData = {
      practiceStatus: this.statusPractice,
      practiceDate: this.today,
    };
    const mergedWithPractice = { ...formValues, ...moreData };
    console.log(mergedWithPractice);
  }

  goto($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  flattenNestedArrays(formValue: any): { key: string; value: any }[] {
    const flattenedArray: { key: string; value: any }[] = [];

    const flattenRecursive = (obj: any, propName?: string) => {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          flattenRecursive(item, `${propName}[${index}]`);
        });
      } else if (typeof obj === 'object') {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            flattenRecursive(obj[key], propName ? `${propName}.${key}` : key);
          }
        }
      } else {
        if (propName) {
          flattenedArray.push({ key: propName, value: obj });
        } else {
          flattenedArray.push({ key: 'root', value: obj });
        }
      }
    };

    flattenRecursive(formValue);
    return flattenedArray;
  }
}
