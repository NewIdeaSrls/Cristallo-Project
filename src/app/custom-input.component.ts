import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

/*
https://jsdaddy.github.io/ngx-mask/

examples:
<input mask="d0/M0/0000" />
<input mask="d0/M0/0000 Hh:m0:s0" />
<input mask="Hh:m0:s0" />
<input mask="AAA 000-S0S" />
<input mask="0000.M0.d0" />
<input type='text' mask="9999 999 999" >
<input mask="A*@A*.SSS" [validation]="true" [dropSpecialCharacters]="false" >
<input type='text' mask="0000" [allowNegativeNumbers]="true">
<input type='text' mask="separator" [allowNegativeNumbers]="true">
<input type='text' mask="percent.2" [allowNegativeNumbers]="true">
<input type='text' mask="(00) 00000000||+00 (00) 00000000" >
<input type='text' mask="00||SS" >
<input type='text' [dropSpecialCharacters]="false" mask="000-000.00" >
<input type='text' mask="0000.00" [prefix]="'$'" [showMaskTyped]="true" [keepCharacterPositions]="true">
<input type='text' mask="separator.2" [leadZero]="true">
<input type='text' mask="separator" thousandSeparator="." />
<input type='text' mask="separator.2" thousandSeparator="." decimalMarker=","/>
<input type='text' mask="separator.0" thousandSeparator=","/>
<input type='text'[apm]="true" mask="Hh:m0:s0" >
<input type='text'[decimalMarker]="','" mask="percent.2" >
*/

// https://regex101.com/

export type SeparatorType = '.' | ',' | ['.', ','];

@Component({
  selector: 'formly-field-custom-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['mat-form-field { width: 100% }'],
  template: `
    <mat-form-field>
      <mat-label>{{this.label}}</mat-label>
      <!-- Hacky solution 2: set 'value' of input element to " " -->
      <input
        matInput
        type="text"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [mask]="this.mask"
        [prefix]="this.prefix"
        [decimalMarker]="this.decimalMarker"
        [thousandSeparator]="this.thousandSeparator"
        [leadZero]="this.leadZero"
        [dropSpecialCharacters]="this.dropSpecialCharacters"
        [showMaskTyped]="this.showMaskTyped"
        [validation]="this.validation"
        [keepCharacterPositions]="this.keepCharacterPositions"
        [allowNegativeNumbers]="this.allowNegativeNumbers"
        [apm]="this.apm"
      >
      <mat-hint>{{this.description}}</mat-hint>
    </mat-form-field>
  `,
})

// <!--[suffix]="this.suffix"-->

export class FormlyFieldCustomInput extends FieldType<FieldTypeConfig> implements OnInit
{
  label!: string;
  description!:string
  mask!: string | "";
  prefix!: string | "";
  suffix!: string | "";
  decimalMarker!:any | "";
  thousandSeparator!:any | "";
  leadZero:boolean = false 
  dropSpecialCharacters:boolean= false
  showMaskTyped:boolean = false
  validation:boolean = false
  keepCharacterPositions:boolean = false
  allowNegativeNumbers:boolean = false
  apm:boolean = false
  pattern:any | ""

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.label = this.props?.['label'] as string;
    this.description = this.props?.['description'] as string;

    const maskConfig = this.props?.['maskConfig'];

    this.mask = maskConfig.mask as string;
    this.prefix = maskConfig.prefix  as string;
    this.suffix = maskConfig.suffix  as string;
    this.decimalMarker = maskConfig.decimalMarker;
    this.thousandSeparator = maskConfig.thousandSeparator;
    this.leadZero = maskConfig.leadZero  as boolean
    this.dropSpecialCharacters = maskConfig.leadZero  as boolean
    this.showMaskTyped = maskConfig.leadZero  as boolean
    this.validation = maskConfig.leadZero  as boolean
    this.keepCharacterPositions = maskConfig.leadZero  as boolean
    this.allowNegativeNumbers = maskConfig.leadZero  as boolean
    this.apm = maskConfig.leadZero  as boolean
    this.pattern = maskConfig.pattern as string
  }
}