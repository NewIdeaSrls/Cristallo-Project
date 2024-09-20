import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `

      <div style="margin:5px">
        <button mat-button mat-raised-button color="primary" type="button" (click)="add()">{{ props['addText'] }}</button>
      </div>

      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>

      <div *ngFor="let field of field.fieldGroup; let i = index" class="row align-items-baseline customColor">
        <formly-field class="col" [field]="field"></formly-field>
        <div class="col-1 d-flex align-items-center">
          <button mat-button mat-raised-button color="warn" type="button" (click)="remove(i)">{{ props['removeText'] }}</button>
        </div>
      </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        .customColor {
          background: #ECECEC;
          padding:10px;
          margin:5px;
        }
      }
    `,
  ],
})
export class RepeatTypeComponent extends FieldArrayType {
  
}