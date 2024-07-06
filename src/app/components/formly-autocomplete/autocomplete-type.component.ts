import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { startWith, switchMap, tap, map } from 'rxjs/operators';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { AutcompleteButtonWrapperComponent } from './custom-wrapper.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'formly-autocomplete-type',
  // Comment out the mat-form-field here and comment the form-field wrapper in the app.module.ts to fix styling;
  template: `
    <!-- <mat-form-field> -->
    <mat-form-field class="full-width">
      <mat-label>{{ props.label }}</mat-label>
      <input matInput [matAutocomplete]="auto" placeholder="{{props.placeholder}}" [formControl]="formControl" [formlyAttributes]="field" />
      <mat-icon matSuffix fontIcon="add" (click)="add(formControl.value)"></mat-icon>
      <mat-icon matSuffix fontIcon="close" (click)="formControl.setValue('')"></mat-icon>
      <mat-hint>{{ props.description }}</mat-hint>
    </mat-form-field>
    
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of filter | async" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
    
    <!-- </mat-form-field> -->
  `,
   styleUrl: 'autocomplete.scss',
})
export class AutocompleteTypeComponent extends FieldType<FieldTypeConfig> implements OnInit {
  
  filter: any;

  add(value: string) {
    this.props['add'](value);
  }

  ngOnInit() {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      map((term: string) => this.props['filterStates'](term))
    );
  }
}

@NgModule({
  imports: [
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormlyMaterialModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field'], // Comment this line and comment out the mat-form-field tag in the autocomplete type to adjust the styling;
        },
      ],
      wrappers: [
        {
          name: 'buttonWrapper',
          component: AutcompleteButtonWrapperComponent,
        },
      ],
      validationMessages: [{ name: 'required', message: 'This field is required' }],
    }),
  ],
  declarations: [AutocompleteTypeComponent, AutcompleteButtonWrapperComponent],
  exports: [AutocompleteTypeComponent, AutcompleteButtonWrapperComponent], // Export it so it can be used outside this module
})
export class AutocompleteTypeModule {}

/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
