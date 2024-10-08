import { NgFor, NgIf } from '@angular/common';
import { Inject,AfterViewInit, Component, Input, Output, OnInit, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NgxTranslateModule } from '../../translation.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-intl';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSidenavModule, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

import { AutoResizeColumnsDirective } from './auto-resize-columns.directive';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { DialogShowComponent } from '../mdtable/dialog-show/dialog-show.component';
import { DialogDeleteComponent } from '../mdtable/dialog-delete/dialog-delete.component'

export type DialogDataSubmitCallback<T> = (row: T) => void;

interface ColumnDef {
  title: string;
  checked: boolean;
  minWidth: number;
}

interface FilterState {
  [key: string]: string; // Keys are column names, values are filter strings
}

@Component({
  selector: 'app-mdtable',
  standalone: true,
  imports: [
    NgSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSidenavModule,
    AutoResizeColumnsDirective,
    NgxTranslateModule,
    CommonModule,
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
    CdkDropList,
    CdkDrag,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './mdtable.component.html',
  styleUrl: './mdtable.component.scss',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill', floatLabel: 'always', hideRequiredMarker: true, color: 'accent', density: -2 } }
  ],
})
export class MDTableComponent implements OnInit, AfterViewInit, OnChanges {
  // Input From Parent
  @Input() datasource: any[] = [];
  @Input() datacolumns: any[] = [];
  @Input() dataconfig: any[] = [];
  @Input() datashow: any[] = [];
  @Input() localStorageMDTable: string = '';
  @Output() action = new EventEmitter();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild('drawer0') drawer0!: MatDrawer;

  data: any;
  columnFilters: any = {};
  toggleFilters = true;
  config: any[] = [];
  pending:boolean = false
 
  dataSourceLenght = 0;
  dataLenght = 0;

  public selectedDrawer = false;
  elementColumns: ColumnDef[] = [];
  fromStorage: any = '';
  filterState: FilterState = {};

  expandedElement: any | null; //
  showExpandedDetail: boolean = false;

  constructor(
    private translate: TranslateService,
    private _elementRef: ElementRef<HTMLElement>,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log('Init')
    this.pending = true 
    this.data = new MatTableDataSource<any>(this.datasource);
    this.dataLenght = this.data.lenght;
    this.translate.addLangs(['en', 'it']);
    this.translate.setDefaultLang('it');

    // Load Storage configuration for MdTable localStorageMDTable
    console.log(this.localStorageMDTable);
    let storage: any = this.localStorageMDTable;
    this.fromStorage = localStorage.getItem(storage);
    if (this.fromStorage !== null) {
      this.elementColumns = JSON.parse(this.fromStorage);
      console.log('da localstorage:', this.elementColumns);
    }
    if (this.elementColumns.length == 0) {
      console.log(this.datacolumns);
      this.elementColumns = this.returnColumnsArray(this.datacolumns);
      console.log(this.elementColumns);
      this.saveresult(this.fromStorage, this.elementColumns);
      console.log(this.elementColumns);
    }
    console.log(this.datashow)
  }


  ngAfterViewInit(): void {
    this.data.paginator = this.paginator;
    this.data.disableClear = true;
    this.data.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES:",changes);
    this.refreshData()
  }

  openDialogData(): void {
    console.log(this.expandedElement)
    
    
    const dialogRef = this.dialog.open(DialogShowComponent, {
      width: '100%',
      data: {title: "Dettaglio",datatoshow: this.expandedElement, columnsOrder:this.datashow}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      this.showExpandedDetail = false
    });
  }

  openDialogDelete(): void {
    console.log(this.expandedElement)
    const dialogRef = this.dialog.open( DialogDeleteComponent, {
      width: '70%',
      data: {title: "Eliminazione dati",datatoshow: this.expandedElement}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      this.showExpandedDetail = false
    });
  }

  toggleRow(row: any) {
    console.log('Riga selezionata toggle/stato', row,this.showExpandedDetail);
    this.showExpandedDetail = !this.showExpandedDetail
    if (this.showExpandedDetail == true ) {
        this.expandedElement = row
        this.openDialogData()
    } else {
      this.expandedElement = null
    }
  }

  openAttachements(event: MouseEvent, element: any,attach:any): void {
    console.log(event, element,attach);
    event.stopPropagation();
    this.openDialogImage(attach['images']);
  }

