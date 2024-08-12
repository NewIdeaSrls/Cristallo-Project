
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
import { FormlyFieldTabs } from './tabs.type';
import { ObjectTypeComponent } from './obje.ct.type';
import { NullTypeComponent } from './null.type';
import { FileUploadFieldComponent  } from './file-type.component';
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

@NgModule({
  declarations: [
    FileUploadFieldComponent,FormlyFieldTabs,AutocompleteTypeComponent,AccordionTypeComponent,ObjectTypeComponent,NullTypeComponent],
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
    FormlyModule,
    FormlyModule],
  imports: [
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
    FormlyModule,
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'Campo obbligatorio' }],
      types: [
        { name: 'tabs', component: FormlyFieldTabs },
        { name: 'object', component: ObjectTypeComponent },
        {
          name: 'null',
          component: NullTypeComponent,
          wrappers: ['form-field'],
        },
        { name: 'file-upload', component: FileUploadFieldComponent},
        { name: 'accordion', component: AccordionTypeComponent},
        {
          name: 'autocomplete',
          component: AutocompleteTypeComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
    
  ],
  providers: [ViewportService],
  bootstrap: []
})

export class AppModule { }
