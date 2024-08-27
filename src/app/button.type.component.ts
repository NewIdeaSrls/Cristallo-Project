import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material/form-field';
import { FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'formly-type-button',
  template: `
      <button mat-button mat-raised-button color="{{ props['typeButton']}}" (click)="onClickOn($event)">{{ props.label }}</button>
  `,
    styles: [``],
})
export class ButtonComponent extends FieldType<FieldTypeConfig> {
func:any
fn:any

  onClickOn($event:Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.props['onClickFn($event)'];
  }
}