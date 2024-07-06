import { Component, NgModule } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { startWith, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'autocomplete',
    template: `
      <input
        matInput
        [matAutocomplete]="auto"
        [formControl]="formControl"
        [formlyAttributes]="field"
      />
      <mat-autocomplete #auto="matAutocomplete">
        <mat-option *ngFor="let value of filter | async" [value]="value">
          {{ value }}
        </mat-option>
      </mat-autocomplete>
      {{showError | json}}
      {{formControl.errors | json}}
    `,
  })
  export class AutocompleteTypeComponent  extends FieldType<FieldTypeConfig> implements OnInit {

    filter: Observable<any> | undefined;
  
    ngOnInit() {
      this.filter = this.formControl.valueChanges.pipe(
        startWith(''),
        switchMap((term) => this.props['filter'](term))
      );
  
      setTimeout(() => {
        this.formControl.setErrors([{ requiredFoo: true }]);
      });
    }
  }

@NgModule({
  imports:[
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormlyMaterialModule,
    FormlyModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormlyMaterialModule,
],
  declarations: [AutocompleteTypeComponent],
  exports: [AutocompleteTypeComponent] // Export it so it can be used outside this module
})
export class AutocompleteTypeModule {}