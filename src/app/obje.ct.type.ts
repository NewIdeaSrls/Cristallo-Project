import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: "formly-object-type",
  template: `
    <div class="wrapper mb-3">
      <legend *ngIf="to.label">{{ to.label }}</legend>
      <p *ngIf="to.description">{{ to.description }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      >
      </div>
      <formly-field
        class="contents"
        *ngFor="let f of field.fieldGroup"
        [field]="f"
      ></formly-field>
    </div>
  `
})
export class ObjectTypeComponent  extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field && field.key) {
      return field.formControl ? field.formControl.valid : false;
    }

    return field && field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}
