import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group>
      <ng-container *ngFor="let tab of field?.fieldGroup; let i = index">
        <ng-container *ngIf="enableTabsOn(tab)">
          <mat-tab>
            <ng-template mat-tab-label>
              <span>{{ tab?.props?.label || 'Label Not Available' | translate }}</span>
            </ng-template>
            <formly-field [field]="tab"></formly-field>
          </mat-tab>
        </ng-container>
      </ng-container>
    </mat-tab-group>
    
    {{ model | json }}

    <div class="relative">
      <button class="flex ml-2 mr-2" mat-raised-button color="primary">{{ feasibility_panel }}</button>
      <div class="absolute right-0 top-0 mt-2 mr-2">{{ feasibility_info }}</div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        /*.mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix {
          padding-top: 14px!important;
          padding-bottom: 0px!important;
        }*/
          .mdc-text-field--no-label:not(.mdc-text-field--outlined):not(.mdc-text-field--textarea) .mat-mdc-form-field-infix {
          padding-top: 9px;
          padding-bottom: 16px;
          }

        .mat-mdc-text-field-wrapper {
        height: 56px!important;
        flex: auto;
        }

        .mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
          color: black;
        }

        .mat-mdc-tab-body.mat-mdc-tab-body-active {
          position: relative;
          overflow-x: hidden;
          overflow-y: scroll;
          z-index: 1;
          flex-grow: 1;
          margin-bottom: 10px;
          top: 0;
          //height: calc(100vh - 220px) !important;
        }

        .mat-mdc-tab-body {
          top: 0;
          left: 0;
          right: 0;
          position: absolute;
          display: block;
          overflow-x: hidden;
          overflow-y: scroll;
          flex-basis: 100%;
          //height: calc(100vh - 220px) !important;
        }

        .mat-form-field > .mat-form-field-wrapper {
          flex-direction: column !important;
        }
      }
    `,
  ],
})
export class FormlyFieldTabs extends FieldType {
  constructor(private translationService: TranslateService) {
    super();
  }

  today = new Date();
  feasibility_panel = this.translationService.instant('feasibility_panel');
  feasibility_info = this.translationService.instant('feasibility_info');
  tabsEnabled: any[] = [];
  lastModelType: any;

  enableTabsOn(typeTab: any) {
    // this.enableFields(typeTab);
    this.lastModelType = this.model.practiceType;
    if (typeTab.fieldGroup) {
      if (typeTab.fieldGroup['key'] == 'practiceType') {
        console.log('fieldsGroup interno practiceType: ', typeTab.fieldGroup);
      }
    }
    if (this.model.practiceType !== this.lastModelType) {
      console.log('############################################');
      this.tabsEnabled = [];
    }

    switch (this.model.practiceType) {
      case 'point':
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }

        if (typeTab.props.label == this.translationService.instant('point')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('point'))) {
            this.tabsEnabled.push(this.translationService.instant('point'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('inquiringSupplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('inquiringSupplier'))) {
            this.tabsEnabled.push(this.translationService.instant('inquiringSupplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('agent')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('agent'))) {
            this.tabsEnabled.push(this.translationService.instant('agent'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('supplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('supplier'))) {
            this.tabsEnabled.push(this.translationService.instant('supplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        break;
      case 'laboronly':
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('activityPlanning')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('activityPlanning'))) {
            this.tabsEnabled.push(this.translationService.instant('activityPlanning'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('point')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('point'))) {
            this.tabsEnabled.push(this.translationService.instant('point'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('fitter')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('fitter'))) {
            this.tabsEnabled.push(this.translationService.instant('fitter'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        break;
      case 'preventive':
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('vehicle')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('vehicle'))) {
            this.tabsEnabled.push(this.translationService.instant('vehicle'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('agent')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('agent'))) {
            this.tabsEnabled.push(this.translationService.instant('agent'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('activityPlanning')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('activityPlanning'))) {
            this.tabsEnabled.push(this.translationService.instant('activityPlanning'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('inquiringSupplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('inquiringSupplier'))) {
            this.tabsEnabled.push(this.translationService.instant('inquiringSupplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('supplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('supplier'))) {
            this.tabsEnabled.push(this.translationService.instant('supplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('customer')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('customer'))) {
            this.tabsEnabled.push(this.translationService.instant('customer'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        break;
      case 'sale':
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('agent')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('agent'))) {
            this.tabsEnabled.push(this.translationService.instant('agent'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('agent')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('agent'))) {
            this.tabsEnabled.push(this.translationService.instant('agent'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('supplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('supplier'))) {
            this.tabsEnabled.push(this.translationService.instant('supplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('point')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('point'))) {
            this.tabsEnabled.push(this.translationService.instant('point'));
          }
          return true;
        }
        break;
      case 'darkering':
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('activityPlanning')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('activityPlanning'))) {
            this.tabsEnabled.push(this.translationService.instant('activityPlanning'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('agent')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('agent'))) {
            this.tabsEnabled.push(this.translationService.instant('agent'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('inquiringSupplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('inquiringSupplier'))) {
            this.tabsEnabled.push(this.translationService.instant('inquiringSupplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('supplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('supplier'))) {
            this.tabsEnabled.push(this.translationService.instant('supplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('customer')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('customer'))) {
            this.tabsEnabled.push(this.translationService.instant('customer'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        break;
      case 'insurance':
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('agent')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('agent'))) {
            this.tabsEnabled.push(this.translationService.instant('agent'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('insurance')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('insurance'))) {
            this.tabsEnabled.push(this.translationService.instant('insurance'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('customer')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('customer'))) {
            this.tabsEnabled.push(this.translationService.instant('customer'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('supplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('supplier'))) {
            this.tabsEnabled.push(this.translationService.instant('supplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('point')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('point'))) {
            this.tabsEnabled.push(this.translationService.instant('point'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('fitter')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('fitter'))) {
            this.tabsEnabled.push(this.translationService.instant('fitter'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('activityPlanning')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('activityPlanning'))) {
            this.tabsEnabled.push(this.translationService.instant('activityPlanning'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('inquiringSupplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('inquiringSupplier'))) {
            this.tabsEnabled.push(this.translationService.instant('inquiringSupplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('vehicle')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('vehicle'))) {
            this.tabsEnabled.push(this.translationService.instant('vehicle'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        break;
      case '-':
        if (typeTab.props.label == this.translationService.instant('insurance')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('insurance'))) {
            this.tabsEnabled.push(this.translationService.instant('insurance'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('practice')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('practice'))) {
            this.tabsEnabled.push(this.translationService.instant('practice'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('customer')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('customer'))) {
            this.tabsEnabled.push(this.translationService.instant('customer'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('supplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('supplier'))) {
            this.tabsEnabled.push(this.translationService.instant('supplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('point')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('point'))) {
            this.tabsEnabled.push(this.translationService.instant('point'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('fitter')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('fitter'))) {
            this.tabsEnabled.push(this.translationService.instant('fitter'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('activityPlanning')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('activityPlanning'))) {
            this.tabsEnabled.push(this.translationService.instant('activityPlanning'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('inquiringSupplier')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('inquiringSupplier'))) {
            this.tabsEnabled.push(this.translationService.instant('inquiringSupplier'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('vehicle')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('vehicle'))) {
            this.tabsEnabled.push(this.translationService.instant('vehicle'));
          }
          return true;
        }
        if (typeTab.props.label == this.translationService.instant('documents')) {
          // this.enableFields(typeTab);
          if (!this.tabsEnabled.includes(this.translationService.instant('documents'))) {
            this.tabsEnabled.push(this.translationService.instant('documents'));
          }
          return true;
        }
        break;
    }
    //this.disableFields(typeTab);
    //console.log('ARRAY TAB ABILITATI', this.tabsEnabled);
    return false;
  }

  disableFields(tab: any) {
    if (tab.fieldGroup) {
      tab.fieldGroup.forEach((field: FormlyFieldConfig) => {
        console.log('disabilito :', field);
        field.props = {
          ...field.props,
          disabled: true,
        };
      });
    }
  }

  enableFields(tab: any) {
    if (tab.fieldGroup) {
      tab.fieldGroup.forEach((field: FormlyFieldConfig) => {
        console.log('abilito :', field);
        field.props = {
          ...field.props,
          disabled: false,
        };
      });
    }
  }
}
