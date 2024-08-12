import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group>
      <mat-tab
        *ngFor="let tab of field?.fieldGroup; let i = index; let last = last"
        [label]="tab?.props?.label || 'Label Not Available'"
      >
        <formly-field [field]="tab"></formly-field>
        <button *ngIf="last" mat-raised-button color="primary" [disabled]="!form || !form.valid" (click)="submitdata($event,formControl)">Submit</button>

      </mat-tab>
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType {

  isValid(field: FormlyFieldConfig): boolean {
    if (field && field.key) {
      return field.formControl ? field.formControl.valid : false;
    }

    return field && field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }

  submitdata($event:Event,form:any) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log(form.value)
    const formValues = form.value;
    const flattenedArray = this.flattenNestedArrays(formValues);
    console.log(flattenedArray);
  };

  goto($event:Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  flattenNestedArrays(formValue: any): { key: string, value: any }[] {

    const flattenedArray: { key: string, value: any }[] = [];

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


