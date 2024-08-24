import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

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
    {{ model | json }}
  `,
  styles: [
    `
      ::ng-deep .mat-form-field > .mat-form-field-wrapper {
        flex-direction: column !important;
      }
    `,
  ],
})
export class FormlyFieldTabs extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field && field.key) {
      return field.formControl ? field.formControl.valid : false;
    }

    return field && field.fieldGroup ? field.fieldGroup.every(f => this.isValid(f)) : true;
  }
  today = new Date();
  statusPractice: string = 'AT';
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

  enableTabsOn(t: any) {
    //console.log(t.fieldGroup);
    return true;
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
    //const flattenedArray = this.flattenNestedArrays(formValues);
    //console.log(flattenedArray);
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
