import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { FieldTypeConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap, debounceTime } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'formly-autocomplete-button-type',
  template: `
    <input matInput [matAutocomplete]="auto" [formControl]="formControl" [formlyAttributes]="field" [placeholder]="to.placeholder!" />
    <!--<mat-icon matSuffix class="absolute top-5 right-0 text-black hover:text-red-500">queue</mat-icon>-->
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let option of filter | async as options" [value]="option">
        {{ option }}
      </mat-option>
    </mat-autocomplete>
    <button mat-button type="button" class="autocompletebutton-position" (click)="to['onButtonClick']($event)">{{ to['actionLabel']}}</button>
  `,
  styles: [`
    .autocompletebutton-position {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 64px;
    border: none;
    outline: azure;
    line-height: inherit;
    user-select: none;
    -webkit-appearance: none;
    overflow: visible;
    vertical-align: middle;
    background: rgba(0, 0, 0, 0);
    right: 0px;
    top: 10px;
  }
  `],
  })
export class AutocompleteTypeButtonComponent extends FieldType<FieldTypeConfig> implements OnInit {
  
  filter!: Observable<any>;

  ngOnInit() {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(term => this.props['filter'](term))
    );
  }
}
