import { CommonModule } from '@angular/common';
import { NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import { NgxTranslateModule } from '../../translation.module';
import { ElementRef } from '@angular/core';
import { MatSidenavModule, MAT_DRAWER_DEFAULT_AUTOSIZE } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ViewportService } from '../../services/viewport.service';

import { Subscription } from 'rxjs';
import {} from '@angular/common';

import { Sidenav, initTE, Collapse, Dropdown } from 'tw-elements';
import { GlobalService } from '../../services/globals.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf,
    NgFor,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    NgxTranslateModule,
    MatCheckboxModule,
    MatProgressBarModule,
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  companies: any[] = [];
  settings: any[] = [];

  user = '';
  company = '';
  company_setting = '';

  filteruser = {};
  filterCompany = {};
  filterModuleSettings = {};
  modulesEnabled: any[] = [];
  alreadyloaded: boolean = false;

  constructor(
    private viewportService: ViewportService,
    private dataService: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   
  }

  ngAfterViewInit() {
    initFlowbite();
    initTE({ Sidenav, Collapse, Dropdown });
    this.fetchMenu();
    //console.log('ngAfterViewInit - called after the component’s view (and child views) has been initialized');
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.route.url]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route ;
  }

  fetchMenu() {
    if (sessionStorage.getItem('token')) {
      this.filteruser = {
        email: {
          _contains: sessionStorage.getItem('email'),
        },
      };

      // console.log(this.filteruser);
      // collection:string,id?:string, fields?:string[], filter?:object, order?:string[], limit?:number, page?:number,offset?,search?
      this.dataService
        .getRecord(
          'users', //collection
          undefined, // id
          ['*.*'], // fields es. ["companyName"] or ["*.*"]
          this.filteruser, //filter
          undefined, // order by field  - = inverse es. ["-companyName"]
          undefined, // limit
          undefined, // page
          undefined, // offset
          undefined // search search in all fields and all records
        )
        .subscribe((users: any) => {
          //console.log(users["data"][0]);
          this.user = users['data'][0].email;
          //console.log("user:", this.user);
        });

      this.filterCompany = {
        user_email: {
          _contains: sessionStorage.getItem('email'),
        },
      };

      this.dataService
        .getRecord(
          'company', //collection
          undefined, // id
          ['*.*'], // fields es. ["companyName"] or ["*.*"]
          this.filterCompany, //filter
          undefined, // order by field  - = inverse es. ["-companyName"]
          undefined, // limit
          undefined, // page
          undefined, // offset
          undefined // search search in all fields and all records
        )
        .subscribe((company: any) => {
          //console.log(company["data"][0]);
          this.company = company['data'][0].companyName;
          //console.log("company:", this.company);
          getModulesEnabled(company['data'][0]);
        });

      const getModulesEnabled = (company: any) => {
        this.filterModuleSettings = {
          companyRef: {
            _contains: this.company,
          },
          userRef: {
            _contains: sessionStorage.getItem('email'),
          },
        };
        //console.log(this.filterModuleSettings);
      };

      this.dataService
        .getRecord(
          'moduleSettings', //collection
          undefined, // id
          ['*.*'], // fields es. ["companyName"] or ["*.*"]
          this.filterModuleSettings, //filter
          undefined, // order by field  - = inverse es. ["-companyName"]
          undefined, // limit
          undefined, // page
          undefined, // offset
          undefined // search search in all fields and all records
        )
        .subscribe((modules: any) => {
          console.log(modules['data'][0])
          resultModulesEnabled(modules['data'][0]);
        });

      const resultModulesEnabled = (modules: any) => {
        this.modulesEnabled = modules.module;
        console.log(this.modulesEnabled);
      };
    }
  }


  public checkModuleExactlyInArray(moduleName: string, modulesEnabled: string[]): boolean {
    for (let i = 0; i < modulesEnabled.length; i++) {
        if (modulesEnabled[i] === moduleName) {
            console.log(modulesEnabled[i], moduleName)
            return true;
        } 
    }
    return false;
}
}
