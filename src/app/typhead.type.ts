import { Component, Input, OnChanges, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material/form-field';
import { FieldTypeConfig, FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

interface OptionDef {
  id: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-headtype',
  template: `
    <mat-form-field>
      <mat-select [formControl]="formControl">
        <!--<button mat-icon-button matSuffix (click)="reset()">
          <mat-icon>close</mat-icon>
        </button>-->
        <input
          mat-input
          (input)="onSearch($event)"
          class="mat-mdc-option"
          style="width:100%;border-style: ridge;border-width: thin"
          [(value)]="inputdata"
          [placeholder]="'Digita'" />

        <mat-option (click)="selectOption(option)" *ngFor="let option of Options; let last = last" [value]="option.id">
          {{ option.toShow }}
        </mat-option>
      </mat-select>
      <mat-icon class="iconpos" (click)="reset()">close</mat-icon>
    </mat-form-field>
  `,
  styles: [
    `
      :host ::ng-deep {
        .mat-mdc-form-field-infix {
          min-height: 0px;
          padding-top: 0px !important;
          padding-bottom: 0px !important;
        }

        .mat-mdc-form-field-subscript-wrapper {
          display: none !important;
        }

        .mat-mdc-text-field-wrapper:not(.mdc-text-field--outlined) .mat-mdc-form-field-infix {
          padding-top: 0px !important;
          padding-bottom: 0px !important;
          margin-top: 0px !important;
        }

        .mdc-text-field {
          padding-left: 0px !important;
        }

        .iconpos {
          position: absolute !important;
          padding: 0px !important;
          font-size:20px!important;
        }
      }
    `,
  ],
})
export class HeadTypeComponent extends FieldType<FieldTypeConfig> implements OnInit, DoCheck {
  Options: any;
  AllOptions: any;
  x: any;
  showOptions = true;
  selected: any = '';
  searchTerm: string = '';
  inputdata: any = '';
  labeldata: any;

  ngOnInit(): void {
    this.checkOptionsArray();
  }

  ngDoCheck(): void {
    this.checkOptionsArray();
  }

  reset() {
    // Reset del valore dell'input e del formControl
    this.inputdata = '';
    this.formControl.reset(); // Resetta il valore del FormControl associato
  }

  checkOptionsArray() {
    if (this.props['options'] instanceof Observable) {
      this.props!['options']!.subscribe((data: any[]) => {
        this.x = data; // Assign the array received from the API to this.Options
        this.labeldata = this.props['labelToShow'];
        this.AllOptions = this.x['data'];
        this.Options = this.x['data'];

        this.AllOptions.forEach((option: any, index: any) => {
          let concatenatedValues = '';
          this.labeldata.forEach((label: any, labelIndex: number) => {
            if (option.hasOwnProperty(label)) {
              let value = option[label];
              if (typeof value === 'string') {
                concatenatedValues += value;
                if (labelIndex < this.labeldata.length - 1) {
                  concatenatedValues += ' - ';
                }
              }
            }
          });
          option.toShow = concatenatedValues || '';
        });
        // console.log(this.Options); // You can now access and work with the array
      });
      //}
    } else {
      // If 'options' is already an array, directly assign it
      this.labeldata = this.props['labelToShow'];
      this.AllOptions = this.props['options'];
      this.Options = this.props['options'];
      if (this.AllOptions) {
        this.AllOptions.forEach((option: any, index: any) => {
          let concatenatedValues = '';
          this.labeldata.forEach((label: any, labelIndex: number) => {
            if (option.hasOwnProperty(label)) {
              let value = option[label];
              if (typeof value === 'string') {
                concatenatedValues += value;
                if (labelIndex < this.labeldata.length - 1) {
                  concatenatedValues += ' - ';
                }
              }
            }
          });
          option.toShow = concatenatedValues || '';
        });
      }
      // console.log(this.Options); // You can now access and work with the array
    }
  }

  onSearch($event: any) {
    this.selected = '';
    this.searchTerm = $event && $event.target && $event.target.value ? $event.target.value : '';

    if (this.searchTerm && this.searchTerm !== '') {
      this.Options = this.AllOptions.filter((option: any) => option.toShow.toLowerCase().includes(this.searchTerm.toLowerCase()));
      this.inputdata = '';
      this.searchTerm = '';
    } else {
      this.selected = '';
      this.inputdata = '';
      this.Options = this.AllOptions;
    }
  }

  selectOption(option: any) {
    //console.log(option);
    this.formControl.setValue(option.id);
    this.selected = option.labelToShow;
    this.inputdata = '';
    this.Options = this.AllOptions;
  }
}
