import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
   <div style="margin:30px 0;">
      <button mat-button mat-raised-button color="primary" type="button" (click)="add()">{{ to['addText'] }}</button>
    </div>
    <div *ngFor="let field of field.fieldGroup; let i = index;">
      <formly-field [field]="field"></formly-field>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
}