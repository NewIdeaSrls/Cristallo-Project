import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder!"
     
    /><!--  [errorStateMatcher]="errorStateMatcher" -->
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let option of (filter | async) as options" [value]="option">
        {{ option}}
      </mat-option>
    </mat-autocomplete>
  `,
})

export class AutocompleteTypeComponent
  extends FieldType<FieldTypeConfig> implements OnInit {
    filter!: Observable<any>;

    ngOnInit() {
      this.filter = this.formControl.valueChanges.pipe(
        startWith(''),
        switchMap((term) => this.props['filter'](term))
      );
    }
  }
