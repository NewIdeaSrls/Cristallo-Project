import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
    selector: 'formly-wrapper-card',
    template: `
      <mat-card>
      <!--<mat-card-title>{{ getTitle() }}</mat-card-title>-->
        <mat-card-content>
          <ng-container #fieldComponent></ng-container>
        </mat-card-content>
      </mat-card>
    `,
    styles: [`
      .mat-mdc-card {
        display: block;
        position: relative;
        padding: 16px;
        margin: 4px;
        border-radius: 5px;
        border-color: lightgray;
        border-width: 1px;
      }
    `]
  })
export class FormlyWrapperCard extends FieldWrapper {
    getTitle(): string {
        if (this.field && this.field.templateOptions && this.field.templateOptions.label) {
          return this.field.templateOptions.label;
        }
        return '';
      }
}
