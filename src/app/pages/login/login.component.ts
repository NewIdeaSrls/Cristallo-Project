import { Component, OnInit } from "@angular/core";
import { GlobalService } from "./../../services/globals.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [FormsModule, CommonModule, HttpClientModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
	providers: [HttpClient],
})
export class LoginComponent {

	credentials = {
		email: "",
		password: "",
	};

	constructor(
		private router: Router,
		private http: HttpClient,
		public  dataService: GlobalService,
    private toastr:ToastrService
	) {}

	async authenticate() {
    let _email = this.credentials.email
    let _password = this.credentials.password
    this.dataService.login({ "email": _email,"password":_password}).subscribe(response => {
         
      if (response && response.data) {
        sessionStorage.setItem("email", this.credentials.email);
        sessionStorage.setItem("token", response.data.access_token);

        this.router.navigate(["/home"]);
        this.toastr.success(
            "Login",
            "Login effettuato con successo",
          );
      }
    })
  }
}
