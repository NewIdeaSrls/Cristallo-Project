import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ElementRef } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxTranslateModule } from '../../../translation.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './../custom-mat-paginator-intl';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSidenavModule, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-show',
  standalone: true,
  imports: [
    CommonModule,
    NgxTranslateModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSidenavModule,
    NgxTranslateModule,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    NgFor,
    MatInputModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSortModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './dialog-show.component.html',
  styleUrl: './dialog-show.component.scss',
})
export class DialogShowComponent {
  Object: any;
  desiredProperties = this.data.columnsOrder;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) {}

  getDataKeys() {
    const newData = this.filterAndOrderProperties(this.data.datatoshow, this.desiredProperties);
    return Object.keys(newData);
  }

  filterAndOrderProperties(data: any, properties: any[]): any[] {
  const filteredRecord = {} as any
  properties.forEach(prop => {
    if (data.hasOwnProperty(prop)) {
      ;
      filteredRecord[prop] = data[prop];
  }
  });
  return filteredRecord;
}

}
