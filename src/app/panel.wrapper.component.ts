import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-card',
  template: `
    <mat-card>
      <!--<mat-card-title *ngif="this.field.props?.label !== ''">{{ getTitle() }}</mat-card-title>-->
      <mat-card-content>
        <ng-container #fieldComponent></ng-container>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-card {
          display: block;
          position: relative;
          padding: 16px;
          margin: 4px;
          border-radius: 5px;
          border-color: darkgrey !important;
          border-width: 1px !important;
        }
        .mat-expansion-panel {
          border: darkgrey !important;
          border-style: solid !important;
          border-width: 1px !important;
        }

        .mat-expansion-panel-header {
          border: darkgrey !important;
          border-style: solid !important;
          border-width: 1px !important;
        }

        .mat-expansion-panel-content {
          border: darkgrey !important;
          border-style: solid !important;
          border-width: 1px !important;
        }
      }
    `,
  ],
})
export class FormlyWrapperCard extends FieldWrapper {
  getTitle(): string {
    if (this.field && this.field.props && this.field.props.label) {
      return this.field.props?.label;
    }
    return '';
  }
}
