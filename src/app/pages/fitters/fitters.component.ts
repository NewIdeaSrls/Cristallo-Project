import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';

@Component({
  selector: 'app-fitters',
  standalone: true,
  imports: [],
  templateUrl: './fitters.component.html',
  styleUrl: './fitters.component.scss'
})
export class FittersComponent implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}
