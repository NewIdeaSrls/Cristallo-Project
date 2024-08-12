import { Component,Input } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-accordion-type',
  template: `
  <mat-accordion>
    <mat-expansion-panel *ngFor="let accordion of field.fieldGroup; let i = index">
      <mat-expansion-panel-header>{{ accordion?.templateOptions?.label }}
      </mat-expansion-panel-header>
      <formly-field [field]="accordion"></formly-field>
    </mat-expansion-panel>
  </mat-accordion>
  `,
})
export class AccordionTypeComponent extends FieldType {

}