  openDialogImage(element:any) {
    const dialogRef = this.dialog.open(DialogContent,{
      data: { callback: this.callBack.bind(this), defaultValue: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  callBack(returndata: string) {
    console.log(returndata)
  }

  refreshData() {
    console.log('RefreshData');
    this.data = new MatTableDataSource<any>(this.datasource);
    this.data.paginator = this.paginator;
    this.data.disableClear = true;
    this.data.sort = this.sort;
    this.pending = false
  }

  getWidthForContent(content: string): string {
    console.log("Contenuto:",content)
    if (content) {
      const Width = Math.max(100, content.length * 10).toString();
      console.log("width:",Width)
      return Width + "px !important";
    } else {
      return ""
    }
  }

  containsValue(source: string, valueToCheck: string): boolean {
    return source.toLowerCase().includes(valueToCheck.toLowerCase());
  }

  pageChanged($event: any) {
    console.log($event);
    this.action.emit({ actionRequest: 'paginator', element: $event });
  }

  filter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Update the filter state for the specific column
    this.filterState[column] = filterValue;

    // Set the filter predicate
    this.data.filterPredicate = (data: any, _: any) => {
      // Check every column in filterState
      for (const col in this.filterState) {
        if (this.filterState[col]) {
          const textToSearch = (data[col] && data[col].toString().toLowerCase()) || '';
          if (textToSearch.indexOf(this.filterState[col]) === -1) {
            return false; // Does not match this column's filter
          }
        }
      }
      return true; // All filters match
    };

    // Trigger the filter with a dummy value to re-evaluate
    this.data.filter = ' '; // Assigning a non-empty string to trigger change detection
  }

  toggleFilter() {
    this.toggleFilters = !this.toggleFilters;
    if (this.toggleFilters == false) {
      this.data = this.data = new MatTableDataSource<any>(this.datasource);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    }
  }

  ActionHandlerOpen(element: any) {
    this.action.emit({ actionRequest: 'open', element: element });
  }

  ActionHandlerDelete(element: any) {
    console.log("Da cancellare:",element)
    this.action.emit({ actionRequest: 'delete', element: element });
  }

  ActionHandlerAdd() {
    this.action.emit({ actionRequest: 'add' });
  }

  ActionHandlerColumnsManager() {
    this.action.emit({ actionRequest: 'columns' });
  }

  ActionHandlerMenu(element: any,event:any) {
    event.stopPropagation();
    this.action.emit({ actionRequest: 'menu', element });
  }

  ActionHandlerEmail(element: any) {
    this.action.emit({ actionRequest: 'email', element });
  }

  async ActionHandlerReload() {
    this.pending = true;
    await new Promise(resolve => setTimeout(resolve, 4000));
    this.action.emit({ actionRequest: 'reload' });
    this.pending = false;
  }

  get displayedColumns(): string[] {
    const dynamicColumns = this.elementColumns.filter(column => column.checked).map(column => column.title);
    return Array.from(new Set(['ctaColumn',...dynamicColumns]));
  }

  isSticky (column: string): boolean {
    return column === 'ctaColumn' ? true : false;
  }

  // datacolumns
  /* ############################################################################## */

  public toggleDraweradvComponent() {
    console.log('Drawer Columns');
    if (this.selectedDrawer == true) {
      this.selectedDrawer = false;
    } else {
      this.selectedDrawer = true;
    }
    this.drawer0.toggle();
  }

  public returnColumnsArray(object: any): ColumnDef[] {
    const columnsWithProperties: ColumnDef[] = object.map((column: any) => ({
      title: column,
      checked: false,
      minWidth: 0,
    }));
    return columnsWithProperties;
  }

  dropmain(event: any) {
    console.log(event);
    console.log(this.elementColumns, event.previousIndex, event.currentIndex);
    moveItemInArray(this.elementColumns, event.previousIndex, event.currentIndex);
    this.saveresult(this.fromStorage, this.elementColumns);
  }

  dropdetail(event: any) {
    console.log(event);
    console.log(this.elementColumns, event.previousIndex, event.currentIndex);
    moveItemInArray(this.elementColumns, event.previousIndex, event.currentIndex);
    this.saveresult(this.fromStorage, this.elementColumns);
  }

  public saveresult(saveto: string, arrtosave: ColumnDef[]) {
    console.log(arrtosave);
    localStorage.setItem(saveto, JSON.stringify(arrtosave));
  }

  public isCheckedFieldExists(array: any, field: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].checked === true && array[i].title == field) {
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: 'dialog-content-image',
  templateUrl: 'imageMatDialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, NgIf, NgFor],
})
export class DialogContent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { callback: DialogDataSubmitCallback<any>; defaultValue: any },

  ) {}
}
