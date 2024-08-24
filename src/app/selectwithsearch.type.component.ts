import { Component, Input, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FieldTypeConfig } from '@ngx-formly/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-typehead-select',
  template: `

      <input
        mat
        input
        type="text"
        class="mat-input-element mat-form-field-autofill-control"
        (input)="onSearch($event)"
        [formlyAttributes]="field"
        [formControl]="formControl"
        [value]="selected"
        [placeholder]="to.placeholder" />

    <div *ngIf="showOptions">
      <mat-option *ngFor="let option of filteredOptions" (click)="selectOption(option)">
        {{ option.label }} | {{ option.value }} | {{ option.otherInfo }}
      </mat-option>
    </div>

    <!-- <mat-form-field>
      <mat-select (selectionChange)="selectOption($event.value)" [formControl]="formControl">
        <mat-option *ngFor="let option of filteredOptions" [value]="option.value">
          {{ option.label }} | {{ option.value }} | {{ option.info }}
        </mat-option>
      </mat-select>
    </mat-form-field>-->
  `,
})
export class TypeheadSelectComponent extends FieldType<FieldTypeConfig> {
  showOptions = true;
  filteredOptions: any;
  selected: any = '';

  onSearch($event: any) {
    //console.log($event)
    this.selected = '';
    let searchTerm: string = $event && $event.target && $event.target.value ? $event.target.value : '';
    //console.log(searchTerm)
    if (searchTerm) {
      if (this.to['options']) {
        if (Array.isArray(this.to['options'])) {
          this.filteredOptions = this.to['options'].filter((option: Option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
        } else if (this.to['options'] instanceof Observable) {
          this.to['options'].subscribe((options: Option[]) => {
            this.filteredOptions = options.filter((option: Option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
          });
        }
      }
      this.showOptions = true;
    } else {
      this.showOptions = false;
    }
  }

  selectOption(option: any) {
    this.formControl.setValue(option.value);
    this.selected = option.label;
    this.showOptions = false;
  }
}
