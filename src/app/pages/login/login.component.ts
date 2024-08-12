import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/globals.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule,FormsModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, HttpClientModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [HttpClient],
})

export class LoginComponent implements OnInit {
	form : any
	formSubmitAttempt!: boolean;

  constructor(
	private fb: FormBuilder,
	private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    public dataService: GlobalService,
    private toastr: ToastrService

  ) {}

  credentials = {
    email: 'user@user.com',
    password: '123',
  };
  
  ngOnInit(): void {
	this.form = this.fb.group({
		userName: ['', Validators.required],
		password: ['', Validators.required]
	  });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  resetValue(fieldControlName: string): void {
    this.form?.get(fieldControlName)?.reset(null);
  }


  async authenticate() {
    let _email = this.credentials.email;
    let _password = this.credentials.password;
    this.dataService.login({ email: _email, password: _password }).subscribe(response => {
      if (response && response.data) {
        sessionStorage.setItem('email', this.credentials.email);
        sessionStorage.setItem('token', response.data.access_token);

        this.router.navigate(['/home']);
        this.toastr.success('Login', 'Login effettuato con successo');
      }
    });
  }
}
