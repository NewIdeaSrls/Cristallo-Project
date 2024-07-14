import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';
import { MDTableComponent } from '../../components/mdtable/mdtable.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../translation.module';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { MatSidenavModule, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewEncapsulation } from '@angular/core';
/////////////////////////////////////////////////////////////////////////////////////////////////////
import { BryntumButtonComponent, BryntumSchedulerComponent } from '@bryntum/schedulerpro-angular';
import { Scheduler, DateHelper } from '@bryntum/schedulerpro';
import { MyTimeRange } from './lib/MyTimeRange';
import { BryntumSchedulerProModule } from '@bryntum/schedulerpro-angular';
import { schedulerConfig } from './resources.config';
// Scheduler API locales
import '@bryntum/schedulerpro/locales/schedulerpro.locale.It.js';
import { LocaleManager, LocaleHelper } from '@bryntum/schedulerpro';

const locale = {
    localeName : 'It',
    localeDesc : 'Italiano',
    localeCode : 'it-IT',
};
export default LocaleHelper.publishLocale(locale);
LocaleManager.locale = 'It';
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    BryntumSchedulerProModule,
    MatProgressBarModule,
    MDTableComponent,
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    NgxTranslateModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss',
  encapsulation : ViewEncapsulation.None
})

export class ResourcesComponent implements AfterViewInit {
  
    public schedulerConfig:any = schedulerConfig;
    private scheduler!: Scheduler;

    @ViewChild(BryntumSchedulerComponent, { static : true }) schedulerComponent!: BryntumSchedulerComponent;

    /**
     * Runs after the view (including the child scheduler) is initializes
     */
    ngAfterViewInit(): void {
        this.scheduler = this.schedulerComponent.instance; 
    }

    zoomIn() {
      this.scheduler.zoomIn() ;
    }

    zoomOut() {
      this.scheduler.zoomOut() ;
    }
}
