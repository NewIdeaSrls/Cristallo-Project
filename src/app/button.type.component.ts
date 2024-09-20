import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material/form-field';
import { FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'formly-type-button',
  template: `
    <button class="mb-2" mat-button mat-raised-button color="{{ props['buttonColor'] }}" (click)="onClickOn($event)">
      <div *ngIf="props.label !== ''">{{ props.label }}</div>
      <mat-icon *ngIf="props['icon'] && props['icon'] !== ''">{{ props['icon'] }}</mat-icon>
    </button>
  `,
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-button {
          height: 55px !important;
        }
      }
    `,
  ],
})
export class ButtonComponent extends FieldType<FieldTypeConfig> {
  func: any;
  fn: any;

  onClickOn($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.field.props && this.field.props['onClick']) {
      this.field.props['onClick']();
    }
  }
}
