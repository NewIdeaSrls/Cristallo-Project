import { Component, OnInit,OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, RouterOutlet } from "@angular/router";
import { Router } from "@angular/router";
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { initFlowbite } from "flowbite";
import { FormsModule } from "@angular/forms";
import { GlobalService } from ".//services/globals.service";
import { NgIf, NgFor, UpperCasePipe } from "@angular/common";
import { Sidenav, initTE, Collapse, Dropdown } from "tw-elements";
import { Subscription } from 'rxjs';
import { } from '@angular/common';

@Component({
	selector: "app-root",
	standalone: true,
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	imports: [
		CommonModule,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		FormsModule,
		NgIf,
		NgFor
	],
})

export class AppComponent implements OnInit {
	showRouterOutlet: boolean = false;
	showLoginPage: boolean = false;
	companies: any[] = [];
	settings: any[] = [];
	user = "";
	company = "";
	company_setting = "";
	filteruser = {};
	filterCompany = {};
	filterModuleSettings = {};
	modulesEnabled: any[] = [];

	constructor(
		private router: Router,
		public dataService: GlobalService,
   )  
    {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				if (event.url.includes("/login") || event.url == "/") {
					this.showLoginPage = true;
					this.showRouterOutlet = false;
				} else {
					this.showLoginPage = false;
					this.showRouterOutlet = true;
				}
			}
		});
	}

	ngOnInit() {
		initFlowbite();
		initTE({ Sidenav, Collapse, Dropdown });
	}
}

