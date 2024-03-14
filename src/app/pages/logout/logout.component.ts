import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}

  ngOnInit(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email')
    this.router.navigate(['/login']);
  }
}


