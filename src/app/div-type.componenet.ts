import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-type-div',
  template: `
    <div>
      <formly-field *ngFor="let field of field.fieldGroup" [field]="field"></formly-field>
    </div>
  `,
})
export class CustomDivComponent extends  FieldType<FieldTypeConfig> {}
