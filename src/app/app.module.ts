import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatCheckboxModule } from '@ngx-formly/material/checkbox';
import { FormlyMatSelectModule } from '@ngx-formly/material/select';
import { FormlyMatRadioModule } from '@ngx-formly/material/radio';
import { FormlyMatNativeSelectModule } from '@ngx-formly/material/native-select';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlyMatTextAreaModule } from '@ngx-formly/material/textarea';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { FormlyMatInputModule } from '@ngx-formly/material/input';
import { FormlyMatSliderModule } from '@ngx-formly/material/slider';
import { FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyFieldTabs } from './tabs.type';
import { ObjectTypeComponent } from './object.type';
import { NullTypeComponent } from './null.type';
import { FileUploadFieldComponent } from './file-type.component';
import { AccordionTypeComponent } from './accordions.type';
import { AutocompleteTypeComponent } from './autocomplete-type.component';
import { ViewportService } from './services/viewport.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxTranslateModule } from './translation.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { registerTranslateExtension } from './translate.extension';
import { FormlyWrapperCard } from './panel.wrapper.component';
import { FormlyWrapperAddons } from './addon.wrapper';
import { addonsExtension } from './addon.extension';
import { AutocompleteTypeButtonComponent } from './autocomplete-type-button.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { HeadTypeComponent } from './typhead.type';
import { ButtonComponent } from './button.type.component';
import { FormlyFieldCustomInput } from './custom-input.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CustomDivComponent } from './div-type.componenet';
import { FormlyWrapperNewline } from './newline.wrapper';
import { RepeatTypeComponent } from './repeat-section.component';
import { RepeatDeleteTypeComponent } from './repeat-delete';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: ['YYYY-MM-DD'], // Formato accettato in input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Formato visualizzato all'utente
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface WrapperOption {
  name: string;
  component: any; // Update the type of component as needed
  template?: string; // Make the template property optional
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    FileUploadFieldComponent,
    FormlyFieldTabs,
    AutocompleteTypeComponent,
    AutocompleteTypeButtonComponent,
    AccordionTypeComponent,
    ObjectTypeComponent,
    NullTypeComponent,
    FormlyWrapperCard,
    FormlyWrapperAddons,
    FormlyWrapperNewline,
    HeadTypeComponent,
    ButtonComponent,
    FormlyFieldCustomInput,
    CustomDivComponent,
    RepeatTypeComponent,
    RepeatDeleteTypeComponent,
  ],
  exports: [
    CommonModule,
    NgxTranslateModule,
    ReactiveFormsModule,
    MatOptionModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    FormlyMatCheckboxModule,
    FormlyMatSelectModule,
    FormlyMatRadioModule,
    FormlyMatNativeSelectModule,
    FormlyMatFormFieldModule,
    FormlyMatTextAreaModule,
    FormlyMatToggleModule,
    FormlyMatInputModule,
    FormlyMatSliderModule,
    MatFormFieldModule,
    FormlyModule,
  ],
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    NgxTranslateModule,
    ReactiveFormsModule,
    A11yModule,
    MatOptionModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    FormlyMatDatepickerModule,
    FormlyMaterialModule,
    FormlyMatCheckboxModule,
    FormlyMatSelectModule,
    FormlyMatRadioModule,
    FormlyMatNativeSelectModule,
    FormlyMatFormFieldModule,
    FormlyMatTextAreaModule,
    FormlyMatToggleModule,
    FormlyMatInputModule,
    FormlyMatSliderModule,
    MatFormFieldModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'Campo obbligatorio' }],
      wrappers: [
        { name: 'card', component: FormlyWrapperCard },
        { name: 'addons', component: FormlyWrapperAddons },
        { name: 'newline', component: FormlyWrapperNewline },
      ],
      extensions: [{ name: 'addons', extension: { onPopulate: addonsExtension } }],
      types: [
        {
          name: 'maskinput',
          component: FormlyFieldCustomInput,
        },
        {
          name: 'headtype',
          component: HeadTypeComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'button',
          component: ButtonComponent,
        },
        {
          name: 'customDiv',
          component: CustomDivComponent,
        },
        {
          name: 'autocompletebutton',
          component: AutocompleteTypeButtonComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'null',
          component: NullTypeComponent,
          wrappers: ['form-field'],
        },
        { name: 'tabs', component: FormlyFieldTabs },
        { name: 'object', component: ObjectTypeComponent },
        { name: 'file-upload', component: FileUploadFieldComponent },
        { name: 'accordion', component: AccordionTypeComponent },
        { name: 'repeat', component: RepeatTypeComponent },
        {
          name: 'repeat-delete',
          component: RepeatDeleteTypeComponent,
          defaultOptions: {
            templateOptions: {
              btnType: 'default',
              type: 'button',
            },
          },
        },
      ],
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ViewportService,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
  ],
  bootstrap: [],
})
export class AppModule {}
